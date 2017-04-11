
import { CONFIG, CONSTANTS } from '../conf';
import { sendMessage, addResponseListener, deleteResponseListener } from '../drivers';
import { util, promise, getAncestor, isAncestor, onWindowReady, isWindowClosed } from '../lib';

export function request(options) {

    let prom = promise.run(() => {

        if (!options.name) {
            throw new Error('Expected options.name');
        }


        if (CONFIG.MOCK_MODE) {
            options.window = window;

        } else if (typeof options.window === 'string') {
            let el = document.getElementById(options.window);

            if (!el) {
                throw new Error(`Expected options.window ${options.window} to be a valid element id`);
            }

            if (el.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${options.window} to be an iframe`);
            }

            if (!el.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            options.window = el.contentWindow;


        } else if (options.window instanceof HTMLElement) {

            if (options.window.tagName.toLowerCase() !== 'iframe') {
                throw new Error(`Expected options.window ${options.window} to be an iframe`);
            }

            if (!options.window.contentWindow) {
                throw new Error('Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.');
            }

            options.window = options.window.contentWindow;
        }

        if (!options.window) {
            throw new Error('Expected options.window to be a window object, iframe, or iframe element id.');
        }

        options.domain = options.domain || CONSTANTS.WILDCARD;

        let hash = `${options.name}_${util.uniqueID()}`;
        addResponseListener(hash, options);

        if (isWindowClosed(options.window)) {
            throw new Error('Target window is closed');
        }

        let hasResult = false;

        return promise.run(() => {

            if (isAncestor(window, options.window)) {
                return onWindowReady(options.window);
            }

        }).then(() => {

            return new promise.Promise((resolve, reject) => {

                options.respond = (err, result) => {
                    if (!err) {
                        hasResult = true;
                    }

                    return err ? reject(err) : resolve(result);
                };

                sendMessage(options.window, {
                    hash,
                    type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                    name: options.name,
                    data: options.data,
                    fireAndForget: options.fireAndForget
                }, options.domain).catch(reject);

                if (options.fireAndForget) {
                    return resolve();
                }

                let ackTimeout = CONFIG.ACK_TIMEOUT;
                let resTimeout = options.timeout || CONFIG.RES_TIMEOUT;

                let interval = util.safeInterval(() => {

                    if (options.ack && hasResult) {
                        return interval.cancel();
                    }

                    if (isWindowClosed(options.window)) {
                        interval.cancel();

                        if (!options.ack) {
                            return reject(new Error(`Window closed for ${options.name} before ack`));
                        }

                        return reject(new Error(`Window closed for ${options.name} before response`));
                    }

                    ackTimeout -= 100;
                    resTimeout -= 100;

                    if (ackTimeout <= 0 && !options.ack) {
                        interval.cancel();
                        return reject(new Error(`No ack for postMessage ${options.name} in ${CONFIG.ACK_TIMEOUT}ms`));
                    }

                    if (resTimeout <= 0 && !hasResult) {
                        interval.cancel();
                        return reject(new Error(`No response for postMessage ${options.name} in ${options.timeout || CONFIG.RES_TIMEOUT}ms`));
                    }

                }, 100);
            });

        }).catch(err => {

            deleteResponseListener(hash);

            throw err;
        });
    });

    return promise.nodeify(prom, options.callback);
}

export function send(window, name, data, options, callback) {

    if (!callback) {
        if (!options && typeof data === 'function') {
            callback = data;
            options = {};
            data = {};
        } else if (typeof options === 'function') {
            callback = options;
            options = {};
        }
    }

    options = options || {};
    options.window = window;
    options.name = name;
    options.data = data;
    options.callback = callback;

    return request(options);
}

export function sendToParent(name, data, options, callback) {

    let win = getAncestor();

    if (!win) {
        return new promise.Promise((resolve, reject) => reject(new Error('Window does not have a parent')));
    }

    return send(win, name, data, options, callback);
}

export function client(options = {}) {

    if (!options.window) {
        throw new Error(`Expected options.window`);
    }

    return {
        send(name, data, callback) {
            return send(options.window, name, data, options, callback);
        }
    };
}
