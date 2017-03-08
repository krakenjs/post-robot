
import { CONSTANTS } from '../conf';
import { util } from './util';
import { on, send } from '../interface';
import { log } from './log';
import { promise } from './promise';
import { global } from '../global';

global.methods = global.methods || {};

export let listenForMethods = util.once(() => {
    on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, { window: '*', origin: '*' }, ({ source, origin, data }) => {

        let meth = global.methods[data.id];

        if (!meth) {
            throw new Error(`Could not find method with id: ${data.id}`);
        }

        if (meth.destination !== source) {
            throw new Error(`Method window does not match`);
        }

        if (meth.domain && meth.domain !== '*' && origin !== meth.domain) {
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

    let id = util.uniqueID();

    global.clean.setItem(global.methods, id, { destination, domain, method });

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

    return util.replaceObject({ obj }, (item, key) => {
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

        }, { domain: origin }).then(({ data }) => {

            log.debug('Got foreign method result', obj.__name__, data.result);
            return data.result;
        }, err => {
            log.debug('Got foreign method error', err.stack || err.toString());
            throw err;
        });
    }

    wrapper.__name__ = obj.__name__;
    wrapper.source = source;
    wrapper.origin = origin;

    return wrapper;
}

export function deserializeError(source, origin, obj) {
    return new Error(obj.__message__);
}

export function deserializeMethods(source, origin, obj) {

    return util.replaceObject({ obj }, (item, key) => {

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
            return deserializeMethod(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
            return deserializeError(source, origin, item);
        }

    }).obj;
}
