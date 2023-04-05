export const MESSAGE_TYPE = {
  REQUEST: "postrobot_message_request",
  RESPONSE: "postrobot_message_response",
  ACK: "postrobot_message_ack",
} as const;

export const MESSAGE_ACK = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const MESSAGE_NAME = {
  METHOD: "postrobot_method",
  HELLO: "postrobot_hello",
  OPEN_TUNNEL: "postrobot_open_tunnel",
} as const;

export const SEND_STRATEGY = {
  POST_MESSAGE: "postrobot_post_message",
  BRIDGE: "postrobot_bridge",
  GLOBAL: "postrobot_global",
} as const;

export const BRIDGE_NAME_PREFIX = "__postrobot_bridge__" as const;
export const POSTROBOT_PROXY = "__postrobot_proxy__" as const;

export const WILDCARD = "*" as const;

export const SERIALIZATION_TYPE = {
  CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
  CROSS_DOMAIN_FUNCTION: "cross_domain_function",
  CROSS_DOMAIN_WINDOW: "cross_domain_window",
} as const;

export const METHOD = {
  GET: "get",
  POST: "post",
} as const;
