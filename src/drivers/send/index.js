
import { CONSTANTS, CONFIG, getWindowID } from '../../conf';
import { util, promise, childWindows } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


export let sendMessage = promise.method((win, message, isProxy) => {

    message.id = message.id || util.uniqueID();
    message.source = getWindowID();
    message.originalSource = message.originalSource || getWindowID();
    message.windowType = util.getType();
    message.originalWindowType = message.originalWindowType || util.getType();

    if (!message.target) {
        message.target = childWindows.getWindowId(win);
    }

    util.log(isProxy ? '#proxy' : '#send', message.type, message.name, message);

    if (CONFIG.MOCK_MODE) {
        delete message.target;
        return window[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage(window, JSON.stringify(message));
    }

    if (win === window) {
        throw new Error('Attemping to send message to self');
    }

    util.debug('Waiting for window to be ready');

    return util.windowReady.then(() => {

        util.debug('Running send message strategies', message);

        return Promise.all(util.map(util.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return SEND_MESSAGE_STRATEGIES[strategyName](win, message).then(() => {
                util.debug(strategyName, 'success');
                return true;
            }, err => {
                util.debugError(strategyName, 'error\n\n', err.stack || err.toString());
                return false;
            });

        })).then(results => {

            if (!util.some(results)) {
                throw new Error('No post-message strategy succeeded');
            }
        });
    });
});