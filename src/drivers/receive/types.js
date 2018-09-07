/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, matchDomain, stringifyDomainPattern, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { CONSTANTS } from '../../conf';
import { stringifyError, noop } from '../../lib';
import { sendMessage } from '../send';
import { getRequestListener, getResponseListener, deleteResponseListener, isResponseListenerErrored } from '../listeners';

export let RECEIVE_MESSAGE_TYPES = {

    [ CONSTANTS.POST_MESSAGE_TYPE.ACK ](source : CrossDomainWindowType, origin : string, message : Object) {

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

    [ CONSTANTS.POST_MESSAGE_TYPE.REQUEST ](source : CrossDomainWindowType, origin : string, message : Object) : ZalgoPromise<void> {

        let options = getRequestListener({ name: message.name, win: source, domain: origin });

        function respond(data) : ZalgoPromise<void> {

            if (message.fireAndForget || isWindowClosed(source)) {
                return ZalgoPromise.resolve();
            }

            return sendMessage(source, {
                target: message.originalSource,
                hash:   message.hash,
                name:   message.name,
                ...data
            }, origin);
        }

        return ZalgoPromise.all([

            respond({
                type: CONSTANTS.POST_MESSAGE_TYPE.ACK
            }),

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

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack:  CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data
                });

            }, err => {

                let error = stringifyError(err).replace(/^Error: /, '');
                // $FlowFixMe
                let code = err.code;

                return respond({
                    type: CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack:  CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error,
                    code
                });
            })

        ]).then(noop).catch(err => {

            if (options && options.handleError) {
                return options.handleError(err);
            } else {
                throw err;
            }
        });
    },

    [ CONSTANTS.POST_MESSAGE_TYPE.RESPONSE ](source : CrossDomainWindowType, origin : string, message : Object) : void | ZalgoPromise<void> {

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

        if (message.ack === CONSTANTS.POST_MESSAGE_ACK.ERROR) {
            let err = new Error(message.error);
            if (message.code) {
                // $FlowFixMe
                err.code = message.code;
            }
            return options.respond(err, null);
        } else if (message.ack === CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
            let data = message.data || message.response;

            return options.respond(null, { source, origin, data });
        }
    }
};
