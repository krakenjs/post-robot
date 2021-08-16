import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import type { CustomSerializedType, Thenable } from 'universal-serialize';
import { SERIALIZATION_TYPE } from '../conf';
import type { OnType, SendType } from '../types';
import type { SerializedFunction } from './function';
import { ProxyWindow } from './window';
export declare type SerializedPromise = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then: SerializedFunction;
}>;
export declare function serializePromise(destination: CrossDomainWindowType | ProxyWindow, domain: DomainMatcher, val: Thenable, key: string, { on, send }: {
    on: OnType;
    send: SendType;
}): SerializedPromise;
export declare function deserializePromise<T>(source: CrossDomainWindowType | ProxyWindow, origin: string, { then }: {
    then: (...args: Array<any>) => any;
}): ZalgoPromise<T>;
