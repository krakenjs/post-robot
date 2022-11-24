export const MESSAGE_TYPE = {
  REQUEST: "postrobot_message_request" as const,
  RESPONSE: "postrobot_message_response" as const,
  ACK: "postrobot_message_ack" as const,
};
export const MESSAGE_ACK = {
  SUCCESS: "success" as const,
  ERROR: "error" as const,
};
export const MESSAGE_NAME = {
  METHOD: "postrobot_method" as const,
  HELLO: "postrobot_hello" as const,
  OPEN_TUNNEL: "postrobot_open_tunnel" as const,
};
export const SEND_STRATEGY = {
  POST_MESSAGE: "postrobot_post_message" as const,
  BRIDGE: "postrobot_bridge" as const,
  GLOBAL: "postrobot_global" as const,
};
export const BRIDGE_NAME_PREFIX = "__postrobot_bridge__";
export const POSTROBOT_PROXY = "__postrobot_proxy__";
export const WILDCARD = "*";
export const SERIALIZATION_TYPE = {
  CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise" as const,
  CROSS_DOMAIN_FUNCTION: "cross_domain_function" as const,
  CROSS_DOMAIN_WINDOW: "cross_domain_window" as const,
};
export const METHOD = {
  GET: "get" as const,
  POST: "post" as const,
};
