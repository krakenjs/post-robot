import type { OnType, SendType, ReceiveMessageType } from '../types';
export declare function setupBridge({ on, send, receiveMessage }: {
    on: OnType;
    send: SendType;
    receiveMessage: ReceiveMessageType;
}): void;
