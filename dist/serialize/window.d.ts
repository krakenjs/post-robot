import { $Values } from 'utility-types';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { WINDOW_TYPE } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import type { CustomSerializedType } from 'universal-serialize';
import { SERIALIZATION_TYPE, METHOD } from '../conf';
import type { SendType } from '../types';
declare type SetLocationOptions = {
    method?: $Values<typeof METHOD>;
    body?: Record<string, string | boolean>;
};
declare type SerializedWindowType = {
    id: string;
    getType: () => ZalgoPromise<$Values<typeof WINDOW_TYPE>>;
    close: () => ZalgoPromise<void>;
    focus: () => ZalgoPromise<void>;
    isClosed: () => ZalgoPromise<boolean>;
    setLocation: (url: string, opts?: SetLocationOptions) => ZalgoPromise<void>;
    getName: () => ZalgoPromise<string | null | undefined>;
    setName: (arg0: string) => ZalgoPromise<void>;
    getInstanceID: () => ZalgoPromise<string>;
};
export declare class ProxyWindow {
    id?: string;
    isProxyWindow: true;
    serializedWindow: SerializedWindowType;
    actualWindow: CrossDomainWindowType | null | undefined;
    actualWindowPromise: ZalgoPromise<CrossDomainWindowType>;
    send?: SendType;
    name?: string;
    constructor({ send, win, serializedWindow }: {
        win?: CrossDomainWindowType;
        serializedWindow?: SerializedWindowType;
        send: SendType;
    });
    getID(): string;
    getType(): ZalgoPromise<$Values<typeof WINDOW_TYPE>>;
    isPopup(): ZalgoPromise<boolean>;
    setLocation(href: string, opts?: SetLocationOptions): ZalgoPromise<ProxyWindow>;
    getName(): ZalgoPromise<string | null | undefined>;
    setName(name: string): ZalgoPromise<ProxyWindow>;
    close(): ZalgoPromise<ProxyWindow>;
    focus(): ZalgoPromise<ProxyWindow>;
    isClosed(): ZalgoPromise<boolean>;
    getWindow(): CrossDomainWindowType | null | undefined;
    setWindow(win: CrossDomainWindowType, { send }: {
        send: SendType;
    }): void;
    awaitWindow(): ZalgoPromise<CrossDomainWindowType>;
    matchWindow(win: CrossDomainWindowType, { send }: {
        send: SendType;
    }): ZalgoPromise<boolean>;
    unwrap(): CrossDomainWindowType | ProxyWindow;
    getInstanceID(): ZalgoPromise<string>;
    shouldClean(): boolean;
    serialize(): SerializedWindowType;
    static unwrap(win: CrossDomainWindowType | ProxyWindow): CrossDomainWindowType | ProxyWindow;
    static serialize(win: CrossDomainWindowType | ProxyWindow, { send }: {
        send: SendType;
    }): SerializedWindowType;
    static deserialize(serializedWindow: SerializedWindowType, { send }: {
        send: SendType;
    }): ProxyWindow;
    static isProxyWindow(obj: CrossDomainWindowType | ProxyWindow): boolean;
    static toProxyWindow(win: CrossDomainWindowType | ProxyWindow, { send }: {
        send: SendType;
    }): ProxyWindow;
}
export declare type SerializedWindow = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, SerializedWindowType>;
export declare function serializeWindow(destination: CrossDomainWindowType | ProxyWindow, domain: DomainMatcher, win: CrossDomainWindowType, { send }: {
    send: SendType;
}): SerializedWindow;
export declare function deserializeWindow(source: CrossDomainWindowType | ProxyWindow, origin: string, win: SerializedWindowType, { send }: {
    send: SendType;
}): ProxyWindow;
export {};
