/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { matchDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { isRegex, getOrSet } from 'belter/src';

import { getWildcard, type WildCard, globalStore, windowStore } from '../global';
import { WILDCARD } from '../conf';

export function resetListeners() {
    const responseListeners = globalStore('responseListeners');
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    responseListeners.reset();
    erroredResponseListeners.reset();
}

const __DOMAIN_REGEX__ = '__domain_regex__';

export type RequestListenerType = {|
    handler : ({| source : CrossDomainWindowType, origin : string, data : mixed |}) => (mixed | ZalgoPromise<mixed>),
    handleError : (err : mixed) => void,
    window : ?CrossDomainWindowType,
    name : string,
    domain : DomainMatcher
|};

export type ResponseListenerType = {|
    name : string,
    win : CrossDomainWindowType,
    domain : DomainMatcher,
    promise : ZalgoPromise<*>,
    ack? : ?boolean,
    cancelled? : ?boolean
|};

export function addResponseListener(hash : string, listener : ResponseListenerType) {
    const responseListeners = globalStore('responseListeners');
    responseListeners.set(hash, listener);
}

export function getResponseListener(hash : string) : ?ResponseListenerType {
    const responseListeners = globalStore('responseListeners');
    return responseListeners.get(hash);
}

export function deleteResponseListener(hash : string) {
    const responseListeners = globalStore('responseListeners');
    responseListeners.del(hash);
}

export function cancelResponseListeners() {
    const responseListeners = globalStore('responseListeners');
    for (const hash of responseListeners.keys()) {
        const listener = responseListeners.get(hash);
        if (listener) {
            listener.cancelled = true;
        }
        responseListeners.del(hash);
    }
}

export function markResponseListenerErrored(hash : string) {
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    erroredResponseListeners.set(hash, true);
}

export function isResponseListenerErrored(hash : string) : boolean {
    const erroredResponseListeners = globalStore('erroredResponseListeners');
    return erroredResponseListeners.has(hash);
}

export function getRequestListener({ name, win, domain } : {| name : string, win : ?(CrossDomainWindowType | WildCard), domain : ?(string | RegExp) |}) : ?RequestListenerType {
    const requestListeners = windowStore('requestListeners');

    if (win === WILDCARD) {
        win = null;
    }

    if (domain === WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error(`Name required to get request listener`);
    }

    for (const winQualifier of [ win, getWildcard() ]) {
        if (!winQualifier) {
            continue;
        }

        const nameListeners = requestListeners.get(winQualifier);

        if (!nameListeners) {
            continue;
        }

        const domainListeners = nameListeners[name];

        if (!domainListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (domainListeners[domain]) {
                return domainListeners[domain];
            }

            if (domainListeners[__DOMAIN_REGEX__]) {
                for (const { regex, listener } of domainListeners[__DOMAIN_REGEX__]) {
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

export function addRequestListener({ name, win, domain } : {| name : string, win : ?(CrossDomainWindowType | WildCard), domain : ?DomainMatcher |}, listener : RequestListenerType) : {| cancel : () => void |} {
    const requestListeners = windowStore('requestListeners');

    if (!name || typeof name !== 'string') {
        throw new Error(`Name required to add request listener`);
    }

    if (Array.isArray(win)) {
        const listenersCollection = [];

        for (const item of win) {
            listenersCollection.push(addRequestListener({ name, domain, win: item }, listener));
        }

        return {
            cancel() {
                for (const cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        const listenersCollection = [];

        for (const item of domain) {
            listenersCollection.push(addRequestListener({ name, win, domain: item }, listener));
        }

        return {
            cancel() {
                for (const cancelListener of listenersCollection) {
                    cancelListener.cancel();
                }
            }
        };
    }

    const existingListener = getRequestListener({ name, win, domain });

    if (!win || win === WILDCARD) {
        win = getWildcard();
    }

    domain = domain || WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error(`Request listener already exists for ${ name } on domain ${ domain.toString() } for ${ win === getWildcard() ? 'wildcard' : 'specified' } window`);
        } else if (win) {
            throw new Error(`Request listener already exists for ${ name } for ${ win === getWildcard() ? 'wildcard' : 'specified' } window`);
        } else if (domain) {
            throw new Error(`Request listener already exists for ${ name } on domain ${ domain.toString() }`);
        } else {
            throw new Error(`Request listener already exists for ${ name }`);
        }
    }

    const nameListeners = requestListeners.getOrSet(win, () => ({}));
    const domainListeners = getOrSet(nameListeners, name, () => ({}));

    const strDomain = domain.toString();

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
                delete nameListeners[name];
            }

            if (win && !Object.keys(nameListeners).length) {
                requestListeners.del(win);
            }
        }
    };
}
