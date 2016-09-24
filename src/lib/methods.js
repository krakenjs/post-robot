
import { CONSTANTS } from '../conf';
import { util } from './util';
import { on, send } from '../interface';
import { log } from './log';
import { promise } from './promise';
import { global } from '../global';

global.methods = global.methods || {};

export let listenForMethods = util.once(() => {
    on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, ({ source, origin, data }) => {

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
            return meth.method.apply(null, data.args);

        }).then(result => {

            return {
                result,
                id: data.id,
                name: data.name
            };
        });
    });
});

function isSerializedMethod(item) {
    return item instanceof Object && item.__type__ === CONSTANTS.SERIALIZATION_TYPES.METHOD && item.__id__;
}

export function serializeMethod(destination, domain, method, name) {

    let id = util.uniqueID();

    global.methods[id] = {
        destination,
        domain,
        method
    };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id,
        __name__: name
    };
}

export function serializeMethods(destination, domain, obj) {

    return util.replaceObject({ obj }, (item, key) => {
        if (item instanceof Function) {
            return serializeMethod(destination, domain, item, key);
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
        });
    }

    wrapper.__name__ = obj.__name__;

    return wrapper;
}

export function deserializeMethods(source, origin, obj) {

    return util.replaceObject({ obj }, (item, key) => {
        if (isSerializedMethod(item)) {
            return deserializeMethod(source, origin, item);
        }
    }).obj;
}
