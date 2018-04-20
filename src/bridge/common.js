/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, isSameDomain, isOpener, isSameTopWindow, matchDomain, getUserAgent, getDomainFromUrl, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { global } from '../global';

export function needsBridgeForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

export function needsBridgeForWin(win : CrossDomainWindowType) : boolean {

    if (!isSameTopWindow(window, win)) {
        return true;
    }

    return false;
}

export function needsBridgeForDomain(domain : ?string, win : ?CrossDomainWindowType) : boolean {

    if (domain) {
        if (getDomain() !== getDomainFromUrl(domain)) {
            return true;
        }
    } else if (win) {
        if (!isSameDomain(win))  {
            return true;
        }
    }

    return false;
}

export function needsBridge({ win, domain } : { win? : CrossDomainWindowType, domain? : string }) : boolean {

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

export function getBridgeName(domain : string) : string {

    domain = domain || getDomainFromUrl(domain);

    let sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    let id = `${ CONSTANTS.BRIDGE_NAME_PREFIX }_${ sanitizedDomain }`;

    return id;
}

export function isBridge() : boolean {
    return Boolean(window.name && window.name === getBridgeName(getDomain()));
}

export let documentBodyReady = new ZalgoPromise(resolve => {

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

export function registerRemoteWindow(win : CrossDomainWindowType) {
    global.remoteWindows.set(win, { sendMessagePromise: new ZalgoPromise() });
}

export function findRemoteWindow(win : CrossDomainWindowType) : { sendMessagePromise : ZalgoPromise<(remoteWin : CrossDomainWindowType, message : string, remoteDomain : string) => void> } {
    return global.remoteWindows.get(win);
}

export function registerRemoteSendMessage(win : CrossDomainWindowType, domain : string, sendMessage : (message : string) => void) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found to register sendMessage to`);
    }

    let sendMessageWrapper = (remoteWin : CrossDomainWindowType, message : string, remoteDomain : string) => {

        if (remoteWin !== win) {
            throw new Error(`Remote window does not match window`);
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error(`Remote domain ${ remoteDomain } does not match domain ${ domain }`);
        }

        sendMessage(message);
    };

    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
    remoteWindow.sendMessagePromise = ZalgoPromise.resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win : CrossDomainWindowType, err : Error) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found on which to reject sendMessage`);
    }

    remoteWindow.sendMessagePromise.asyncReject(err);
}

export function sendBridgeMessage(win : CrossDomainWindowType, message : string, domain : string) : ZalgoPromise<void> {

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
