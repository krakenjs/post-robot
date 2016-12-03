
import { CONSTANTS, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { deserializeMethods, log, isWindowClosed, jsonParse, util } from '../../lib';
import { emulateIERestrictions } from '../../compat';
import { global } from '../../global';

import { RECEIVE_MESSAGE_TYPES } from './types';

global.receivedMessages = global.receivedMessages || [];

function parseMessage(message) {

    try {
        message = jsonParse(message);
    } catch (err) {
        return;
    }

    if (!message) {
        return;
    }

    message = message[CONSTANTS.WINDOW_PROPS.POSTROBOT];

    if (!message) {
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


export function receiveMessage(event) {

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

    let message = parseMessage(data);

    if (!message) {
        return;
    }

    if (message.sourceDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0 || message.sourceDomain.indexOf(CONSTANTS.FILE_PROTOCOL) === 0) {
        origin = message.sourceDomain;
    }

    if (global.receivedMessages.indexOf(message.id) === -1) {
        global.receivedMessages.push(message.id);
    } else {
        return;
    }

    let level;

    if (POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === CONSTANTS.POST_MESSAGE_TYPE.ACK) {
        level = 'debug';
    } else if (message.ack === 'error') {
        level = 'error';
    } else {
        level = 'info';
    }

    log.logLevel(level, [ '\n\n\t', '#receive', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', origin, '\n\n', message ]);

    if (isWindowClosed(source)) {
        return log.debug(`Source window is closed - can not send ${message.type} ${message.name}`);
    }

    if (message.data) {
        message.data = deserializeMethods(source, origin, message.data);
    }

    RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
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

export function listenForMessages() {
    util.listen(window, 'message', messageListener);
}
