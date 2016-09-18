
import { CONSTANTS } from './constants';

export let CONFIG = {
    
    ALLOW_POSTMESSAGE_POPUP: false,

    LOG_LEVEL: 'info',

    ACK_TIMEOUT: 1000,

    LOG_TO_PAGE: false,
    
    MOCK_MODE: false,

    ALLOWED_POST_MESSAGE_METHODS: {
        [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD ]: true,
        [ CONSTANTS.SEND_STRATEGIES.REMOTE_BRIDGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE ]: true
    }
};