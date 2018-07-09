'use strict';

exports.__esModule = true;
exports.send = undefined;
exports.request = request;
exports.sendToParent = sendToParent;
exports.client = client;

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('zalgo-promise/src');

var _src3 = require('cross-domain-utils/src');

var _conf = require('../conf');

var _drivers = require('../drivers');

var _lib = require('../lib');

var _global = require('../global');

_global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap();

function request(options) {

    var prom = _src2.ZalgoPromise['try'](function () {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        var name = options.name;
        var targetWindow = void 0;
        var domain = void 0;

        if (typeof options.window === 'string') {
            var el = document.getElementById(options.window);

            if (!el) {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be a valid element id');
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be an iframe');
            }

            // $FlowFixMe
            if (!el.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            // $FlowFixMe
            targetWindow = el.contentWindow;
        } else if (options.window instanceof HTMLIFrameElement) {

            if (options.window.tagName.toLowerCase() !== 'iframe') {
                throw new Error('Expected options.window ' + Object.prototype.toString.call(options.window) + ' to be an iframe');
            }

            if (options.window && !options.window.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            if (options.window && options.window.contentWindow) {
                // $FlowFixMe
                targetWindow = options.window.contentWindow;
            }
        } else {
            targetWindow = options.window;
        }

        if (!targetWindow) {
            throw new Error('Expected options.window to be a window object, iframe, or iframe element id.');
        }

        var win = targetWindow;

        domain = options.domain || _conf.CONSTANTS.WILDCARD;

        var hash = options.name + '_' + (0, _lib.uniqueID)();

        if ((0, _src3.isWindowClosed)(win)) {
            throw new Error('Target window is closed');
        }

        var hasResult = false;

        var requestPromises = _global.global.requestPromises.get(win);

        if (!requestPromises) {
            requestPromises = [];
            _global.global.requestPromises.set(win, requestPromises);
        }

        var requestPromise = _src2.ZalgoPromise['try'](function () {

            if ((0, _src3.isAncestor)(window, win)) {
                return (0, _lib.onChildWindowReady)(win, options.timeout || _conf.CONFIG.CHILD_WINDOW_TIMEOUT);
            }
        }).then(function () {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref.origin;

            if ((0, _lib.isRegex)(domain) && !origin) {
                return (0, _lib.sayHello)(win);
            }
        }).then(function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                origin = _ref2.origin;

            if ((0, _lib.isRegex)(domain)) {
                if (!(0, _src3.matchDomain)(domain, origin)) {
                    throw new Error('Remote window domain ' + origin + ' does not match regex: ' + domain.toString());
                }

                domain = origin;
            }

            if (typeof domain !== 'string' && !Array.isArray(domain)) {
                throw new TypeError('Expected domain to be a string or array');
            }

            var actualDomain = domain;

            return new _src2.ZalgoPromise(function (resolve, reject) {

                var responseListener = void 0;

                if (!options.fireAndForget) {
                    responseListener = {
                        name: name,
                        window: win,
                        domain: actualDomain,
                        respond: function respond(err, result) {
                            if (!err) {
                                hasResult = true;
                                requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                            }

                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    };

                    (0, _drivers.addResponseListener)(hash, responseListener);
                }

                (0, _drivers.sendMessage)(win, {
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    hash: hash,
                    name: name,
                    data: options.data,
                    fireAndForget: options.fireAndForget
                }, actualDomain)['catch'](reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                var ackTimeout = _conf.CONFIG.ACK_TIMEOUT;
                var resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT;

                var cycleTime = 100;

                var cycle = function cycle() {

                    if (hasResult) {
                        return;
                    }

                    if ((0, _src3.isWindowClosed)(win)) {

                        if (!responseListener.ack) {
                            return reject(new Error('Window closed for ' + name + ' before ack'));
                        }

                        return reject(new Error('Window closed for ' + name + ' before response'));
                    }

                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                    if (resTimeout !== -1) {
                        resTimeout = Math.max(resTimeout - cycleTime, 0);
                    }

                    var hasAck = responseListener.ack;

                    if (hasAck) {

                        if (resTimeout === -1) {
                            return;
                        }

                        cycleTime = Math.min(resTimeout, 2000);
                    } else if (ackTimeout === 0) {
                        return reject(new Error('No ack for postMessage ' + name + ' in ' + (0, _src3.getDomain)() + ' in ' + _conf.CONFIG.ACK_TIMEOUT + 'ms'));
                    } else if (resTimeout === 0) {
                        return reject(new Error('No response for postMessage ' + name + ' in ' + (0, _src3.getDomain)() + ' in ' + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + 'ms'));
                    }

                    setTimeout(cycle, cycleTime);
                };

                setTimeout(cycle, cycleTime);
            });
        });

        requestPromise['catch'](function () {
            (0, _drivers.markResponseListenerErrored)(hash);
            (0, _drivers.deleteResponseListener)(hash);
        });

        requestPromises.push(requestPromise);

        return requestPromise;
    });

    return prom;
}

function _send(window, name, data, options) {

    options = options || {};
    options.window = window;
    options.name = name;
    options.data = data;

    return request(options);
}

exports.send = _send;
function sendToParent(name, data, options) {

    var win = (0, _src3.getAncestor)();

    if (!win) {
        return new _src2.ZalgoPromise(function (resolve, reject) {
            return reject(new Error('Window does not have a parent'));
        });
    }

    return _send(win, name, data, options);
}

function client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if (!options.window) {
        throw new Error('Expected options.window');
    }

    var win = options.window;

    return {
        send: function send(name, data) {
            return _send(win, name, data, options);
        }
    };
}

_global.global.send = _send;