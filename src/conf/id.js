
import { util } from '../lib/util';

export let getWindowID = util.memoize(() => {
    return window.name || `${util.getType()}_${util.uniqueID()}`;
});