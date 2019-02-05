"use strict";

exports.__esModule = true;
exports.serializeWindow = serializeWindow;
exports.deserializeWindow = deserializeWindow;
exports.ProxyWindow = void 0;

var _src = require("cross-domain-utils/src");

var _src2 = require("zalgo-promise/src");

var _src3 = require("belter/src");

var _src4 = require("universal-serialize/src");

var _conf = require("../conf");

var _global = require("../global");

var _lib = require("../lib");

var _bridge = require("../bridge");

function cleanupProxyWindows() {
  const idToProxyWindow = (0, _global.globalStore)('idToProxyWindow');

  for (const id of idToProxyWindow.keys()) {
    // $FlowFixMe
    if (idToProxyWindow.get(id).shouldClean()) {
      idToProxyWindow.del(id);
    }
  }
}

class ProxyWindow {
  constructor(serializedWindow, actualWindow, {
    send
  }) {
    this.isProxyWindow = true;
    this.serializedWindow = void 0;
    this.actualWindow = void 0;
    this.actualWindowPromise = void 0;
    this.send = void 0;
    this.serializedWindow = serializedWindow;
    this.actualWindowPromise = new _src2.ZalgoPromise();

    if (actualWindow) {
      this.setWindow(actualWindow);
    }

    this.serializedWindow.getInstanceID = (0, _src3.memoizePromise)(this.serializedWindow.getInstanceID);
    this.send = send;
  }

  getType() {
    return this.serializedWindow.type;
  }

  isPopup() {
    return this.getType() === _src.WINDOW_TYPE.POPUP;
  }

  isIframe() {
    return this.getType() === _src.WINDOW_TYPE.IFRAME;
  }

  setLocation(href) {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        this.actualWindow.location = href;
      } else {
        return this.serializedWindow.setLocation(href);
      }
    }).then(() => this);
  }

  setName(name) {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        if (!(0, _src.isSameDomain)(this.actualWindow)) {
          throw new Error(`Can not set name for window on different domain`);
        } // $FlowFixMe


        this.actualWindow.name = name; // $FlowFixMe

        if (this.actualWindow.frameElement) {
          // $FlowFixMe
          this.actualWindow.frameElement.setAttribute('name', name);
        }

        if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
          (0, _bridge.linkWindow)({
            win: this.actualWindow,
            name
          });
        }
      } else {
        return this.serializedWindow.setName(name);
      }
    }).then(() => this);
  }

  close() {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        this.actualWindow.close();
      } else {
        return this.serializedWindow.close();
      }
    }).then(() => this);
  }

  focus() {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        this.actualWindow.focus();
      }

      return this.serializedWindow.focus();
    }).then(() => this);
  }

  isClosed() {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        return (0, _src.isWindowClosed)(this.actualWindow);
      } else {
        return this.serializedWindow.isClosed();
      }
    });
  }

  getWindow() {
    return this.actualWindow;
  }

  setWindow(win) {
    this.actualWindow = win;
    this.actualWindowPromise.resolve(win);
  }

  awaitWindow() {
    return this.actualWindowPromise;
  }

  matchWindow(win) {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        return win === this.actualWindow;
      }

      return _src2.ZalgoPromise.all([this.getInstanceID(), (0, _lib.getWindowInstanceID)(win, {
        send: this.send
      })]).then(([proxyInstanceID, knownWindowInstanceID]) => {
        const match = proxyInstanceID === knownWindowInstanceID;

        if (match) {
          this.setWindow(win);
        }

        return match;
      });
    });
  }

  unwrap() {
    return this.actualWindow || this;
  }

  getInstanceID() {
    if (this.actualWindow) {
      return (0, _lib.getWindowInstanceID)(this.actualWindow, {
        send: this.send
      });
    } else {
      return this.serializedWindow.getInstanceID();
    }
  }

  serialize() {
    return this.serializedWindow;
  }

  shouldClean() {
    return this.actualWindow && (0, _src.isWindowClosed)(this.actualWindow);
  }

  static unwrap(win) {
    return ProxyWindow.isProxyWindow(win) // $FlowFixMe
    ? win.unwrap() : win;
  }

  static serialize(win, {
    send
  }) {
    cleanupProxyWindows();
    return ProxyWindow.toProxyWindow(win, {
      send
    }).serialize();
  }

  static deserialize(serializedWindow, {
    on,
    send
  }) {
    cleanupProxyWindows();
    return (0, _global.globalStore)('idToProxyWindow').getOrSet(serializedWindow.id, () => {
      return new ProxyWindow(serializedWindow, null, {
        on,
        send
      });
    });
  }

  static isProxyWindow(obj) {
    // $FlowFixMe
    return Boolean(obj && !(0, _src.isWindow)(obj) && obj.isProxyWindow);
  }

  static toProxyWindow(win, {
    send
  }) {
    cleanupProxyWindows();

    if (ProxyWindow.isProxyWindow(win)) {
      // $FlowFixMe
      return win;
    } // $FlowFixMe


    return (0, _global.windowStore)('winToProxyWindow').getOrSet(win, () => {
      const id = (0, _src3.uniqueID)();
      return (0, _global.globalStore)('idToProxyWindow').set(id, new ProxyWindow({
        id,
        // $FlowFixMe
        type: (0, _src.getOpener)(win) ? _src.WINDOW_TYPE.POPUP : _src.WINDOW_TYPE.IFRAME,
        // $FlowFixMe
        getInstanceID: () => (0, _lib.getWindowInstanceID)(win, {
          send
        }),
        close: () => _src2.ZalgoPromise.try(() => {
          win.close();
        }),
        focus: () => _src2.ZalgoPromise.try(() => {
          win.focus();
        }),
        isClosed: () => _src2.ZalgoPromise.try(() => {
          // $FlowFixMe
          return (0, _src.isWindowClosed)(win);
        }),
        setLocation: href => _src2.ZalgoPromise.try(() => {
          // $FlowFixMe
          if ((0, _src.isSameDomain)(win)) {
            try {
              if (win.location && typeof win.location.replace === 'function') {
                // $FlowFixMe
                win.location.replace(href);
                return;
              }
            } catch (err) {// pass
            }
          } // $FlowFixMe


          win.location = href;
        }),
        setName: name => _src2.ZalgoPromise.try(() => {
          if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
            // $FlowFixMe
            (0, _bridge.linkWindow)({
              win,
              name
            });
          } // $FlowFixMe


          win.name = name;
        }) // $FlowFixMe

      }, win, {
        send
      }));
    });
  }

}

exports.ProxyWindow = ProxyWindow;

function serializeWindow(destination, domain, win, {
  send
}) {
  return (0, _src4.serializeType)(_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win, {
    send
  }));
}

function deserializeWindow(source, origin, win, {
  on,
  send
}) {
  return ProxyWindow.deserialize(win, {
    on,
    send
  });
}