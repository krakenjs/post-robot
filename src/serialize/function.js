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

type StoredMethod = {|
    name : string,
    domain : DomainMatcher,
    val : Function,
    source : CrossDomainWindowType | ProxyWindow
|};

function addMethod(id : string, val : Function, name : string, source : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher) {
    if (ProxyWindow.isProxyWindow(source)) {
        proxyWindowMethods.set(id, { val, name, domain, source });
    } else {
        proxyWindowMethods.del(id);
        // $FlowFixMe
        let methods = methodStore.getOrSet(source, () => ({}));
        methods[id] = { domain, name, val, source };
    }
}

function lookupMethod(source : CrossDomainWindowType, id : string) : ?StoredMethod {
    let methods = methodStore.getOrSet(source, () => ({}));
    return methods[id] || proxyWindowMethods.get(id);
}

const listenForFunctionCalls = once(() => {
    if (global.listeningForFunctions) {
        return;
    }

    global.listeningForFunctions = true;

    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {
        let { id, name } = data;
        
        return ZalgoPromise.try(() => {
            let meth = lookupMethod(source, id);

            if (!meth) {
                throw new Error(`Could not find method '${ data.name }' with id: ${ data.id } in ${ getDomain(window) }`);
            }

            let { source: methodSource, domain, val } = meth;

            return ZalgoPromise.try(() => {
                if (!matchDomain(domain, origin)) {
                    // $FlowFixMe
                    throw new Error(`Method '${ data.name }' domain ${ JSON.stringify(isRegex(meth.domain) ? meth.domain.source : meth.domain) } does not match origin ${ origin } in ${ getDomain(window) }`);
                }
                
                if (ProxyWindow.isProxyWindow(methodSource)) {
                    // $FlowFixMe
                    return methodSource.matchWindow(source).then(match => { // eslint-disable-line max-nested-callbacks
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
    
    let id = val.__id__ || uniqueID();
    destination = ProxyWindow.unwrap(destination);
    let name = val.__name__ || val.name || key;

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

export function deserializeFunction<T>(source : CrossDomainWindowType | ProxyWindow, origin : string, { id, name } : { id : string, name : string }) : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<T> {
    const getDeserializedFunction = (opts? : Object = {}) => {
        function crossDomainFunctionWrapper<X : mixed>() : ZalgoPromise<X> {
            let originalStack;
    
            if (__DEBUG__) {
                originalStack = (new Error(`Original call to ${ name }():`)).stack;
            }
    
            return ProxyWindow.toProxyWindow(source).awaitWindow().then(win => {
                let meth = lookupMethod(win, id);
    
                if (meth && meth.val !== crossDomainFunctionWrapper) {
                    return meth.val.apply({ source: window, origin: getDomain() }, arguments);
                } else {
                    return global.send(win, MESSAGE_NAME.METHOD, { id, name, args: Array.prototype.slice.call(arguments) }, { domain: origin, ...opts })
                        .then(({ data }) => data.result);
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

    let crossDomainFunctionWrapper = getDeserializedFunction();
    crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({ fireAndForget: true });

    return crossDomainFunctionWrapper;
}
