
import { uniqueID } from './util';
import { CONSTANTS } from '../conf';

let tickMessageName = `__nextTick__postRobot__${uniqueID()}`;
let queue = [];

window.addEventListener('message', event => {
    if (event.data === tickMessageName) {
        let method = queue.shift();
        method.call();
    }
});

export function nextTick(method) {
    queue.push(method);
    window.postMessage(tickMessageName, CONSTANTS.WILDCARD);
}
