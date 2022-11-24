import { setup } from "./setup";
import {
  setupBridge,
  openBridge,
  linkWindow,
  linkUrl,
  isBridge,
  needsBridge,
  needsBridgeForBrowser,
  hasBridge,
  needsBridgeForWin,
  needsBridgeForDomain,
  destroyBridges,
} from "./bridge";
export { ZalgoPromise as Promise } from "@krakenjs/zalgo-promise";
export * from "./types";
export { ProxyWindow } from "./serialize";
export {
  setup,
  destroy,
  serializeMessage,
  deserializeMessage,
  createProxyWindow,
  toProxyWindow,
} from "./setup";
export { on, once, send } from "./public";
export { markWindowKnown } from "./lib";
export { cleanUpWindow } from "./clean";
// @ts-expect-error
export let bridge;

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
  bridge = {
    setupBridge,
    openBridge,
    linkWindow,
    linkUrl,
    isBridge,
    needsBridge,
    needsBridgeForBrowser,
    hasBridge,
    needsBridgeForWin,
    needsBridgeForDomain,
    destroyBridges,
  };
}

if (__POST_ROBOT__.__AUTO_SETUP__) {
  setup();
}
