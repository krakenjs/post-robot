import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils';
import { ZalgoPromise } from 'zalgo-promise';
import type { CustomSerializedType } from 'universal-serialize';
import { SERIALIZATION_TYPE } from '../conf';
import type { OnType, SendType } from '../types';
import { ProxyWindow } from './window';
export declare type SerializedFunction = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
    id: string;
    name: string;
}>;
declare type SerializableFunction<T> = {
    (): ZalgoPromise<T> | T;
    __id__?: string;
    __name__?: string;
};
export declare function serializeFunction<T>(destination: CrossDomainWindowType | ProxyWindow, domain: DomainMatcher, val: SerializableFunction<T>, key: string, { on, send }: {
    on: OnType;
    send: SendType;
}): SerializedFunction;
export declare function deserializeFunction<T>(source: CrossDomainWindowType | ProxyWindow, origin: string, { id, name }: {
    id: string;
    name: string;
}, { send }: {
    send: SendType;
}): (...args: ReadonlyArray<unknown>) => ZalgoPromise<T>;
export {};
