import { setup } from "./setup";
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

if (__POST_ROBOT__.__AUTO_SETUP__) {
  setup();
}
