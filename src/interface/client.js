
import { CONFIG, CONSTANTS } from '../conf';
import { listeners, sendMessage } from '../drivers';
import { util, promise, getParentWindow, onWindowReady, isWindowClosed } from '../lib';


export function request(options) {

    return promise.nodeify(new promise.Promise((resolve, reject) => {

        if (!options.name) {
            throw new Error('Expected options.name');
        }

        if (!options.window) {
            throw new Error('Expected options.window');
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

            options.window = el.contentWindow;

            if (!options.window) {
                throw new Error('Expected options.window');
            }
        }

        let hash = `${options.name}_${util.uniqueID()}`;
        listeners.response[hash] = options;

        if (isWindowClosed(options.window)) {
            throw new Error('Target window is closed');
        }

        let hasResult = false;

        options.respond = (err, result) => {
            if (!err) {
                hasResult = true;
            }

            return err ? reject(err) : resolve(result);
        };

        return promise.run(() => {

            if (getParentWindow(options.window) === window) {
                return onWindowReady(options.window);
            }

        }).then(() => {

            if (options.timeout) {
                let timeout = util.intervalTimeout(options.timeout, 100, remaining => {

                    if (hasResult) {
                        return timeout.cancel();
                    }

                    if (!remaining) {
                        return reject(new Error(`Post message response timed out after ${options.timeout} ms`));
                    }

                }, options.timeout);
            }

            sendMessage(options.window, {
                hash,
                type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                name: options.name,
                data: options.data
            }, options.domain || '*').catch(reject);

            let ackTimeout = util.intervalTimeout(CONFIG.ACK_TIMEOUT, 100, remaining => {

                if (options.ack) {
                    return ackTimeout.cancel();
                }

                if (!remaining) {
                    return reject(new Error(`No ack for postMessage ${options.name} in ${CONFIG.ACK_TIMEOUT}ms`));
                }
            });

        }).catch(reject);

    }), options.callback);
}

export function send(window, name, data, options, callback) {

    if (!callback) {
        if (!options && data instanceof Function) {
            callback = data;
            options = {};
            data = {};
        } else if (options instanceof Function) {
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

    let win = getParentWindow();

    if (!window) {
        throw new Error('Window does not have a parent');
    }

    return send(win, name, data, options, callback);
}



