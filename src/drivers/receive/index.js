
import { CONFIG, CONSTANTS, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { getWindowById, registerWindow, deserializeMethods, log, getOpener, getWindowId, isWindowClosed } from '../../lib';
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

function getWindow(hint, windowID) {

    let windowTargets = {
        'window.parent': id => window.parent,
        'window.opener': id => getOpener(window),
        'window.parent.opener': id => getOpener(window.parent),
        'window.opener.parent': id => getOpener(window).parent
    };

    let win;

    try {
        win = windowTargets[hint](windowID);
    } catch (err) {
        throw new Error(`Can not get ${hint}: ${err.message}`);
    }

    if (!win) {
        throw new Error(`Can not get ${hint}: not available`);
    }

    return win;
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

    if (message.targetHint) {
        let win = getWindow(message.targetHint, message.target);
        delete message.targetHint;
        return win;
    }

    if (message.target && message.target !== getWindowId(window)) {

        let win = getWindowById(message.target);

        if (!win) {
            throw new Error(`Unable to find window to proxy message to: ${message.target}`);
        }

        return win;
    }
}


export function receiveMessage(event) {

    try {
        event.source // eslint-disable-line
    } catch (err) {
        return;
    }

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

    registerWindow(message.source, source);

    let proxyWindow;

    try {
        proxyWindow = getProxy(source, message);
    } catch (err) {
        return log.debug(err.message);
    }

    let level;

    if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK || proxyWindow) {
        level = 'debug';
    } else if (message.ack === 'error') {
        level = 'error';
    } else {
        level = 'info';
    }

    log.logLevel(level, [ proxyWindow ? '#receiveproxy' : '#receive', message.type, message.name, message ]);

    if (proxyWindow) {

        if (isWindowClosed(proxyWindow)) {
            return log.debug(`Target window is closed: ${message.target} - can not proxy ${message.type} ${message.name}`);
        }

        delete message.target;
        return sendMessage(proxyWindow, message, message.domain || '*', true);
    }

    if (message.originalSource !== message.source) {

        if (message.sourceHint) {
            source = getWindow(message.sourceHint, message.originalSource);
            delete message.sourceHint;
        } else {
            let originalSource = getWindowById(message.originalSource);
            if (originalSource) {
                source = originalSource;
            } else {
                throw new Error(`Can not find original message source: ${message.originalSource}`);
            }
        }

        registerWindow(message.originalSource, source);
    }

    if (isWindowClosed(source)) {
        return log.debug(`Source window is closed: ${message.originalSource} - can not send ${message.type} ${message.name}`);
    }

    if (CONFIG.MOCK_MODE) {
        return RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
    }

    if (message.data) {
        message.data = deserializeMethods(source, message.data);
    }

    RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
}

export function messageListener(event) {

    try {
        event.source // eslint-disable-line
    } catch (err) {
        return;
    }

    event = {
        source: event.source || event.sourceElement,
        origin: event.origin || event.originalEvent.origin,
        data: event.data
    };

    try {
        emulateIERestrictions(event.source, window);
    } catch (err) {
        return;
    }

    receiveMessage(event);
}
