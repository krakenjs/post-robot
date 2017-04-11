
import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { CONFIG, CONSTANTS } from '../conf';
import { getDomain, getDomainFromUrl, promise, isSameDomain, isOpener, isSameTopWindow, getUserAgent, matchDomain } from '../lib';
import { global } from '../global';
import { receiveMessage } from '../drivers';

export function needsBridgeForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

export function needsBridgeForWin(win) {

    if (win && isSameTopWindow(window, win)) {
        return false;
    }

    if (win && isSameDomain(win)) {
        return false;
    }

    return true;
}

export function needsBridgeForDomain(domain) {

    if (domain && getDomain() === getDomainFromUrl(domain)) {
        return false;
    }

    return true;
}

export function needsBridge({ win, domain }) {
    return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
}

export function getBridgeName(domain) {

    domain = domain || getDomainFromUrl(domain);

    let sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    let id = `${CONSTANTS.BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;

    return id;
}

export function isBridge() {
    return window.name && window.name === getBridgeName(getDomain());
}

export let documentBodyReady = new promise.Promise(resolve => {

    if (window.document && window.document.body) {
        return resolve(window.document.body);
    }

    let interval = setInterval(() => {
        if (window.document && window.document.body) {
            clearInterval(interval);
            return resolve(window.document.body);
        }
    }, 10);
});

global.remoteWindows = global.remoteWindows || new WeakMap();

export function registerRemoteWindow(win, timeout = CONFIG.BRIDGE_TIMEOUT) {
    global.remoteWindows.set(win, { sendMessagePromise: new promise.Promise() });
}

export function findRemoteWindow(win) {
    return global.remoteWindows.get(win);
}

export function registerRemoteSendMessage(win, domain, sendMessage) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found to register sendMessage to`);
    }

    let sendMessageWrapper = (remoteWin, message, remoteDomain) => {

        if (remoteWin !== win) {
            throw new Error(`Remote window does not match window`);
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error(`Remote domain ${remoteDomain} does not match domain ${domain}`);
        }

        sendMessage(message);
    };

    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
    remoteWindow.sendMessagePromise = promise.Promise.resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win, err) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found on which to reject sendMessage`);
    }

    remoteWindow.sendMessagePromise.asyncReject(err);
}

export function sendBridgeMessage(win, message, domain) {

    let messagingChild  = isOpener(window, win);
    let messagingParent = isOpener(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error(`Can only send messages to and from parent and popup windows`);
    }

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found to send message to`);
    }

    return remoteWindow.sendMessagePromise.then(sendMessage => {
        return sendMessage(win, message, domain);
    });
}

global.receiveMessage = function(event) {
    return receiveMessage(event);
};
