
import { getWindowID } from './conf';
import { util, childWindows, propagate } from './lib';
import { messageListener } from './drivers';
import { registerGlobals } from './compat';

function init() {

    registerGlobals();

    // Log the window id
    util.debug('ID', getWindowID());

    // Listen for all incoming post-messages
    util.listen(window, 'message', messageListener);

    // Register the current window
    childWindows.register(getWindowID(), window, util.getType());

    // Message up to all other parent windows with our id
    propagate(getWindowID());
}

init();

export * from './interface';
export { Promise } from './lib';

export default module.exports;