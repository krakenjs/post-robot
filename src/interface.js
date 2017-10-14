/* @flow */

import { initOnReady, listenForMethods } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';
export { cleanUpWindow } from './clean';

export function init() {

    if (!global.initialized) {
        listenForMessages();

        if (__IE_POPUP_SUPPORT__) {
            require('./bridge').openTunnelToOpener();
        }

        initOnReady();
        listenForMethods();
    }

    global.initialized = true;
}

init();

// #if __IE_POPUP_SUPPORT__
import * as popupBridge from './bridge/interface';
// #endif

export let bridge = __IE_POPUP_SUPPORT__ ? popupBridge : null;

export * from './public';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
