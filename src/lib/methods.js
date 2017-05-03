
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { CONSTANTS } from '../conf';
import { once, uniqueID, replaceObject } from './util';
import { matchDomain } from './domain';
import { on, send } from '../interface';
import { log } from './log';
import { promise } from './promise';
import { global } from '../global';

global.methods = global.methods || new WeakMap();

export let listenForMethods = once(() => {
    on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, { window: CONSTANTS.WILDCARD, origin: CONSTANTS.WILDCARD }, ({ source, origin, data }) => {

        let methods = global.methods.get(source);

        if (!methods) {
            throw new Error(`Could not find any methods this window has privileges to call`);
        }

        let meth = methods[data.id];

        if (!meth) {
            throw new Error(`Could not find method with id: ${data.id}`);
        }

        if (!matchDomain(meth.domain, origin)) {
            throw new Error(`Method domain ${meth.domain} does not match origin ${origin}`);
        }

        log.debug('Call local method', data.name, data.args);

        return promise.run(() => {
            return meth.method.apply({ source, origin, data }, data.args);

        }).then(result => {

            return {
                result,
                id: data.id,
                name: data.name
            };
        });
    });
});

function isSerialized(item, type) {
    return typeof item === 'object' && item !== null && item.__type__ === type;
}

export function serializeMethod(destination, domain, method, name) {

    let id = uniqueID();

    let methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain, method };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id,
        __name__: name
    };
}

function serializeError(err) {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.ERROR,
        __message__: err.stack || err.message || err.toString()
    };
}

export function serializeMethods(destination, domain, obj) {

    return replaceObject({ obj }, (item, key) => {
        if (typeof item === 'function') {
            return serializeMethod(destination, domain, item, key);
        }

        if (item instanceof Error) {
            return serializeError(item);
        }
    }).obj;
}

export function deserializeMethod(source, origin, obj) {

    function wrapper() {
        let args = Array.prototype.slice.call(arguments);
        log.debug('Call foreign method', obj.__name__, args);
        return send(source, CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id: obj.__id__,
            name: obj.__name__,
            args

        }, { domain: origin, timeout: Infinity }).then(({ data }) => {

            log.debug('Got foreign method result', obj.__name__, data.result);
            return data.result;
        }, err => {
            log.debug('Got foreign method error', err.stack || err.toString());
            throw err;
        });
    }

    wrapper.__name__ = obj.__name__;
    wrapper.__xdomain__ = true;

    wrapper.source = source;
    wrapper.origin = origin;

    return wrapper;
}

export function deserializeError(source, origin, obj) {
    return new Error(obj.__message__);
}

export function deserializeMethods(source, origin, obj) {

    return replaceObject({ obj }, (item, key) => {

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
            return deserializeMethod(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
            return deserializeError(source, origin, item);
        }

    }).obj;
}
