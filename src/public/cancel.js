/* @flow */

import { cancelResponseListeners } from '../drivers';

export function cancelAll() {
    cancelResponseListeners();
}
