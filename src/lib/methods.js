
import { CONSTANTS } from '../conf';
import { util } from './util';
import { on, send } from '../interface';
import { log } from './log';
import { promise } from './promise';

let methods = {};

export let listenForMethods = util.once(() => {
    on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, (source, data) => {

        if (!methods[data.id]) {
            throw new Error(`Could not find method with id: ${data.id}`);
        }

        if (methods[data.id].win !== source) {
            throw new Error('Method window does not match');
        }

        let method = methods[data.id].method;

        log.debug('Call local method', data.name, data.args);

        return promise.run(() => {
            return method.apply(null, data.args);

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

export function serializeMethod(destination, method, name) {

    let id = util.uniqueID();

    methods[id] = {
        win: destination,
        method
    };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id,
        __name__: name
    };
}

export function serializeMethods(destination, obj) {

    listenForMethods();

    return util.replaceObject({ obj }, (item, key) => {
        if (item instanceof Function) {
            return serializeMethod(destination, item, key);
        }
    }).obj;
}

export function deserializeMethod(source, obj) {

    function wrapper() {
        let args = Array.prototype.slice.call(arguments);
        log.debug('Call foreign method', obj.__name__, args);
        return send(source, CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id: obj.__id__,
            name: obj.__name__,
            args

        }).then(data => {

            log.debug('Got foreign method result', obj.__name__, data.result);
            return data.result;
        });
    }

    wrapper.__name__ = obj.__name__;

    return wrapper;
}

export function deserializeMethods(source, obj) {

    return util.replaceObject({ obj }, (item, key) => {
        if (isSerializedMethod(item)) {
            return deserializeMethod(source, item);
        }
    }).obj;
}
