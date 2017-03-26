
import { getAncestor } from '../lib/windows';

export * from './client';
export * from './server';
export * from './config';

import * as windowUtil from '../lib/windows';

export let parent = getAncestor();

export let bridge;

if (__IE_POPUP_SUPPORT__) {
    bridge = require('../bridge/interface');
}

export { util } from '../lib/util';

export let winutil = windowUtil;
