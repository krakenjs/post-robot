
import { CONSTANTS } from '../conf';
import { getParentWindow } from './windows';
import { on, send } from '../interface';
import { log } from './log';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { global } from '../global';

global.readyPromises = global.readyPromises || [];

export function initOnReady() {

    on(CONSTANTS.POST_MESSAGE_NAMES.READY, (win, data) => {

        for (let item of global.readyPromises) {
            if (item.win === win) {
                item.promise.resolve(win);
                return;
            }
        }

        global.readyPromises.push({
            win,
            promise: new Promise().resolve(win)
        });
    });

    let parent = getParentWindow();

    if (parent) {
        send(parent, CONSTANTS.POST_MESSAGE_NAMES.READY, {}).catch(err => {
            log.debug(err.stack || err.toString());
        });
    }
}

export function onWindowReady(win, timeout = 5000, name = 'Window') {

    for (let item of global.readyPromises) {
        if (item.win === win) {
            return item.promise;
        }
    }

    let promise = new Promise();

    global.readyPromises.push({
        win,
        promise
    });

    setTimeout(() => promise.reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);

    return promise;
}