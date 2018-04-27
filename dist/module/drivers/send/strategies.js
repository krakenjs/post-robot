'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SEND_MESSAGE_STRATEGIES = undefined;

var _src = require('cross-domain-utils/src');

var _conf = require('../../conf');

var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};

SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function (win, serializedMessage, domain) {

    if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
        try {
            require('../../compat').emulateIERestrictions(window, win);
        } catch (err) {
            return;
        }
    }

    var domains = void 0;

    if (Array.isArray(domain)) {
        domains = domain;
    } else if (typeof domain === 'string') {
        domains = [domain];
    } else {
        domains = [_conf.CONSTANTS.WILDCARD];
    }

    domains = domains.map(function (dom) {

        if (dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0) {

            if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) {
                return _conf.CONSTANTS.WILDCARD;
            }

            if (!(0, _src.isActuallySameDomain)(win)) {
                throw new Error('Attempting to send messsage to mock domain ' + dom + ', but window is actually cross-domain');
            }

            // $FlowFixMe
            return (0, _src.getActualDomain)(win);
        }

        if (dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
            return _conf.CONSTANTS.WILDCARD;
        }

        return dom;
    });

    domains.forEach(function (dom) {
        return win.postMessage(serializedMessage, dom);
    });
};

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
    var _require = require('../../bridge'),
        sendBridgeMessage = _require.sendBridgeMessage,
        needsBridgeForBrowser = _require.needsBridgeForBrowser,
        isBridge = _require.isBridge;

    SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.BRIDGE] = function (win, serializedMessage, domain) {

        if (!needsBridgeForBrowser() && !isBridge()) {
            return;
        }

        if ((0, _src.isSameDomain)(win)) {
            throw new Error('Post message through bridge disabled between same domain windows');
        }

        if ((0, _src.isSameTopWindow)(window, win) !== false) {
            throw new Error('Can only use bridge to communicate between two different windows, not between frames');
        }

        return sendBridgeMessage(win, serializedMessage, domain);
    };

    SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.GLOBAL] = function (win, serializedMessage) {

        if (!needsBridgeForBrowser()) {
            return;
        }

        if (!(0, _src.isSameDomain)(win)) {
            throw new Error('Post message through global disabled between different domain windows');
        }

        if ((0, _src.isSameTopWindow)(window, win) !== false) {
            throw new Error('Can only use global to communicate between two different windows, not between frames');
        }

        // $FlowFixMe
        var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

        if (!foreignGlobal) {
            throw new Error('Can not find postRobot global on foreign window');
        }

        return foreignGlobal.receiveMessage({
            source: window,
            origin: (0, _src.getDomain)(),
            data: serializedMessage
        });
    };
}