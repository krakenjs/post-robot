import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain, getFrameByName, isWindowClosed, getDomainFromUrl, normalizeMockUrl } from 'cross-domain-utils/src';

import { CONFIG, MESSAGE_NAME } from '../conf';
import { awaitWindowHello } from '../lib';
import { global, windowStore, globalStore } from '../global';

import { getBridgeName, documentBodyReady, registerRemoteSendMessage, registerRemoteWindow } from './common';

var bridges = globalStore('bridges');
var bridgeFrames = globalStore('bridgeFrames');
var popupWindowsByName = globalStore('popupWindowsByName');
var popupWindowsByWin = windowStore('popupWindowsByWin');

function listenForRegister(source, domain) {
    global.on(MESSAGE_NAME.OPEN_TUNNEL, { window: source, domain: domain }, function (_ref) {
        var origin = _ref.origin,
            data = _ref.data;


        if (origin !== domain) {
            throw new Error('Domain ' + domain + ' does not match origin ' + origin);
        }

        if (!data.name) {
            throw new Error('Register window expected to be passed window name');
        }

        if (!data.sendMessage) {
            throw new Error('Register window expected to be passed sendMessage method');
        }

        if (!popupWindowsByName.has(data.name)) {
            throw new Error('Window with name ' + data.name + ' does not exist, or was not opened by this window');
        }

        // $FlowFixMe
        if (!popupWindowsByName.get(data.name).domain) {
            throw new Error('We do not have a registered domain for window ' + data.name);
        }

        // $FlowFixMe
        if (popupWindowsByName.get(data.name).domain !== origin) {
            // $FlowFixMe
            throw new Error('Message origin ' + origin + ' does not matched registered window origin ' + popupWindowsByName.get(data.name).domain);
        }

        // $FlowFixMe
        registerRemoteSendMessage(popupWindowsByName.get(data.name).win, domain, data.sendMessage);

        return {
            sendMessage: function sendMessage(message) {

                if (!window || window.closed) {
                    return;
                }

                var winDetails = popupWindowsByName.get(data.name);

                if (!winDetails) {
                    return;
                }

                try {
                    global.receiveMessage({
                        data: message,
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

function openBridgeFrame(name, url) {

    var iframe = document.createElement('iframe');

    iframe.setAttribute('name', name);
    iframe.setAttribute('id', name);

    iframe.setAttribute('style', 'display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('border', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allowTransparency', 'true');

    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('hidden', 'true');
    iframe.setAttribute('title', '');
    iframe.setAttribute('role', 'presentation');

    iframe.src = url;

    return iframe;
}

export function hasBridge(url, domain) {
    return bridges.has(domain || getDomainFromUrl(url));
}

export function openBridge(url, domain) {
    domain = domain || getDomainFromUrl(url);

    return bridges.getOrSet(domain, function () {
        return ZalgoPromise['try'](function () {

            if (getDomain() === domain) {
                throw new Error('Can not open bridge on the same domain as current domain: ' + domain);
            }

            var name = getBridgeName(domain);
            var frame = getFrameByName(window, name);

            if (frame) {
                throw new Error('Frame with name ' + name + ' already exists on page');
            }

            var iframe = openBridgeFrame(name, url);
            bridgeFrames.set(domain, iframe);

            return documentBodyReady.then(function (body) {

                body.appendChild(iframe);

                var bridge = iframe.contentWindow;

                listenForRegister(bridge, domain);

                return new ZalgoPromise(function (resolve, reject) {

                    iframe.onload = resolve;
                    iframe.onerror = reject;
                }).then(function () {

                    return awaitWindowHello(bridge, CONFIG.BRIDGE_TIMEOUT, 'Bridge ' + url);
                }).then(function () {

                    return bridge;
                });
            });
        });
    });
}

export function linkWindow(_ref2) {
    var win = _ref2.win,
        name = _ref2.name,
        domain = _ref2.domain;

    for (var _i2 = 0, _popupWindowsByName$k2 = popupWindowsByName.keys(), _length2 = _popupWindowsByName$k2 == null ? 0 : _popupWindowsByName$k2.length; _i2 < _length2; _i2++) {
        var winName = _popupWindowsByName$k2[_i2];
        // $FlowFixMe
        if (isWindowClosed(popupWindowsByName.get(winName).win)) {
            popupWindowsByName.del(winName);
        }
    }

    var details = popupWindowsByWin.getOrSet(win, function () {
        if (!name) {
            return { win: win };
        }

        return popupWindowsByName.getOrSet(name, function () {
            return { win: win, name: name };
        });
    });

    if (details.win && details.win !== win) {
        throw new Error('Different window already linked for window: ' + (name || 'undefined'));
    }

    if (name) {
        if (details.name && details.name !== name) {
            throw new Error('Different window already linked for name ' + name + ': ' + details.name);
        }

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

export function linkUrl(win, url) {
    linkWindow({ win: win, domain: getDomainFromUrl(url) });
}

var windowOpen = window.open;

window.open = function windowOpenWrapper(url, name, options, last) {
    var win = windowOpen.call(this, normalizeMockUrl(url), name, options, last);

    if (!win) {
        return win;
    }

    linkWindow({ win: win, name: name, domain: url ? getDomainFromUrl(url) : null });

    return win;
};

export function destroyBridges() {
    for (var _i4 = 0, _bridgeFrames$keys2 = bridgeFrames.keys(), _length4 = _bridgeFrames$keys2 == null ? 0 : _bridgeFrames$keys2.length; _i4 < _length4; _i4++) {
        var _domain = _bridgeFrames$keys2[_i4];
        var frame = bridgeFrames.get(_domain);
        if (frame && frame.parentNode) {
            frame.parentNode.removeChild(frame);
        }
    }

    bridgeFrames.reset();
    bridges.reset();
}