import 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { getOrSet } from 'belter/src';

import { WINDOW_PROP } from './conf';

export var global = window[WINDOW_PROP.POSTROBOT] = window[WINDOW_PROP.POSTROBOT] || {};
var winStore = global.windowStore = global.windowStore || new WeakMap();

var getObj = function getObj() {
    return {};
};

// $FlowFixMe
export function windowStore(key) {
    var defStore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getObj;


    function getStore(win) {
        return winStore.getOrSet(win, defStore);
    }

    return {
        has: function has(win) {
            var store = getStore(win);
            return store.hasOwnProperty(key);
        },
        get: function get(win, defVal) {
            var store = getStore(win);
            // $FlowFixMe
            return store.hasOwnProperty(key) ? store[key] : defVal;
        },
        set: function set(win, val) {
            var store = getStore(win);
            store[key] = val;
            return val;
        },
        del: function del(win) {
            var store = getStore(win);
            delete store[key];
        },
        getOrSet: function getOrSet(win, getter) {
            var store = getStore(win);
            if (store.hasOwnProperty(key)) {
                return store[key];
            }
            var val = getter();
            store[key] = val;
            return val;
        }
    };
}

// $FlowFixMe
export function globalStore(key) {
    var defStore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getObj;

    var store = getOrSet(global, key, defStore);

    return {
        has: function has(storeKey) {
            return store.hasOwnProperty(storeKey);
        },
        get: function get(storeKey, defVal) {
            // $FlowFixMe
            return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
        },
        set: function set(storeKey, val) {
            store[storeKey] = val;
            return val;
        },
        del: function del(storeKey) {
            delete store[storeKey];
        },
        getOrSet: function getOrSet(storeKey, getter) {
            if (store.hasOwnProperty(storeKey)) {
                return store[storeKey];
            }
            var val = getter();
            store[storeKey] = val;
            return val;
        },
        reset: function reset() {
            store = defStore();
        },
        keys: function keys() {
            return Object.keys(store);
        }
    };
}