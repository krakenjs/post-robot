/* @flow */

import { initOnReady } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';

export * from './public';
export { markWindowKnown } from './lib';
export { cleanUpWindow } from './clean';
export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export let bridge = __POST_ROBOT__.__IE_POPUP_SUPPORT__ ? require('./bridge/interface') : null;

export function init() {
    if (!global.initialized) {
        listenForMessages();

        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            require('./bridge').openTunnelToOpener();
        }

        initOnReady();
    }

    global.initialized = true;
}

init();
