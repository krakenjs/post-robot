
import { CONFIG, CONSTANTS } from '../conf';
import { messageListener } from '../drivers';

export function enableMockMode() {
    CONFIG.MOCK_MODE = true;
}

export function disableMockMode() {
    CONFIG.MOCK_MODE = false;
}

export { CONFIG, CONSTANTS } from '../conf';

export function disable() {
    delete window[CONSTANTS.WINDOW_PROPS.POSTROBOT];
    window.removeEventListener('message', messageListener);
}