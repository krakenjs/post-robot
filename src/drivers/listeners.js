/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { global } from '../global';
import { isRegex } from '../lib';
import { CONSTANTS } from '../conf';

export function resetListeners() {
    global.responseListeners = {};
    global.requestListeners  = {};
}

global.responseListeners = global.responseListeners || {};
global.requestListeners  = global.requestListeners  || {};
global.WINDOW_WILDCARD   = global.WINDOW_WILDCARD   || new (function WindowWildcard() { /* pass */ })();

global.erroredResponseListeners = global.erroredResponseListeners || {};

const __DOMAIN_REGEX__ = '__domain_regex__';

export type RequestListenerType = {
    handler : ({ source : CrossDomainWindowType, origin : string, data : Object }) => (mixed | ZalgoPromise<mixed>),
    handleError : (err : mixed) => void,
    window : ?CrossDomainWindowType,
    name : string,
    domain : string | RegExp | Array<string>
};

export type ResponseListenerType = {
    name : string,
    window : CrossDomainWindowType,
    domain : (string | Array<string> | RegExp),
    respond : (err : ?mixed, result : ?Object) => void,
    ack? : ?boolean
};

export function addResponseListener(hash : string, listener : ResponseListenerType) {
    global.responseListeners[hash] = listener;
}

export function getResponseListener(hash : string) : ResponseListenerType {
    return global.responseListeners[hash];
}

export function deleteResponseListener(hash : string) {
    delete global.responseListeners[hash];
}

export function markResponseListenerErrored(hash : string) {
    global.erroredResponseListeners[hash] = true;
}

export function isResponseListenerErrored(hash : string) : boolean {
    return Boolean(global.erroredResponseListeners[hash]);
}

export function getRequestListener({ name, win, domain } : { name : string, win : ?CrossDomainWindowType, domain : ?(string | RegExp) }) : ?RequestListenerType {

    if (win === CONSTANTS.WILDCARD) {
        win = null;
    }

    if (domain === CONSTANTS.WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error(`Name required to get request listener`);
    }

    let nameListeners = global.requestListeners[name];

    if (!nameListeners) {
        return;
    }

    for (let winQualifier of [ win, global.WINDOW_WILDCARD ]) {

        let winListeners = winQualifier && nameListeners.get(winQualifier);

        if (!winListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (winListeners[domain]) {
                return winListeners[domain];
            }

            if (winListeners[__DOMAIN_REGEX__]) {
                for (let { regex, listener } of winListeners[__DOMAIN_REGEX__]) {
                    if (matchDomain(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (winListeners[CONSTANTS.WILDCARD]) {
            return winListeners[CONSTANTS.WILDCARD];
        }
    }
}

// eslint-disable-next-line complexity
export function addRequestListener({ name, win, domain } : { name : string, win : ?CrossDomainWindowType, domain : ?(string | RegExp | Array<string>) }, listener : RequestListenerType) : { cancel : () => void } {

    if (!name || typeof name !== 'string') {
        throw new Error(`Name required to add request listener`);
    }

    if (Array.isArray(win)) {
        let listenersCollection = [];

        for (let item of win) {
            listenersCollection.push(addRequestListener({ name, domain, win: item }, listener));
        }

        return {
            cancel() {
                for (let cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        let listenersCollection = [];

        for (let item of domain) {
            listenersCollection.push(addRequestListener({ name, win, domain: item }, listener));
        }

        return {
            cancel() {
                for (let cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    let existingListener = getRequestListener({ name, win, domain });

    if (!win || win === CONSTANTS.WILDCARD) {
        win = global.WINDOW_WILDCARD;
    }

    domain = domain || CONSTANTS.WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error(`Request listener already exists for ${ name } on domain ${ domain.toString() } for ${ win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified' } window`);
        } else if (win) {
            throw new Error(`Request listener already exists for ${ name } for ${ win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified' } window`);
        } else if (domain) {
            throw new Error(`Request listener already exists for ${ name } on domain ${ domain.toString() }`);
        } else {
            throw new Error(`Request listener already exists for ${ name }`);
        }
    }

    let requestListeners = global.requestListeners;

    let nameListeners = requestListeners[name];

    if (!nameListeners) {
        nameListeners = new WeakMap();
        requestListeners[name] = nameListeners;
    }

    let winListeners  = nameListeners.get(win);

    if (!winListeners) {
        winListeners = {};
        nameListeners.set(win, winListeners);
    }

    let strDomain = domain.toString();

    let regexListeners = winListeners[__DOMAIN_REGEX__];
    let regexListener;

    if (isRegex(domain)) {

        if (!regexListeners) {
            regexListeners = [];
            winListeners[__DOMAIN_REGEX__] = regexListeners;
        }

        regexListener = { regex: domain, listener };

        regexListeners.push(regexListener);

    } else {
        winListeners[strDomain] = listener;
    }

    return {
        cancel() {
            if (!winListeners) {
                return;
            }

            delete winListeners[strDomain];

            if (win && Object.keys(winListeners).length === 0) {
                nameListeners.delete(win);
            }

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
            }
        }

    };
}
