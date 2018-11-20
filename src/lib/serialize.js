/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { TYPE, serialize, serializeType, deserialize, type CustomSerializedType, type Thenable } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD } from '../conf';
import { global } from '../global';

global.methods = global.methods || new WeakMap();

const listenForFunctionCalls = once(() => {
    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {
        let methods = global.methods.get(source);

        if (!methods) {
            throw new Error(`Could not find any methods this window has privileges to call`);
        }

        let meth = methods[data.id];

        if (!meth) {
            throw new Error(`Could not find method with id: ${ data.id }`);
        }

        if (!matchDomain(meth.domain, origin)) {
            throw new Error(`Method domain ${ meth.domain } does not match origin ${ origin }`);
        }
        
        return ZalgoPromise.try(() => {
            return meth.val.apply({ source, origin, data }, data.args);
        }).then(result => {
            const { id, name } = data;
            return { result, id, name };
        });
    });
});

const CUSTOM_TYPE = {
    CROSS_DOMAIN_ZALGO_PROMISE: ('cross_domain_zalgo_promise' : 'cross_domain_zalgo_promise'),
    CROSS_DOMAIN_FUNCTION:      ('cross_domain_function' : 'cross_domain_function')
};

type SerializedFunction = CustomSerializedType<typeof CUSTOM_TYPE.CROSS_DOMAIN_FUNCTION, {
    id : string,
    name : string
}>;

function serializeFunction<T>(destination : CrossDomainWindowType, domain : string | Array<string>, val : () => ZalgoPromise<T> | T, key : string) : SerializedFunction {
    let id = uniqueID();

    let methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain, val };

    listenForFunctionCalls();

    return serializeType(CUSTOM_TYPE.CROSS_DOMAIN_FUNCTION, { id, name: val.name || key });
}

function deserializeFunction<T>(source, origin, { id, name }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {

    function crossDomainFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
        let args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id, name, args }, { domain: origin })
            .then(({ data }) => data.result);
    }

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;

    crossDomainFunctionWrapper.source = source;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}

type SerializedPromise = CustomSerializedType<typeof CUSTOM_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then : SerializedFunction
}>;

function serializePromise(destination : CrossDomainWindowType, domain : string | Array<string>, val : Thenable, key : string) : SerializedPromise {
    return serializeType(CUSTOM_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
        then: serializeFunction(destination, domain, (resolve, reject) => val.then(resolve, reject), key)
    });
}

function deserializePromise<T>(source : CrossDomainWindowType, origin : string, { then } : { then : Function }) : ZalgoPromise<T> {
    return new ZalgoPromise((resolve, reject) => {
        deserializeFunction(source, origin, then)(resolve, reject);
    });
}

export function serializeMessage<T : mixed>(destination : CrossDomainWindowType, domain : string | Array<string>, obj : T) : string {
    return serialize(obj, {
        [ TYPE.PROMISE ]:  (val : Thenable, key : string) : SerializedPromise => serializePromise(destination, domain, val, key),
        [ TYPE.FUNCTION ]: (val : Function, key : string) : SerializedFunction => serializeFunction(destination, domain, val, key)
    });
}

export function deserializeMessage<T : mixed>(source : CrossDomainWindowType, origin : string, message : string) : T {
    return deserialize(message, {
        [ CUSTOM_TYPE.CROSS_DOMAIN_ZALGO_PROMISE ]: ({ then })     => deserializePromise(source, origin, { then }),
        [ CUSTOM_TYPE.CROSS_DOMAIN_FUNCTION ]:      ({ id, name }) => deserializeFunction(source, origin, { id, name })
    });
}
