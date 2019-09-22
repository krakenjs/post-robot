"use strict";

exports.__esModule = true;
exports.RECEIVE_MESSAGE_TYPES = void 0;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _conf = require("../../conf");

var _send = require("../send");

var _listeners = require("../listeners");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RECEIVE_MESSAGE_TYPES = {
  [_conf.MESSAGE_TYPE.REQUEST](source, origin, message, {
    on,
    send
  }) {
    const options = (0, _listeners.getRequestListener)({
      name: message.name,
      win: source,
      domain: origin
    });
    const logName = message.name === _conf.MESSAGE_NAME.METHOD && message.data && typeof message.data.name === 'string' ? `${message.data.name}()` : message.name;

    if (__DEBUG__) {
      // eslint-disable-next-line no-console
      console.info('receive::req', logName, origin, '\n\n', message.data);
    }

    function sendResponse(type, ack, response = {}) {
      if (message.fireAndForget || (0, _src2.isWindowClosed)(source)) {
        return;
      }

      if (__DEBUG__ && type !== _conf.MESSAGE_TYPE.ACK) {
        if (ack === _conf.MESSAGE_ACK.SUCCESS) {
          // $FlowFixMe
          console.info('respond::res', logName, origin, '\n\n', response.data); // eslint-disable-line no-console
        } else if (ack === _conf.MESSAGE_ACK.ERROR) {
          // $FlowFixMe
          console.error('respond::err', logName, origin, '\n\n', response.error); // eslint-disable-line no-console
        }
      }

      try {
        // $FlowFixMe
        (0, _send.sendMessage)(source, origin, _extends({
          type,
          ack,
          hash: message.hash,
          name: message.name
        }, response), {
          on,
          send
        });
      } catch (err) {
        throw new Error(`Send response message failed for ${logName} in ${(0, _src2.getDomain)()}\n\n${(0, _src3.stringifyError)(err)}`);
      }
    }

    return _src.ZalgoPromise.all([sendResponse(_conf.MESSAGE_TYPE.ACK), _src.ZalgoPromise.try(() => {
      if (!options) {
        throw new Error(`No handler found for post message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
      }

      if (!(0, _src2.matchDomain)(options.domain, origin)) {
        throw new Error(`Request origin ${origin} does not match domain ${options.domain.toString()}`);
      }

      const data = message.data;
      return options.handler({
        source,
        origin,
        data
      });
    }).then(data => {
      return sendResponse(_conf.MESSAGE_TYPE.RESPONSE, _conf.MESSAGE_ACK.SUCCESS, {
        data
      });
    }, error => {
      return sendResponse(_conf.MESSAGE_TYPE.RESPONSE, _conf.MESSAGE_ACK.ERROR, {
        error
      });
    })]).then(_src3.noop).catch(err => {
      if (options && options.handleError) {
        return options.handleError(err);
      } else {
        throw err;
      }
    });
  },

  [_conf.MESSAGE_TYPE.ACK](source, origin, message) {
    if ((0, _listeners.isResponseListenerErrored)(message.hash)) {
      return;
    }

    const options = (0, _listeners.getResponseListener)(message.hash);

    if (!options) {
      throw new Error(`No handler found for post message ack for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
    }

    try {
      if (!(0, _src2.matchDomain)(options.domain, origin)) {
        throw new Error(`Ack origin ${origin} does not match domain ${options.domain.toString()}`);
      }

      if (source !== options.win) {
        throw new Error(`Ack source does not match registered window`);
      }
    } catch (err) {
      options.promise.reject(err);
    }

    options.ack = true;
  },

  [_conf.MESSAGE_TYPE.RESPONSE](source, origin, message) {
    if ((0, _listeners.isResponseListenerErrored)(message.hash)) {
      return;
    }

    const options = (0, _listeners.getResponseListener)(message.hash);

    if (!options) {
      throw new Error(`No handler found for post message response for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
    }

    if (!(0, _src2.matchDomain)(options.domain, origin)) {
      throw new Error(`Response origin ${origin} does not match domain ${(0, _src2.stringifyDomainPattern)(options.domain)}`);
    }

    if (source !== options.win) {
      throw new Error(`Response source does not match registered window`);
    }

    (0, _listeners.deleteResponseListener)(message.hash);
    const logName = message.name === _conf.MESSAGE_NAME.METHOD && message.data && typeof message.data.name === 'string' ? `${message.data.name}()` : message.name;

    if (message.ack === _conf.MESSAGE_ACK.ERROR) {
      if (__DEBUG__) {
        console.error('receive::err', logName, origin, '\n\n', message.error); // eslint-disable-line no-console
      }

      options.promise.reject(message.error);
    } else if (message.ack === _conf.MESSAGE_ACK.SUCCESS) {
      if (__DEBUG__) {
        console.info('receive::res', logName, origin, '\n\n', message.data); // eslint-disable-line no-console
      }

      options.promise.resolve({
        source,
        origin,
        data: message.data
      });
    }
  }

};
exports.RECEIVE_MESSAGE_TYPES = RECEIVE_MESSAGE_TYPES;