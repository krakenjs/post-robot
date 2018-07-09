'use strict';

exports.__esModule = true;
exports.RECEIVE_MESSAGE_TYPES = undefined;

var _RECEIVE_MESSAGE_TYPE;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _src = require('zalgo-promise/src');

var _src2 = require('cross-domain-utils/src');

var _conf = require('../../conf');

var _lib = require('../../lib');

var _send = require('../send');

var _listeners = require('../listeners');

var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.ACK] = function (source, origin, message) {

    if ((0, _listeners.isResponseListenerErrored)(message.hash)) {
        return;
    }

    var options = (0, _listeners.getResponseListener)(message.hash);

    if (!options) {
        throw new Error('No handler found for post message ack for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!(0, _src2.matchDomain)(options.domain, origin)) {
        throw new Error('Ack origin ' + origin + ' does not match domain ' + options.domain.toString());
    }

    options.ack = true;
}, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function (source, origin, message) {

    var options = (0, _listeners.getRequestListener)({ name: message.name, win: source, domain: origin });

    function respond(data) {

        if (message.fireAndForget || (0, _src2.isWindowClosed)(source)) {
            return _src.ZalgoPromise.resolve();
        }

        return (0, _send.sendMessage)(source, _extends({
            target: message.originalSource,
            hash: message.hash,
            name: message.name
        }, data), origin);
    }

    return _src.ZalgoPromise.all([respond({
        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
    }), _src.ZalgoPromise['try'](function () {

        if (!options) {
            throw new Error('No handler found for post message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
        }

        if (!(0, _src2.matchDomain)(options.domain, origin)) {
            throw new Error('Request origin ' + origin + ' does not match domain ' + options.domain.toString());
        }

        var data = message.data;

        return options.handler({ source: source, origin: origin, data: data });
    }).then(function (data) {

        return respond({
            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
            data: data
        });
    }, function (err) {

        var error = (0, _lib.stringifyError)(err).replace(/^Error: /, '');
        // $FlowFixMe
        var code = err.code;

        return respond({
            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
            error: error,
            code: code
        });
    })]).then(_lib.noop)['catch'](function (err) {

        if (options && options.handleError) {
            return options.handleError(err);
        } else {
            _lib.log.error((0, _lib.stringifyError)(err));
        }
    });
}, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function (source, origin, message) {

    if ((0, _listeners.isResponseListenerErrored)(message.hash)) {
        return;
    }

    var options = (0, _listeners.getResponseListener)(message.hash);

    if (!options) {
        throw new Error('No handler found for post message response for message: ' + message.name + ' from ' + origin + ' in ' + window.location.protocol + '//' + window.location.host + window.location.pathname);
    }

    if (!(0, _src2.matchDomain)(options.domain, origin)) {
        throw new Error('Response origin ' + origin + ' does not match domain ' + (0, _src2.stringifyDomainPattern)(options.domain));
    }

    (0, _listeners.deleteResponseListener)(message.hash);

    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
        var err = new Error(message.error);
        if (message.code) {
            // $FlowFixMe
            err.code = message.code;
        }
        return options.respond(err, null);
    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
        var data = message.data || message.response;

        return options.respond(null, { source: source, origin: origin, data: data });
    }
}, _RECEIVE_MESSAGE_TYPE);