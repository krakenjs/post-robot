
import { CONSTANTS } from '../conf';
import { childWindows, promise } from '../lib';
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

        postMessage: promise.method((source, data) => {
            receiveMessage(source, data);
        }),

        postMessageParent: promise.method((source, message) => {
            window.parent.postMessage(message, '*');
        })
    };
}

