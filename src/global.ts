import type {
  CrossDomainWindowType,
  SameDomainWindowType,
} from "@krakenjs/cross-domain-utils/dist/esm";
import "@krakenjs/cross-domain-utils/dist/esm";
import { WeakMap } from "@krakenjs/cross-domain-safe-weakmap/dist/esm";
import { getOrSet, getCurrentScriptUID } from "@krakenjs/belter/dist/esm";

export function getGlobalKey(): string {
  if (__POST_ROBOT__.__SCRIPT_NAMESPACE__) {
    return `${__POST_ROBOT__.__GLOBAL_KEY__}_${getCurrentScriptUID()}`;
  } else {
    return __POST_ROBOT__.__GLOBAL_KEY__;
  }
}

export function getGlobal(
  win: SameDomainWindowType = window
): Record<string, any> {
  const globalKey = getGlobalKey();

  if (win !== window) {
    // @ts-expect-error indexing dynamically in win
    return win[globalKey];
  }

  // @ts-expect-error indexing dynamically in win
  const global: Record<string, any> = (win[globalKey] = win[globalKey] || {});
  return global;
}

export function deleteGlobal() {
  const globalKey = getGlobalKey();
  // @ts-expect-error deleting dynamically in win
  delete window[globalKey];
}

type ObjectGetter = () => Record<string, any>;

const getObj: ObjectGetter = () => ({});

// This get or set is incompatible with belter so unsure what was originally intended here
// type GetOrSet<T> = ((arg0: string, arg1: () => T) => T) &
//   ((arg0: string, arg1: () => void) => void);
type GetOrSet<T> = (arg0: string, arg1: () => T) => T;

type GlobalStore<T> = {
  get: ((arg0: string, arg1: T) => T) &
    ((arg0: string, arg1: void) => T | void);
  set: (arg0: string, arg1: T) => T;
  has: (arg0: string) => boolean;
  del: (arg0: string) => void;
  getOrSet: GetOrSet<T>;
  reset: () => void;
  keys: () => readonly string[];
};

export function globalStore<T>(
  key = "store",
  defStore: ObjectGetter = getObj
): GlobalStore<T> {
  return getOrSet<Record<string, T>, GlobalStore<T>>(getGlobal(), key, () => {
    let store = defStore();
    return {
      has: (storeKey) => {
        return store.hasOwnProperty(storeKey);
      },
      get: (storeKey, defVal) => {
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
        return getOrSet(store, storeKey, getter);
      },
      reset: () => {
        store = defStore();
      },
      keys: () => {
        return Object.keys(store);
      },
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WildCard {}
export function getWildcard(): WildCard {
  const global = getGlobal();
  global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard();
  return global.WINDOW_WILDCARD;
}

type WindowStore<T> = {
  get: ((arg0: CrossDomainWindowType, arg1: T) => T) &
    ((arg0: CrossDomainWindowType, arg1: void) => T | void);
  set: (arg0: CrossDomainWindowType, arg1: T) => T;
  has: (arg0: CrossDomainWindowType) => boolean;
  del: (arg0: CrossDomainWindowType) => void;
  getOrSet: (arg0: CrossDomainWindowType, arg1: () => T) => T;
};

export function windowStore<T>(
  key = "store",
  defStore: ObjectGetter = getObj
): WindowStore<T> {
  return globalStore("windowStore").getOrSet(key, () => {
    const winStore = new WeakMap();

    const getStore = (win: CrossDomainWindowType | WildCard): ObjectGetter => {
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
      },
    };
  });
}
