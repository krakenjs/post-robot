
import { util, initOnReady } from './lib';
import { messageListener } from './drivers';
import { registerGlobals } from './compat';

function init() {

    registerGlobals();

    // Listen for all incoming post-messages
    util.listen(window, 'message', messageListener);

    initOnReady();
}

init();

export * from './interface';
export { Promise } from './lib';

export default module.exports;