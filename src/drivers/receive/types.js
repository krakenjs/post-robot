
import { CONSTANTS } from '../../conf';
import { promise, log, isWindowClosed } from '../../lib';

import { sendMessage } from '../send';
import { listeners, getRequestListener } from '../listeners';

export let RECEIVE_MESSAGE_TYPES = {

    [ CONSTANTS.POST_MESSAGE_TYPE.ACK ]: (source, origin, message) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No handler found for post message ack for message: ${message.name} in ${window.location.href}`);
        }

        options.ack = true;
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.REQUEST ]: (source, origin, message) => {

        let options = getRequestListener(message.name, source);

        function respond(data) {

            if (message.fireAndForget || isWindowClosed(source)) {
                return promise.Promise.resolve();
            }

            return sendMessage(source, {
                target: message.originalSource,
                hash: message.hash,
                name: message.name,
                ...data
            }, origin);
        }

        return promise.Promise.all([

            respond({
                type: CONSTANTS.POST_MESSAGE_TYPE.ACK
            }),

            promise.run(() => {

                if (!options) {
                    throw new Error(`No postmessage request handler for ${message.name} in ${window.location.href}`);
                }

                if (options.domain) {
                    let match = (typeof options.domain === 'string' && origin === options.domain) ||
                                (Object.prototype.toString.call(options.domain) === '[object RegExp]' && origin.match(options.domain) ||
                                (Array.isArray(options.domain) && options.domain.indexOf(origin) !== -1));

                    if (!match) {
                        throw new Error(`Message origin ${origin} does not match domain ${options.domain}`);
                    }
                }

                let data = message.data;

                return promise.deNodeify(options.handler, { source, origin, data });

            }).then(data => {

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data
                });

            }, err => {

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack ? `${err.message}\n${err.stack}` : err.toString()
                });
            })

        ]).catch(err => {

            if (options && options.handleError) {
                return options.handleError(err);
            } else {
                log.error(err.stack || err.toString());
            }
        });
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.RESPONSE ]: (source, origin, message) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No response handler found for post message response ${message.name} in ${window.location.href}`);
        }

        delete listeners.response[message.hash];

        if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
            return options.respond(new Error(message.error));
        } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
            let data = message.data || message.response;

            return options.respond(null, { source, origin, data });
        }
    }
};