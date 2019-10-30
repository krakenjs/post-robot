"use strict";

exports.__esModule = true;
exports.receiveMessage = receiveMessage;
exports.setupGlobalReceiveMessage = setupGlobalReceiveMessage;
exports.messageListener = messageListener;
exports.listenForMessages = listenForMessages;
exports.stopListenForMessages = stopListenForMessages;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _lib = require("../../lib");

var _serialize = require("../../serialize");

var _global = require("../../global");

var _types = require("./types");

function parseMessage(message, source, origin, {
  on,
  send
}) {
  let parsedMessage;

  try {
    parsedMessage = (0, _serialize.deserializeMessage)(source, origin, message, {
      on,
      send
    });
  } catch (err) {
    return;
  }

  if (!parsedMessage) {
    return;
  }

  if (typeof parsedMessage !== 'object' || parsedMessage === null) {
    return;
  }

  parsedMessage = parsedMessage[__POST_ROBOT__.__GLOBAL_KEY__];

  if (!parsedMessage || typeof parsedMessage !== 'object' || parsedMessage === null) {
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

function receiveMessage(event, {
  on,
  send
}) {
  const receivedMessages = (0, _global.globalStore)('receivedMessages');

  try {
    if (!window || window.closed || !event.source) {
      return;
    }
  } catch (err) {
    return;
  }

  let {
    source,
    origin,
    data
  } = event;

  if (__TEST__) {
    // $FlowFixMe
    origin = (0, _src.getDomain)(source);
  }

  const message = parseMessage(data, source, origin, {
    on,
    send
  });

  if (!message) {
    return;
  }

  (0, _lib.markWindowKnown)(source);

  if (receivedMessages.has(message.id)) {
    return;
  }

  receivedMessages.set(message.id, true);

  if ((0, _src.isWindowClosed)(source) && !message.fireAndForget) {
    return;
  }

  if (message.origin.indexOf(_src.PROTOCOL.FILE) === 0) {
    origin = `${_src.PROTOCOL.FILE}//`;
  }

  _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message, {
    on,
    send
  });
}

function setupGlobalReceiveMessage({
  on,
  send
}) {
  const global = (0, _global.getGlobal)();

  global.receiveMessage = global.receiveMessage || (message => receiveMessage(message, {
    on,
    send
  }));
}

function messageListener(event, {
  on,
  send
}) {
  try {
    (0, _src2.noop)(event.source);
  } catch (err) {
    return;
  }

  const source = event.source || event.sourceElement;
  let origin = event.origin || event.originalEvent && event.originalEvent.origin;
  const data = event.data;

  if (origin === 'null') {
    origin = `${_src.PROTOCOL.FILE}//`;
  }

  if (!source) {
    return;
  }

  if (!origin) {
    throw new Error(`Post message did not have origin domain`);
  }

  if (__TEST__) {
    if ((0, _lib.needsGlobalMessagingForBrowser)() && (0, _src.isSameTopWindow)(source, window) === false) {
      return;
    }
  }

  receiveMessage({
    source,
    origin,
    data
  }, {
    on,
    send
  });
}

function listenForMessages({
  on,
  send
}) {
  return (0, _global.globalStore)().getOrSet('postMessageListener', () => {
    return (0, _src2.addEventListener)(window, 'message', event => {
      // $FlowFixMe
      messageListener(event, {
        on,
        send
      });
    });
  });
}

function stopListenForMessages() {
  const listener = (0, _global.globalStore)().get('postMessageListener');

  if (listener) {
    listener.cancel();
  }
}