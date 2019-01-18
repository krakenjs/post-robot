var _RECEIVE_MESSAGE_TYPE;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, matchDomain, stringifyDomainPattern } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { MESSAGE_TYPE, MESSAGE_ACK, MESSAGE_NAME } from '../../conf';
import { sendMessage } from '../send';
import { getRequestListener, getResponseListener, deleteResponseListener, isResponseListenerErrored } from '../listeners';


export var RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _RECEIVE_MESSAGE_TYPE[MESSAGE_TYPE.REQUEST] = function (source, origin, message) {

    var options = getRequestListener({ name: message.name, win: source, domain: origin });

    var logName = message.name === MESSAGE_NAME.METHOD && message.data && typeof message.data.name === 'string' ? message.data.name + '()' : message.name;

    if (__DEBUG__) {
        // eslint-disable-next-line no-console
        console.info('receive::req', logName, origin, '\n\n', message.data);
    }

    function sendResponse(type, ack) {
        var response = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        if (message.fireAndForget || isWindowClosed(source)) {
            return ZalgoPromise.resolve();
        }

        if (__DEBUG__ && type !== MESSAGE_TYPE.ACK) {
            if (ack === MESSAGE_ACK.SUCCESS) {
                // $FlowFixMe
                console.info('respond::res', logName, origin, '\n\n', response.data); // eslint-disable-line no-console
            } else if (ack === MESSAGE_ACK.ERROR) {
                // $FlowFixMe
                console.error('respond::err', logName, origin, '\n\n', response.error); // eslint-disable-line no-console
            }
        }

        // $FlowFixMe
        return sendMessage(source, origin, _extends({
            type: type,
            ack: ack,
            hash: message.hash,
            name: message.name
        }, response));
    }

    return ZalgoPromise.all([sendResponse(MESSAGE_TYPE.ACK), ZalgoPromise['try'](function () {

        if (!options) {
            throw new Error('No handler found for post message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
        }

        if (!matchDomain(options.domain, origin)) {
            throw new Error('Request origin ' + origin + ' does not match domain ' + options.domain.toString());
        }

        var data = message.data;

        return options.handler({ source: source, origin: origin, data: data });
    }).then(function (data) {
        return sendResponse(MESSAGE_TYPE.RESPONSE, MESSAGE_ACK.SUCCESS, { data: data });
    }, function (error) {
        return sendResponse(MESSAGE_TYPE.RESPONSE, MESSAGE_ACK.ERROR, { error: error });
    })]).then(noop)['catch'](function (err) {
        if (options && options.handleError) {
            return options.handleError(err);
        } else {
            throw err;
        }
    });
}, _RECEIVE_MESSAGE_TYPE[MESSAGE_TYPE.ACK] = function (source, origin, message) {

    if (isResponseListenerErrored(message.hash)) {
        return;
    }

    var options = getResponseListener(message.hash);

    if (!options) {
        throw new Error('No handler found for post message ack for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!matchDomain(options.domain, origin)) {
        throw new Error('Ack origin ' + origin + ' does not match domain ' + options.domain.toString());
    }

    options.ack = true;
}, _RECEIVE_MESSAGE_TYPE[MESSAGE_TYPE.RESPONSE] = function (source, origin, message) {

    if (isResponseListenerErrored(message.hash)) {
        return;
    }

    var options = getResponseListener(message.hash);

    if (!options) {
        throw new Error('No handler found for post message response for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!matchDomain(options.domain, origin)) {
        throw new Error('Response origin ' + origin + ' does not match domain ' + stringifyDomainPattern(options.domain));
    }

    deleteResponseListener(message.hash);

    if (message.ack === MESSAGE_ACK.ERROR) {
        return options.respond(message.error, null);
    } else if (message.ack === MESSAGE_ACK.SUCCESS) {
        var data = message.data;
        return options.respond(null, { source: source, origin: origin, data: data });
    }
}, _RECEIVE_MESSAGE_TYPE);