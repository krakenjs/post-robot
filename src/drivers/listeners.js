/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { isRegex, getOrSet } from 'belter/src';

import { global, globalStore, windowStore } from '../global';
import { WILDCARD } from '../conf';

let responseListeners = globalStore('responseListeners');
let requestListeners = windowStore('requestListeners');
let erroredResponseListeners = globalStore('erroredResponseListeners');

export function resetListeners() {
    responseListeners.reset();
    erroredResponseListeners.reset();
}

global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new (function WindowWildcard() { /* pass */ })();

const __DOMAIN_REGEX__ = '__domain_regex__';

export type RequestListenerType = {
    handler : ({ source : CrossDomainWindowType, origin : string, data : mixed }) => (mixed | ZalgoPromise<mixed>),
    handleError : (err : mixed) => void,
    window : ?CrossDomainWindowType,
    name : string,
    domain : string | RegExp | Array<string>
};

export type ResponseListenerType = {
    name : string,
    window : CrossDomainWindowType,
    domain : (string | Array<string> | RegExp),
    respond : (err : ?mixed, result : ?mixed) => void,
    ack? : ?boolean
};

export function addResponseListener(hash : string, listener : ResponseListenerType) {
    responseListeners.set(hash, listener);
}

export function getResponseListener(hash : string) : ?ResponseListenerType {
    return responseListeners.get(hash);
}

export function deleteResponseListener(hash : string) {
    responseListeners.del(hash);
}

export function markResponseListenerErrored(hash : string) {
    erroredResponseListeners.set(hash, true);
}

export function isResponseListenerErrored(hash : string) : boolean {
    return erroredResponseListeners.has(hash);
}

export function getRequestListener({ name, win, domain } : { name : string, win : ?CrossDomainWindowType, domain : ?(string | RegExp) }) : ?RequestListenerType {

    if (win === WILDCARD) {
        win = null;
    }

    if (domain === WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error(`Name required to get request listener`);
    }

    for (let winQualifier of [ win, global.WINDOW_WILDCARD ]) {
        if (!winQualifier) {
            continue;
        }

        let nameListeners = requestListeners.get(winQualifier);

        if (!nameListeners) {
            continue;
        }

        let domainListeners = nameListeners[name];

        if (!domainListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (domainListeners[domain]) {
                return domainListeners[domain];
            }

            if (domainListeners[__DOMAIN_REGEX__]) {
                for (let { regex, listener } of domainListeners[__DOMAIN_REGEX__]) {
                    if (matchDomain(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (domainListeners[WILDCARD]) {
            return domainListeners[WILDCARD];
        }
    }
}

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

    if (!win || win === WILDCARD) {
        win = global.WINDOW_WILDCARD;
    }

    domain = domain || WILDCARD;

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

    let nameListeners = requestListeners.getOrSet(win, () => ({}));
    // $FlowFixMe
    let domainListeners = getOrSet(nameListeners, name, () => ({}));

    let strDomain = domain.toString();

    let regexListeners;
    let regexListener;

    if (isRegex(domain)) {
        regexListeners = getOrSet(domainListeners, __DOMAIN_REGEX__, () => []);
        regexListener = { regex: domain, listener };
        regexListeners.push(regexListener);
    } else {
        domainListeners[strDomain] = listener;
    }

    return {
        cancel() {
            delete domainListeners[strDomain];

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));

                if (!regexListeners.length) {
                    delete domainListeners[__DOMAIN_REGEX__];
                }
            }

            if (!Object.keys(domainListeners).length) {
                // $FlowFixMe
                delete nameListeners[name];
            }

            // $FlowFixMe
            if (!Object.keys(nameListeners).length) {
                requestListeners.delete(win);
            }
        }
    };
}
