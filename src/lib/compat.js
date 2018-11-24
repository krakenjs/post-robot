/* @flow */

import { getUserAgent } from 'cross-domain-utils/src';

import { CONFIG } from '../conf';

export function needsGlobalMessagingForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }

    return false;
}
