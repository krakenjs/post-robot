/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, getFrameByName, isWindowClosed, getDomainFromUrl, normalizeMockUrl, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { BRIDGE_TIMEOUT, MESSAGE_NAME } from '../conf';
import { awaitWindowHello } from '../lib';
import { windowStore, globalStore } from '../global';
import type { OnType, SendType, ReceiveMessageType } from '../types';

import { getBridgeName, documentBodyReady, registerRemoteSendMessage, registerRemoteWindow } from './common';

type WinDetails = {|
    win : CrossDomainWindowType,
    domain? : ?string,
    name? : ?string
|};

export function listenForOpenTunnel({ on, send, receiveMessage } : {| on : OnType, send : SendType, receiveMessage : ReceiveMessageType |}) {
    const popupWindowsByName = globalStore('popupWindowsByName');

    on(MESSAGE_NAME.OPEN_TUNNEL, ({ source, origin, data }) => {
        const bridgePromise = globalStore('bridges').get(origin);

        if (!bridgePromise) {
            throw new Error(`Can not find bridge promise for domain ${ origin }`);
        }

        return bridgePromise.then(bridge => {
            if (source !== bridge) {
                throw new Error(`Message source does not matched registered bridge for domain ${ origin }`);
            }

            if (!data.name) {
                throw new Error(`Register window expected to be passed window name`);
            }

            if (!data.sendMessage) {
                throw new Error(`Register window expected to be passed sendMessage method`);
            }

            if (!popupWindowsByName.has(data.name)) {
                throw new Error(`Window with name ${ data.name } does not exist, or was not opened by this window`);
            }

            const getWindowDetails = () : WinDetails => {
                const winDetails = popupWindowsByName.get(data.name);
                // $FlowFixMe
                return winDetails;
            };

            if (!getWindowDetails().domain) {
                throw new Error(`We do not have a registered domain for window ${ data.name }`);
            }

            if (getWindowDetails().domain !== origin) {
                throw new Error(`Message origin ${ origin } does not matched registered window origin ${ getWindowDetails().domain || 'unknown' }`);
            }

            registerRemoteSendMessage(getWindowDetails().win, origin, data.sendMessage);

            return {
                sendMessage(message) {

                    if (!window || window.closed) {
                        return;
                    }

                    if (!getWindowDetails()) {
                        return;
                    }

                    const domain = getWindowDetails().domain;

                    if (!domain) {
                        return;
                    }

                    try {
                        receiveMessage({
                            data:   message,
                            origin: domain,
                            source: getWindowDetails().win
                        }, { on, send });
                    } catch (err) {
                        ZalgoPromise.reject(err);
                    }
                }
            };
        });
    });
}

function openBridgeFrame(name : string, url : string) : HTMLIFrameElement {

    const iframe = document.createElement(`iframe`);

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
    const bridges = globalStore('bridges');
    return bridges.has(domain || getDomainFromUrl(url));
}

export function openBridge(url : string, domain : string) : ZalgoPromise<CrossDomainWindowType> {
    const bridges = globalStore('bridges');
    const bridgeFrames = globalStore('bridgeFrames');
    
    domain = domain || getDomainFromUrl(url);
    
    return bridges.getOrSet(domain, () => ZalgoPromise.try(() => {

        if (getDomain() === domain) {
            throw new Error(`Can not open bridge on the same domain as current domain: ${ domain }`);
        }

        const name  = getBridgeName(domain);
        const frame = getFrameByName(window, name);

        if (frame) {
            throw new Error(`Frame with name ${ name } already exists on page`);
        }

        const iframe = openBridgeFrame(name, url);
        bridgeFrames.set(domain, iframe);

        return documentBodyReady.then(body => {

            body.appendChild(iframe);
            const bridge = iframe.contentWindow;

            return new ZalgoPromise((resolve, reject) => {

                iframe.addEventListener('load', resolve);
                iframe.addEventListener('error', reject);

            }).then(() => {

                return awaitWindowHello(bridge, BRIDGE_TIMEOUT, `Bridge ${ url }`);

            }).then(() => {

                return bridge;
            });
        });
    }));
}

export function linkWindow({ win, name, domain } : WinDetails) : WinDetails {
    const popupWindowsByName = globalStore('popupWindowsByName');
    const popupWindowsByWin = windowStore('popupWindowsByWin');

    for (const winName of popupWindowsByName.keys()) {
        const details = popupWindowsByName.get(winName);
        if (!details || isWindowClosed(details.win)) {
            popupWindowsByName.del(winName);
        }
    }

    if (isWindowClosed(win)) {
        return { win, name, domain };
    }

    const details = popupWindowsByWin.getOrSet(win, () : WinDetails => {
        if (!name) {
            return { win };
        }
        
        // $FlowFixMe
        return popupWindowsByName.getOrSet(name, () : WinDetails => {
            return { win, name };
        });
    });

    if (details.win && details.win !== win) {
        throw new Error(`Different window already linked for window: ${ name || 'undefined' }`);
    }

    if (name) {
        details.name = name;
        popupWindowsByName.set(name, details);
    }

    if (domain) {
        details.domain = domain;
        registerRemoteWindow(win);
    }

    popupWindowsByWin.set(win, details);
    
    return details;
}

export function linkUrl(win : CrossDomainWindowType, url : string) {
    linkWindow({ win, domain: getDomainFromUrl(url) });
}

export function listenForWindowOpen() {
    const windowOpen = window.open;

    window.open = function windowOpenWrapper(url : string, name : string, options : string, last : mixed) : mixed {
        const win = windowOpen.call(this, normalizeMockUrl(url), name, options, last);
    
        if (!win) {
            return win;
        }
    
        linkWindow({ win, name, domain: url ? getDomainFromUrl(url) : null });
    
        return win;
    };
}

export function destroyBridges() {
    const bridges = globalStore('bridges');
    const bridgeFrames = globalStore('bridgeFrames');

    for (const domain of bridgeFrames.keys()) {
        const frame = bridgeFrames.get(domain);
        if (frame && frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
    }
    bridgeFrames.reset();
    bridges.reset();
}
