
import { CONSTANTS } from '../conf';
import { util, promise, isSameDomain, log, onWindowReady, onOpenWindow } from '../lib';

const BRIDGE_NAME_PREFIX = '__postrobot_bridge__';

function getDomain(url) {

    let domain;

    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        domain = url;
    } else {
        domain = window.location.href;
    }

    domain = domain.split('/').slice(0, 3).join('/');

    return domain;
}

function documentReady() {
    return new promise.Promise(resolve => {
        if (window.document && window.document.body) {
            return resolve(window.document);
        }

        window.document.addEventListener('DOMContentLoaded', event => {
            return resolve(window.document);
        });
    });
}

let bridges = [];

export function getBridgeByDomain(domain) {
    for (let bridge of bridges) {
        if (domain === bridge.domain) {
            return bridge.bridge;
        }
    }
}

export function getBridgeByWindow(win) {
    for (let bridge of bridges) {
        if (bridge.windows.indexOf(win) !== -1) {
            return bridge.bridge;
        }
    }

    return Promise.resolve();
}

let windowBuffer = {};

onOpenWindow((url, win) => {
    if (!url) {
        return;
    }

    let domain = getDomain(url);

    for (let bridge of bridges) {
        if (domain === bridge.domain) {
            bridge.windows.push(win);
            return;
        }
    }

    windowBuffer[domain] = windowBuffer[domain] || [];
    windowBuffer[domain].push(win);
});

export function openBridge(url) {

    let domain = getDomain(url);

    let existingBridge = getBridgeByDomain(domain);

    if (existingBridge) {
        return existingBridge;
    }

    let id = `${BRIDGE_NAME_PREFIX}_${util.uniqueID()}`;

    let bridge = documentReady().then(document => {

        log.debug('Opening bridge:', url);

        let iframe = document.createElement('iframe');

        iframe.setAttribute('name', id);
        iframe.setAttribute('id', id);

        iframe.setAttribute('style', 'margin: 0; padding: 0; border: 0px none; overflow: hidden;');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('border', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allowTransparency', 'true');

        iframe.setAttribute('tabindex', '-1');
        iframe.setAttribute('hidden', 'true');
        iframe.setAttribute('title', '');
        iframe.setAttribute('role', 'presentation');

        iframe.src = url;
        document.body.appendChild(iframe);

        return new promise.Promise((resolve, reject) => {

            iframe.onload = resolve;
            iframe.onerror = reject;

        }).then(() => {

            return onWindowReady(iframe.contentWindow, 5000, `Bridge ${url}`);
        });
    });

    bridges.push({
        id,
        domain,
        bridge,
        windows: windowBuffer[domain] || []
    });

    delete windowBuffer[domain];

    return bridge;
}

export function getRemoteBridge(win) {

    try {
        if (!win || !win.frames || !win.frames.length) {
            return;
        }

        for (let i = 0; i < win.frames.length; i++) {
            try {
                let frame = win.frames[i];

                if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                    return frame;
                }

            } catch (err) {
                continue;
            }
        }
    } catch (err) {
        return;
    }
}