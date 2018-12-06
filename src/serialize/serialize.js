/* @flow */

import { type CrossDomainWindowType, isWindow, type DomainMatcher } from 'cross-domain-utils/src';
import { TYPE, serialize, deserialize, type Thenable } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';

import { serializeFunction, deserializeFunction, type SerializedFunction } from './function';
import { serializePromise, deserializePromise, type SerializedPromise } from './promise';
import { serializeWindow, deserializeWindow, type SerializedWindow, ProxyWindow } from './window';

export function serializeMessage<T : mixed>(destination : CrossDomainWindowType | ProxyWindow, domain : DomainMatcher, obj : T) : string {
    return serialize(obj, {
        [ TYPE.PROMISE ]:  (val : Thenable, key : string) : SerializedPromise => serializePromise(destination, domain, val, key),
        [ TYPE.FUNCTION ]: (val : Function, key : string) : SerializedFunction => serializeFunction(destination, domain, val, key),
        [ TYPE.OBJECT ]:   (val : CrossDomainWindowType) : Object | SerializedWindow => {
            return (isWindow(val) || ProxyWindow.isProxyWindow(val)) ? serializeWindow(destination, domain, val) : val;
        }
    });
}

export function deserializeMessage<T : mixed>(source : CrossDomainWindowType | ProxyWindow, origin : string, message : string) : T {
    return deserialize(message, {
        [ SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE ]: (serializedPromise)  => deserializePromise(source, origin, serializedPromise),
        [ SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION ]:      (serializedFunction) => deserializeFunction(source, origin, serializedFunction),
        [ SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW ]:        (serializedWindow)   => deserializeWindow(source, origin, serializedWindow)
    });
}
