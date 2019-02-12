"use strict";

exports.__esModule = true;
exports.send = send;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _conf = require("../conf");

var _drivers = require("../drivers");

var _lib = require("../lib");

var _global = require("../global");

var _on = require("./on");

function send(win, name, data, options) {
  // $FlowFixMe
  options = options || {};
  let domain = options.domain || _conf.WILDCARD;
  const responseTimeout = options.timeout || _conf.RES_TIMEOUT;
  const childTimeout = options.timeout || _conf.CHILD_WINDOW_TIMEOUT;
  const fireAndForget = options.fireAndForget || false;

  const prom = _src.ZalgoPromise.try(() => {
    if (!name) {
      throw new Error('Expected name');
    }

    if (domain) {
      if (typeof domain !== 'string' && !Array.isArray(domain) && !(0, _src3.isRegex)(domain)) {
        throw new TypeError(`Expected domain to be a string, array, or regex`);
      }
    }

    if ((0, _src2.isWindowClosed)(win)) {
      throw new Error('Target window is closed');
    }

    const reqPromises = (0, _global.windowStore)('requestPromises').getOrSet(win, () => []); // $FlowFixMe

    const requestPromise = _src.ZalgoPromise.try(() => {
      if ((0, _src2.isAncestor)(window, win)) {
        return (0, _lib.awaitWindowHello)(win, childTimeout);
      } else if ((0, _src3.isRegex)(domain)) {
        return (0, _lib.sayHello)(win, {
          send
        });
      } // $FlowFixMe

    }).then(({
      domain: origin
    } = {}) => {
      if ((0, _src3.isRegex)(domain)) {
        if (!(0, _src2.matchDomain)(domain, origin)) {
          // $FlowFixMe
          throw new Error(`Remote window domain ${origin} does not match regex: ${domain.source}`);
        }

        domain = origin;
      }

      const logName = name === _conf.MESSAGE_NAME.METHOD && data && typeof data.name === 'string' ? `${data.name}()` : name;

      if (__DEBUG__) {
        console.info('send::req', logName, domain, '\n\n', data); // eslint-disable-line no-console
      }

      let hasResult = false;
      const promise = new _src.ZalgoPromise();
      promise.finally(() => {
        hasResult = true;
        reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
      }).catch(_src3.noop);
      const hash = `${name}_${(0, _src3.uniqueID)()}`;
      (0, _drivers.sendMessage)(win, domain, {
        type: _conf.MESSAGE_TYPE.REQUEST,
        hash,
        name,
        data,
        fireAndForget
      }, {
        on: _on.on,
        send
      });

      if (fireAndForget) {
        return promise.resolve();
      }

      promise.catch(() => {
        (0, _drivers.markResponseListenerErrored)(hash);
        (0, _drivers.deleteResponseListener)(hash);
      });
      const responseListener = {
        name,
        win,
        domain,
        promise
      };
      (0, _drivers.addResponseListener)(hash, responseListener);
      const totalAckTimeout = (0, _lib.isWindowKnown)(win) ? _conf.ACK_TIMEOUT_KNOWN : _conf.ACK_TIMEOUT;
      const totalResTimeout = responseTimeout;
      let ackTimeout = totalAckTimeout;
      let resTimeout = totalResTimeout;
      let cycleTime = 100;

      const cycle = () => {
        if (hasResult) {
          return;
        }

        if ((0, _src2.isWindowClosed)(win)) {
          if (!responseListener.ack) {
            return promise.reject(new Error(`Window closed for ${name} before ack`));
          } else {
            return promise.reject(new Error(`Window closed for ${name} before response`));
          }
        }

        ackTimeout = Math.max(ackTimeout - cycleTime, 0);

        if (resTimeout !== -1) {
          resTimeout = Math.max(resTimeout - cycleTime, 0);
        }

        const hasAck = responseListener.ack;

        if (hasAck) {
          if (resTimeout === -1) {
            return;
          }

          cycleTime = Math.min(resTimeout, 2000);
        } else if (ackTimeout === 0) {
          return promise.reject(new Error(`No ack for postMessage ${logName} in ${(0, _src2.getDomain)()} in ${totalAckTimeout}ms`));
        } else if (resTimeout === 0) {
          return promise.reject(new Error(`No response for postMessage ${logName} in ${(0, _src2.getDomain)()} in ${totalResTimeout}ms`));
        }

        setTimeout(cycle, cycleTime);
      };

      setTimeout(cycle, cycleTime);
      return promise;
    });

    reqPromises.push(requestPromise);
    return requestPromise;
  });

  return prom;
}