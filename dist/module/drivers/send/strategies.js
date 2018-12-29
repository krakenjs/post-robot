import { isSameDomain, isSameTopWindow, isActuallySameDomain, getActualDomain, getDomain } from 'cross-domain-utils/src';

import { SEND_STRATEGY, PROTOCOL, WILDCARD, WINDOW_PROP } from '../../conf';
import { needsGlobalMessagingForBrowser } from '../../lib';

export var SEND_MESSAGE_STRATEGIES = {};

SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.POST_MESSAGE] = function (win, serializedMessage, domain) {

    if (__TEST__) {
        if (needsGlobalMessagingForBrowser() && isSameTopWindow(window, win) === false) {
            return;
        }
    }

    var domains = void 0;

    if (Array.isArray(domain)) {
        domains = domain;
    } else if (typeof domain === 'string') {
        domains = [domain];
    } else {
        domains = [WILDCARD];
    }

    domains = domains.map(function (dom) {

        if (dom.indexOf(PROTOCOL.MOCK) === 0) {

            if (window.location.protocol === PROTOCOL.FILE) {
                return WILDCARD;
            }

            if (!isActuallySameDomain(win)) {
                throw new Error('Attempting to send messsage to mock domain ' + dom + ', but window is actually cross-domain');
            }

            // $FlowFixMe
            return getActualDomain(win);
        }

        if (dom.indexOf(PROTOCOL.FILE) === 0) {
            return WILDCARD;
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

    SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.BRIDGE] = function (win, serializedMessage, domain) {

        if (!needsBridgeForBrowser() && !isBridge()) {
            return;
        }

        if (isSameDomain(win)) {
            throw new Error('Post message through bridge disabled between same domain windows');
        }

        if (isSameTopWindow(window, win) !== false) {
            throw new Error('Can only use bridge to communicate between two different windows, not between frames');
        }

        return sendBridgeMessage(win, domain, serializedMessage);
    };
}

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__ || __POST_ROBOT__.__GLOBAL_MESSAGE_SUPPORT__) {

    SEND_MESSAGE_STRATEGIES[SEND_STRATEGY.GLOBAL] = function (win, serializedMessage) {

        if (!needsGlobalMessagingForBrowser()) {
            return;
        }

        if (!isSameDomain(win)) {
            throw new Error('Post message through global disabled between different domain windows');
        }

        if (isSameTopWindow(window, win) !== false) {
            throw new Error('Can only use global to communicate between two different windows, not between frames');
        }

        // $FlowFixMe
        var foreignGlobal = win[WINDOW_PROP.POSTROBOT];

        if (!foreignGlobal) {
            throw new Error('Can not find postRobot global on foreign window');
        }

        return foreignGlobal.receiveMessage({
            source: window,
            origin: getDomain(),
            data: serializedMessage
        });
    };
}