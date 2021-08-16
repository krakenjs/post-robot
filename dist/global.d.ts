import type { CrossDomainWindowType, SameDomainWindowType } from 'cross-domain-utils';
export declare function getGlobalKey(): string;
export declare function getGlobal(win?: SameDomainWindowType): Record<string, any>;
export declare function deleteGlobal(): void;
declare type ObjectGetter = () => Record<string, any>;
declare type GetOrSet<T> = ((arg0: string, arg1: () => T) => T) & ((arg0: string, arg1: () => void) => void);
declare type GlobalStore<T> = {
    get: ((arg0: string, arg1: T) => T) & ((arg0: string, arg1: void) => T | void);
    set: (arg0: string, arg1: T) => T;
    has: (arg0: string) => boolean;
    del: (arg0: string) => void;
    getOrSet: GetOrSet<T>;
    reset: () => void;
    keys: () => ReadonlyArray<string>;
};
export declare function globalStore<T extends unknown>(key?: string, defStore?: ObjectGetter): GlobalStore<T>;
export declare class WildCard {
}
export declare function getWildcard(): WildCard;
declare type WindowStore<T> = {
    get: ((arg0: CrossDomainWindowType | WildCard, arg1: T) => T) & ((arg0: CrossDomainWindowType | WildCard, arg1: void) => T | void);
    set: (arg0: CrossDomainWindowType | WildCard, arg1: T) => T;
    has: (arg0: CrossDomainWindowType | WildCard) => boolean;
    del: (arg0: CrossDomainWindowType | WildCard) => void;
    getOrSet: (arg0: CrossDomainWindowType | WildCard, arg1: () => T) => T;
};
export declare function windowStore<T>(key?: string, defStore?: ObjectGetter): WindowStore<T>;
export {};
