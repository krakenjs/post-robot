
import { CONSTANTS, CONFIG } from '../conf';
import { util, childWindows } from '../lib';

export function emulateIERestrictions(sourceWindow, targetWindow) {
    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {

        let isIframeMessagingParent = childWindows.getWindowType(sourceWindow) === CONSTANTS.WINDOW_TYPES.IFRAME && util.isFrameOwnedBy(targetWindow, sourceWindow);
        let isParentMessagingIframe = childWindows.getWindowType(targetWindow) === CONSTANTS.WINDOW_TYPES.IFRAME && util.isFrameOwnedBy(sourceWindow, targetWindow);

        if (!isIframeMessagingParent && !isParentMessagingIframe) {
            if (sourceWindow === window) {
                throw new Error('Can not send post messages to another window (disabled by config to emulate IE)');
            } else {
                throw new Error('Can not receive post messages sent from another window (disabled by config to emulate IE)');
            }
        }
    }
}