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

function getSerializedWindow(id, win, {
  send
}) {
  let windowName;
  return {
    id,
    type: (0, _src.getOpener)(win) ? _src.WINDOW_TYPE.POPUP : _src.WINDOW_TYPE.IFRAME,
    getInstanceID: (0, _src3.memoizePromise)(() => (0, _lib.getWindowInstanceID)(win, {
      send
    })),
    close: () => _src2.ZalgoPromise.try(() => {
      win.close();
    }),
    getName: () => _src2.ZalgoPromise.try(() => {
      if ((0, _src.isWindowClosed)(win)) {
        return;
      }

      return windowName;
    }),
    focus: () => _src2.ZalgoPromise.try(() => {
      win.focus();
    }),
    isClosed: () => _src2.ZalgoPromise.try(() => {
      return (0, _src.isWindowClosed)(win);
    }),
    setLocation: href => _src2.ZalgoPromise.try(() => {
      if ((0, _src.isSameDomain)(win)) {
        try {
          if (win.location && typeof win.location.replace === 'function') {
            // $FlowFixMe
            win.location.replace(href);
            return;
          }
        } catch (err) {// pass
        }
      }

      win.location = href;
    }),
    setName: name => _src2.ZalgoPromise.try(() => {
      if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
        (0, _bridge.linkWindow)({
          win,
          name
        });
      }

      win = (0, _src.assertSameDomain)(win);
      win.name = name;

      if (win.frameElement) {
        win.frameElement.setAttribute('name', name);
      }

      windowName = name;
    })
  };
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
    this.name = void 0;
    this.serializedWindow = serializedWindow;
    this.actualWindowPromise = new _src2.ZalgoPromise();
    this.send = send;

    if (actualWindow) {
      this.setWindow(actualWindow);
    }
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
    return this.serializedWindow.setLocation(href).then(() => this);
  }

  setName(name) {
    return this.serializedWindow.setName(name).then(() => this);
  }

  close() {
    return this.serializedWindow.close().then(() => this);
  }

  focus() {
    return _src2.ZalgoPromise.try(() => {
      return _src2.ZalgoPromise.all([this.isPopup() && this.serializedWindow.getName().then(name => {
        if (name) {
          window.open('', name);
        }
      }), this.serializedWindow.focus()]);
    }).then(() => this);
  }

  isClosed() {
    return this.serializedWindow.isClosed();
  }

  getWindow() {
    return this.actualWindow;
  }

  setWindow(win) {
    this.actualWindow = win;
    this.serializedWindow = getSerializedWindow(this.serializedWindow.id, win, {
      send: this.send
    });
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
    return this.serializedWindow.getInstanceID();
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


    const realWin = win; // $FlowFixMe

    return (0, _global.windowStore)('winToProxyWindow').getOrSet(win, () => {
      const id = (0, _src3.uniqueID)();
      const serializedWindow = getSerializedWindow(id, realWin, {
        send
      });
      const proxyWindow = new ProxyWindow(serializedWindow, realWin, {
        send
      });
      return (0, _global.globalStore)('idToProxyWindow').set(id, proxyWindow);
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