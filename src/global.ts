import type {
    CrossDomainWindowType,
    SameDomainWindowType
} from 'cross-domain-utils';
import { WeakMap } from 'cross-domain-safe-weakmap';
import { getOrSet, getCurrentScriptUID } from 'belter';

export function getGlobalKey(): string {
    if (__POST_ROBOT__.__SCRIPT_NAMESPACE__) {
        return `${ __POST_ROBOT__.__GLOBAL_KEY__ }_${ getCurrentScriptUID() }`;
    } else {
        return __POST_ROBOT__.__GLOBAL_KEY__;
    }
}
export function getGlobal(
    win: SameDomainWindowType = window
): Record<string, any> {
    const globalKey = getGlobalKey();

    if (win !== window) {
        // @ts-ignore
        return win[globalKey];
    }

    // @ts-ignore
    const global: Record<string, any> = (win[globalKey] = win[globalKey] || {});
    return global;
}
export function deleteGlobal(): void {
    const globalKey = getGlobalKey();
    // @ts-ignore
    delete window[globalKey];
}

type ObjectGetter = () => Record<string, any>;

const getObj: ObjectGetter = () => ({});

type GetOrSet<T> = ((arg0: string, arg1: () => T) => T) &
    ((arg0: string, arg1: () => void) => void);

type GlobalStore<T> = {
    get: ((arg0: string, arg1: T) => T) &
        ((arg0: string, arg1: void) => T | void);
    set: (arg0: string, arg1: T) => T;
    has: (arg0: string) => boolean;
    del: (arg0: string) => void;
    getOrSet: GetOrSet<T>;
    reset: () => void;
    keys: () => ReadonlyArray<string>;
};
export function globalStore<T extends unknown>(
    key = 'store',
    defStore: ObjectGetter = getObj
): GlobalStore<T> {
    return getOrSet<any>(getGlobal(), key, () => {
        let store = defStore();
        return {
            has: (storeKey: string) => {
                return store.hasOwnProperty(storeKey);
            },
            get: (storeKey: string, defVal: T) => {
                return store.hasOwnProperty(storeKey)
                    ? store[storeKey]
                    : defVal;
            },
            set: (storeKey: string, val: T) => {
                store[storeKey] = val;
                return val;
            },
            del: (storeKey: string) => {
                delete store[storeKey];
            },
            getOrSet: (storeKey: string, getter: any) => {
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
export function getWildcard(): WildCard {
    const global = getGlobal();
    global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard();
    return global.WINDOW_WILDCARD;
}
type WindowStore<T> = {
    get: ((arg0: CrossDomainWindowType | WildCard, arg1: T) => T) &
        ((arg0: CrossDomainWindowType | WildCard, arg1: void) => T | void);
    set: (arg0: CrossDomainWindowType | WildCard, arg1: T) => T;
    has: (arg0: CrossDomainWindowType | WildCard) => boolean;
    del: (arg0: CrossDomainWindowType | WildCard) => void;
    getOrSet: (arg0: CrossDomainWindowType | WildCard, arg1: () => T) => T;
};
export function windowStore<T>(
    key = 'store',
    defStore: ObjectGetter = getObj
): WindowStore<T> {
    return globalStore<any>('windowStore').getOrSet(key, () => {
        const winStore = new WeakMap();

        const getStore = (
            win: CrossDomainWindowType | WildCard
        ): ReturnType<ObjectGetter> => {
            // @ts-ignore - unknown doesnt match ObjectGetter
            return winStore.getOrSet(win, defStore);
        };

        return {
            has: (win: Window) => {
                const store = getStore(win);
                return store.hasOwnProperty(key);
            },
            get: (win: Window, defVal: T) => {
                const store = getStore(win);
                // @ts-ignore
                return store.hasOwnProperty(key) ? store[key] : defVal;
            },
            set: (win: Window, val: T) => {
                const store = getStore(win);
                store[key] = val;
                return val;
            },
            del: (win: Window) => {
                const store = getStore(win);
                delete store[key];
            },
            getOrSet: (win: Window, getter: any) => {
                const store = getStore(win);
                return getOrSet(store, key, getter);
            }
        };
    });
}
