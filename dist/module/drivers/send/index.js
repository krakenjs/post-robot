'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sendMessage = sendMessage;

var _src = require('cross-domain-utils/src');

var _src2 = require('zalgo-promise/src');

var _conf = require('../../conf');

var _lib = require('../../lib');

var _strategies = require('./strategies');

function buildMessage(win, message) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var id = (0, _lib.uniqueID)();
    var type = (0, _lib.getWindowType)();
    var sourceDomain = (0, _src.getDomain)(window);

    return _extends({}, message, options, {
        sourceDomain: sourceDomain,
        id: message.id || id,
        windowType: type
    });
}

function sendMessage(win, message, domain) {
    return _src2.ZalgoPromise['try'](function () {
        var _jsonStringify;

        message = buildMessage(win, message, {
            data: (0, _lib.serializeMethods)(win, domain, message.data),
            domain: domain
        });

        var level = void 0;

        if (_conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) {
            level = 'debug';
        } else if (message.ack === 'error') {
            level = 'error';
        } else {
            level = 'info';
        }

        _lib.log.logLevel(level, ['\n\n\t', '#send', message.type.replace(/^postrobot_message_/, ''), '::', message.name, '::', domain || _conf.CONSTANTS.WILDCARD, '\n\n', message]);

        if (win === window && !_conf.CONFIG.ALLOW_SAME_ORIGIN) {
            throw new Error('Attemping to send message to self');
        }

        if ((0, _src.isWindowClosed)(win)) {
            throw new Error('Window is closed');
        }

        _lib.log.debug('Running send message strategies', message);

        var messages = [];

        var serializedMessage = (0, _lib.jsonStringify)((_jsonStringify = {}, _jsonStringify[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = message, _jsonStringify), null, 2);

        return _src2.ZalgoPromise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

            return _src2.ZalgoPromise['try'](function () {

                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
                    throw new Error('Strategy disallowed: ' + strategyName);
                }

                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
            }).then(function () {
                messages.push(strategyName + ': success');
                return true;
            }, function (err) {
                messages.push(strategyName + ': ' + (0, _lib.stringifyError)(err) + '\n');
                return false;
            });
        }).then(function (results) {

            var success = results.some(Boolean);
            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

            _lib.log.debug(status);

            if (!success) {
                throw new Error(status);
            }
        });
    });
}