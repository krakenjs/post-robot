/* @flow */

import { type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getOrSet, getCurrentScriptUID } from 'belter/src';

export function getGlobalKey() : string {
    if (__POST_ROBOT__.__SCRIPT_NAMESPACE__) {
        return `${ __POST_ROBOT__.__GLOBAL_KEY__ }_${ getCurrentScriptUID() }`;
    } else {
        return __POST_ROBOT__.__GLOBAL_KEY__;
    }
}

export function getGlobal(win : SameDomainWindowType = window) : Object {
    const globalKey = getGlobalKey();

    if (win !== window) {
        return win[globalKey];
    }
    const global : Object = win[globalKey] = win[globalKey] || {};
    return global;
}

export function deleteGlobal() {
    const globalKey = getGlobalKey();
    delete window[globalKey];
}

type ObjectGetter = () => Object;
const getObj : ObjectGetter = () => ({});

type GetOrSet<T> = ((string, () => T) => T) & ((string, () => void) => void);

type GlobalStore<T> = {|
    get : ((string, T) => T) & ((string, void) => T | void),
    set : (string, T) => T,
    has : (string) => boolean,
    del : (string) => void,
    getOrSet : GetOrSet<T>,
    reset : () => void,
    keys : () => $ReadOnlyArray<string>
|};

export function globalStore<T : mixed>(key? : string = 'store', defStore? : ObjectGetter = getObj) : GlobalStore<T> {
    return getOrSet(getGlobal(), key, () => {
        let store = defStore();

        return {
            has: (storeKey) => {
                return store.hasOwnProperty(storeKey);
            },
            get: (storeKey, defVal) => {
                // $FlowFixMe
                return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
            },
            set: (storeKey, val) => {
                store[storeKey] = val;
                return val;
            },
            del: (storeKey) => {
                delete store[storeKey];
            },
            getOrSet: (storeKey, getter) => {
                // $FlowFixMe
                return getOrSet(store, storeKey, getter);
            },
            reset: () => {
                store = defStore();
            },
            keys: () => {
                return Object.keys(store);
            }
        };
    });
}

export class WildCard {}

export function getWildcard() : WildCard {
    const global = getGlobal();
    global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard();
    return global.WINDOW_WILDCARD;
}

type WindowStore<T> = {|
    get : ((CrossDomainWindowType | WildCard, T) => T) & ((CrossDomainWindowType | WildCard, void) => T | void),
    set : (CrossDomainWindowType | WildCard, T) => T,
    has : (CrossDomainWindowType | WildCard) => boolean,
    del : (CrossDomainWindowType | WildCard) => void,
    getOrSet : (CrossDomainWindowType | WildCard, () => T) => T
|};

export function windowStore<T>(key? : string = 'store', defStore? : ObjectGetter = getObj) : WindowStore<T> {
    return globalStore('windowStore').getOrSet(key, () => {
        const winStore = new WeakMap();

        const getStore = (win : CrossDomainWindowType | WildCard) : ObjectGetter => {
            return winStore.getOrSet(win, defStore);
        };
    
        return {
            has: (win) => {
                const store = getStore(win);
                return store.hasOwnProperty(key);
            },
            get: (win, defVal) => {
                const store = getStore(win);
                // $FlowFixMe
                return store.hasOwnProperty(key) ? store[key] : defVal;
            },
            set: (win, val) => {
                const store = getStore(win);
                store[key] = val;
                return val;
            },
            del: (win) => {
                const store = getStore(win);
                delete store[key];
            },
            getOrSet: (win, getter) => {
                const store = getStore(win);
                return getOrSet(store, key, getter);
            }
        };
    });
}
