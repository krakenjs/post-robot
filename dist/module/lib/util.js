import { isPopup, isIframe, getUserAgent } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';

export function getWindowType() {
    if (isPopup()) {
        return CONSTANTS.WINDOW_TYPES.POPUP;
    }
    if (isIframe()) {
        return CONSTANTS.WINDOW_TYPES.IFRAME;
    }
    return CONSTANTS.WINDOW_TYPES.FULLPAGE;
}

export function needsGlobalMessagingForBrowser() {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}