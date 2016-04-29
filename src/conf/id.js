
import { util } from '../lib/util';

export let getWindowID = util.memoize(() => {
    return window.name || util.uniqueID();
});