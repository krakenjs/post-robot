/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { serializeType, type CustomSerializedType, type Thenable } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';

import { serializeFunction, type SerializedFunction } from './function';

export type SerializedPromise = CustomSerializedType<typeof SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then : SerializedFunction
}>;

export function serializePromise(destination : CrossDomainWindowType, domain : string | Array<string>, val : Thenable, key : string) : SerializedPromise {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
        then: serializeFunction(destination, domain, (resolve, reject) => val.then(resolve, reject), key)
    });
}

export function deserializePromise<T>(source : CrossDomainWindowType, origin : string, { then } : { then : Function }) : ZalgoPromise<T> {
    return new ZalgoPromise(then);
}
