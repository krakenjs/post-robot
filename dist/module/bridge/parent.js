'use strict';

exports.__esModule = true;
exports.hasBridge = hasBridge;
exports.openBridge = openBridge;
exports.linkUrl = linkUrl;
exports.destroyBridges = destroyBridges;

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('zalgo-promise/src');

var _src3 = require('cross-domain-utils/src');

var _conf = require('../conf');

var _lib = require('../lib');

var _global = require('../global');

var _common = require('./common');

_global.global.bridges = _global.global.bridges || {};

_global.global.bridgeFrames = _global.global.bridgeFrames || {};

_global.global.popupWindowsByWin = _global.global.popupWindowsByWin || new _src.WeakMap();
_global.global.popupWindowsByName = _global.global.popupWindowsByName || {};

function listenForRegister(source, domain) {
    _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { window: source, domain: domain }, function (_ref) {
        var origin = _ref.origin,
            data = _ref.data;


        if (origin !== domain) {
            throw new Error('Domain ' + domain + ' does not match origin ' + origin);
        }

        if (!data.name) {
            throw new Error('Register window expected to be passed window name');
        }

        if (!data.sendMessage) {
            throw new Error('Register window expected to be passed sendMessage method');
        }

        if (!_global.global.popupWindowsByName[data.name]) {
            throw new Error('Window with name ' + data.name + ' does not exist, or was not opened by this window');
        }

        if (!_global.global.popupWindowsByName[data.name].domain) {
            throw new Error('We do not have a registered domain for window ' + data.name);
        }

        if (_global.global.popupWindowsByName[data.name].domain !== origin) {
            throw new Error('Message origin ' + origin + ' does not matched registered window origin ' + _global.global.popupWindowsByName[data.name].domain);
        }

        (0, _common.registerRemoteSendMessage)(_global.global.popupWindowsByName[data.name].win, domain, data.sendMessage);

        return {
            sendMessage: function sendMessage(message) {

                if (!window || window.closed) {
                    return;
                }

                var winDetails = _global.global.popupWindowsByName[data.name];

                if (!winDetails) {
                    return;
                }

                try {
                    _global.global.receiveMessage({
                        data: message,
                        origin: winDetails.domain,
                        source: winDetails.win
                    });
                } catch (err) {
                    _src2.ZalgoPromise.reject(err);
                }
            }
        };
    });
}

function openBridgeFrame(name, url) {

    _lib.log.debug('Opening bridge:', name, url);

    var iframe = document.createElement('iframe');

    iframe.setAttribute('name', name);
    iframe.setAttribute('id', name);

    iframe.setAttribute('style', 'display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allowTransparency', 'true');

    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('hidden', 'true');
    iframe.setAttribute('title', '');
    iframe.setAttribute('role', 'presentation');

    iframe.src = url;

    return iframe;
}

function hasBridge(url, domain) {
    domain = domain || (0, _src3.getDomainFromUrl)(url);
    return Boolean(_global.global.bridges[domain]);
}

function openBridge(url, domain) {

    domain = domain || (0, _src3.getDomainFromUrl)(url);

    if (_global.global.bridges[domain]) {
        return _global.global.bridges[domain];
    }

    _global.global.bridges[domain] = _src2.ZalgoPromise['try'](function () {

        if ((0, _src3.getDomain)() === domain) {
            throw new Error('Can not open bridge on the same domain as current domain: ' + domain);
        }

        var name = (0, _common.getBridgeName)(domain);
        var frame = (0, _src3.getFrameByName)(window, name);

        if (frame) {
            throw new Error('Frame with name ' + name + ' already exists on page');
        }

        var iframe = openBridgeFrame(name, url);
        _global.global.bridgeFrames[domain] = iframe;

        return _common.documentBodyReady.then(function (body) {

            body.appendChild(iframe);

            var bridge = iframe.contentWindow;

            listenForRegister(bridge, domain);

            return new _src2.ZalgoPromise(function (resolve, reject) {

                iframe.onload = resolve;
                iframe.onerror = reject;
            }).then(function () {

                return (0, _lib.onChildWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, 'Bridge ' + url);
            }).then(function () {

                return bridge;
            });
        });
    });

    return _global.global.bridges[domain];
}

var windowOpen = window.open;

window.open = function windowOpenWrapper(url, name, options, last) {

    var domain = url;

    if (url && url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {
        var _url$split = url.split('|');

        domain = _url$split[0];
        url = _url$split[1];
    }

    if (domain) {
        domain = (0, _src3.getDomainFromUrl)(domain);
    }

    var win = windowOpen.call(this, url, name, options, last);

    if (!win) {
        return win;
    }

    if (url) {
        (0, _common.registerRemoteWindow)(win);
    }

    for (var _iterator = Object.keys(_global.global.popupWindowsByName), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
        }

        var winName = _ref2;

        if ((0, _src3.isWindowClosed)(_global.global.popupWindowsByName[winName].win)) {
            delete _global.global.popupWindowsByName[winName];
        }
    }

    if (name && win) {
        var winOptions = _global.global.popupWindowsByWin.get(win) || _global.global.popupWindowsByName[name] || {};

        winOptions.name = winOptions.name || name;
        winOptions.win = winOptions.win || win;
        winOptions.domain = winOptions.domain || domain;

        _global.global.popupWindowsByWin.set(win, winOptions);
        _global.global.popupWindowsByName[name] = winOptions;
    }

    return win;
};

function linkUrl(win, url) {

    var winOptions = _global.global.popupWindowsByWin.get(win);

    if (winOptions) {
        winOptions.domain = (0, _src3.getDomainFromUrl)(url);
        (0, _common.registerRemoteWindow)(win);
    }
}

function destroyBridges() {
    for (var _iterator2 = Object.keys(_global.global.bridgeFrames), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
        }

        var domain = _ref3;

        var frame = _global.global.bridgeFrames[domain];
        if (frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
    }
    _global.global.bridgeFrames = {};
    _global.global.bridges = {};
}