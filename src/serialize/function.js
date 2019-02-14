/* @flow */

import { matchDomain, getDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, isRegex } from 'belter/src';
import { serializeType, type CustomSerializedType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { windowStore, globalStore } from '../global';
import type { OnType, SendType, CancelableType } from '../types';

import { ProxyWindow } from './window';

type StoredMethod = {|
    name : string,
    domain : DomainMatcher,
    val : Function,
    source : CrossDomainWindowType | ProxyWindow
|};

function addMethod(id : string, val : Function, name : string, source : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher) {
    const methodStore = windowStore('methodStore');
    const proxyWindowMethods = globalStore('proxyWindowMethods');
    
    if (ProxyWindow.isProxyWindow(source)) {
        proxyWindowMethods.set(id, { val, name, domain, source });
    } else {
        proxyWindowMethods.del(id);
        // $FlowFixMe
        const methods = methodStore.getOrSet(source, () => ({}));
        methods[id] = { domain, name, val, source };
    }
}

function lookupMethod(source : CrossDomainWindowType, id : string) : ?StoredMethod {
    const methodStore = windowStore('methodStore');
    const proxyWindowMethods = globalStore('proxyWindowMethods');
    const methods = methodStore.getOrSet(source, () => ({}));
    return methods[id] || proxyWindowMethods.get(id);
}

function listenForFunctionCalls({ on } : { on : OnType }) : CancelableType {
    return globalStore('builtinListeners').getOrSet('functionCalls', () => {
        return on(MESSAGE_NAME.METHOD, { domain: WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {
            const { id, name } = data;

            const meth = lookupMethod(source, id);
    
            if (!meth) {
                throw new Error(`Could not find method '${ data.name }' with id: ${ data.id } in ${ getDomain(window) }`);
            }

            const { source: methodSource, domain, val } = meth;
            
            return ZalgoPromise.try(() => {
                if (!matchDomain(domain, origin)) {
                    // $FlowFixMe
                    throw new Error(`Method '${ data.name }' domain ${ JSON.stringify(isRegex(meth.domain) ? meth.domain.source : meth.domain) } does not match origin ${ origin } in ${ getDomain(window) }`);
                }
                
                if (ProxyWindow.isProxyWindow(methodSource)) {
                    // $FlowFixMe
                    return methodSource.matchWindow(source).then(match => {
                        if (!match) {
                            throw new Error(`Method call '${ data.name }' failed - proxy window does not match source in ${ getDomain(window) }`);
                        }
                    });
                }
            }).then(() => {
                return val.apply({ source, origin }, data.args);
            }, err => {
                return ZalgoPromise.try(() => {
                    if (val.onError) {
                        return val.onError(err);
                    }
                }).then(() => {
                    // $FlowFixMe
                    if (err.stack) {
                        // $FlowFixMe
                        err.stack = `Remote call to ${ name }()\n\n${ err.stack }`;
                    }

                    throw err;
                });
            }).then(result => {
                return { result, id, name };
            });
        });
    });
}

export type SerializedFunction = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
    id : string,
    name : string
}>;

export function serializeFunction<T>(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, val : () => ZalgoPromise<T> | T, key : string, { on } : { on : OnType }) : SerializedFunction {
    listenForFunctionCalls({ on });
    
    const id = val.__id__ || uniqueID();
    destination = ProxyWindow.unwrap(destination);
    const name = val.__name__ || val.name || key;

    if (ProxyWindow.isProxyWindow(destination)) {
        addMethod(id, val, name, destination, domain);

        // $FlowFixMe
        destination.awaitWindow().then(win => {
            addMethod(id, val, name, win, domain);
        });
    } else {
        addMethod(id, val, name, destination, domain);
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id, name });
}

export function deserializeFunction<T>(source : CrossDomainWindowType | ProxyWindow, origin : string, { id, name } : { id : string, name : string }, { send } : { send : SendType }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {
    const getDeserializedFunction = (opts? : Object = {}) => {
        function crossDomainFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
            let originalStack;
    
            if (__DEBUG__) {
                originalStack = (new Error(`Original call to ${ name }():`)).stack;
            }
    
            return ProxyWindow.toProxyWindow(source, { send }).awaitWindow().then(win => {
                const meth = lookupMethod(win, id);
    
                if (meth && meth.val !== crossDomainFunctionWrapper) {
                    return meth.val.apply({ source: window, origin: getDomain() }, arguments);
                } else {
                    // $FlowFixMe
                    const options = { domain: origin, fireAndForget: opts.fireAndForget };
                    const args = Array.prototype.slice.call(arguments);

                    return send(win, MESSAGE_NAME.METHOD, { id, name, args }, options)
                        .then(res => {
                            if (!opts.fireAndForget) {
                                return res.data.result;
                            }
                        });
                }
    
            }).catch(err => {
                // $FlowFixMe
                if (__DEBUG__ && originalStack && err.stack) {
                    // $FlowFixMe
                    err.stack = `${ err.stack }\n\n${ originalStack }`;
                }
                throw err;
            });
        }

        crossDomainFunctionWrapper.__name__ = name;
        crossDomainFunctionWrapper.__origin__ = origin;
        crossDomainFunctionWrapper.__source__ = source;
        crossDomainFunctionWrapper.__id__ = id;

        crossDomainFunctionWrapper.origin = origin;

        return crossDomainFunctionWrapper;
    };

    const crossDomainFunctionWrapper = getDeserializedFunction();
    crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({ fireAndForget: true });

    return crossDomainFunctionWrapper;
}
