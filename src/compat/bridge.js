
import { CONSTANTS } from '../conf';
import { util, promise } from '../lib';

let bridge;

export let openBridge = util.memoize(url => {

    if (bridge) {
        throw new Error('Only one bridge supported');
    }

    bridge = new promise.Promise((resolve, reject) => {

        util.debug('Opening bridge:', url);

        let iframe = document.createElement('iframe');

        iframe.setAttribute('id', 'postRobotBridge');

        iframe.setAttribute('style', 'margin: 0; padding: 0; border: 0px none; overflow: hidden;');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('border', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allowTransparency', 'true');

        iframe.setAttribute('tabindex', '-1');
        iframe.setAttribute('hidden', 'true');
        iframe.setAttribute('title', '');
        iframe.setAttribute('role', 'presentation');

        iframe.onload = () => resolve(iframe);

        iframe.onerror = reject;

        iframe.src = url;
        document.body.appendChild(iframe);
    });

    return bridge;
});

export function getBridge() {
    return bridge;
}

export function getBridgeFor(win) {

    try {
        if (!win || !win.frames || !win.frames.length) {
            return;
        }

        for (let i=0; i<win.frames.length; i++) {
            try {
                let frame = win.frames[i];

                if (frame && frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
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