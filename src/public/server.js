
import { isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { noop, once as onceFunction, extend, safeInterval } from '../lib';
import { addRequestListener } from '../drivers';
import { CONSTANTS } from '../conf';

export function listen(options) {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    options.handler = options.handler || noop;

    options.errorHandler = options.errorHandler || function(err) {
        throw err;
    };

    if (options.source) {
        options.window = options.source;
    }

    options.domain = options.domain || CONSTANTS.WILDCARD;

    let requestListener = addRequestListener({ name: options.name, win: options.window, domain: options.domain }, options);

    if (options.once) {
        let handler = options.handler;
        options.handler = onceFunction(function() {
            requestListener.cancel();
            return handler.apply(this, arguments);
        });
    }

    options.handleError = err => {
        options.errorHandler(err);
    };

    if (options.window && options.errorOnClose) {
        let interval = safeInterval(() => {
            if (isWindowClosed(options.window)) {
                interval.cancel();
                options.handleError(new Error('Post message target window is closed'));
            }
        }, 50);
    }

    return {
        cancel() {
            requestListener.cancel();
        }
    };
}

export function on(name, options, handler, errorHandler) {

    if (typeof options === 'function') {
        errorHandler = handler;
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;
    options.errorHandler = errorHandler || options.errorHandler;

    return listen(options);
}

export function once(name, options, handler, errorHandler) {

    if (typeof options === 'function') {
        errorHandler = handler;
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;
    options.errorHandler = errorHandler || options.errorHandler;
    options.once = true;

    let prom = new ZalgoPromise((resolve, reject) => {
        options.handler = options.handler || (event => resolve(event));
        options.errorHandler = options.errorHandler || reject;
    });

    let myListener = listen(options);

    extend(prom, myListener);

    return prom;
}

export function listener(options = {}) {

    return {
        on(name, handler, errorHandler) {
            return on(name, options, handler, errorHandler);
        }
    };
}
