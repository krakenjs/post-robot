
import { CONSTANTS } from '../conf';
import { util, promise, isSameDomain, log, onWindowReady, getOpener, getWindowDomain, registerWindow, getFrames, isFrameOwnedBy, getFrameByName } from '../lib';

const BRIDGE_NAME_PREFIX = '__postrobot_bridge__';

let pendingBridges = {};
let bridges = [];

const ZONES = {
    LOCAL: 'local',
    REMOTE: 'remote'
};

function getBridgeName(domain) {

    domain = domain || util.getDomainFromUrl(domain || window.location.href);

    let sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    let id = `${BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;

    return id;
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

function getBridgeForDomain(domain, zone = ZONES.LOCAL) {
    return promise.run(() => {

        if (zone === ZONES.LOCAL && pendingBridges[domain]) {
            return pendingBridges[domain];
        }

        for (let item of bridges) {
            if (item.domain === domain && item.zone === zone) {
                return item.bridge;
            }
        }

    }).then(bridge => {

        if (bridge && zone === ZONES.LOCAL) {
            return onWindowReady(bridge);
        }

        return bridge;
    });
}

function getBridgeForWindow(win, zone = ZONES.LOCAL) {
    return promise.run(() => {

        if (getOpener(win) === window) {
            return onWindowReady(win);
        }

    }).then(() => {

        for (let item of bridges) {
            if (item.win === win && item.zone === zone) {
                return item.bridge;
            }
        }

        let domain = getWindowDomain(win);

        if (domain) {
            return getBridgeForDomain(domain, zone);
        }

    }).then(bridge => {

        if (bridge && zone === ZONES.LOCAL) {
            return onWindowReady(bridge);
        }

        return bridge;
    });
}

export function getLocalBridgeForDomain(domain) {
    return getBridgeForDomain(domain, ZONES.LOCAL);
}

export function getLocalBridgeForWindow(win) {
    return getBridgeForWindow(win, ZONES.LOCAL);
}

export function getRemoteBridgeForDomain(domain) {
    return getBridgeForDomain(domain, ZONES.REMOTE);
}

export function getRemoteBridgeForWindow(win) {
    return promise.run(() => {

        return getBridgeForWindow(win, ZONES.REMOTE);

    }).then(bridge => {

        if (bridge) {
            return bridge;
        }

        let id = getBridgeName(window.location.href);

        try {

            if (win[id]) {
                return win[id];
            }

        } catch (err) {
            // pass
        }

        try {
            let frames = getFrames(win);

            if (!frames || !frames.length) {
                return;
            }

            for (let i = 0; i < frames.length; i++) {
                try {
                    let frame = frames[i];

                    if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
                        return frame;
                    }

                } catch (err) {
                    continue;
                }
            }
        } catch (err) {
            // pass
        }
    });
}

export function registerBridge(bridge, win) {

    let result;

    for (let item of bridges) {
        if (item.bridge === bridge) {
            result = item;
            break;
        }
    }

    if (!result) {
        let zone = isFrameOwnedBy(window, bridge) ? ZONES.LOCAL : ZONES.REMOTE;

        result = {
            bridge,
            domain: getWindowDomain(bridge),
            windows: [],
            zone
        };

        bridges.push(result);
    }

    if (win && result.windows.indexOf(win) === -1) {
        result.windows.push(win);
    }
}

export function openBridge(url, domain) {

    domain = domain || util.getDomainFromUrl(url);

    let bridgePromise = promise.run(() => {

        return getLocalBridgeForDomain(domain);

    }).then(existingBridge => {

        if (existingBridge) {
            return existingBridge;
        }

        if (util.getDomain() === domain) {
            return;
        }

        let id = getBridgeName(domain);

        let frame = getFrameByName(window, id);

        if (frame) {
            return onWindowReady(frame, 5000, `Bridge ${url}`);
        }

        log.debug('Opening bridge:', url);

        let iframe = document.createElement('iframe');

        iframe.setAttribute('name', id);
        iframe.setAttribute('id', id);

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

        return documentReady().then(document => {
            document.body.appendChild(iframe);

            let bridge = iframe.contentWindow;

            registerWindow(id, bridge, domain);
            registerBridge(bridge);

            delete pendingBridges[domain];

            return new promise.Promise((resolve, reject) => {

                iframe.onload = resolve;
                iframe.onerror = reject;

            }).then(() => {

                return onWindowReady(bridge, 5000, `Bridge ${url}`);

            }).then(() => {

                return bridge;
            });
        });
    });

    pendingBridges[domain] = bridgePromise;

    return bridgePromise;
}
