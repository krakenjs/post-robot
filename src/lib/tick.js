
import { util } from './util';

let tickMessageName = `__nextTick__postRobot__${util.uniqueID()}`;
let queue = [];

window.addEventListener('message', event => {
    if (event.data === tickMessageName) {
        let method = queue.shift();
        method.call();
    }
});

export function nextTick(method) {

    if (window.setImmediate) {
        return window.setImmediate.call(window, method);
    }

    if (window.nextTick) {
        return window.nextTick.call(window, method);
    }

    queue.push(method);
    window.postMessage(tickMessageName, '*');
}