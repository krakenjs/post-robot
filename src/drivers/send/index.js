
import { CONSTANTS, CONFIG, getWindowID, POST_MESSAGE_NAMES_LIST } from '../../conf';
import { util, promise, childWindows, serializeMethods, log } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


export function buildMessage(win, message, options = {}) {

    let id     = util.uniqueID();
    let source = getWindowID();
    let type   = util.getType();
    let target = childWindows.getWindowId(win);

    return {
        ...message,
        ...options,
        id:                 message.id || id,
        source,
        originalSource:     message.originalSource || source,
        windowType:         type,
        originalWindowType: message.originalWindowType || type,
        target:             message.target || target
    };
}


export let sendMessage = promise.method((win, message, domain, isProxy) => {

    message = buildMessage(win, message, {
        data: serializeMethods(win, message.data),
        domain
    });

    log.logLevel(POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 ? 'debug' : 'info', [ isProxy ? '#proxy' : '#send', message.type, message.name, message ]);

    if (CONFIG.MOCK_MODE) {
        delete message.target;
        return window[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
            origin: util.getDomain(window),
            source: window,
            data: JSON.stringify(message)
        });
    }

    if (win === window) {
        throw new Error('Attemping to send message to self');
    }

    if (win.closed) {
        throw new Error('Window is closed');
    }

    log.debug('Running send message strategies', message);

    return util.windowReady.then(() => {

        return promise.map(util.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return promise.run(() => {

                if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error(`Strategy disallowed: ${strategyName}`);
                }

                return SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);

            }).then(() => {
                log.debug(strategyName, 'success');
                return true;
            }, err => {
                log.debug(strategyName, 'error\n\n', err.message);
                return false;
            });

        }).then(results => {

            if (!util.some(results)) {
                throw new Error('No post-message strategy succeeded');
            }
        });
    });
});