/* @flow */

import { isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, stringifyError } from 'belter/src';

import { MESSAGE_TYPE, CONFIG, MESSAGE_NAME, WILDCARD, WINDOW_PROP } from '../../conf';
import { serializeMessage } from '../../serialize';
import type { Message } from '../types';

import { SEND_MESSAGE_STRATEGIES } from './strategies';

function logMessage(domain : string | $ReadOnlyArray<string>, message : Message) {
    if (__DEBUG__) {
        let level;

        if (Object.keys(MESSAGE_NAME).map(key => MESSAGE_NAME[key]).indexOf(message.name) !== -1 || message.type === MESSAGE_TYPE.ACK) {
            level = 'debug';
        } else if (message.ack === 'error') {
            level = 'error';
        } else {
            level = 'info';
        }

        // eslint-disable-next-line no-console
        if (typeof console !== 'undefined' && typeof console[level] === 'function') {
            // eslint-disable-next-line no-console
            console[level]('postrobot_send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || WILDCARD, '\n\n', message);
        }
    }
}

export function sendMessage(win : CrossDomainWindowType, domain : string | $ReadOnlyArray<string>, message : Message) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        logMessage(domain, message);

        const serializedMessage = serializeMessage(win, domain, {
            [ WINDOW_PROP.POSTROBOT ]: {
                id: uniqueID(),
                ...message
            }
        });


        let messages = [];

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
