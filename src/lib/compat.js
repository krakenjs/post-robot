/* @flow */

import { getUserAgent } from 'cross-domain-utils/src';

export function needsGlobalMessagingForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }

    return false;
}
