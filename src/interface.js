/* @flow */

import { initOnReady, listenForMethods } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';
import { on, send } from './public';

// #if __IE_POPUP_SUPPORT__
import * as popupBridge from './bridge/interface';
// #endif

export * from './public';
export { cleanUpWindow } from './clean';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export let bridge = __IE_POPUP_SUPPORT__ ? popupBridge : null;

export function init() {
    if (!global.initialized) {
        listenForMessages();

        if (__IE_POPUP_SUPPORT__) {
            require('./bridge').openTunnelToOpener();
        }

        initOnReady();
        listenForMethods({ on, send });
    }

    global.initialized = true;
}

init();