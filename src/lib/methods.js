
import { CONSTANTS } from '../conf';
import { util } from './util';
import { on, send } from '../interface';

let methods = {};

export let listenForMethods = util.once(function listenForMethods() {
    on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, function(source, data) {

        if (!methods[data.id]) {
            throw new Error(`Could not find method with id: ${data.id}`);
        }

        if (methods[data.id].win !== source) {
            throw new Error(`Method window does not match`);
        }

        return methods[data.id].method.apply(null, data.args);
    });
});

function isSerializedMethod(item) {
    return item instanceof Object && item.__type__ === CONSTANTS.SERIALIZATION_TYPES.METHOD && item.__id__
}

export function serializeMethods(destination, obj) {

    listenForMethods();

    return util.replaceObject(obj, item => {
        if (item instanceof Function) {
            return serializeMethod(destination, item);
        } else if (isSerializedMethod(item)) {
            throw new Error(`Attempting to serialize already serialized method`);
        }
    });
}

export function deserializeMethods(source, obj) {

    return util.replaceObject(obj, item => {
        if (isSerializedMethod(item)) {
            return deserializeMethod(source, item);
        }
    });
}

export function serializeMethod(destination, method) {

    let id = util.uniqueID();

    methods[id] = {
        win: destination,
        method: method
    };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id
    }
}

export function deserializeMethod(source, obj) {

    return function() {
        let args = Array.prototype.slice.call(arguments);
        return send(source, CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id: obj.__id__,
            args
        });
    }
}