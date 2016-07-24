
import { CONFIG } from '../conf';
import { util, promise, isWindowClosed } from '../lib';
import { addRequestListener, removeRequestListener } from '../drivers';

export function listen(options) {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    options.handler = options.handler || util.noop;

    options.errorHandler = options.errorHandler || function(err) {
        throw err;
    };

    if (options.once) {
        let handler = options.handler;
        options.handler = util.once(function() {
            removeRequestListener(options);
            return handler.apply(this, arguments);
        });
    }

    let override = options.override || CONFIG.MOCK_MODE;

    addRequestListener(options.name, options.window, options, override);

    options.handleError = err => {
        // removeRequestListener(options);
        options.errorHandler(err);
    };

    if (options.window && options.errorOnClose) {
        let interval = util.safeInterval(() => {
            if (isWindowClosed(options.window)) {
                interval.cancel();
                options.handleError(new Error('Post message target window is closed'));
            }
        }, 50);
    }

    return {
        cancel() {
            removeRequestListener(options);
        }
    };
}

export function on(name, options, handler, errorHandler) {

    if (options instanceof Function) {
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

    if (options instanceof Function) {
        errorHandler = handler;
        handler = options;
        options = {};
    }

    options = options || {};

    options.name = name;
    options.handler = handler || options.handler;
    options.errorHandler = errorHandler || options.errorHandler;
    options.once = true;

    let prom = new promise.Promise((resolve, reject) => {
        options.handler = options.handler || ((source, data) => resolve(data));
        options.errorHandler = options.errorHandler || reject;
    });

    let listener = listen(options);

    util.extend(prom, listener);

    return prom;
}
