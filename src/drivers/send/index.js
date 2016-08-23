
import { CONSTANTS, CONFIG, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { util, promise, getWindowId, serializeMethods, log, isWindowClosed, getWindowType } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


export function buildMessage(win, message, options = {}) {

    let id     = util.uniqueID();
    let source = getWindowId(window);
    let type   = getWindowType();
    let target = getWindowId(win);
    let sourceDomain = util.getDomain(window);

    return {
        ...message,
        ...options,
        id:                   message.id || id,
        source,
        originalSource:       message.originalSource || source,
        sourceDomain,
        originalSourceDomain: message.originalSourceDomain || sourceDomain,
        windowType:           type,
        originalWindowType:   message.originalWindowType || type,
        target:               message.target || target
    };
}


export function sendMessage(win, message, domain, isProxy) {
    return promise.run(() => {

        message = buildMessage(win, message, {
            data: serializeMethods(win, message.data),
            domain
        });

        let level;

        if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK || isProxy) {
            level = 'debug';
        } else if (message.ack === 'error') {
            level = 'error';
        } else {
            level = 'info';
        }

        log.logLevel(level, [ isProxy ? '#sendproxy' : '#send', message.type, message.name, message ]);

        if (CONFIG.MOCK_MODE) {
            delete message.target;
            return window[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                origin: util.getDomain(window),
                source: window,
                data: JSON.stringify(message)
            });
        }

        if (win === window) {
            throw new Error('Attemping to send message to self');
        }

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        log.debug('Running send message strategies', message);

        let messages = [];

        return promise.map(util.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return promise.run(() => {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error(`Strategy disallowed: ${strategyName}`);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);

            }).then(() => {
                messages.push(`${strategyName}: success`);
                return true;
            }, err => {
                messages.push(`${strategyName}: ${err.message}`);
                return false;
            });

        }).then(results => {

            let success = util.some(results);
            let status = `${message.type} ${message.name} ${success ? 'success' : 'error'}:\n  - ${messages.join('\n  - ')}\n`;

            log.debug(status);

            if (!success) {
                throw new Error(status);
            }
        });
    });
}