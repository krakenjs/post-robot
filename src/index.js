
import { getWindowID } from './conf';
import { util, childWindows, propagate, log } from './lib';
import { messageListener } from './drivers';
import { registerGlobals } from './compat';

function init() {

    registerGlobals();

    // Log the window id
    log.debug('ID', getWindowID());

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


let parent = (window.opener || window.parent);

if (window !== parent && 0) {
    window.console.log = function() {
        let args = Array.prototype.slice.call(arguments);
        args.unshift(window.location.pathname);
        return parent.console.log.apply(parent.console, args);
    };
}

