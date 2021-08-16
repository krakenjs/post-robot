import { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType } from 'cross-domain-utils';
import type { OnType, SendType, ReceiveMessageType } from '../types';
declare type WinDetails = {
    win: CrossDomainWindowType;
    domain?: string | null | undefined;
    name?: string | null | undefined;
};
export declare function listenForOpenTunnel({ on, send, receiveMessage }: {
    on: OnType;
    send: SendType;
    receiveMessage: ReceiveMessageType;
}): void;
export declare function hasBridge(url: string, domain: string): boolean;
export declare function openBridge(url: string, domain: string): ZalgoPromise<CrossDomainWindowType>;
export declare function linkWindow({ win, name, domain }: WinDetails): WinDetails;
export declare function linkUrl(win: CrossDomainWindowType, url: string): void;
export declare function listenForWindowOpen(): void;
export declare function destroyBridges(): void;
export {};
