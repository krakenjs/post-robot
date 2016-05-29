
export let CONSTANTS = {

    POST_MESSAGE_TYPE: {
        REQUEST: 'postrobot_message_request',
        RESPONSE: 'postrobot_message_response',
        ACK: 'postrobot_message_ack'
    },

    POST_MESSAGE_ACK: {
        SUCCESS: 'success',
        ERROR: 'error'
    },

    POST_MESSAGE_NAMES: {
        IDENTIFY: 'postrobot_identify',
        METHOD: 'postrobot_method'
    },

    WINDOW_TYPES: {
        FULLPAGE: 'fullpage',
        POPUP: 'popup',
        IFRAME: 'iframe'
    },

    WINDOW_PROPS: {
        POSTROBOT: '__postRobot__'
    },

    SERIALIZATION_TYPES: {
        METHOD: 'postrobot_method'
    },

    SEND_STRATEGIES: {
        POST_MESSAGE: 'postrobot_post_message',
        POST_MESSAGE_GLOBAL_METHOD: 'postrobot_post_message_global_method',
        POST_MESSAGE_UP_THROUGH_BRIDGE: 'postrobot_post_message_up_through_bridge',
        POST_MESSAGE_DOWN_THROUGH_BRIDGE: 'postrobot_post_message_down_through_bridge'
    }
};