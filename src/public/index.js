
import { getAncestor } from '../lib/windows';

export * from './client';
export * from './server';
export * from './config';

import * as windowUtil from '../lib/windows';

export let parent = getAncestor();

export { openBridge, linkUrl, isBridge, needsBridge, needsBridgeForBrowser, needsBridgeForWin, needsBridgeForDomain, openTunnelToOpener, destroyBridges } from '../bridge';

export { util } from '../lib/util';

export let winutil = windowUtil;
