
import { getParentWindow } from '../lib/windows';

export * from './client';
export * from './server';
export * from './proxy';
export * from './config';

export let parent = getParentWindow();

export { resetListeners as reset } from '../drivers';

export { openBridge } from '../compat/bridge';

export { util } from '../lib/util';
export { linkUrl } from '../lib/windows';