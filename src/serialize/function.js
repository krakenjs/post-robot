/* @flow */

import { matchDomain, getDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID, isRegex } from 'belter/src';
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
            let methods = methodStore.getOrSet(source, () => ({}));
            let meth = methods[data.id] || proxyWindowMethods.get(id);

            if (!meth) {
                throw new Error(`Could not find method '${ data.name }' with id: ${ data.id } in ${ getDomain(window) }`);
            }

            let { proxy, domain, val } = meth;

            return ZalgoPromise.try(() => {
                if (!matchDomain(domain, origin)) {
                    // $FlowFixMe
                    throw new Error(`Method '${ data.name }' domain ${ JSON.stringify(isRegex(meth.domain) ? meth.domain.source : meth.domain) } does not match origin ${ origin } in ${ getDomain(window) }`);
                }
                
                if (proxy) {
                    // $FlowFixMe
                    return proxy.matchWindow(source).then(match => { // eslint-disable-line max-nested-callbacks
                        if (!match) {
                            throw new Error(`Method call '${ data.name }' failed - proxy window does not match source in ${ getDomain(window) }`);
                        }
                    });
                }
            }).then(() => {
                return val.apply({ source, origin }, data.args);
            }, err => {
                return ZalgoPromise.try(() => { // eslint-disable-line max-nested-callbacks
                    if (val.onError) {
                        return val.onError(err);
                    }
                }).then(() => { // eslint-disable-line max-nested-callbacks
                    throw err;
                });
            }).then(result => {
                return { result, id, name };
            });
        });
    });
});

export type SerializedFunction = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
    id : string,
    name : string
}>;

export function serializeFunction<T>(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, val : () => ZalgoPromise<T> | T, key : string) : SerializedFunction {
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

export function deserializeFunction<T>(source : CrossDomainWindowType | ProxyWindow, origin : string, { id, name } : { id : string, name : string }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {
    function innerWrapper<X : mixed>(args : $ReadOnlyArray<mixed>, opts? : Object = {}) : ZalgoPromise<X> {
        let originalStack;

        if (__DEBUG__) {
            originalStack = (new Error(`Original call to ${ name }():`)).stack;
        }

        return ZalgoPromise.try(() => {
            // $FlowFixMe
            return ProxyWindow.isProxyWindow(source) ? source.awaitWindow() : source;
        }).then(win => {
            return global.send(win, MESSAGE_NAME.METHOD, { id, name, args }, { domain: origin, ...opts });
        }).catch(err => {
            // $FlowFixMe
            if (__DEBUG__ && originalStack && err.stack) {
                // $FlowFixMe
                err.stack = `${ err.stack }\n\n${ originalStack }`;
            }
            throw err;
        });
    }

    function crossDomainFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
        return innerWrapper(Array.prototype.slice.call(arguments))
            .then(({ data }) => data.result);
    }

    crossDomainFunctionWrapper.fireAndForget = function crossDomainFireAndForgetFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
        return innerWrapper(Array.prototype.slice.call(arguments), { fireAndForget: true });
    };

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}
