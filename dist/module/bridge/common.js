import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, isSameDomain, isOpener, isSameTopWindow, matchDomain, getUserAgent, getDomainFromUrl } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { CONFIG, BRIDGE_NAME_PREFIX } from '../conf';
import { windowStore } from '../global';

export function needsBridgeForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

export function needsBridgeForWin(win) {

    if (!isSameTopWindow(window, win)) {
        return true;
    }

    return false;
}

export function needsBridgeForDomain(domain, win) {

    if (domain) {
        if (getDomain() !== getDomainFromUrl(domain)) {
            return true;
        }
    } else if (win) {
        if (!isSameDomain(win)) {
            return true;
        }
    }

    return false;
}

export function needsBridge(_ref) {
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

export function getBridgeName(domain) {

    domain = domain || getDomainFromUrl(domain);

    var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    var id = BRIDGE_NAME_PREFIX + '_' + sanitizedDomain;

    return id;
}

export function isBridge() {
    return Boolean(window.name && window.name === getBridgeName(getDomain()));
}

export var documentBodyReady = new ZalgoPromise(function (resolve) {

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

var remoteWindows = windowStore('remoteWindows');

export function registerRemoteWindow(win) {
    remoteWindows.getOrSet(win, function () {
        return new ZalgoPromise();
    });
}

export function findRemoteWindow(win) {
    var remoteWin = remoteWindows.get(win);

    if (!remoteWin) {
        throw new Error('Remote window not found');
    }

    return remoteWin;
}

export function registerRemoteSendMessage(win, domain, sendMessage) {
    var sendMessageWrapper = function sendMessageWrapper(remoteWin, remoteDomain, message) {
        if (remoteWin !== win) {
            throw new Error('Remote window does not match window');
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error('Remote domain ' + remoteDomain + ' does not match domain ' + domain);
        }

        sendMessage(message);
    };

    findRemoteWindow(win).resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win, err) {
    findRemoteWindow(win).reject(err)['catch'](noop);
}

export function sendBridgeMessage(win, domain, message) {

    var messagingChild = isOpener(window, win);
    var messagingParent = isOpener(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error('Can only send messages to and from parent and popup windows');
    }

    return findRemoteWindow(win).then(function (sendMessage) {
        return sendMessage(win, domain, message);
    });
}