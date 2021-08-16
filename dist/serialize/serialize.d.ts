import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import type { OnType, SendType } from '../types';
import { ProxyWindow } from './window';
export declare function serializeMessage<T extends unknown>(destination: CrossDomainWindowType | ProxyWindow, domain: DomainMatcher, obj: T, { on, send }: {
    on: OnType;
    send: SendType;
}): string;
export declare function deserializeMessage<T extends unknown>(source: CrossDomainWindowType | ProxyWindow, origin: string, message: string, { send }: {
    on: OnType;
    send: SendType;
}): T;
