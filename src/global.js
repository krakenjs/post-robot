/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getOrSet } from 'belter/src';

import { WINDOW_PROP } from './conf';

export let global : Object = window[WINDOW_PROP.POSTROBOT] = window[WINDOW_PROP.POSTROBOT] || {};
let winStore = global.windowStore = global.windowStore || new WeakMap();

type WindowStore<T> = {
    get : ((CrossDomainWindowType, T) => T) & ((CrossDomainWindowType, void) => T | void),
    set : (CrossDomainWindowType, T) => T,
    has : (CrossDomainWindowType) => boolean,
    del : (CrossDomainWindowType) => void,
    getOrSet : (CrossDomainWindowType, () => T) => T
};

type ObjectGetter = () => Object;

let getObj : ObjectGetter = () => ({});

// $FlowFixMe
export function windowStore<T>(key : string, defStore? : ObjectGetter = getObj) : WindowStore<T> {

    function getStore(win : CrossDomainWindowType) : ObjectGetter {
        return winStore.getOrSet(win, defStore);
    }

    return {
        has: (win) => {
            let store = getStore(win);
            return store.hasOwnProperty(key);
        },
        get: (win, defVal) => {
            let store = getStore(win);
            // $FlowFixMe
            return store.hasOwnProperty(key) ? store[key] : defVal;
        },
        set: (win, val) => {
            let store = getStore(win);
            store[key] = val;
            return val;
        },
        del: (win) => {
            let store = getStore(win);
            delete store[key];
        },
        getOrSet: (win, getter) => {
            let store = getStore(win);
            if (store.hasOwnProperty(key)) {
                return store[key];
            }
            let val = getter();
            store[key] = val;
            return val;
        }
    };
}

type GlobalGetter<T> = ((string, T) => T) & ((string, void) => T | void);

type GlobalStore<T> = {
    get : GlobalGetter<T>,
    set : (string, T) => T,
    has : (string) => boolean,
    del : (string) => void,
    getOrSet : (string, () => T) => T,
    reset : () => void,
    keys : () => $ReadOnlyArray<string>
};

// $FlowFixMe
export function globalStore<T : mixed>(key : string, defStore? : ObjectGetter = getObj) : GlobalStore<T> {
    let store = getOrSet(global, key, defStore);

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
            if (store.hasOwnProperty(storeKey)) {
                return store[storeKey];
            }
            let val = getter();
            store[storeKey] = val;
            return val;
        },
        reset: () => {
            store = defStore();
        },
        keys: () => {
            return Object.keys(store);
        }
    };
}
