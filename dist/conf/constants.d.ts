export declare const MESSAGE_TYPE: {
    REQUEST: "postrobot_message_request";
    RESPONSE: "postrobot_message_response";
    ACK: "postrobot_message_ack";
};
export declare const MESSAGE_ACK: {
    SUCCESS: "success";
    ERROR: "error";
};
export declare const MESSAGE_NAME: {
    METHOD: "postrobot_method";
    HELLO: "postrobot_hello";
    OPEN_TUNNEL: "postrobot_open_tunnel";
};
export declare const SEND_STRATEGY: {
    POST_MESSAGE: "postrobot_post_message";
    BRIDGE: "postrobot_bridge";
    GLOBAL: "postrobot_global";
};
export declare const BRIDGE_NAME_PREFIX = "__postrobot_bridge__";
export declare const POSTROBOT_PROXY = "__postrobot_proxy__";
export declare const WILDCARD = "*";
export declare const SERIALIZATION_TYPE: {
    CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise";
    CROSS_DOMAIN_FUNCTION: "cross_domain_function";
    CROSS_DOMAIN_WINDOW: "cross_domain_window";
};
export declare const METHOD: {
    GET: "get";
    POST: "post";
};
