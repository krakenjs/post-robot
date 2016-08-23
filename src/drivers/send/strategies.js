
import { CONSTANTS } from '../../conf';
import { util, isSameDomain, getOpener, isSameTopWindow, getParent } from '../../lib';
import { emulateIERestrictions, getLocalBridgeForWindow, getRemoteBridgeForWindow } from '../../compat';

export let SEND_MESSAGE_STRATEGIES = {

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ](win, message, domain) {

        emulateIERestrictions(window, win);

        return win.postMessage(JSON.stringify(message, 0, 2), domain);
    },

    [ CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD ](win, message, domain) {

        if (!isSameDomain(win)) {
            throw new Error(`Window is not on the same domain`);
        }

        if (isSameTopWindow(window, win)) {
            throw new Error(`Can only use global method to communicate between two different windows, not between frames`);
        }

        let sourceDomain = util.getDomain(window);
        let targetDomain;

        try {
            targetDomain = util.getDomain(win);
        } catch (err) {
            throw new Error(`Can not read target window domain: ${err.message}`);
        }

        if (sourceDomain !== targetDomain) {
            throw new Error(`Can not send global message - source ${sourceDomain} does not match target ${targetDomain}`);
        }

        if (domain !== '*' && targetDomain !== domain) {
            throw new Error(`Can post post through global method - specified domain ${domain} does not match target domain ${targetDomain}`);
        }

        if (!util.safeHasProp(win, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            throw new Error(`post-robot not available on target window at ${targetDomain}`);
        }

        win[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
            origin: util.getDomain(window),
            source: window,
            data: JSON.stringify(message, 0, 2)
        });
    },

    [ CONSTANTS.SEND_STRATEGIES.REMOTE_BRIDGE ](win, message, domain) {

        if (isSameTopWindow(window, win)) {
            throw new Error(`Can only use bridge to communicate between two different windows, not between frames`);
        }

        return getRemoteBridgeForWindow(win).then(bridge => {

            if (!bridge) {
                throw new Error(`No bridge available in window`);
            }

            let sourceDomain = util.getDomain(window);
            let targetDomain;

            try {
                targetDomain = util.getDomain(bridge);
            } catch (err) {
                throw new Error(`Can not read bridge window domain: ${err.message}`);
            }

            if (sourceDomain !== targetDomain) {
                throw new Error(`Can not accept global message through bridge - source ${sourceDomain} does not match bridge ${targetDomain}`);
            }

            if (!util.safeHasProp(bridge, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
                throw new Error(`post-robot not available on bridge at ${targetDomain}`);
            }

            message.targetHint = 'window.parent';

            // If we're messaging our child

            if (window === getOpener(win)) {
                message.sourceHint = 'window.opener';
            }

            bridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                origin: util.getDomain(window),
                source: window,
                data: JSON.stringify(message, 0, 2)
            });
        });
    },

    [ CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE ](win, message, domain) {

        if (isSameTopWindow(window, win)) {
            throw new Error(`Can only use bridge to communicate between two different windows, not between frames`);
        }

        // If we're messaging our parent

        if (win === getOpener(window)) {
            message.targetHint = 'window.parent.opener';
        }

        if (!message.target && !message.targetHint) {
            throw new Error(`Can not post message down through bridge without target or targetHint`);
        }

        // If we're messaging our child

        let opener = getOpener(win);

        if (opener && window === opener) {
            message.sourceHint = 'window.opener';
        }

        let openerParent = opener && getParent(opener);

        if (openerParent && window === openerParent) {
            message.sourceHint = 'window.opener.parent';
        }

        return getLocalBridgeForWindow(win).then(bridge => {

            if (!bridge) {
                throw new Error(`Bridge not initialized`);
            }

            if (win === bridge) {
                throw new Error('Message target is bridge');
            }

            bridge.postMessage(JSON.stringify(message, 0, 2), domain);
        });
    }
};