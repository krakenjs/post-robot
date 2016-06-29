
import { CONSTANTS } from '../../conf';
import { childWindows, promise } from '../../lib';

import { sendMessage } from '../send';
import { listeners, getRequestListener } from '../listeners';

export let RECEIVE_MESSAGE_TYPES = {

    [ CONSTANTS.POST_MESSAGE_TYPE.ACK ]: (source, message, origin) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No handler found for post message ack for message: ${message.name} in ${window.location.href}`);
        }

        options.ack = true;
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.REQUEST ]: (source, message, origin) => {

        let options = getRequestListener(message.name, source);

        function respond(data) {
            return sendMessage(source, {
                target: message.originalSource ? message.originalSource : childWindows.getWindowId(source),
                hash: message.hash,
                name: message.name,
                ...data
            }, '*');
        }

        return respond({
            type: CONSTANTS.POST_MESSAGE_TYPE.ACK

        }).then(() => {

            return promise.run(() => {

                if (!options) {
                    throw new Error(`No postmessage request handler for ${message.name} in ${window.location.href}`);
                }

                if (options.window && source && options.window !== source) {
                    return;
                }

                if (options.domain) {
                    let match = (typeof options.domain === 'string' && origin === options.domain) ||
                                (options.domain instanceof RegExp && origin.match(options.domain));

                    if (!match) {
                        throw new Error(`Message origin ${origin} does not match domain ${options.domain}`);
                    }
                }

                return promise.deNodeify(options.handler, source, message.data);

            }).then(data => {

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });

            }, err => {

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack ? `${err.message}\n${err.stack}` : err.toString()
                });
            });

        }).catch(err => {

            if (options && options.handleError) {
                return options.handleError(err);
            } else {
                console.error(err.stack || err.toString());
            }
        });
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.RESPONSE ]: (source, message, origin) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No response handler found for post message response ${message.name} in ${window.location.href}`);
        }

        delete listeners.response[message.hash];

        if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
            return options.respond(new Error(message.error));
        } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
            return options.respond(null, message.data || message.response);
        }
    }
};