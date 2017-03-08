
import { CONFIG, CONSTANTS } from '../conf';
import { sendMessage } from '../drivers';
import { global } from '../global';
import { util, promise, getAncestor, isAncestor, onWindowReady, isWindowClosed } from '../lib';


export function request(options) {

    return promise.nodeify(new promise.Promise((resolve, reject) => {

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

        options.domain = options.domain || '*';

        let hash = `${options.name}_${util.uniqueID()}`;
        global.clean.setItem(global.listeners.response, hash, options);

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

            if (isAncestor(window, options.window)) {
                return onWindowReady(options.window);
            }

        }).then(() => {

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

            let ackTimeout = util.intervalTimeout(CONFIG.ACK_TIMEOUT, 100, remaining => {

                if (options.ack || isWindowClosed(options.window)) {
                    return ackTimeout.cancel();
                }

                if (!remaining) {
                    return reject(new Error(`No ack for postMessage ${options.name} in ${CONFIG.ACK_TIMEOUT}ms`));
                }
            });

            if (options.timeout) {
                let timeout = util.intervalTimeout(options.timeout, 100, remaining => {

                    if (hasResult || isWindowClosed(options.window)) {
                        return timeout.cancel();
                    }

                    if (!remaining) {
                        return reject(new Error(`Post message response timed out after ${options.timeout} ms`));
                    }

                }, options.timeout);
            }

        }).catch(reject);

    }), options.callback);
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

