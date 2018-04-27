'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.receiveMessage = receiveMessage;
exports.messageListener = messageListener;
exports.listenForMessages = listenForMessages;

var _src = require('cross-domain-utils/src');

var _conf = require('../../conf');

var _lib = require('../../lib');

var _global = require('../../global');

var _types = require('./types');

_global.global.receivedMessages = _global.global.receivedMessages || [];

function parseMessage(message) {

    var parsedMessage = void 0;

    try {
        parsedMessage = (0, _lib.jsonParse)(message);
    } catch (err) {
        return;
    }

    if (!parsedMessage) {
        return;
    }

    if ((typeof parsedMessage === 'undefined' ? 'undefined' : _typeof(parsedMessage)) !== 'object' || parsedMessage === null) {
        return;
    }

    parsedMessage = parsedMessage[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];

    if (!parsedMessage || (typeof parsedMessage === 'undefined' ? 'undefined' : _typeof(parsedMessage)) !== 'object' || parsedMessage === null) {
        return;
    }

    if (!parsedMessage.type || typeof parsedMessage.type !== 'string') {
        return;
    }

    if (!_types.RECEIVE_MESSAGE_TYPES[parsedMessage.type]) {
        return;
    }

    return parsedMessage;
}

function receiveMessage(event) {

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


    var message = parseMessage(data);

    if (!message) {
        return;
    }

    if (!message.sourceDomain || typeof message.sourceDomain !== 'string') {
        throw new Error('Expected message to have sourceDomain');
    }

    if (message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) === 0 || message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) === 0) {
        origin = message.sourceDomain;
    }

    if (_global.global.receivedMessages.indexOf(message.id) === -1) {
        _global.global.receivedMessages.push(message.id);
    } else {
        return;
    }

    var level = void 0;

    if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
        level = 'debug';
    } else if (message.ack === 'error') {
        level = 'error';
    } else {
        level = 'info';
    }

    _lib.log.logLevel(level, ['\n\n\t', '#receive', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', origin, '\n\n', message]);

    if ((0, _src.isWindowClosed)(source) && !message.fireAndForget) {
        _lib.log.debug('Source window is closed - can not send ' + message.type + ' ' + message.name);
        return;
    }

    if (message.data) {
        message.data = (0, _lib.deserializeMethods)(source, origin, message.data);
    }

    _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
}

function messageListener(event) {

    try {
        (0, _lib.noop)(event.source);
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

function listenForMessages() {
    (0, _lib.addEventListener)(window, 'message', messageListener);
}

_global.global.receiveMessage = receiveMessage;