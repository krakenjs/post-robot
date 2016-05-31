
import { CONSTANTS } from '../../conf';
import { util, childWindows } from '../../lib';

import { sendMessage } from '../send';
import { listeners } from '../listeners';

export let RECEIVE_MESSAGE_TYPES = {

    [ CONSTANTS.POST_MESSAGE_TYPE.ACK ]: (source, message) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No handler found for post message ack for message: ${message.name} in ${window.location.href}`);
        }

        options.ack = true;
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.REQUEST ]: (source, message) => {

        let options = listeners.request[message.name];

        function respond(data) {
            return sendMessage(source, {
                target: message.originalSource ? message.originalSource : childWindows.getWindowId(source),
                hash: message.hash,
                name: message.name,
                ...data
            }).catch(error => {
                if (options) {
                    return options.handleError(error);
                } else {
                    throw error;
                }
            });
        }

        let response = util.once((err, data) => {

            if (err) {
                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: err.stack || err.toString()
                });
            }

            return respond({
                type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                ack: CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                response: data || {}
            });
        });

        if (!options) {
            return response(new Error(`No postmessage request handler for ${message.name} in ${window.location.href}`));
        }

        if (options.window && source && options.window !== source) {
            return;
        }

        respond({
            type: CONSTANTS.POST_MESSAGE_TYPE.ACK
        });

        let result;

        try {

            result = options.handler(null, message.data, (err, data) => {
                return err ? response(err) : response(null, data);
            });

        } catch (err) {
            return response(err);
        }

        if (typeof result !== 'undefined') {

            if (result.then instanceof Function) {
                return result.then(function(data) {
                    return response(null, data);
                }, response);
            }

            return response(null, result);
        }
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.RESPONSE ]: (source, message) => {

        let options = listeners.response[message.hash];

        if (!options) {
            throw new Error(`No response handler found for post message response ${message.name} in ${window.location.href}`);
        }

        delete listeners.response[message.hash];

        if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
            return options.respond(message.error);
        } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
            return options.respond(null, message.response);
        }
    }
};