function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { isSameDomain, isWindowClosed } from 'cross-domain-utils/src';
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { uniqueID, getOrSet, memoizePromise } from 'belter/src';
import { serializeType } from 'universal-serialize/src';

import { SERIALIZATION_TYPE } from '../conf';
import { global } from '../global';
import { getWindowInstanceID } from '../lib';

global.winToProxyWindow = global.winToProxyWindow || new WeakMap();
global.idToProxyWindow = global.idToProxyWindow || {};

export var ProxyWindow = function () {
    function ProxyWindow(serializedWindow, actualWindow) {
        _classCallCheck(this, ProxyWindow);

        this.serializedWindow = serializedWindow;
        this.actualWindowPromise = new ZalgoPromise();
        if (actualWindow) {
            this.setWindow(actualWindow);
        }
        this.serializedWindow.getInstanceID = memoizePromise(this.serializedWindow.getInstanceID);
    }

    ProxyWindow.prototype.setLocation = function setLocation(href) {
        var _this = this;

        return ZalgoPromise['try'](function () {
            if (_this.actualWindow) {
                _this.actualWindow.location = href;
            } else {
                return _this.serializedWindow.setLocation(href);
            }
        }).then(function () {
            return _this;
        });
    };

    ProxyWindow.prototype.setName = function setName(name) {
        var _this2 = this;

        return ZalgoPromise['try'](function () {
            if (_this2.actualWindow) {
                if (!isSameDomain(_this2.actualWindow)) {
                    throw new Error('Can not set name for window on different domain');
                }
                // $FlowFixMe
                _this2.actualWindow.name = name;
                // $FlowFixMe
                if (_this2.actualWindow.frameElement) {
                    // $FlowFixMe
                    _this2.actualWindow.frameElement.setAttribute('name', name);
                }
            } else {
                return _this2.serializedWindow.setName(name);
            }
        }).then(function () {
            return _this2;
        });
    };

    ProxyWindow.prototype.close = function close() {
        var _this3 = this;

        return ZalgoPromise['try'](function () {
            if (_this3.actualWindow) {
                _this3.actualWindow.close();
            } else {
                return _this3.serializedWindow.close();
            }
        }).then(function () {
            return _this3;
        });
    };

    ProxyWindow.prototype.focus = function focus() {
        var _this4 = this;

        return ZalgoPromise['try'](function () {
            if (_this4.actualWindow) {
                _this4.actualWindow.focus();
            } else {
                return _this4.serializedWindow.focus();
            }
        }).then(function () {
            return _this4;
        });
    };

    ProxyWindow.prototype.isClosed = function isClosed() {
        var _this5 = this;

        return ZalgoPromise['try'](function () {
            if (_this5.actualWindow) {
                return isWindowClosed(_this5.actualWindow);
            } else {
                return _this5.serializedWindow.isClosed();
            }
        });
    };

    ProxyWindow.prototype.setWindow = function setWindow(win) {
        this.actualWindow = win;
        this.actualWindowPromise.resolve(win);
    };

    ProxyWindow.prototype.matchWindow = function matchWindow(win) {
        var _this6 = this;

        return ZalgoPromise['try'](function () {
            if (_this6.actualWindow) {
                return win === _this6.actualWindow;
            }

            return ZalgoPromise.all([_this6.getInstanceID(), getWindowInstanceID(win)]).then(function (_ref) {
                var proxyInstanceID = _ref[0],
                    knownWindowInstanceID = _ref[1];

                var match = proxyInstanceID === knownWindowInstanceID;

                if (match) {
                    _this6.setWindow(win);
                }

                return match;
            });
        });
    };

    ProxyWindow.prototype.unwrap = function unwrap() {
        return this.actualWindow || this;
    };

    ProxyWindow.prototype.awaitWindow = function awaitWindow() {
        return this.actualWindowPromise;
    };

    ProxyWindow.prototype.getInstanceID = function getInstanceID() {
        if (this.actualWindow) {
            return getWindowInstanceID(this.actualWindow);
        } else {
            return this.serializedWindow.getInstanceID();
        }
    };

    ProxyWindow.prototype.serialize = function serialize() {
        return this.serializedWindow;
    };

    ProxyWindow.unwrap = function unwrap(win) {
        return ProxyWindow.isProxyWindow(win)
        // $FlowFixMe
        ? win.unwrap() : win;
    };

    ProxyWindow.serialize = function serialize(win) {
        return ProxyWindow.toProxyWindow(win).serialize();
    };

    ProxyWindow.deserialize = function deserialize(serializedWindow) {
        return getOrSet(global.idToProxyWindow, serializedWindow.id, function () {
            return new ProxyWindow(serializedWindow);
        });
    };

    ProxyWindow.isProxyWindow = function isProxyWindow(obj) {
        return obj instanceof ProxyWindow;
    };

    ProxyWindow.toProxyWindow = function toProxyWindow(win) {
        if (ProxyWindow.isProxyWindow(win)) {
            // $FlowFixMe
            return win;
        }

        return global.winToProxyWindow.getOrSet(win, function () {
            var id = uniqueID();

            global.idToProxyWindow[id] = new ProxyWindow({
                id: id,
                getInstanceID: function getInstanceID() {
                    return getWindowInstanceID(win);
                },
                close: function close() {
                    return ZalgoPromise['try'](function () {
                        win.close();
                    });
                },
                focus: function focus() {
                    return ZalgoPromise['try'](function () {
                        win.focus();
                    });
                },
                isClosed: function isClosed() {
                    return ZalgoPromise['try'](function () {
                        // $FlowFixMe
                        return isWindowClosed(win);
                    });
                },
                setLocation: function setLocation(href) {
                    return ZalgoPromise['try'](function () {
                        // $FlowFixMe
                        if (isSameDomain(win)) {
                            try {
                                if (win.location && typeof win.location.replace === 'function') {
                                    // $FlowFixMe
                                    win.location.replace(href);
                                    return;
                                }
                            } catch (err) {
                                // pass
                            }
                        }

                        // $FlowFixMe
                        win.location = href;
                    });
                },
                setName: function setName(name) {
                    return ZalgoPromise['try'](function () {
                        // $FlowFixMe
                        win.name = name;
                    });
                }
                // $FlowFixMe
            }, win);

            return global.idToProxyWindow[id];
        });
    };

    return ProxyWindow;
}();

export function serializeWindow(destination, domain, win) {
    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win));
}

export function deserializeWindow(source, origin, win) {
    return ProxyWindow.deserialize(win);
}