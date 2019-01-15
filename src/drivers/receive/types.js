/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, matchDomain, stringifyDomainPattern, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { MESSAGE_TYPE, MESSAGE_ACK, MESSAGE_NAME } from '../../conf';
import { sendMessage } from '../send';
import { getRequestListener, getResponseListener, deleteResponseListener, isResponseListenerErrored } from '../listeners';
import type { RequestMessage, AckResponseMessage, SuccessResponseMessage, ErrorResponseMessage } from '../types';

export let RECEIVE_MESSAGE_TYPES = {

    [ MESSAGE_TYPE.REQUEST ](source : CrossDomainWindowType, origin : string, message : RequestMessage) : ZalgoPromise<void> {

        let options = getRequestListener({ name: message.name, win: source, domain: origin });

        const logName = (message.name === MESSAGE_NAME && message.data && typeof message.data.name === 'string') ? `${ message.data.name }()` : message.name;

        if (__DEBUG__) {
            // eslint-disable-next-line no-console
            console.info('receive::req', logName, origin, '\n\n', message.data);
        }

        function sendResponse(type : $Values<typeof MESSAGE_TYPE>, ack? : $Values<typeof MESSAGE_ACK>, response = {}) : ZalgoPromise<void> {

            if (message.fireAndForget || isWindowClosed(source)) {
                return ZalgoPromise.resolve();
            }

            if (__DEBUG__ && type !== MESSAGE_TYPE.ACK) {
                if (ack === MESSAGE_ACK.SUCCESS) {
                    // $FlowFixMe
                    console.info('send::res', logName, origin, '\n\n', response.data);  // eslint-disable-line no-console
                } else if (ack === MESSAGE_ACK.ERROR) {
                    // $FlowFixMe
                    console.error('send::err', logName, origin, '\n\n', response.error); // eslint-disable-line no-console
                }
            }

            // $FlowFixMe
            return sendMessage(source, origin, {
                type,
                ack,
                hash:   message.hash,
                name:   message.name,
                ...response
            });
        }

        return ZalgoPromise.all([

            sendResponse(MESSAGE_TYPE.ACK),

            ZalgoPromise.try(() => {

                if (!options) {
                    throw new Error(`No handler found for post message: ${ message.name } from ${ origin } in ${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`);
                }

                if (!matchDomain(options.domain, origin)) {
                    throw new Error(`Request origin ${ origin } does not match domain ${ options.domain.toString() }`);
                }

                let data = message.data;

                return options.handler({ source, origin, data });

            }).then(data => {
                return sendResponse(MESSAGE_TYPE.RESPONSE, MESSAGE_ACK.SUCCESS, { data });

            }, error => {
                return sendResponse(MESSAGE_TYPE.RESPONSE, MESSAGE_ACK.ERROR, { error });
            })

        ]).then(noop).catch(err => {
            if (options && options.handleError) {
                return options.handleError(err);
            } else {
                throw err;
            }
        });
    },

    [ MESSAGE_TYPE.ACK ](source : CrossDomainWindowType, origin : string, message : AckResponseMessage) {

        if (isResponseListenerErrored(message.hash)) {
            return;
        }

        let options = getResponseListener(message.hash);

        if (!options) {
            throw new Error(`No handler found for post message ack for message: ${ message.name } from ${ origin } in ${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`);
        }

        if (!matchDomain(options.domain, origin)) {
            throw new Error(`Ack origin ${ origin } does not match domain ${ options.domain.toString() }`);
        }

        options.ack = true;
    },

    [ MESSAGE_TYPE.RESPONSE ](source : CrossDomainWindowType, origin : string, message : SuccessResponseMessage | ErrorResponseMessage) : void | ZalgoPromise<void> {

        if (isResponseListenerErrored(message.hash)) {
            return;
        }

        let options = getResponseListener(message.hash);

        if (!options) {
            throw new Error(`No handler found for post message response for message: ${ message.name } from ${ origin } in ${ window.location.protocol }//${ window.location.host }${ window.location.pathname }`);
        }

        if (!matchDomain(options.domain, origin)) {
            throw new Error(`Response origin ${ origin } does not match domain ${ stringifyDomainPattern(options.domain) }`);
        }

        deleteResponseListener(message.hash);

        if (message.ack === MESSAGE_ACK.ERROR) {
            return options.respond(message.error, null);
        } else if (message.ack === MESSAGE_ACK.SUCCESS) {
            let data = message.data;
            return options.respond(null, { source, origin, data });
        }
    }
};
