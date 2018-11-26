import 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { serializeType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';

import { serializeFunction } from './function';
import { ProxyWindow } from './window';

export function serializePromise(destination, domain, val, key) {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
        then: serializeFunction(destination, domain, function (resolve, reject) {
            return val.then(resolve, reject);
        }, key)
    });
}

export function deserializePromise(source, origin, _ref) {
    var then = _ref.then;

    return new ZalgoPromise(then);
}