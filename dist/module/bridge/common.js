'use strict';

exports.__esModule = true;
exports.documentBodyReady = undefined;
exports.needsBridgeForBrowser = needsBridgeForBrowser;
exports.needsBridgeForWin = needsBridgeForWin;
exports.needsBridgeForDomain = needsBridgeForDomain;
exports.needsBridge = needsBridge;
exports.getBridgeName = getBridgeName;
exports.isBridge = isBridge;
exports.registerRemoteWindow = registerRemoteWindow;
exports.findRemoteWindow = findRemoteWindow;
exports.registerRemoteSendMessage = registerRemoteSendMessage;
exports.rejectRemoteSendMessage = rejectRemoteSendMessage;
exports.sendBridgeMessage = sendBridgeMessage;

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('zalgo-promise/src');

var _src3 = require('cross-domain-utils/src');

var _conf = require('../conf');

var _global = require('../global');

function needsBridgeForBrowser() {

    if ((0, _src3.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

function needsBridgeForWin(win) {

    if (!(0, _src3.isSameTopWindow)(window, win)) {
        return true;
    }

    return false;
}

function needsBridgeForDomain(domain, win) {

    if (domain) {
        if ((0, _src3.getDomain)() !== (0, _src3.getDomainFromUrl)(domain)) {
            return true;
        }
    } else if (win) {
        if (!(0, _src3.isSameDomain)(win)) {
            return true;
        }
    }

    return false;
}

function needsBridge(_ref) {
    var win = _ref.win,
        domain = _ref.domain;


    if (!needsBridgeForBrowser()) {
        return false;
    }

    if (domain && !needsBridgeForDomain(domain, win)) {
        return false;
    }

    if (win && !needsBridgeForWin(win)) {
        return false;
    }

    return true;
}

function getBridgeName(domain) {

    domain = domain || (0, _src3.getDomainFromUrl)(domain);

    var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    var id = _conf.CONSTANTS.BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

    return id;
}

function isBridge() {
    return Boolean(window.name && window.name === getBridgeName((0, _src3.getDomain)()));
}

var documentBodyReady = exports.documentBodyReady = new _src2.ZalgoPromise(function (resolve) {

    if (window.document && window.document.body) {
        return resolve(window.document.body);
    }

    var interval = setInterval(function () {
        if (window.document && window.document.body) {
            clearInterval(interval);
            return resolve(window.document.body);
        }
    }, 10);
});

_global.global.remoteWindows = _global.global.remoteWindows || new _src.WeakMap();

function registerRemoteWindow(win) {
    _global.global.remoteWindows.set(win, { sendMessagePromise: new _src2.ZalgoPromise() });
}

function findRemoteWindow(win) {
    return _global.global.remoteWindows.get(win);
}

function registerRemoteSendMessage(win, domain, sendMessage) {

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found to register sendMessage to');
    }

    var sendMessageWrapper = function sendMessageWrapper(remoteWin, message, remoteDomain) {

        if (remoteWin !== win) {
            throw new Error('Remote window does not match window');
        }

        if (!(0, _src3.matchDomain)(remoteDomain, domain)) {
            throw new Error('Remote domain ' + remoteDomain + ' does not match domain ' + domain);
        }

        sendMessage(message);
    };

    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
    remoteWindow.sendMessagePromise = _src2.ZalgoPromise.resolve(sendMessageWrapper);
}

function rejectRemoteSendMessage(win, err) {

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found on which to reject sendMessage');
    }

    remoteWindow.sendMessagePromise.asyncReject(err);
}

function sendBridgeMessage(win, message, domain) {

    var messagingChild = (0, _src3.isOpener)(window, win);
    var messagingParent = (0, _src3.isOpener)(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error('Can only send messages to and from parent and popup windows');
    }

    var remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error('Window not found to send message to');
    }

    return remoteWindow.sendMessagePromise.then(function (sendMessage) {
        return sendMessage(win, message, domain);
    });
}