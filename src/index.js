
import { initOnReady, listenForMethods } from './lib';
import { listenForMessages } from './drivers';
import { global } from './global';
import { openTunnelToOpener } from './bridge';

export function init() {

    if (!global.initialized) {
        listenForMessages();
        openTunnelToOpener();
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

export * from './interface';
export { Promise } from './lib';

export default module.exports;
