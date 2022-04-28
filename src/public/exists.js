/* @flow */

import { getRequestListener } from '../drivers';
import type { ServerOptionsType } from '../types';

const getDefaultServerOptions = () : ServerOptionsType => {
    // $FlowFixMe
    return {};
};

export function listenerExists(name : string, options : ?ServerOptionsType) : boolean {

    if (!name) {
        throw new Error('Expected name');
    }

    options = options || getDefaultServerOptions();

    const win = options.window;
    const domain = options.domain;

    if (Array.isArray(domain)) {
        for (const item of domain) {
            if (getRequestListener({ name, win, domain: item })) {
                return true;
            }
        }
        return false;
    }

    return Boolean(getRequestListener({ name, win, domain }));
}
