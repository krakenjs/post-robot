/* @flow */

import { isWindowClosed, type CrossDomainWindowType, getDomain, isSameTopWindow } from 'cross-domain-utils/src';
import { addEventListener, noop } from 'belter/src';

import { __POST_ROBOT__ } from '../../conf';
import { markWindowKnown, needsGlobalMessagingForBrowser } from '../../lib';
import { deserializeMessage } from '../../serialize';
import { getGlobal, globalStore } from '../../global';
import type { OnType, SendType, MessageEvent, CancelableType } from '../../types';

import { RECEIVE_MESSAGE_TYPES } from './types';

function parseMessage(message : string, source : CrossDomainWindowType, origin : string, { on, send } : { on : OnType, send : SendType }) : ?Object {

    let parsedMessage;

    try {
        parsedMessage = deserializeMessage(source, origin, message, { on, send });
    } catch (err) {
        return;
    }

    if (!parsedMessage) {
        return;
    }

    if (typeof parsedMessage !== 'object' || parsedMessage === null) {
        return;
    }

    parsedMessage = parsedMessage[__POST_ROBOT__];

    if (!parsedMessage || typeof parsedMessage !== 'object' || parsedMessage === null) {
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

export function receiveMessage(event : MessageEvent, { on, send } : { on : OnType, send : SendType }) {
    const receivedMessages = globalStore('receivedMessages');

    if (!window || window.closed) {
        throw new Error(`Message recieved in closed window`);
    }

    try {
        if (!event.source) {
            return;
        }
    } catch (err) {
        return;
    }

    let { source, origin, data } = event;

    if (__TEST__) {
        // $FlowFixMe
        origin = getDomain(source);
    }

    const message = parseMessage(data, source, origin, { on, send });

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

    RECEIVE_MESSAGE_TYPES[message.type](source, origin, message, { on, send });
}

export function setupGlobalReceiveMessage({ on, send } : { on : OnType, send : SendType }) {
    const global = getGlobal();
    global.receiveMessage = global.receiveMessage || (message => receiveMessage(message, { on, send }));
}

type ListenerEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : string,
    sourceElement : CrossDomainWindowType,
    originalEvent? : { origin : string }
|};

export function messageListener(event : ListenerEvent, { on, send } : { on : OnType, send : SendType }) {

    try {
        noop(event.source);
    } catch (err) {
        return;
    }

    // $FlowFixMe
    const messageEvent : MessageEvent = {
        source: event.source || event.sourceElement,
        origin: event.origin || (event.originalEvent && event.originalEvent.origin),
        data:   event.data
    };

    if (!messageEvent.source) {
        return;
    }

    if (!messageEvent.origin) {
        throw new Error(`Post message did not have origin domain`);
    }

    if (__TEST__) {
        if (needsGlobalMessagingForBrowser() && isSameTopWindow(messageEvent.source, window) === false) {
            return;
        }
    }

    receiveMessage(messageEvent, { on, send });
}

export function listenForMessages({ on, send } : { on : OnType, send : SendType }) : CancelableType {
    return globalStore().getOrSet('postMessageListeners', () => {
        // $FlowFixMe
        return addEventListener(window, 'message', event => {
            // $FlowFixMe
            messageListener(event, { on, send });
        });
    });
}
