
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
        METHOD: 'postrobot_method',
        READY: 'postrobot_ready'
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
        GLOBAL_METHOD: 'postrobot_global_method',
        REMOTE_BRIDGE: 'postrobot_remote_bridge',
        LOCAL_BRIDGE: 'postrobot_local_bridge'
    }
};

export let POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(key => CONSTANTS.POST_MESSAGE_NAMES[key]);