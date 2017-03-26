
import { initOnReady, listenForMethods } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';

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

export function reset() {
    return global.clean.all().then(() => {
        global.initialized = false;
        return init();
    });
}

export * from './public';
export { Promise } from './lib';