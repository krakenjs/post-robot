import type { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import type { WildCard } from '../global';
export declare function resetListeners(): void;
export declare type RequestListenerType = {
    handler: (arg0: {
        source: CrossDomainWindowType;
        origin: string;
        data: unknown;
    }) => unknown | ZalgoPromise<unknown>;
    handleError: (err: unknown) => void;
    window: CrossDomainWindowType | null | undefined;
    name: string;
    domain: DomainMatcher;
};
export declare type ResponseListenerType = {
    name: string;
    win: CrossDomainWindowType;
    domain: DomainMatcher;
    promise: ZalgoPromise<any>;
    ack?: boolean | null | undefined;
    cancelled?: boolean | null | undefined;
};
export declare function addResponseListener(hash: string, listener: ResponseListenerType): void;
export declare function getResponseListener(hash: string): ResponseListenerType | null | undefined;
export declare function deleteResponseListener(hash: string): void;
export declare function cancelResponseListeners(): void;
export declare function markResponseListenerErrored(hash: string): void;
export declare function isResponseListenerErrored(hash: string): boolean;
export declare function getRequestListener({ name, win, domain }: {
    name: string;
    win: (CrossDomainWindowType | WildCard) | null | undefined;
    domain: (string | RegExp) | null | undefined;
}): RequestListenerType | null | undefined;
export declare function addRequestListener({ name, win, domain }: {
    name: string;
    win: (CrossDomainWindowType | WildCard) | null | undefined;
    domain: DomainMatcher | null | undefined;
}, listener: RequestListenerType): {
    cancel: () => void;
};
