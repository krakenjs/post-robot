
import { CONSTANTS, CONFIG, getWindowID } from '../../conf';
import { util, promise, childWindows, serializeMethods } from '../../lib';

import { SEND_MESSAGE_STRATEGIES } from './strategies';


export let sendMessage = promise.method((win, message, domain, isProxy) => {

    message.id = message.id || util.uniqueID();
    message.source = getWindowID();
    message.originalSource = message.originalSource || getWindowID();
    message.windowType = util.getType();
    message.originalWindowType = message.originalWindowType || util.getType();

    message.data = serializeMethods(win, message.data || {});

    if (!message.target) {
        message.target = childWindows.getWindowId(win);
    }

    util.log(isProxy ? '#proxy' : '#send', message.type, message.name, message);

    if (CONFIG.MOCK_MODE) {
        delete message.target;
        return window[CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
            origin: `${window.location.protocol}//${window.location.host}`,
            source: window,
            data: JSON.stringify(message)
        });
    }

    if (win === window) {
        throw new Error('Attemping to send message to self');
    }

    util.debug('Waiting for window to be ready');

    return util.windowReady.then(() => {

        util.debug('Running send message strategies', message);

        return promise.Promise.all(util.map(util.keys(SEND_MESSAGE_STRATEGIES), strategyName => {

            return SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain).then(() => {
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