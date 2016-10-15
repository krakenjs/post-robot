
import { CONFIG, CONSTANTS } from '../conf';
import { util, promise, isSameDomain, log, onWindowReady, getOpener, getFrames, getFrameByName, isOpener, getParent, isWindowClosed } from '../lib';
import { global } from '../global';
import { on, send } from '../interface';
import { receiveMessage } from '../drivers';



function getBridgeName(domain) {

    domain = domain || util.getDomainFromUrl(domain);

    let sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');

    let id = `${CONSTANTS.BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;

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

function getRemoteBridgeForWindow(win) {
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
}





global.remoteWindows = global.remoteWindows || [];

function registerRemoteWindow(win, timeout = CONFIG.BRIDGE_TIMEOUT) {
    let sendMessagePromise = new promise.Promise();
    global.remoteWindows.push({ win, sendMessagePromise });
}

function registerRemoteSendMessage(win, domain, sendMessage) {

    for (let remoteWindow of global.remoteWindows) {
        if (remoteWindow.win === win) {

            let sendMessageWrapper = (remoteWin, message, remoteDomain) => {

                if (remoteWin !== win) {
                    throw new Error(`Remote window does not match window`);
                }

                if (remoteDomain !== `*` && remoteDomain !== domain) {
                    throw new Error(`Remote domain ${remoteDomain} does not match domain ${domain}`);
                }

                sendMessage(message);
            };

            remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
            remoteWindow.sendMessagePromise = promise.Promise.resolve(sendMessageWrapper);

            return;
        }
    }

    throw new Error(`Window not found to register sendMessage to`);
}

function rejectRemoteSendMessage(win, err) {

    for (let remoteWindow of global.remoteWindows) {
        if (remoteWindow.win === win) {
            return remoteWindow.sendMessagePromise.reject(err);
        }
    }

    throw new Error(`Window not found on which to reject sendMessage`);
}

export function sendBridgeMessage(win, message, domain) {

    let messagingChild  = isOpener(window, win);
    let messagingParent = isOpener(win, window);

    if (!messagingChild && !messagingParent) {
        throw new Error(`Can only send messages to and from parent and popup windows`);
    }

    for (let remoteWindow of global.remoteWindows) {
        if (remoteWindow.win === win) {

            return remoteWindow.sendMessagePromise.then(sendMessage => {
                return sendMessage(win, message, domain);
            });
        }
    }

    throw new Error(`Window not found to send message to`);
}






// Keep track of all open windows by name

global.popupWindows = global.popupWindows || {};

let windowOpen = window.open;

window.open = function(url, name, options, last) {

    let domain = url;

    if (url && url.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
        [ domain, url ] = url.split('|');
    }

    if (domain) {
        domain = util.getDomainFromUrl(domain);
    }

    let win = windowOpen.call(this, url, name, options, last);

    if (url) {
        registerRemoteWindow(win);
    }

    if (name) {
        global.popupWindows[name] = { win, domain };
    }

    return win;
};

export function linkUrl(win, url) {

    for (let name of Object.keys(global.popupWindows)) {
        let winOptions = global.popupWindows[name];

        if (winOptions.win === win) {
            winOptions.domain = util.getDomainFromUrl(url);

            registerRemoteWindow(win);

            break;
        }
    }
}








function listenForRegister(source, domain) {
    on(CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, { source, domain }, ({ origin, data }) => {

        if (origin !== domain) {
            throw new Error(`Domain ${domain} does not match origin ${origin}`);
        }

        if (!data.name) {
            throw new Error(`Register window expected to be passed window name`);
        }

        if (!data.sendMessage) {
            throw new Error(`Register window expected to be passed sendMessage method`);
        }

        let winDetails = global.popupWindows[data.name];

        if (!winDetails) {
            throw new Error(`Window with name ${data.name} does not exist, or was not opened by this window`);
        }

        if (!winDetails.domain) {
            throw new Error(`We do not have a registered domain for window ${data.name}`);
        }

        if (winDetails.domain !== origin) {
            throw new Error(`Message origin ${origin} does not matched registered window origin ${winDetails.domain}`);
        }

        registerRemoteSendMessage(winDetails.win, domain, data.sendMessage);

        return {
            sendMessage(message) {

                if (!window || window.closed) {
                    return;
                }

                receiveMessage({
                    data:   message,
                    origin: winDetails.domain,
                    source: winDetails.win
                });
            }
        };
    });
}


global.openTunnelToParent = function openTunnelToParent({ name, source, canary, sendMessage }) {

    let remoteWindow = getParent(window);

    if (!remoteWindow) {
        throw new Error(`No parent window found to open tunnel to`);
    }

    return send(remoteWindow, CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
        name,
        sendMessage() {

            if (isWindowClosed(source)) {
                return;
            }

            try {
                canary();
            } catch (err) {
                return;
            }

            sendMessage.apply(this, arguments);
        }
    }, { domain: '*' });
};


export function openTunnelToOpener() {

    let opener = getOpener(window);

    if (!opener) {
        return;
    }

    if (isSameDomain(opener)) {
        return;
    }

    registerRemoteWindow(opener);

    let bridge = getRemoteBridgeForWindow(opener);

    if (!bridge) {
        return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: no bridge found in opener`));
    }

    if (!window.name) {
        return rejectRemoteSendMessage(opener, new Error(`Can not register with opener: window does not have a name`));
    }

    return bridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({

        name: window.name,

        source: window,

        canary() {
            // pass
        },

        sendMessage(message) {

            if (!window || window.closed) {
                return;
            }

            receiveMessage({
                data:   message,
                origin: this.origin,
                source: this.source
            });
        }

    }).then(({ source, origin, data }) => {

        if (source !== opener) {
            throw new Error(`Source does not match opener`);
        }

        registerRemoteSendMessage(source, origin, data.sendMessage);

    }).catch(err => {

        rejectRemoteSendMessage(opener, err);
        throw err;
    });
}

global.receiveMessage = function(event) {
    return receiveMessage(event);
};

function openBridgeFrame(name, url) {

    log.debug(`Opening bridge:`, name, url);

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


export function bridgeRequired(url, domain) {

    domain = domain || util.getDomainFromUrl(url);

    if (util.getDomain() === domain) {
        return false;
    }

    return true;
}


global.bridges = global.bridges || {};

export function openBridge(url, domain) {

    domain = domain || util.getDomainFromUrl(url);

    if (global.bridges[domain]) {
        return global.bridges[domain];
    }

    global.bridges[domain] = promise.run(() => {

        if (util.getDomain() === domain) {
            throw new Error(`Can not open bridge on the same domain as current domain: ${domain}`);
        }

        let name  = getBridgeName(domain);
        let frame = getFrameByName(window, name);

        if (frame) {
            throw new Error(`Frame with name ${name} already exists on page`);
        }

        let iframe = openBridgeFrame(name, url);

        return documentReady().then(document => {
            document.body.appendChild(iframe);

            let bridge = iframe.contentWindow;

            listenForRegister(bridge, domain);

            return new promise.Promise((resolve, reject) => {

                iframe.onload = resolve;
                iframe.onerror = reject;

            }).then(() => {

                return onWindowReady(bridge, CONFIG.BRIDGE_TIMEOUT, `Bridge ${url}`);

            }).then(() => {

                return bridge;
            });
        });
    });

    return global.bridges[domain];
}
