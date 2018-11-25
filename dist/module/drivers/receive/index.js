var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { isWindowClosed, getDomain } from 'cross-domain-utils/src';
import { addEventListener, noop } from 'belter/src';

import { MESSAGE_NAME, WINDOW_PROP, MESSAGE_TYPE } from '../../conf';
import { markWindowKnown } from '../../lib';
import { deserializeMessage } from '../../serialize';
import { global } from '../../global';

import { RECEIVE_MESSAGE_TYPES } from './types';

global.receivedMessages = global.receivedMessages || [];

function parseMessage(message, source, origin) {

    var parsedMessage = void 0;

    try {
        parsedMessage = deserializeMessage(source, origin, message);
    } catch (err) {
        return;
    }

    if (!parsedMessage) {
        return;
    }

    if ((typeof parsedMessage === 'undefined' ? 'undefined' : _typeof(parsedMessage)) !== 'object' || parsedMessage === null) {
        return;
    }

    parsedMessage = parsedMessage[WINDOW_PROP.POSTROBOT];

    if (!parsedMessage || (typeof parsedMessage === 'undefined' ? 'undefined' : _typeof(parsedMessage)) !== 'object' || parsedMessage === null) {
        return;
    }

    if (!parsedMessage.type || typeof parsedMessage.type !== 'string') {
        return;
    }

    if (!RECEIVE_MESSAGE_TYPES[parsedMessage.type]) {
        return;
    }

    return parsedMessage;
}

export function receiveMessage(event) {

    if (!window || window.closed) {
        throw new Error('Message recieved in closed window');
    }

    try {
        if (!event.source) {
            return;
        }
    } catch (err) {
        return;
    }

    var source = event.source,
        origin = event.origin,
        data = event.data;


    if (__TEST__) {
        // $FlowFixMe
        origin = getDomain(source);
    }

    var message = parseMessage(data, source, origin);

    if (!message) {
        return;
    }

    markWindowKnown(source);

    if (global.receivedMessages.indexOf(message.id) === -1) {
        global.receivedMessages.push(message.id);
    } else {
        return;
    }

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
            console[level]('postrobot_receive', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', origin, '\n\n', message);
        }
    }

    if (isWindowClosed(source) && !message.fireAndForget) {
        return;
    }

    RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
}

export function messageListener(event) {

    try {
        noop(event.source);
    } catch (err) {
        return;
    }

    // $FlowFixMe
    var messageEvent = {
        source: event.source || event.sourceElement,
        origin: event.origin || event.originalEvent && event.originalEvent.origin,
        data: event.data
    };

    if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
        try {
            require('../../compat').emulateIERestrictions(messageEvent.source, window);
        } catch (err) {
            return;
        }
    }

    receiveMessage(messageEvent);
}

export function listenForMessages() {
    // $FlowFixMe
    addEventListener(window, 'message', messageListener);
}

global.receiveMessage = receiveMessage;