var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { isWindowClosed } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, stringifyError } from 'belter/src';

import { MESSAGE_TYPE, CONFIG, MESSAGE_NAME, WILDCARD, WINDOW_PROP } from '../../conf';
import { serializeMessage, getWindowType } from '../../lib';


import { SEND_MESSAGE_STRATEGIES } from './strategies';

function logMessage(domain, message) {
    if (__DEBUG__) {
        var level = void 0;

        if (Object.keys(MESSAGE_NAME).map(function (key) {
            return MESSAGE_NAME[key];
        }).indexOf(message.name) !== -1 || message.type === MESSAGE_TYPE.ACK) {
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

export function sendMessage(win, domain, message) {
    return ZalgoPromise['try'](function () {
        var _serializeMessage;

        if (isWindowClosed(win)) {
            throw new Error('Window is closed');
        }

        logMessage(domain, message);

        var serializedMessage = serializeMessage(win, domain, (_serializeMessage = {}, _serializeMessage[WINDOW_PROP.POSTROBOT] = _extends({}, message, {
            id: uniqueID(),
            windowType: getWindowType()
        }), _serializeMessage));

        var messages = [];

        return ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), function (strategyName) {

            return ZalgoPromise['try'](function () {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error('Strategy disallowed: ' + strategyName);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
            }).then(function () {
                messages.push(strategyName + ': success');
                return true;
            }, function (err) {
                messages.push(strategyName + ': ' + stringifyError(err) + '\n');
                return false;
            });
        }).then(function (results) {

            var success = results.some(Boolean);
            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

            if (!success) {
                throw new Error(status);
            }
        });
    });
}