/* @flow */

import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { global } from './global';

export function cleanUpWindow(win : CrossDomainWindowType) {

    // global.tunnelWindows
    // global.bridges
    // global.popupWindowsByName
    // global.responseListeners
    // global.requestListeners

    let requestPromises = global.requestPromises.get(win);

    if (requestPromises) {
        for (let promise of requestPromises) {
            promise.reject(new Error(`No response from window - cleaned up`));
        }
    }

    if (global.popupWindowsByWin) {
        global.popupWindowsByWin.delete(win);
    }

    if (global.remoteWindows) {
        global.remoteWindows.delete(win);
    }

    global.requestPromises.delete(win);
    global.methods.delete(win);
    global.readyPromises.delete(win);
}
