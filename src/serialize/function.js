/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { global } from '../global';

import { ProxyWindow } from './window';

global.methods = global.methods || new WeakMap();
global.proxyWindowMethods = global.proxyWindowMethods || {};
global.listeningForFunctions = global.listeningForFunctions || false;

const listenForFunctionCalls = once(() => {
    if (global.listeningForFunctions) {
        return;
    }

    global.listeningForFunctions = true;

    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {
        let { id, name } = data;
        
        return ZalgoPromise.try(() => {
            let methods = global.methods.get(source) || {};
            let meth = methods[data.id] || global.proxyWindowMethods[id];

            if (!meth) {
                throw new Error(`Could not find method with id: ${ data.id }`);
            }

            let { proxy, domain, val } = meth;

            if (!matchDomain(domain, origin)) {
                throw new Error(`Method domain ${ meth.domain } does not match origin ${ origin }`);
            }
            
            if (proxy) {
                return proxy.matchWindow(source).then(match => {
                    if (!match) {
                        throw new Error(`Proxy window does not match source`);
                    }

                    delete global.proxyWindowMethods[id];
                    return val;
                });
            }

            return val;

        }).then(method => {
            return method.apply({ source, origin, data }, data.args);

        }).then(result => {
            return { result, id, name };
        });
    });
});

export type SerializedFunction = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
    id : string,
    name : string
}>;

export function serializeFunction<T>(destination : CrossDomainWindowType | ProxyWindow, domain : string | Array<string>, val : () => ZalgoPromise<T> | T, key : string) : SerializedFunction {
    listenForFunctionCalls();
    
    let id = uniqueID();
    destination = ProxyWindow.unwrap(destination);

    if (ProxyWindow.isProxyWindow(destination)) {
        global.proxyWindowMethods[id] = { proxy: destination, domain, val };
    } else {
        let methods = global.methods.getOrSet(destination, () => ({}));
        methods[id] = { domain, val };
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id, name: val.name || key });
}

export function deserializeFunction<T>(source : CrossDomainWindowType, origin : string, { id, name } : { id : string, name : string }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {

    function crossDomainFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
        let args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id, name, args }, { domain: origin })
            .then(({ data }) => data.result);
    }

    crossDomainFunctionWrapper.fireAndForget = function crossDomainFireAndForgetFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
        let args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id, name, args }, { domain: origin, fireAndForget: true });
    };

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;

    crossDomainFunctionWrapper.source = source;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}
