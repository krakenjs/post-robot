import type { CrossDomainWindowType } from 'cross-domain-utils';
import type { OnType, SendType, MessageEvent, CancelableType } from '../../types';
export declare function receiveMessage(event: MessageEvent, { on, send }: {
    on: OnType;
    send: SendType;
}): void;
export declare function setupGlobalReceiveMessage({ on, send }: {
    on: OnType;
    send: SendType;
}): void;
declare type ListenerEvent = {
    source: CrossDomainWindowType;
    origin: string;
    data: string;
    sourceElement: CrossDomainWindowType;
    originalEvent?: {
        origin: string;
    };
};
export declare function messageListener(event: ListenerEvent, { on, send }: {
    on: OnType;
    send: SendType;
}): void;
export declare function listenForMessages({ on, send }: {
    on: OnType;
    send: SendType;
}): CancelableType;
export declare function stopListenForMessages(): void;
export {};
