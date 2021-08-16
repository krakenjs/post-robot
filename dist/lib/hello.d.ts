import type { CrossDomainWindowType } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import type { OnType, SendType, CancelableType } from '../types';
export declare function sayHello(win: CrossDomainWindowType, { send }: {
    send: SendType;
}): ZalgoPromise<{
    win: CrossDomainWindowType;
    domain: string;
    instanceID: string;
}>;
export declare function getWindowInstanceID(win: CrossDomainWindowType, { send }: {
    send: SendType;
}): ZalgoPromise<string>;
export declare function initHello({ on, send }: {
    on: OnType;
    send: SendType;
}): CancelableType;
export declare function awaitWindowHello(win: CrossDomainWindowType, timeout?: number, name?: string): ZalgoPromise<{
    domain: string;
}>;
