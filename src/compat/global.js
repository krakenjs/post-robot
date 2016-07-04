
import { CONSTANTS } from '../conf';
import { nextTick } from '../lib';
import { receiveMessage } from '../drivers';

export function registerGlobals() {

    // Only allow ourselves to be loaded once

    if (window[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
        throw new Error('Attempting to load postRobot twice on the same window');
    }

    window[CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
        postMessage: event => {
            nextTick(() => receiveMessage(event));
        }
    };
}