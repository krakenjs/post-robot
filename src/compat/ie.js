
import { CONFIG } from '../conf';
import { isSameTopWindow, isSameDomain } from '../lib';

export function emulateIERestrictions(sourceWindow, targetWindow) {
    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {

        if (isSameDomain(sourceWindow) && isSameDomain(targetWindow)) {
            return;
        }

        if (!isSameTopWindow(sourceWindow, targetWindow)) {
            throw new Error(`Can not send and receive post messages between two different windows (disabled to emulate IE)`);
        }
    }
}