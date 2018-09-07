/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS } from '../conf';
import { global } from '../global';

import { once, uniqueID, replaceObject, stringifyError, isRegex } from './util';

global.methods = global.methods || new WeakMap();

export let listenForMethods = once(() => {
    global.on(CONSTANTS.POST_MESSAGE_NAMES.METHOD, { origin: CONSTANTS.WILDCARD }, ({ source, origin, data } : { source : CrossDomainWindowType, origin : string, data : Object }) => {

        let methods = global.methods.get(source);

        if (!methods) {
            throw new Error(`Could not find any methods this window has privileges to call`);
        }

        let meth = methods[data.id];

        if (!meth) {
            throw new Error(`Could not find method with id: ${ data.id }`);
        }

        if (!matchDomain(meth.domain, origin)) {
            throw new Error(`Method domain ${ meth.domain } does not match origin ${ origin }`);
        }

        return ZalgoPromise.try(() => {
            return meth.method.apply({ source, origin, data }, data.args);

        }).then(result => {

            return {
                result,
                id:   data.id,
                name: data.name
            };
        });
    });
});

function isSerialized(item : mixed, type : string) : boolean {
    return typeof item === 'object' && item !== null && item.__type__ === type;
}

type SerializedMethod = {
    __type__ : string,
    __id__ : string,
    __name__ : string
};

export function serializeMethod(destination : CrossDomainWindowType, domain : string | Array<string>, method : Function, name : string) : SerializedMethod {

    let id = uniqueID();

    let methods = global.methods.get(destination);

    if (!methods) {
        methods = {};
        global.methods.set(destination, methods);
    }

    methods[id] = { domain, method };

    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__:   id,
        __name__: name
    };
}

type SerializedError = {
    __type__ : string,
    __message__ : string
};

function serializeError(err : mixed) : SerializedError {
    return {
        __type__:    CONSTANTS.SERIALIZATION_TYPES.ERROR,
        __message__: stringifyError(err),
        // $FlowFixMe
        __code__:    err.code
    };
}

type SerializePromise = {
    __type__ : string,
    __then__ : SerializedMethod
};

function serializePromise(destination : CrossDomainWindowType, domain : string | Array<string>, promise : ZalgoPromise<mixed>, name : string) : SerializePromise {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.PROMISE,
        __then__: serializeMethod(destination, domain, (resolve, reject) => promise.then(resolve, reject), `${ name }.then`)
    };
}

function serializeZalgoPromise(destination : CrossDomainWindowType, domain : string | Array<string>, promise : ZalgoPromise<mixed>, name : string) : SerializePromise {
    return {
        __type__: CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
        __then__: serializeMethod(destination, domain, (resolve, reject) => promise.then(resolve, reject), `${ name }.then`)
    };
}

type SerializedRegex = {
    __type__ : string,
    __source__ : string
};

function serializeRegex(regex : RegExp) : SerializedRegex {
    return {
        __type__:   CONSTANTS.SERIALIZATION_TYPES.REGEX,
        __source__: regex.source
    };
}

export function serializeMethods(destination : CrossDomainWindowType, domain : string | Array<string>, obj : Object) : Object {

    return replaceObject({ obj }, (item, key) => {
        if (typeof item === 'function') {
            return serializeMethod(destination, domain, item, key.toString());
        }

        if (item instanceof Error) {
            return serializeError(item);
        }

        if (window.Promise && item instanceof window.Promise) {
            return serializePromise(destination, domain, item, key.toString());
        }

        if (ZalgoPromise.isPromise(item)) {
            // $FlowFixMe
            return serializeZalgoPromise(destination, domain, item, key.toString());
        }

        if (isRegex(item)) {
            // $FlowFixMe
            return serializeRegex(item);
        }
    }).obj;
}

export function deserializeMethod(source : CrossDomainWindowType, origin : string, obj : Object) : Function {

    function wrapper() : ZalgoPromise<mixed> {
        let args = Array.prototype.slice.call(arguments);
        return global.send(source, CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id:   obj.__id__,
            name: obj.__name__,
            args

        }, { domain: origin, timeout: -1 }).then(({ data }) => {
            return data.result;
        }, err => {
            throw err;
        });
    }

    wrapper.__name__ = obj.__name__;
    wrapper.__xdomain__ = true;

    wrapper.source = source;
    wrapper.origin = origin;

    return wrapper;
}

export function deserializeError(source : CrossDomainWindowType, origin : string, obj : Object) : Error {
    let err = new Error(obj.__message__);
    if (obj.__code__) {
        // $FlowFixMe
        err.code = obj.__code__;
    }
    return err;
}

export function deserializeZalgoPromise(source : CrossDomainWindowType, origin : string, prom : Object) : ZalgoPromise<mixed> {
    return new ZalgoPromise((resolve, reject) => deserializeMethod(source, origin, prom.__then__)(resolve, reject));
}

export function deserializePromise(source : CrossDomainWindowType, origin : string, prom : Object) : ZalgoPromise<mixed> {
    if (!window.Promise) {
        return deserializeZalgoPromise(source, origin, prom);
    }

    return new window.Promise((resolve, reject) => deserializeMethod(source, origin, prom.__then__)(resolve, reject));
}

export function deserializeRegex(source : CrossDomainWindowType, origin : string, item : Object) : RegExp {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(item.__source__);
}

export function deserializeMethods(source : CrossDomainWindowType, origin : string, obj : Object) : Object {

    return replaceObject({ obj }, (item) => {
        if (typeof item !== 'object' || item === null) {
            return;
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
            return deserializeMethod(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
            return deserializeError(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.PROMISE)) {
            return deserializePromise(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE)) {
            return deserializeZalgoPromise(source, origin, item);
        }

        if (isSerialized(item, CONSTANTS.SERIALIZATION_TYPES.REGEX)) {
            return deserializeRegex(source, origin, item);
        }

    }).obj;
}
