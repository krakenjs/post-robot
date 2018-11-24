/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
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

export type SerializedFunction = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
    id : string,
    name : string
}>;

export function serializeFunction<T>(destination : CrossDomainWindowType, domain : string | Array<string>, val : () => ZalgoPromise<T> | T, key : string) : SerializedFunction {
    let id = uniqueID();

    let methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain, val };

    listenForFunctionCalls();

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id, name: val.name || key });
}

export function deserializeFunction<T>(source : CrossDomainWindowType, origin : string, { id, name } : { id : string, name : string }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {

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
