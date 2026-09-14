"use strict";

exports.__esModule = true;
exports.WILDCARD = exports.SERIALIZATION_TYPE = exports.SEND_STRATEGY = exports.POSTROBOT_PROXY = exports.METHOD = exports.MESSAGE_TYPE = exports.MESSAGE_NAME = exports.MESSAGE_ACK = exports.BRIDGE_NAME_PREFIX = void 0;
const MESSAGE_TYPE = exports.MESSAGE_TYPE = {
  REQUEST: "postrobot_message_request",
  RESPONSE: "postrobot_message_response",
  ACK: "postrobot_message_ack"
};
const MESSAGE_ACK = exports.MESSAGE_ACK = {
  SUCCESS: "success",
  ERROR: "error"
};
const MESSAGE_NAME = exports.MESSAGE_NAME = {
  METHOD: "postrobot_method",
  HELLO: "postrobot_hello",
  OPEN_TUNNEL: "postrobot_open_tunnel"
};
const SEND_STRATEGY = exports.SEND_STRATEGY = {
  POST_MESSAGE: "postrobot_post_message",
  BRIDGE: "postrobot_bridge",
  GLOBAL: "postrobot_global"
};
const BRIDGE_NAME_PREFIX = exports.BRIDGE_NAME_PREFIX = "__postrobot_bridge__";
const POSTROBOT_PROXY = exports.POSTROBOT_PROXY = "__postrobot_proxy__";
const WILDCARD = exports.WILDCARD = "*";
const SERIALIZATION_TYPE = exports.SERIALIZATION_TYPE = {
  CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
  CROSS_DOMAIN_FUNCTION: "cross_domain_function",
  CROSS_DOMAIN_WINDOW: "cross_domain_window"
};
const METHOD = exports.METHOD = {
  GET: "get",
  POST: "post"
};