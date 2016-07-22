
import { CONSTANTS } from '../conf';
import { getParentWindow } from './windows';
import { on, send } from '../interface';
import { log } from './log';
import { promise } from './promise';

let readyWindows = [];
let readyPromises = [];

export function initOnReady() {

    on(CONSTANTS.POST_MESSAGE_NAMES.READY, (source, data) => {
        readyWindows.push(source);

        for (let item of readyPromises) {
            if (item.win === source) {
                item.resolve(item.win);
            }
        }
    });

    let parent = getParentWindow();

    if (parent) {
        send(parent, CONSTANTS.POST_MESSAGE_NAMES.READY, {}).catch(err => {
            log.debug(err.stack || err.toString());
        });
    }
}

export function onWindowReady(win, timeout = 5000, name = 'Window') {
    return new promise.Promise((resolve, reject) => {

        if (readyWindows.indexOf(win) !== -1) {
            return resolve(win);
        } else {
            readyPromises.push({
                win,
                resolve
            });

            setTimeout(() => reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);
        }
    });
}