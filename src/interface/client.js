
import { CONFIG, CONSTANTS } from '../conf';
import { listeners, sendMessage } from '../drivers';
import { util, promise } from '../lib';


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

        if (options.window.closed) {
            throw new Error('Target window is closed');
        }

        if (options.timeout) {
            setTimeout(() => {
                return reject(new Error(`Post message response timed out after ${options.timeout} ms`));
            }, options.timeout);
        }

        options.respond = (err, result) => {
            return err ? reject(err) : resolve(result);
        };

        sendMessage(options.window, {
            hash,
            type: CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
            name: options.name,
            data: options.data || {}
        }).catch(reject);

        setTimeout(() => {
            if (!options.ack) {
                return reject(new Error(`No ack for postMessage ${options.name}`));
            }
        }, CONFIG.ACK_TIMEOUT);

    }), options.callback);
}

export function send(window, name, data, callback) {

    if (!callback && data instanceof Function) {
        callback = data;
        data = {};
    }
    
    return request({ window, name, data, callback });
}

export function sendToParent(name, data, callback) {
    if (!util.getParent()) {
        throw new Error('Window does not have a parent');
    }

    return send(util.getParent(), name, data, callback);
}
