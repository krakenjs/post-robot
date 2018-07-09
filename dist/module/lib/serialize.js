'use strict';

exports.__esModule = true;
exports.listenForMethods = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.serializeMethod = serializeMethod;
exports.serializeMethods = serializeMethods;
exports.deserializeMethod = deserializeMethod;
exports.deserializeError = deserializeError;
exports.deserializeZalgoPromise = deserializeZalgoPromise;
exports.deserializePromise = deserializePromise;
exports.deserializeRegex = deserializeRegex;
exports.deserializeMethods = deserializeMethods;

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('cross-domain-utils/src');

var _src3 = require('zalgo-promise/src');

var _conf = require('../conf');

var _global = require('../global');

var _util = require('./util');

var _log = require('./log');

_global.global.methods = _global.global.methods || new _src.WeakMap();

var listenForMethods = exports.listenForMethods = (0, _util.once)(function () {
    _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, { origin: _conf.CONSTANTS.WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin,
            data = _ref.data;


        var methods = _global.global.methods.get(source);

        if (!methods) {
            throw new Error('Could not find any methods this window has privileges to call');
        }

        var meth = methods[data.id];

        if (!meth) {
            throw new Error('Could not find method with id: ' + data.id);
        }

        if (!(0, _src2.matchDomain)(meth.domain, origin)) {
            throw new Error('Method domain ' + meth.domain + ' does not match origin ' + origin);
        }

        _log.log.debug('Call local method', data.name, data.args);

        return _src3.ZalgoPromise['try'](function () {
            return meth.method.apply({ source: source, origin: origin, data: data }, data.args);
        }).then(function (result) {

            return {
                result: result,
                id: data.id,
                name: data.name
            };
        });
    });
});

function isSerialized(item, type) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null && item.__type__ === type;
}

function serializeMethod(destination, domain, method, name) {

    var id = (0, _util.uniqueID)();

    var methods = _global.global.methods.get(destination);

    if (!methods) {
        methods = {};
        _global.global.methods.set(destination, methods);
    }

    methods[id] = { domain: domain, method: method };

    return {
        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
        __id__: id,
        __name__: name
    };
}

function serializeError(err) {
    return {
        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
        __message__: (0, _util.stringifyError)(err),
        // $FlowFixMe
        __code__: err.code
    };
}

function serializePromise(destination, domain, promise, name) {
    return {
        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE,
        __then__: serializeMethod(destination, domain, function (resolve, reject) {
            return promise.then(resolve, reject);
        }, name + '.then')
    };
}

function serializeZalgoPromise(destination, domain, promise, name) {
    return {
        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
        __then__: serializeMethod(destination, domain, function (resolve, reject) {
            return promise.then(resolve, reject);
        }, name + '.then')
    };
}

function serializeRegex(regex) {
    return {
        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX,
        __source__: regex.source
    };
}

function serializeMethods(destination, domain, obj) {

    return (0, _util.replaceObject)({ obj: obj }, function (item, key) {
        if (typeof item === 'function') {
            return serializeMethod(destination, domain, item, key.toString());
        }

        if (item instanceof Error) {
            return serializeError(item);
        }

        if (window.Promise && item instanceof window.Promise) {
            return serializePromise(destination, domain, item, key.toString());
        }

        if (_src3.ZalgoPromise.isPromise(item)) {
            // $FlowFixMe
            return serializeZalgoPromise(destination, domain, item, key.toString());
        }

        if ((0, _util.isRegex)(item)) {
            // $FlowFixMe
            return serializeRegex(item);
        }
    }).obj;
}

function deserializeMethod(source, origin, obj) {

    function wrapper() {
        var args = Array.prototype.slice.call(arguments);
        _log.log.debug('Call foreign method', obj.__name__, args);
        return _global.global.send(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
            id: obj.__id__,
            name: obj.__name__,
            args: args

        }, { domain: origin, timeout: -1 }).then(function (_ref2) {
            var data = _ref2.data;


            _log.log.debug('Got foreign method result', obj.__name__, data.result);
            return data.result;
        }, function (err) {
            _log.log.debug('Got foreign method error', (0, _util.stringifyError)(err));
            throw err;
        });
    }

    wrapper.__name__ = obj.__name__;
    wrapper.__xdomain__ = true;

    wrapper.source = source;
    wrapper.origin = origin;

    return wrapper;
}

function deserializeError(source, origin, obj) {
    var err = new Error(obj.__message__);
    if (obj.__code__) {
        // $FlowFixMe
        err.code = obj.__code__;
    }
    return err;
}

function deserializeZalgoPromise(source, origin, prom) {
    return new _src3.ZalgoPromise(function (resolve, reject) {
        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
    });
}

function deserializePromise(source, origin, prom) {
    if (!window.Promise) {
        return deserializeZalgoPromise(source, origin, prom);
    }

    return new window.Promise(function (resolve, reject) {
        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
    });
}

function deserializeRegex(source, origin, item) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(item.__source__);
}

function deserializeMethods(source, origin, obj) {

    return (0, _util.replaceObject)({ obj: obj }, function (item) {
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' || item === null) {
            return;
        }

        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD)) {
            return deserializeMethod(source, origin, item);
        }

        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR)) {
            return deserializeError(source, origin, item);
        }

        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE)) {
            return deserializePromise(source, origin, item);
        }

        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE)) {
            return deserializeZalgoPromise(source, origin, item);
        }

        if (isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX)) {
            return deserializeRegex(source, origin, item);
        }
    }).obj;
}