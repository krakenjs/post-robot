
import { getWindowID } from './conf';
import { util, childWindows, initOnReady } from './lib';
import { messageListener } from './drivers';
import { registerGlobals } from './compat';

function init() {

    registerGlobals();

    // Listen for all incoming post-messages
    util.listen(window, 'message', messageListener);

    // Register the current window
    childWindows.register(getWindowID(), window, util.getType());

    initOnReady();
}

init();

export * from './interface';
export { Promise } from './lib';

export default module.exports;