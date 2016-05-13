
import { CONFIG } from '../conf';
import { util } from '../lib';
import { addRequestListener, removeRequestListener } from '../drivers';

export function listen(options) {

    if (!options.name) {
        throw new Error('Expected options.name');
    }

    if (!options.handler) {
        throw new Error('Expected options.handler');
    }

    options.errorHandler = options.errorHandler || util.noop;

    if (options.once) {
        options.handler = util.once(options.handler);
    }

    let override = options.override || CONFIG.MOCK_MODE;

    addRequestListener(options.name, options.window, options, override);

    options.handleError = err => {
        removeRequestListener(options);
        options.errorHandler(err);
    };

    if (options.window && options.errorOnClose) {
        let interval = setInterval(() => {
            if (options.window.closed) {
                clearInterval(interval);
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

    options.name = name;
    options.handler = handler || options.handler;
    options.errorHandler = errorHandler || options.errorHandler;
    options.once = true;

    return listen(options);
}
