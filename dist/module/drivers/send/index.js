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
  const strategies = Object.keys(_strategies.SEND_MESSAGE_STRATEGIES);
  const errors = [];

  for (const strategyName of strategies) {
    try {
      _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
    } catch (err) {
      errors.push(err);
    }
  }

  if (errors.length === strategies.length) {
    throw new Error(`All post-robot messaging strategies failed:\n\n${errors.map((err, i) => `${i}. ${(0, _src2.stringifyError)(err)}`).join('\n\n')}`);
  }
}