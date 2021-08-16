import { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType } from 'cross-domain-utils';
import type { Message } from '../types';
import type { OnType, SendType } from '../../types';
export declare function sendMessage(win: CrossDomainWindowType, domain: string, message: Message, { on, send }: {
    on: OnType;
    send: SendType;
}): ZalgoPromise<void>;
