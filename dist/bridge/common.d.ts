import { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType } from 'cross-domain-utils';
export declare function needsBridgeForBrowser(): boolean;
export declare function needsBridgeForWin(win: CrossDomainWindowType): boolean;
export declare function needsBridgeForDomain(domain: string | null | undefined, win: CrossDomainWindowType | null | undefined): boolean;
export declare function needsBridge({ win, domain }: {
    win?: CrossDomainWindowType;
    domain?: string;
}): boolean;
export declare function getBridgeName(domain: string): string;
export declare function isBridge(): boolean;
export declare const documentBodyReady: ZalgoPromise<HTMLBodyElement | HTMLElement>;
export declare function registerRemoteWindow(win: CrossDomainWindowType): void;
export declare function findRemoteWindow(win: CrossDomainWindowType): ZalgoPromise<(remoteWin: CrossDomainWindowType, message: string, remoteDomain: string) => void>;
declare type SendMessageType = {
    (arg0: string): void;
    fireAndForget: (arg0: string) => void;
};
export declare function registerRemoteSendMessage(win: CrossDomainWindowType, domain: string, sendMessage: SendMessageType): void;
export declare function rejectRemoteSendMessage(win: CrossDomainWindowType, err: Error): void;
export declare function sendBridgeMessage(win: CrossDomainWindowType, domain: string, message: string): ZalgoPromise<void>;
export {};
