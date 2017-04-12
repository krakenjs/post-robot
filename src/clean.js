
import { global } from './global';

export function cleanUpWindow(win) {

    // global.tunnelWindows
    // global.bridges
    // global.popupWindowsByName
    // global.responseListeners
    // global.requestListeners

    let requestPromises = global.requestPromises.get(win);

    if (requestPromises) {
        for (let promise of requestPromises) {
            promise.reject(new Error(`Window cleaned up`));
        }
    }

    global.requestPromises.delete(win);
    global.popupWindowsByWin.delete(win);
    global.remoteWindows.delete(win);
    global.methods.delete(win);
    global.readyPromises.delete(win);
    global.domainMatches.delete(win);
}
