var _RECEIVE_MESSAGE_TYPE;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, matchDomain, stringifyDomainPattern } from 'cross-domain-utils/src';
import { noop } from 'belter/src';

import { MESSAGE_TYPE, MESSAGE_ACK } from '../../conf';
import { sendMessage } from '../send';
import { getRequestListener, getResponseListener, deleteResponseListener, isResponseListenerErrored } from '../listeners';


export var RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _RECEIVE_MESSAGE_TYPE[MESSAGE_TYPE.ACK] = function (source, origin, message) {

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
}, _RECEIVE_MESSAGE_TYPE[MESSAGE_TYPE.REQUEST] = function (source, origin, message) {

    var options = getRequestListener({ name: message.name, win: source, domain: origin });

    function sendResponse(type) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


        if (message.fireAndForget || isWindowClosed(source)) {
            return ZalgoPromise.resolve();
        }

        // $FlowFixMe
        return sendMessage(source, origin, _extends({
            type: type,
            hash: message.hash,
            name: message.name
        }, data));
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
        return sendResponse(MESSAGE_TYPE.RESPONSE, {
            ack: MESSAGE_ACK.SUCCESS,
            data: data
        });
    }, function (error) {
        return sendResponse(MESSAGE_TYPE.RESPONSE, {
            ack: MESSAGE_ACK.ERROR,
            error: error
        });
    })]).then(noop)['catch'](function (err) {
        if (options && options.handleError) {
            return options.handleError(err);
        } else {
            throw err;
        }
    });
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