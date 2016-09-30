
import { CONSTANTS } from './constants';

export let CONFIG = {
    
    ALLOW_POSTMESSAGE_POPUP: true,

    LOG_LEVEL: 'info',

    BRIDGE_TIMEOUT: 5000,
    ACK_TIMEOUT: 1000,

    LOG_TO_PAGE: false,
    
    MOCK_MODE: false,

    ALLOWED_POST_MESSAGE_METHODS: {
        [ CONSTANTS.SEND_STRATEGIES.POST_MESSAGE ]: true,
        [ CONSTANTS.SEND_STRATEGIES.BRIDGE ]: true
    }
};

if (window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) === 0) {
    CONFIG.ALLOW_POSTMESSAGE_POPUP = true;
}