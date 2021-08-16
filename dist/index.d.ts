export { ZalgoPromise as Promise } from 'zalgo-promise/src';
export * from './types';
export { ProxyWindow } from './serialize';
export { setup, destroy, serializeMessage, deserializeMessage, createProxyWindow, toProxyWindow } from './setup';
export { on, once, send } from './public';
export { markWindowKnown } from './lib';
export { cleanUpWindow } from './clean';
export declare let bridge: any;
