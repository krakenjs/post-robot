import { ZalgoPromise } from 'zalgo-promise/src';
import type { OnType, SendType, ReceiveMessageType } from '../types';
export declare function openTunnelToOpener({ on, send, receiveMessage }: {
    on: OnType;
    send: SendType;
    receiveMessage: ReceiveMessageType;
}): ZalgoPromise<void>;
