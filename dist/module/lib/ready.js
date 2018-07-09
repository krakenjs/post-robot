'use strict';

exports.__esModule = true;
exports.onHello = onHello;
exports.sayHello = sayHello;
exports.initOnReady = initOnReady;
exports.onChildWindowReady = onChildWindowReady;

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('cross-domain-utils/src');

var _src3 = require('zalgo-promise/src');

var _conf = require('../conf');

var _global = require('../global');

var _log = require('./log');

var _util = require('./util');

_global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();

function onHello(handler) {
    _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, { domain: _conf.CONSTANTS.WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin;

        return handler({ source: source, origin: origin });
    });
}

function sayHello(win) {
    return _global.global.send(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, { domain: _conf.CONSTANTS.WILDCARD, timeout: -1 }).then(function (_ref2) {
        var origin = _ref2.origin;

        return { origin: origin };
    });
}

function initOnReady() {

    onHello(function (_ref3) {
        var source = _ref3.source,
            origin = _ref3.origin;

        var promise = _global.global.readyPromises.get(source) || new _src3.ZalgoPromise();
        promise.resolve({ origin: origin });
        _global.global.readyPromises.set(source, promise);
    });

    var parent = (0, _src2.getAncestor)();
    if (parent) {
        sayHello(parent)['catch'](function (err) {
            _log.log.debug((0, _util.stringifyError)(err));
        });
    }
}

function onChildWindowReady(win) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Window';


    var promise = _global.global.readyPromises.get(win);

    if (promise) {
        return promise;
    }

    promise = new _src3.ZalgoPromise();
    _global.global.readyPromises.set(win, promise);

    if (timeout !== -1) {
        setTimeout(function () {
            return promise.reject(new Error(name + ' did not load after ' + timeout + 'ms'));
        }, timeout);
    }

    return promise;
}