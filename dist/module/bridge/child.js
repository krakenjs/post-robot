'use strict';

exports.__esModule = true;
exports.openTunnelToOpener = openTunnelToOpener;

var _src = require('zalgo-promise/src');

var _src2 = require('cross-domain-utils/src');

var _conf = require('../conf');

var _lib = require('../lib');

var _global = require('../global');

var _common = require('./common');

var awaitRemoteBridgeForWindow = (0, _lib.weakMapMemoize)(function (win) {
    return _src.ZalgoPromise['try'](function () {
        for (var _iterator = (0, _src2.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var _frame = _ref;

            try {
                // $FlowFixMe
                if (_frame && _frame !== window && (0, _src2.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                    return _frame;
                }
            } catch (err) {
                continue;
            }
        }

        try {
            var frame = (0, _src2.getFrameByName)(win, (0, _common.getBridgeName)((0, _src2.getDomain)()));

            if (!frame) {
                return;
            }

            // $FlowFixMe
            if ((0, _src2.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                return frame;
            }

            return new _src.ZalgoPromise(function (resolve) {

                var interval = void 0;
                var timeout = void 0;

                interval = setInterval(function () {
                    // $FlowFixMe
                    if (frame && (0, _src2.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        clearInterval(interval);
                        clearTimeout(timeout);
                        return resolve(frame);
                    }
                }, 100);

                timeout = setTimeout(function () {
                    clearInterval(interval);
                    return resolve();
                }, 2000);
            });
        } catch (err) {
            // pass
        }
    });
});

function openTunnelToOpener() {
    return _src.ZalgoPromise['try'](function () {

        var opener = (0, _src2.getOpener)(window);

        if (!opener) {
            return;
        }

        if (!(0, _common.needsBridge)({ win: opener })) {
            return;
        }

        (0, _common.registerRemoteWindow)(opener);

        return awaitRemoteBridgeForWindow(opener).then(function (bridge) {

            if (!bridge) {
                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: no bridge found in opener'));
            }

            if (!window.name) {
                return (0, _common.rejectRemoteSendMessage)(opener, new Error('Can not register with opener: window does not have a name'));
            }

            return bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

                name: window.name,

                source: window,

                canary: function canary() {
                    // pass
                },
                sendMessage: function sendMessage(message) {

                    try {
                        (0, _lib.noop)(window);
                    } catch (err) {
                        return;
                    }

                    if (!window || window.closed) {
                        return;
                    }

                    try {
                        _global.global.receiveMessage({
                            data: message,
                            origin: this.origin,
                            source: this.source
                        });
                    } catch (err) {
                        _src.ZalgoPromise.reject(err);
                    }
                }
            }).then(function (_ref2) {
                var source = _ref2.source,
                    origin = _ref2.origin,
                    data = _ref2.data;


                if (source !== opener) {
                    throw new Error('Source does not match opener');
                }

                (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
            })['catch'](function (err) {

                (0, _common.rejectRemoteSendMessage)(opener, err);
                throw err;
            });
        });
    });
}