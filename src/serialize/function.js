/* @flow */

import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { global, windowStore, globalStore } from '../global';

import { ProxyWindow } from './window';

let methodStore = windowStore('methodStore');
let proxyWindowMethods = globalStore('proxyWindowMethods');
global.listeningForFunctions = global.listeningForFunctions || false;

const listenForFunctionCalls = once(() => {
    if (global.listeningForFunctions) {
        return;
    }

    global.listeningForFunctions = true;

    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {
        let { id, name } = data;
        
        return ZalgoPromise.try(() => {
            let methods = methodStore.get(source, () => ({}));
            let meth = methods[data.id] || proxyWindowMethods.get(id);

            if (!meth) {
                throw new Error(`Could not find method with id: ${ data.id }`);
            }

            let { proxy, domain, val } = meth;

            if (!matchDomain(domain, origin)) {
                throw new Error(`Method domain ${ JSON.stringify(meth.domain) } does not match origin ${ origin }`);
            }
            
            if (proxy) {
                // $FlowFixMe
                return proxy.matchWindow(source).then(match => {
                    if (!match) {
                        throw new Error(`Proxy window does not match source`);
                    }
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
        proxyWindowMethods.set(id, { proxy: destination, domain, val });
        // $FlowFixMe
        destination.awaitWindow().then(win => {
            proxyWindowMethods.del(id);
            let methods = methodStore.getOrSet(win, () => ({}));
            methods[id] = { domain, val };
        });
    } else {
        // $FlowFixMe
        let methods = methodStore.getOrSet(destination, () => ({}));
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
