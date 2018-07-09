'use strict';

exports.__esModule = true;
exports.on = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.listen = listen;
exports.once = once;
exports.listener = listener;

var _src = require('cross-domain-utils/src');

var _src2 = require('zalgo-promise/src');

var _lib = require('../lib');

var _drivers = require('../drivers');

var _conf = require('../conf');

var _global = require('../global');

function listen(options) {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    if (!options.handler) {
        throw new Error('Expected options.handler');
    }

    var name = options.name;
    var win = options.window;
    var domain = options.domain;

    var listenerOptions = {
        handler: options.handler,
        handleError: options.errorHandler || function (err) {
            throw err;
        },
        window: win,
        domain: domain || _conf.CONSTANTS.WILDCARD,
        name: name
    };

    var requestListener = (0, _drivers.addRequestListener)({ name: name, win: win, domain: domain }, listenerOptions);

    if (options.once) {
        var _handler = listenerOptions.handler;
        listenerOptions.handler = (0, _lib.once)(function listenOnce() {
            requestListener.cancel();
            return _handler.apply(this, arguments);
        });
    }

    if (listenerOptions.window && options.errorOnClose) {
        var interval = (0, _lib.safeInterval)(function () {
            if (win && (typeof win === 'undefined' ? 'undefined' : _typeof(win)) === 'object' && (0, _src.isWindowClosed)(win)) {
                interval.cancel();
                listenerOptions.handleError(new Error('Post message target window is closed'));
            }
        }, 50);
    }

    return {
        cancel: function cancel() {
            requestListener.cancel();
        }
    };
}

function _on(name, options, handler) {

    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;

    return listen(options);
}

exports.on = _on;
function once(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handler = arguments[2];


    if (typeof options === 'function') {
        handler = options;
        options = {};
    }

    options = options || {};
    handler = handler || options.handler;
    var errorHandler = options.errorHandler;

    var promise = new _src2.ZalgoPromise(function (resolve, reject) {

        options = options || {};

        options.name = name;
        options.once = true;

        options.handler = function (event) {
            resolve(event);
            if (handler) {
                return handler(event);
            }
        };

        options.errorHandler = function (err) {
            reject(err);
            if (errorHandler) {
                return errorHandler(err);
            }
        };
    });

    var onceListener = listen(options);
    promise.cancel = onceListener.cancel;

    return promise;
}

function listener() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return {
        on: function on(name, handler) {
            return _on(name, options, handler);
        }
    };
}

_global.global.on = _on;