
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { global } from '../global';
import { matchDomain, isRegex } from '../lib';
import { CONSTANTS } from '../conf';

export function resetListeners() {
    global.responseListeners = {};
    global.requestListeners  = {};
}

global.responseListeners = global.responseListeners || {};
global.requestListeners  = global.requestListeners  || {};
global.WINDOW_WILDCARD   = global.WINDOW_WILDCARD   || new (function WindowWildcard() { /* pass */ });

const __DOMAIN_REGEX__ = '__domain_regex__';

export function addResponseListener(hash, listener) {
    global.responseListeners[hash] = listener;
}

export function getResponseListener(hash) {
    return global.responseListeners[hash];
}

export function deleteResponseListener(hash) {
    delete global.responseListeners[hash];
}

export function getRequestListener(qualifiers) {

    let { name, win, domain } = qualifiers;

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

        for (let domainQualifier of [ domain, CONSTANTS.WILDCARD ]) {

            if (!domainQualifier) {
                continue;
            }

            domainQualifier = domainQualifier.toString();

            if (winListeners[domainQualifier]) {
                return winListeners[domainQualifier];
            }
        }

        if (winListeners[__DOMAIN_REGEX__]) {
            for (let { regex, listener } of winListeners[__DOMAIN_REGEX__]) {
                if (matchDomain(regex, domain)) {
                    return listener;
                }
            }
        }
    }
}

export function addRequestListener(qualifiers, listener) {

    let { name, win, domain } = qualifiers;

    if (!name || typeof name !== 'string') {
        throw new Error(`Name required to add request listener`);
    }

    if (Array.isArray(win)) {
        for (let item of win) {
            addRequestListener({ name, domain, win: item }, listener);
        }
        return;
    }

    if (Array.isArray(domain)) {
        for (let item of domain) {
            addRequestListener({ name, win, domain: item }, listener);
        }
        return;
    }

    let existingListener = getRequestListener(qualifiers);

    if (!win || win === CONSTANTS.WILDCARD) {
        win = global.WINDOW_WILDCARD;
    }

    domain = domain || CONSTANTS.WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error(`Request listener already exists for ${name} on domain ${domain} for specified window`);
        } else if (win) {
            throw new Error(`Request listener already exists for ${name} for specified window`);
        } else if (domain) {
            throw new Error(`Request listener already exists for ${name} on domain ${domain}`);
        } else {
            throw new Error(`Request listener already exists for ${name}`);
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

    winListeners[strDomain] = listener;

    let regexListeners = winListeners[__DOMAIN_REGEX__];
    let regexListener;

    if (isRegex(domain)) {

        if (!regexListeners) {
            regexListeners = [];
            winListeners[__DOMAIN_REGEX__] = regexListeners;
        }

        regexListener = { regex: domain, listener };

        regexListeners.push(regexListener);
    }

    return {
        cancel() {
            delete winListeners[strDomain];

            if (Object.keys(winListeners).length === 0) {
                nameListeners.delete(win);
            }

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
            }
        }

    };
}
