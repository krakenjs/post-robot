
import { global } from '../global';
import { receiveMessage } from '../drivers';

global.postMessage = global.postMessage || function postMessage(event) {
    receiveMessage(event);
};