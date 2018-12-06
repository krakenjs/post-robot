/* @flow */

import { type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { serializeType, type CustomSerializedType, type Thenable } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';

import { serializeFunction, type SerializedFunction } from './function';
import { ProxyWindow } from './window';

export type SerializedPromise = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then : SerializedFunction
}>;

export function serializePromise(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, val : Thenable, key : string) : SerializedPromise {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
        then: serializeFunction(destination, domain, (resolve, reject) => val.then(resolve, reject), key)
    });
}

export function deserializePromise<T>(source : CrossDomainWindowType | ProxyWindow, origin : string, { then } : { then : Function }) : ZalgoPromise<T> {
    return new ZalgoPromise(then);
}
