
import { CONSTANTS } from '../conf';
import { childWindows, promise, nextTick } from '../lib';
import { receiveMessage } from '../drivers';

export function registerGlobals() {

    // Only allow ourselves to be loaded once
    if (window[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
        throw new Error('Attempting to load postRobot twice on the same window');
    }

    window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = {

        registerSelf(id, win, type) {
            childWindows.register(id, win, type);
        },

        postMessage: promise.method(event => {
            nextTick(() => {
                receiveMessage(event);
            });
        }),

        postMessageParent: promise.method((source, message, domain) => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage(message, domain);
            } else {
                throw new Error('Can not find parent to post message to');
            }
        })
    };
}

