/* @flow */

export const MESSAGE_TYPE = {
    REQUEST:  ('postrobot_message_request' : 'postrobot_message_request'),
    RESPONSE: ('postrobot_message_response' : 'postrobot_message_response'),
    ACK:      ('postrobot_message_ack' : 'postrobot_message_ack')
};

export const MESSAGE_ACK = {
    SUCCESS: ('success' : 'success'),
    ERROR:   ('error' : 'error')
};

export const MESSAGE_NAME = {
    METHOD:      ('postrobot_method' : 'postrobot_method'),
    HELLO:       ('postrobot_hello' : 'postrobot_hello'),
    OPEN_TUNNEL: ('postrobot_open_tunnel' : 'postrobot_open_tunnel')
};

export const SEND_STRATEGY = {
    POST_MESSAGE: ('postrobot_post_message' : 'postrobot_post_message'),
    BRIDGE:       ('postrobot_bridge' : 'postrobot_bridge'),
    GLOBAL:       ('postrobot_global' : 'postrobot_global')
};

export const BRIDGE_NAME_PREFIX = '__postrobot_bridge__';
export const POSTROBOT_PROXY =    '__postrobot_proxy__';

export const WILDCARD = '*';

export const SERIALIZATION_TYPE = {
    CROSS_DOMAIN_ZALGO_PROMISE: ('cross_domain_zalgo_promise' : 'cross_domain_zalgo_promise'),
    CROSS_DOMAIN_FUNCTION:      ('cross_domain_function' : 'cross_domain_function'),
    CROSS_DOMAIN_WINDOW:        ('cross_domain_window' : 'cross_domain_window')
};

export const METHOD = {
    GET:  ('get' : 'get'),
    POST: ('post' : 'post')
};
