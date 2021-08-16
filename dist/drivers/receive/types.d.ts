import { ZalgoPromise } from 'zalgo-promise';
import type { CrossDomainWindowType } from 'cross-domain-utils';
import type { RequestMessage, AckResponseMessage, ResponseMessage } from '../types';
import type { OnType, SendType } from '../../types';
export declare function handleRequest(source: CrossDomainWindowType, origin: string, message: RequestMessage, { on, send }: {
    on: OnType;
    send: SendType;
}): ZalgoPromise<void>;
export declare function handleAck(source: CrossDomainWindowType, origin: string, message: AckResponseMessage): void;
export declare function handleResponse(source: CrossDomainWindowType, origin: string, message: ResponseMessage): void | ZalgoPromise<void>;
