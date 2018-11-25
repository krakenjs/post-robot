import { isWindow } from 'cross-domain-utils/src';
import { TYPE, serialize, deserialize } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';

import { serializeFunction, deserializeFunction } from './function';
import { serializePromise, deserializePromise } from './promise';
import { serializeWindow, deserializeWindow, ProxyWindow } from './window';

export function serializeMessage(destination, domain, obj) {
    var _serialize;

    return serialize(obj, (_serialize = {}, _serialize[TYPE.PROMISE] = function (val, key) {
        return serializePromise(destination, domain, val, key);
    }, _serialize[TYPE.FUNCTION] = function (val, key) {
        return serializeFunction(destination, domain, val, key);
    }, _serialize[TYPE.OBJECT] = function (val) {
        return isWindow(val) || ProxyWindow.isProxyWindow(val) ? serializeWindow(destination, domain, val) : val;
    }, _serialize));
}

export function deserializeMessage(source, origin, message) {
    var _deserialize;

    return deserialize(message, (_deserialize = {}, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE] = function (serializedPromise) {
        return deserializePromise(source, origin, serializedPromise);
    }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION] = function (serializedFunction) {
        return deserializeFunction(source, origin, serializedFunction);
    }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW] = function (serializedWindow) {
        return deserializeWindow(source, origin, serializedWindow);
    }, _deserialize));
}