/* @flow */

declare var UInt8Array: Function;

import { WeakMap } from 'cross-domain-safe-weakmap/src';

import { getDomain, isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS, CONFIG, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { uniqueID, serializeMethods, log, getWindowType, jsonStringify, stringifyError } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';

// import * as Msgpack5_func from 'msgpack5';
const msgpack5 = require('msgpack5')(); // new Msgpack5_func();

const msgpack_encode = msgpack5.encode.bind(msgpack5);

export const msgpack_support = new WeakMap();


function buildMessage(win : CrossDomainWindowType, message : Object, options = {}) : Object {

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


export function sendMessage(win : CrossDomainWindowType, message : Object, domain : string) : ZalgoPromise<void> {
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

        if (win === window) {
            throw new Error('Attemping to send message to self');
        }

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        log.debug('Running send message strategies', message);

        let messages = [];
		
        let encoder = jsonStringify;
		
        if (msgpack_support.get(win)) { encoder = msgpack_encode; }
		
        let serializedMessage = encoder({
            [ CONSTANTS.WINDOW_PROPS.POSTROBOT ]: message
        }, null, 2);

        return ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return ZalgoPromise.try(() => {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error(`Strategy disallowed: ${strategyName}`);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);

            }).then(() => {
                messages.push(`${strategyName}: success`);
                return true;
            }, err => {
                messages.push(`${strategyName}: ${stringifyError(err)}\n`);
                return false;
            });

        }).then(results => {

            let success = results.some(Boolean);
            let status = `${message.type} ${message.name} ${success ? 'success' : 'error'}:\n  - ${messages.join('\n  - ')}\n`;

            log.debug(status);

            if (!success) {
                throw new Error(status);
            }
        });
    });
}
