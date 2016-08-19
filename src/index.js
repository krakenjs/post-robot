
import { util, initOnReady, listenForMethods } from './lib';
import { messageListener } from './drivers';
import { global } from './global';

function init() {

    if (!global.initialized) {

        util.listen(window, 'message', messageListener);

        initOnReady();
        listenForMethods();
    }

    global.initialized = true;
}

init();

export * from './interface';
export { Promise } from './lib';

export default module.exports;