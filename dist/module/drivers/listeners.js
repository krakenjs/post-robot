'use strict';

exports.__esModule = true;
exports.resetListeners = resetListeners;
exports.addResponseListener = addResponseListener;
exports.getResponseListener = getResponseListener;
exports.deleteResponseListener = deleteResponseListener;
exports.markResponseListenerErrored = markResponseListenerErrored;
exports.isResponseListenerErrored = isResponseListenerErrored;
exports.getRequestListener = getRequestListener;
exports.addRequestListener = addRequestListener;

require('zalgo-promise/src');

var _src = require('cross-domain-safe-weakmap/src');

var _src2 = require('cross-domain-utils/src');

var _global = require('../global');

var _lib = require('../lib');

var _conf = require('../conf');

function resetListeners() {
    _global.global.responseListeners = {};
    _global.global.requestListeners = {};
}

_global.global.responseListeners = _global.global.responseListeners || {};
_global.global.requestListeners = _global.global.requestListeners || {};
_global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function WindowWildcard() {/* pass */}();

_global.global.erroredResponseListeners = _global.global.erroredResponseListeners || {};

var __DOMAIN_REGEX__ = '__domain_regex__';

function addResponseListener(hash, listener) {
    _global.global.responseListeners[hash] = listener;
}

function getResponseListener(hash) {
    return _global.global.responseListeners[hash];
}

function deleteResponseListener(hash) {
    delete _global.global.responseListeners[hash];
}

function markResponseListenerErrored(hash) {
    _global.global.erroredResponseListeners[hash] = true;
}

function isResponseListenerErrored(hash) {
    return Boolean(_global.global.erroredResponseListeners[hash]);
}

function getRequestListener(_ref) {
    var name = _ref.name,
        win = _ref.win,
        domain = _ref.domain;


    if (win === _conf.CONSTANTS.WILDCARD) {
        win = null;
    }

    if (domain === _conf.CONSTANTS.WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error('Name required to get request listener');
    }

    var nameListeners = _global.global.requestListeners[name];

    if (!nameListeners) {
        return;
    }

    var _arr = [win, _global.global.WINDOW_WILDCARD];
    for (var _i = 0; _i < _arr.length; _i++) {
        var winQualifier = _arr[_i];

        var winListeners = winQualifier && nameListeners.get(winQualifier);

        if (!winListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (winListeners[domain]) {
                return winListeners[domain];
            }

            if (winListeners[__DOMAIN_REGEX__]) {
                for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray) {
                        if (_i2 >= _iterator.length) break;
                        _ref3 = _iterator[_i2++];
                    } else {
                        _i2 = _iterator.next();
                        if (_i2.done) break;
                        _ref3 = _i2.value;
                    }

                    var _ref4 = _ref3;
                    var regex = _ref4.regex,
                        listener = _ref4.listener;

                    if ((0, _src2.matchDomain)(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (winListeners[_conf.CONSTANTS.WILDCARD]) {
            return winListeners[_conf.CONSTANTS.WILDCARD];
        }
    }
}

// eslint-disable-next-line complexity
function addRequestListener(_ref5, listener) {
    var name = _ref5.name,
        win = _ref5.win,
        domain = _ref5.domain;


    if (!name || typeof name !== 'string') {
        throw new Error('Name required to add request listener');
    }

    if (Array.isArray(win)) {
        var listenersCollection = [];

        for (var _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray2) {
                if (_i3 >= _iterator2.length) break;
                _ref6 = _iterator2[_i3++];
            } else {
                _i3 = _iterator2.next();
                if (_i3.done) break;
                _ref6 = _i3.value;
            }

            var item = _ref6;

            listenersCollection.push(addRequestListener({ name: name, domain: domain, win: item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref7;

                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) break;
                        _ref7 = _iterator3[_i4++];
                    } else {
                        _i4 = _iterator3.next();
                        if (_i4.done) break;
                        _ref7 = _i4.value;
                    }

                    var cancelListener = _ref7;

                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        var _listenersCollection = [];

        for (var _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray4) {
                if (_i5 >= _iterator4.length) break;
                _ref8 = _iterator4[_i5++];
            } else {
                _i5 = _iterator4.next();
                if (_i5.done) break;
                _ref8 = _i5.value;
            }

            var _item = _ref8;

            _listenersCollection.push(addRequestListener({ name: name, win: win, domain: _item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                    var _ref9;

                    if (_isArray5) {
                        if (_i6 >= _iterator5.length) break;
                        _ref9 = _iterator5[_i6++];
                    } else {
                        _i6 = _iterator5.next();
                        if (_i6.done) break;
                        _ref9 = _i6.value;
                    }

                    var cancelListener = _ref9;

                    cancelListener.cancel();
                }
            }
        };
    }

    var existingListener = getRequestListener({ name: name, win: win, domain: domain });

    if (!win || win === _conf.CONSTANTS.WILDCARD) {
        win = _global.global.WINDOW_WILDCARD;
    }

    domain = domain || _conf.CONSTANTS.WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString() + ' for ' + (win === _global.global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (win) {
            throw new Error('Request listener already exists for ' + name + ' for ' + (win === _global.global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString());
        } else {
            throw new Error('Request listener already exists for ' + name);
        }
    }

    var requestListeners = _global.global.requestListeners;

    var nameListeners = requestListeners[name];

    if (!nameListeners) {
        nameListeners = new _src.WeakMap();
        requestListeners[name] = nameListeners;
    }

    var winListeners = nameListeners.get(win);

    if (!winListeners) {
        winListeners = {};
        nameListeners.set(win, winListeners);
    }

    var strDomain = domain.toString();

    var regexListeners = winListeners[__DOMAIN_REGEX__];
    var regexListener = void 0;

    if ((0, _lib.isRegex)(domain)) {

        if (!regexListeners) {
            regexListeners = [];
            winListeners[__DOMAIN_REGEX__] = regexListeners;
        }

        regexListener = { regex: domain, listener: listener };

        regexListeners.push(regexListener);
    } else {
        winListeners[strDomain] = listener;
    }

    return {
        cancel: function cancel() {
            if (!winListeners) {
                return;
            }

            delete winListeners[strDomain];

            if (win && Object.keys(winListeners).length === 0) {
                nameListeners['delete'](win);
            }

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
            }
        }
    };
}