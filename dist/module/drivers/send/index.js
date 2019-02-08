"use strict";

exports.__esModule = true;
exports.sendMessage = sendMessage;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _serialize = require("../../serialize");

var _strategies = require("./strategies");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function sendMessage(win, domain, message, {
  on,
  send
}) {
  if ((0, _src.isWindowClosed)(win)) {
    throw new Error('Window is closed');
  }

  const serializedMessage = (0, _serialize.serializeMessage)(win, domain, {
    [__POST_ROBOT__.__GLOBAL_KEY__]: _extends({
      id: (0, _src2.uniqueID)(),
      origin: (0, _src.getDomain)(window)
    }, message)
  }, {
    on,
    send
  });
  let success = false;
  let error;

  for (const strategyName of Object.keys(_strategies.SEND_MESSAGE_STRATEGIES)) {
    try {
      _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);

      success = true;
    } catch (err) {
      error = error || err;
    }
  }

  if (!success) {
    throw error;
  }
}