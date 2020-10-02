/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, isSameDomain, isOpener, isSameTopWindow, matchDomain, getUserAgent, getDomainFromUrl, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { BRIDGE_NAME_PREFIX } from '../conf';
import { windowStore } from '../global';

export function needsBridgeForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
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

export function needsBridge({ win, domain } : {| win? : CrossDomainWindowType, domain? : string |}) : boolean {

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

    const sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    const id = `${ BRIDGE_NAME_PREFIX }_${ sanitizedDomain }`;

    return id;
}

export function isBridge() : boolean {
    return Boolean(window.name && window.name === getBridgeName(getDomain()));
}

export const documentBodyReady : ZalgoPromise<HTMLBodyElement> = new ZalgoPromise(resolve => {

    if (window.document && window.document.body) {
        return resolve(window.document.body);
    }

    const interval = setInterval(() => {
        if (window.document && window.document.body) {
            clearInterval(interval);
            return resolve(window.document.body);
        }
    }, 10);
});

export function registerRemoteWindow(win : CrossDomainWindowType) {
    const remoteWindowPromises = windowStore('remoteWindowPromises');
    remoteWindowPromises.getOrSet(win, () => new ZalgoPromise());
}

export function findRemoteWindow(win : CrossDomainWindowType) : ZalgoPromise<(remoteWin : CrossDomainWindowType, message : string, remoteDomain : string) => void> {
    const remoteWindowPromises = windowStore('remoteWindowPromises');
    const remoteWinPromise = remoteWindowPromises.get(win);

    if (!remoteWinPromise) {
        throw new Error(`Remote window promise not found`);
    }

    return remoteWinPromise;
}

type SendMessageType = {|
    (string) : void,
    fireAndForget : (string) => void
|};

export function registerRemoteSendMessage(win : CrossDomainWindowType, domain : string, sendMessage : SendMessageType) {
    const sendMessageWrapper = (remoteWin : CrossDomainWindowType, remoteDomain : string, message : string) => {
        if (remoteWin !== win) {
            throw new Error(`Remote window does not match window`);
        }

        if (!matchDomain(remoteDomain, domain)) {
            throw new Error(`Remote domain ${ remoteDomain } does not match domain ${ domain }`);
        }

        sendMessage.fireAndForget(message);
    };

    findRemoteWindow(win).resolve(sendMessageWrapper);
}

export function rejectRemoteSendMessage(win : CrossDomainWindowType, err : Error) {
    findRemoteWindow(win).reject(err).catch(noop);
}

export function sendBridgeMessage(win : CrossDomainWindowType, domain : string, message : string) : ZalgoPromise<void> {

    const messagingChild  = isOpener(window, win);
    const messagingParent = isOpener(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error(`Can only send messages to and from parent and popup windows`);
    }

    return findRemoteWindow(win).then(sendMessage => {
        return sendMessage(win, domain, message);
    });
}
