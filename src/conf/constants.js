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
    HELLO:       ('postrobot_ready' : 'postrobot_ready'),
    OPEN_TUNNEL: ('postrobot_open_tunnel' : 'postrobot_open_tunnel')
};

export const WINDOW_TYPE = {
    FULLPAGE: ('fullpage' : 'fullpage'),
    POPUP:    ('popup' : 'popup'),
    IFRAME:   ('iframe' : 'iframe')
};

export const WINDOW_PROP = {
    POSTROBOT: ('__postRobot__' : '__postRobot__')
};

export const SERIALIZATION_TYPE = {
    METHOD:        ('postrobot_method' : 'postrobot_method'),
    ZALGO_PROMISE: ('postrobot_zalgo_promise' : 'postrobot_zalgo_promise')
};

export const SEND_STRATEGY = {
    POST_MESSAGE: ('postrobot_post_message' : 'postrobot_post_message'),
    BRIDGE:       ('postrobot_bridge' : 'postrobot_bridge'),
    GLOBAL:       ('postrobot_global' : 'postrobot_global')
};

export const PROTOCOL = {
    MOCK: ('mock:' : 'mock:'),
    FILE: ('file:' : 'file:')
};

export const BRIDGE_NAME_PREFIX = '__postrobot_bridge__';
export const POSTROBOT_PROXY =    '__postrobot_proxy__';

export const WILDCARD = '*';
