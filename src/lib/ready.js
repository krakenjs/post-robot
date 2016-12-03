
import { CONSTANTS } from '../conf';
import { getAncestor } from './windows';
import { on, send } from '../interface';
import { log } from './log';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { global } from '../global';

global.readyPromises = global.readyPromises || [];

export function initOnReady() {

    on(CONSTANTS.POST_MESSAGE_NAMES.READY, { window: '*', domain: '*' }, event => {

        for (let item of global.readyPromises) {
            if (item.win === event.source) {
                item.promise.resolve(event);
                return;
            }
        }

        global.clean.push(global.readyPromises, {
            win: event.source,
            promise: new Promise().resolve(event)
        });
    });

    let parent = getAncestor();

    if (parent) {
        send(parent, CONSTANTS.POST_MESSAGE_NAMES.READY, {}, { domain: '*' }).catch(err => {
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

    global.clean.push(global.readyPromises, { win, promise });

    setTimeout(() => promise.reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);

    return promise;
}
