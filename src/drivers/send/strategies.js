
import { CONSTANTS } from '../../conf';
import { isSameDomain, isSameTopWindow } from '../../lib';
import { emulateIERestrictions } from '../../compat';
import { sendBridgeMessage } from '../../bridge';

export let SEND_MESSAGE_STRATEGIES = {

    [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ](win, message, domain) {

        emulateIERestrictions(window, win);

        if (domain && domain.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
            domain = `${win.location.protocol}//${win.location.host}`;
        }

        if (domain && domain.indexOf(CONSTANTS.FILE_PROTOCOL) === 0) {
            domain = `*`;
        }

        return win.postMessage(JSON.stringify(message, 0, 2), domain);
    },

    [ CONSTANTS.SEND_STRATEGIES.BRIDGE ](win, message, domain) {

        if (isSameDomain(win)) {
            throw new Error(`Post message through bridge disabled between same domain windows`);
        }

        if (isSameTopWindow(window, win) !== false) {
            throw new Error(`Can only use bridge to communicate between two different windows, not between frames`);
        }

        return sendBridgeMessage(win, JSON.stringify(message, 0, 2), domain);
    }
};