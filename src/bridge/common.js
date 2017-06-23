/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, isSameDomain, isOpener, isSameTopWindow, matchDomain, getUserAgent, getDomainFromUrl } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { global } from '../global';
import { receiveMessage } from '../drivers';

export function needsBridgeForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}

export function needsBridgeForWin(win : any) : boolean {

    if (win && isSameTopWindow(window, win)) {
        return false;
    }

    if (win && isSameDomain(win)) {
        return false;
    }

    return true;
}

export function needsBridgeForDomain(domain : ?string) : boolean {

    if (domain && getDomain() === getDomainFromUrl(domain)) {
        return false;
    }

    return true;
}

export function needsBridge({ win, domain } : { win : any, domain? : string }) : boolean {
    return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
}

export function getBridgeName(domain : string) : string {

    domain = domain || getDomainFromUrl(domain);

    let sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    let id = `${CONSTANTS.BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;

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

export function registerRemoteWindow(win : any, timeout : number = CONFIG.BRIDGE_TIMEOUT) {
    global.remoteWindows.set(win, { sendMessagePromise: new ZalgoPromise() });
}

export function findRemoteWindow(win : any) : { sendMessagePromise : ZalgoPromise<(remoteWin : any, message : string, remoteDomain : string) => void> } {
    return global.remoteWindows.get(win);
}

export function registerRemoteSendMessage(win : any, domain : string, sendMessage : (message : string) => void) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found to register sendMessage to`);
    }

    let sendMessageWrapper = (remoteWin : any, message : string, remoteDomain : string) => {

        if (remoteWin !== win) {
            throw new Error(`Remote window does not match window`);
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error(`Remote domain ${remoteDomain} does not match domain ${domain}`);
        }

        sendMessage(message);
    };

    remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
    remoteWindow.sendMessagePromise = ZalgoPromise.resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win : any, err : Error) {

    let remoteWindow = findRemoteWindow(win);

    if (!remoteWindow) {
        throw new Error(`Window not found on which to reject sendMessage`);
    }

    remoteWindow.sendMessagePromise.asyncReject(err);
}

export function sendBridgeMessage(win : any, message : string, domain : string) : ZalgoPromise<void> {

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

global.receiveMessage = function(event : { source : any, origin : string, data : string }) {
    receiveMessage(event);
};
