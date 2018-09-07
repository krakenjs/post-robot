/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, getFrameByName, isWindowClosed, getDomainFromUrl, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';
import { onChildWindowReady } from '../lib';
import { global } from '../global';

import { getBridgeName, documentBodyReady, registerRemoteSendMessage, registerRemoteWindow } from './common';

global.bridges = global.bridges || {};
global.bridgeFrames = global.bridgeFrames || {};

global.popupWindowsByWin = global.popupWindowsByWin || new WeakMap();
global.popupWindowsByName = global.popupWindowsByName || {};

function listenForRegister(source, domain) {
    global.on(CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { window: source, domain }, ({ origin, data }) => {

        if (origin !== domain) {
            throw new Error(`Domain ${ domain } does not match origin ${ origin }`);
        }

        if (!data.name) {
            throw new Error(`Register window expected to be passed window name`);
        }

        if (!data.sendMessage) {
            throw new Error(`Register window expected to be passed sendMessage method`);
        }

        if (!global.popupWindowsByName[data.name]) {
            throw new Error(`Window with name ${ data.name } does not exist, or was not opened by this window`);
        }

        if (!global.popupWindowsByName[data.name].domain) {
            throw new Error(`We do not have a registered domain for window ${ data.name }`);
        }

        if (global.popupWindowsByName[data.name].domain !== origin) {
            throw new Error(`Message origin ${ origin } does not matched registered window origin ${ global.popupWindowsByName[data.name].domain }`);
        }

        registerRemoteSendMessage(global.popupWindowsByName[data.name].win, domain, data.sendMessage);

        return {
            sendMessage(message) {

                if (!window || window.closed) {
                    return;
                }

                let winDetails = global.popupWindowsByName[data.name];

                if (!winDetails) {
                    return;
                }

                try {
                    global.receiveMessage({
                        data:   message,
                        origin: winDetails.domain,
                        source: winDetails.win
                    });
                } catch (err) {
                    ZalgoPromise.reject(err);
                }
            }
        };
    });
}

function openBridgeFrame(name : string, url : string) : HTMLIFrameElement {

    let iframe = document.createElement(`iframe`);

    iframe.setAttribute(`name`, name);
    iframe.setAttribute(`id`,   name);

    iframe.setAttribute(`style`, `display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;`);
    iframe.setAttribute(`frameborder`, `0`);
    iframe.setAttribute(`border`, `0`);
    iframe.setAttribute(`scrolling`, `no`);
    iframe.setAttribute(`allowTransparency`, `true`);

    iframe.setAttribute(`tabindex`, `-1`);
    iframe.setAttribute(`hidden`, `true`);
    iframe.setAttribute(`title`, ``);
    iframe.setAttribute(`role`, `presentation`);

    iframe.src = url;

    return iframe;
}

export function hasBridge(url : string, domain : string) : boolean {
    domain = domain || getDomainFromUrl(url);
    return Boolean(global.bridges[domain]);
}

export function openBridge(url : string, domain : string) : ZalgoPromise<CrossDomainWindowType> {

    domain = domain || getDomainFromUrl(url);

    if (global.bridges[domain]) {
        return global.bridges[domain];
    }

    global.bridges[domain] = ZalgoPromise.try(() => {

        if (getDomain() === domain) {
            throw new Error(`Can not open bridge on the same domain as current domain: ${ domain }`);
        }

        let name  = getBridgeName(domain);
        let frame = getFrameByName(window, name);

        if (frame) {
            throw new Error(`Frame with name ${ name } already exists on page`);
        }

        let iframe = openBridgeFrame(name, url);
        global.bridgeFrames[domain] = iframe;

        return documentBodyReady.then(body => {

            body.appendChild(iframe);

            let bridge = iframe.contentWindow;

            listenForRegister(bridge, domain);

            return new ZalgoPromise((resolve, reject) => {

                iframe.onload = resolve;
                iframe.onerror = reject;

            }).then(() => {

                return onChildWindowReady(bridge, CONFIG.BRIDGE_TIMEOUT, `Bridge ${ url }`);

            }).then(() => {

                return bridge;
            });
        });
    });

    return global.bridges[domain];
}

let windowOpen = window.open;

window.open = function windowOpenWrapper(url : string, name : string, options : string, last : mixed) : mixed {

    let domain = url;

    if (url && url.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
        [ domain, url ] = url.split('|');
    }

    if (domain) {
        domain = getDomainFromUrl(domain);
    }

    let win = windowOpen.call(this, url, name, options, last);

    if (!win) {
        return win;
    }

    if (url) {
        registerRemoteWindow(win);
    }

    for (let winName of Object.keys(global.popupWindowsByName)) {
        if (isWindowClosed(global.popupWindowsByName[winName].win)) {
            delete global.popupWindowsByName[winName];
        }
    }

    if (name && win) {
        let winOptions = global.popupWindowsByWin.get(win) ||
                         global.popupWindowsByName[name] || {};

        winOptions.name = winOptions.name || name;
        winOptions.win = winOptions.win || win;
        winOptions.domain = winOptions.domain || domain;

        global.popupWindowsByWin.set(win, winOptions);
        global.popupWindowsByName[name] = winOptions;
    }

    return win;
};

export function linkUrl(win : CrossDomainWindowType, url : string) {

    let winOptions = global.popupWindowsByWin.get(win);

    if (winOptions) {
        winOptions.domain = getDomainFromUrl(url);
        registerRemoteWindow(win);
    }
}

export function destroyBridges() {
    for (let domain of Object.keys(global.bridgeFrames)) {
        let frame = global.bridgeFrames[domain];
        if (frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
    }
    global.bridgeFrames = {};
    global.bridges = {};
}
