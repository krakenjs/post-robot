
import {CONFIG } from '../conf';
import { util } from '../lib';

export function emulateIERestrictions(sourceWindow, targetWindow) {
    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {

        let isIframeMessagingParent = util.isFrameOwnedBy(targetWindow, sourceWindow);
        let isParentMessagingIframe = util.isFrameOwnedBy(sourceWindow, targetWindow);

        if (!isIframeMessagingParent && !isParentMessagingIframe) {
            if (sourceWindow === window) {
                throw new Error('Can not send post messages to another window (disabled by config to emulate IE)');
            } else {
                throw new Error('Can not receive post messages sent from another window (disabled by config to emulate IE)');
            }
        }
    }
}