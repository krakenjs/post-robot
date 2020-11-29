/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType, getDomain, isSameTopWindow, PROTOCOL  } from 'cross-domain-utils/src';
import { addEventListener, noop } from 'belter/src';

import type { Message } from '../types';
import { MESSAGE_TYPE } from '../../conf';
import { markWindowKnown, needsGlobalMessagingForBrowser } from '../../lib';
import { deserializeMessage } from '../../serialize';
import { getGlobal, globalStore, getGlobalKey } from '../../global';
import type { OnType, SendType, MessageEvent, CancelableType } from '../../types';

import { handleRequest, handleResponse, handleAck } from './types';

function deserializeMessages(message : string, source : CrossDomainWindowType, origin : string, { on, send } : {| on : OnType, send : SendType |}) : ?$ReadOnlyArray<Message> {
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

    const parseMessages = parsedMessage[getGlobalKey()];

    if (!Array.isArray(parseMessages)) {
        return;
    }

    return parseMessages;
}

export function receiveMessage(event : MessageEvent, { on, send } : {| on : OnType, send : SendType |}) {
    const receivedMessages = globalStore('receivedMessages');

    try {
        if (!window || window.closed || !event.source) {
            return;
        }
    } catch (err) {
        return;
    }

    let { source, origin, data } = event;

    if (__TEST__) {
        if (isWindowClosed(source)) {
            return;
        }

        // $FlowFixMe
        origin = getDomain(source);
    }

    const messages = deserializeMessages(data, source, origin, { on, send });

    if (!messages) {
        return;
    }

    markWindowKnown(source);

    for (const message of messages) {
        if (receivedMessages.has(message.id)) {
            return;
        }

        receivedMessages.set(message.id, true);

        if (isWindowClosed(source) && !message.fireAndForget) {
            return;
        }

        if (message.origin.indexOf(PROTOCOL.FILE) === 0) {
            origin = `${ PROTOCOL.FILE }//`;
        }

        try {
            if (message.type === MESSAGE_TYPE.REQUEST) {
                handleRequest(source, origin, message, { on, send });
            } else if (message.type === MESSAGE_TYPE.RESPONSE) {
                handleResponse(source, origin, message);
            } else if (message.type === MESSAGE_TYPE.ACK) {
                handleAck(source, origin, message);
            }
        } catch (err) {
            setTimeout(() => {
                throw err;
            }, 0);
        }
    }
}

export function setupGlobalReceiveMessage({ on, send } : {| on : OnType, send : SendType |}) {
    const global = getGlobal();
    global.receiveMessage = global.receiveMessage || (message => receiveMessage(message, { on, send }));
}

type ListenerEvent = {|
    source : CrossDomainWindowType,
    origin : string,
    data : string,
    sourceElement : CrossDomainWindowType,
    originalEvent? : {| origin : string |}
|};

export function messageListener(event : ListenerEvent, { on, send } : {| on : OnType, send : SendType |}) {
    ZalgoPromise.try(() => {
        try {
            noop(event.source);
        } catch (err) {
            return;
        }

        const source = event.source || event.sourceElement;
        let origin = event.origin || (event.originalEvent && event.originalEvent.origin);
        const data = event.data;

        if (origin === 'null') {
            origin = `${ PROTOCOL.FILE }//`;
        }

        if (!source) {
            return;
        }

        if (!origin) {
            throw new Error(`Post message did not have origin domain`);
        }

        if (__TEST__) {
            if (needsGlobalMessagingForBrowser() && isSameTopWindow(source, window) === false) {
                return;
            }
        }

        receiveMessage({ source, origin, data }, { on, send });
    });
}

export function listenForMessages({ on, send } : {| on : OnType, send : SendType |}) : CancelableType {
    return globalStore().getOrSet('postMessageListener', () => {
        return addEventListener(window, 'message', event => {
            // $FlowFixMe
            messageListener(event, { on, send });
        });
    });
}

export function stopListenForMessages() {
    const listener = globalStore().get('postMessageListener');
    if (listener) {
        listener.cancel();
    }
}
