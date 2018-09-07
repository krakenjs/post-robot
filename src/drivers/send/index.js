/* @flow */

import { getDomain, isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { CONSTANTS, CONFIG, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { uniqueID, serializeMethods, getWindowType, jsonStringify, stringifyError } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


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


export function sendMessage(win : CrossDomainWindowType, message : Object, domain : string | Array<string>) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        message = buildMessage(win, message, {
            data: serializeMethods(win, domain, message.data),
            domain
        });

        let level;

        if (__DEBUG__) {
            if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK) {
                level = 'debug';
            } else if (message.ack === 'error') {
                level = 'error';
            } else {
                level = 'info';
            }

            // eslint-disable-next-line no-console
            console[level]('postrobot_send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || CONSTANTS.WILDCARD, '\n\n', message);
        }

        if (win === window && !CONFIG.ALLOW_SAME_ORIGIN) {
            throw new Error('Attemping to send message to self');
        }

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        let messages = [];

        let serializedMessage = jsonStringify({
            [ CONSTANTS.WINDOW_PROPS.POSTROBOT ]: message
        }, null, 2);

        return ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return ZalgoPromise.try(() => {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error(`Strategy disallowed: ${ strategyName }`);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);

            }).then(() => {
                messages.push(`${ strategyName }: success`);
                return true;
            }, err => {
                messages.push(`${ strategyName }: ${ stringifyError(err) }\n`);
                return false;
            });

        }).then(results => {

            let success = results.some(Boolean);
            let status = `${ message.type } ${ message.name } ${ success ? 'success' : 'error' }:\n  - ${ messages.join('\n  - ') }\n`;

            if (!success) {
                throw new Error(status);
            }
        });
    });
}
