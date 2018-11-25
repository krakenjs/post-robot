export var MESSAGE_TYPE = {
    REQUEST: 'postrobot_message_request',
    RESPONSE: 'postrobot_message_response',
    ACK: 'postrobot_message_ack'
};

export var MESSAGE_ACK = {
    SUCCESS: 'success',
    ERROR: 'error'
};

export var MESSAGE_NAME = {
    METHOD: 'postrobot_method',
    HELLO: 'postrobot_hello',
    OPEN_TUNNEL: 'postrobot_open_tunnel'
};

export var WINDOW_PROP = {
    POSTROBOT: '__postRobot__'
};

export var SEND_STRATEGY = {
    POST_MESSAGE: 'postrobot_post_message',
    BRIDGE: 'postrobot_bridge',
    GLOBAL: 'postrobot_global'
};

export var PROTOCOL = {
    MOCK: 'mock:',
    FILE: 'file:'
};

export var BRIDGE_NAME_PREFIX = '__postrobot_bridge__';
export var POSTROBOT_PROXY = '__postrobot_proxy__';

export var WILDCARD = '*';

export var SERIALIZATION_TYPE = {
    CROSS_DOMAIN_ZALGO_PROMISE: 'cross_domain_zalgo_promise',
    CROSS_DOMAIN_FUNCTION: 'cross_domain_function',
    CROSS_DOMAIN_WINDOW: 'cross_domain_window'
};