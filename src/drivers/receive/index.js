
import { CONFIG, CONSTANTS, getWindowID } from '../../conf';
import { util, childWindows, deserializeMethods } from '../../lib';
import { emulateIERestrictions } from '../../compat';

import { sendMessage } from '../send';
import { listeners, getRequestListener } from '../listeners';

import { RECEIVE_MESSAGE_TYPES } from './types';

let receivedMessages = [];

function parseMessage(message) {

    try {
        message = JSON.parse(message);
    } catch (err) {
        return;
    }

    if (!message.type) {
        return;
    }

    if (!RECEIVE_MESSAGE_TYPES[message.type]) {
        return;
    }

    return message;
}

function getProxy(source, message) {

    if (CONFIG.MOCK_MODE) {
        return;
    }

    if (!message) {
        return;
    }

    let listener = getRequestListener(message.name, source);

    if (message.type === CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && listener && listener.proxy === false) {
        return;
    }

    let isResponseOrAck = (message.type === CONSTANTS.POST_MESSAGE_TYPE.REQUEST || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK) && listeners.response[message.hash];

    if (!isResponseOrAck) {
        for (let i = 0; i < listeners.proxies.length; i++) {
            let proxy = listeners.proxies[i];

            if (source === proxy.from) {
                return proxy.to;
            }
        }
    }

    if (message.target === 'parent.opener') {

        let win;

        try {
            win = window.parent.opener;
        } catch (err) {
            throw new Error('Can not get window.parent.opener to proxy to');
        }

        if (!win) {
            throw new Error('Can not get window.parent.opener to proxy to');
        }

        return win;

    }

    if (message.target && message.target !== getWindowID()) {

        let win = childWindows.getWindowById(message.target);

        if (!win) {
            throw new Error(`Unable to find window to proxy message to: ${message.target}`);
        }

        return win;
    }
}


export function receiveMessage(event) {

    let { source, origin, data } = event;

    let message = parseMessage(data);

    if (!message) {
        return;
    }

    if (receivedMessages.indexOf(message.id) === -1) {
        receivedMessages.push(message.id);
    } else {
        return;
    }

    childWindows.register(message.source, source, message.windowType);

    let proxyWindow = getProxy(source, message);

    if (proxyWindow) {
        delete message.target;
        return sendMessage(proxyWindow, message, '*', true);
    }

    util.log('#receive', message.type, message.name, message);

    if (CONFIG.MOCK_MODE) {
        return RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
    }

    deserializeMethods(source, message.data || message.response || {});

    RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
}

export function messageListener(event) {

    event = {
        source: event.source || event.sourceElement,
        origin: event.origin || event.originalEvent.origin,
        data: event.data
    };

    emulateIERestrictions(event.source, window);

    receiveMessage(event);
}
