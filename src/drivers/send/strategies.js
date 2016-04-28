
import { CONSTANTS } from '../../conf';
import { promise } from '../../lib';
import { emulateIERestrictions, getBridge, getBridgeFor } from '../../compat';

export let SEND_MESSAGE_STRATEGIES = {

    POST_MESSAGE: promise.method((win, message) => {

        emulateIERestrictions(window, win);

        return win.postMessage(JSON.stringify(message, 0, 2), '*');
    }),

    POST_MESSAGE_GLOBAL_METHOD: promise.method((win, message) => {

        if (!win[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
            throw new Error('postRobot not found on window');
        }

        return win[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage(window, JSON.stringify(message, 0, 2));
    }),

    POST_MESSAGE_UP_THROUGH_BRIDGE: promise.method((win, message) => {

        let frame = getBridgeFor(win);

        if (!frame) {
            throw new Error('No bridge available in window');
        }

        if (!frame[CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
            throw new Error('postRobot not installed in bridge');
        }

        return frame[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2));
    }),

    POST_MESSAGE_DOWN_THROUGH_BRIDGE: promise.method((win, message) => {

        let bridge = getBridge();

        if (!bridge) {
            throw new Error('Bridge not initialized');
        }

        if (win === bridge.contentWindow) {
            throw new Error('Message target is bridge');
        }

        if (!message.target) {

            if (win === window.opener) {
                message.target = 'parent.opener';
            } else {
                throw new Error('Can not post message down through bridge without target');
            }
        }

        return bridge.then(iframe => {
            iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), '*');
        });
    })
};