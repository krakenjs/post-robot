
import { getDomain, isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise';

import { CONSTANTS, CONFIG, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { uniqueID, some, serializeMethods, log, getWindowType, jsonStringify, promiseMap } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


export function buildMessage(win, message, options = {}) {

    let id   = uniqueID();
    let type = getWindowType();
    let sourceDomain = getDomain(window);

    return {
        ...message,
        ...options,
        sourceDomain,
        id:         message.id || id,
        windowType: type
    };
}


export function sendMessage(win, message, domain) {
    return ZalgoPromise.try(() => {

        message = buildMessage(win, message, {
            data: serializeMethods(win, domain, message.data),
            domain
        });

        let level;

        if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK) {
            level = 'debug';
        } else if (message.ack === 'error') {
            level = 'error';
        } else {
            level = 'info';
        }

        log.logLevel(level, [ '\n\n\t', '#send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || CONSTANTS.WILDCARD, '\n\n', message ]);

        if (CONFIG.MOCK_MODE) {
            delete message.target;
            return window[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                origin: getDomain(window),
                source: window,
                data: jsonStringify(message, 0, 2)
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

        let serializedMessage = jsonStringify({
            [ CONSTANTS.WINDOW_PROPS.POSTROBOT ]: message
        }, 0, 2);

        return promiseMap(Object.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return ZalgoPromise.try(() => {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error(`Strategy disallowed: ${strategyName}`);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);

            }).then(() => {
                messages.push(`${strategyName}: success`);
                return true;
            }, err => {
                messages.push(`${strategyName}: ${err.stack || err.toString()}\n`);
                return false;
            });

        }).then(results => {

            let success = some(results);
            let status = `${message.type} ${message.name} ${success ? 'success' : 'error'}:\n  - ${messages.join('\n  - ')}\n`;

            log.debug(status);

            if (!success) {
                throw new Error(status);
            }
        });
    });
}
