"use strict";

exports.__esModule = true;
exports.openTunnelToOpener = openTunnelToOpener;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _global = require("../global");

var _common = require("./common");

function awaitRemoteBridgeForWindow(win) {
  return (0, _global.windowStore)('remoteBridgeAwaiters').getOrSet(win, () => {
    return _src.ZalgoPromise.try(() => {
      const frame = (0, _src2.getFrameByName)(win, (0, _common.getBridgeName)((0, _src2.getDomain)()));

      if (!frame) {
        throw new Error(`Bridge not found for domain: ${(0, _src2.getDomain)()}`);
      } // $FlowFixMe


      if ((0, _src2.isSameDomain)(frame) && (0, _global.getGlobal)(frame)) {
        return frame;
      }

      return new _src.ZalgoPromise((resolve, reject) => {
        let interval;
        let timeout; // eslint-disable-line prefer-const

        interval = setInterval(() => {
          // eslint-disable-line prefer-const
          // $FlowFixMe
          if (frame && (0, _src2.isSameDomain)(frame) && (0, _global.getGlobal)(frame)) {
            clearInterval(interval);
            clearTimeout(timeout);
            return resolve(frame);
          }
        }, 100);
        timeout = setTimeout(() => {
          clearInterval(interval);
          return reject(new Error(`Bridge not found for domain: ${(0, _src2.getDomain)()}`));
        }, 2000);
      });
    });
  });
}

function openTunnelToOpener({
  on,
  send,
  receiveMessage
}) {
  return _src.ZalgoPromise.try(() => {
    const opener = (0, _src2.getOpener)(window);

    if (!opener) {
      return;
    }

    if (!(0, _common.needsBridge)({
      win: opener
    })) {
      return;
    }

    (0, _common.registerRemoteWindow)(opener);
    return awaitRemoteBridgeForWindow(opener).then(bridge => {
      if (!window.name) {
        return (0, _common.rejectRemoteSendMessage)(opener, new Error(`Can not register with opener: window does not have a name`));
      } // $FlowFixMe


      return (0, _global.getGlobal)(bridge).openTunnelToParent({
        name: window.name,
        source: window,

        canary() {// pass
        },

        sendMessage(message) {
          try {
            (0, _src3.noop)(window);
          } catch (err) {
            return;
          }

          if (!window || window.closed) {
            return;
          }

          try {
            receiveMessage({
              data: message,
              origin: this.origin,
              source: this.source
            }, {
              on,
              send
            });
          } catch (err) {
            _src.ZalgoPromise.reject(err);
          }
        }

      }).then(({
        source,
        origin,
        data
      }) => {
        if (source !== opener) {
          throw new Error(`Source does not match opener`);
        }

        (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
      }).catch(err => {
        (0, _common.rejectRemoteSendMessage)(opener, err);
        throw err;
      });
    });
  });
}