
import { CONSTANTS } from '../../conf';
import { util, promise, isSameDomain } from '../../lib';
import { emulateIERestrictions, getBridge, getBridgeFor } from '../../compat';

export let SEND_MESSAGE_STRATEGIES = {

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: promise.method((win, message, domain) => {

        emulateIERestrictions(window, win);

        return win.postMessage(JSON.stringify(message, 0, 2), domain);
    }),

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD ]: promise.method((win, message, domain) => {

        if (domain !== '*') {

            let winDomain;

            try {
                winDomain = `${win.location.protocol}//${win.location.host}`;
            } catch (err) {
                // pass
            }

            if (!winDomain) {
                throw new Error(`Can post post through global method - domain set to ${domain}, but we can not verify the domain of the target window`);
            }

            if (winDomain !== domain) {
                throw new Error(`Can post post through global method - domain ${domain} does not match target window domain ${winDomain}`);
            }
        }

        if (!isSameDomain(win)) {
            throw new Error('window is a different domain');
        }

        if (!util.safeHasProp(win, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            throw new Error('postRobot not found on window');
        }

        win[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
            origin: `${window.location.protocol}//${window.location.host}`,
            source: window,
            data: JSON.stringify(message)
        });
    }),

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_UP_THROUGH_BRIDGE ]: promise.method((win, message, domain) => {

        if (util.isFrameOwnedBy(window, win) ||  util.isFrameOwnedBy(win, window)) {
            throw new Error('No need to use bridge for frame to frame message');
        }

        let frame = getBridgeFor(win);

        if (!frame) {
            throw new Error('No bridge available in window');
        }

        if (!isSameDomain(frame)) {
            throw new Error('Bridge is different domain');
        }

        if (!util.safeHasProp(frame, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            throw new Error('postRobot not installed in bridge');
        }

        return frame[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2), domain);
    }),

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_DOWN_THROUGH_BRIDGE ]: promise.method((win, message, domain) => {

        if (util.isFrameOwnedBy(window, win) ||  util.isFrameOwnedBy(win, window)) {
            throw new Error('No need to use bridge for frame to frame message');
        }

        let bridge = getBridge();

        if (!bridge) {
            throw new Error('Bridge not initialized');
        }

        if (win === window.opener) {
            message.target = 'parent.opener';
        }

        if (!message.target) {
            throw new Error('Can not post message down through bridge without target');
        }

        return bridge.then(iframe => {

            if (win === iframe.contentWindow) {
                throw new Error('Message target is bridge');
            }

            iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), domain);
        });
    })
};