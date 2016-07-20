
import { CONSTANTS } from '../conf';
import { util, promise, isSameDomain, log, onWindowReady } from '../lib';

const BRIDGE_NAME_PREFIX = 'postrobot_bridge';

let bridge;

export let openBridge = util.memoize(url => {

    if (bridge) {
        throw new Error('Only one bridge supported');
    }

    let documentReady = new promise.Promise(resolve => {
        if (window.document.body) {
            return resolve(window.document);
        }

        window.document.addEventListener('DOMContentLoaded', event => {
            return resolve(window.document);
        });
    });

    bridge = documentReady.then(document => {

        log.debug('Opening bridge:', url);

        let id = `${BRIDGE_NAME_PREFIX}_${util.uniqueID()}`;

        let iframe = document.createElement('iframe');

        iframe.setAttribute('name', '__postrobot_bridge__');
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

            return onWindowReady(iframe.contentWindow);
        });
    });

    return bridge;
});

export function getBridge() {
    return promise.Promise.resolve().then(() => {
        return bridge || getBridgeFor(window);
    });
}

export function getBridgeFor(win) {

    try {
        let frame = win.frames.__postrobot_bridge__;

        if (frame && frame !== window && isSameDomain(frame) && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
            return frame;
        }

    } catch (err) {
        // pass
    }

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