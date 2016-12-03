
import { CONSTANTS } from '../conf';
import { getParent, isWindowClosed } from '../lib';
import { global } from '../global';
import { send } from '../interface';

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

