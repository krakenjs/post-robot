var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { isWindowClosed, getDomain, isSameTopWindow } from 'cross-domain-utils/src';
import { addEventListener, noop } from 'belter/src';

import { WINDOW_PROP } from '../../conf';
import { markWindowKnown, needsGlobalMessagingForBrowser } from '../../lib';
import { deserializeMessage } from '../../serialize';
import { global, globalStore } from '../../global';

import { RECEIVE_MESSAGE_TYPES } from './types';

var receivedMessages = globalStore('receivedMessages');

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

    if (receivedMessages.has(message.id)) {
        return;
    }

    receivedMessages.set(message.id, true);

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

    if (!messageEvent.source) {
        return;
    }

    if (!messageEvent.origin) {
        throw new Error('Post message did not have origin domain');
    }

    if (__TEST__) {
        if (needsGlobalMessagingForBrowser() && isSameTopWindow(messageEvent.source, window) === false) {
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