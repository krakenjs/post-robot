import 'zalgo-promise/src';
import { matchDomain } from 'cross-domain-utils/src';
import { isRegex, getOrSet } from 'belter/src';

import { global, globalStore, windowStore } from '../global';
import { WILDCARD } from '../conf';

var responseListeners = globalStore('responseListeners');
var requestListeners = windowStore('requestListeners');
var erroredResponseListeners = globalStore('erroredResponseListeners');

export function resetListeners() {
    responseListeners.reset();
    erroredResponseListeners.reset();
}

global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new function WindowWildcard() {/* pass */}();

var __DOMAIN_REGEX__ = '__domain_regex__';

export function addResponseListener(hash, listener) {
    responseListeners.set(hash, listener);
}

export function getResponseListener(hash) {
    return responseListeners.get(hash);
}

export function deleteResponseListener(hash) {
    responseListeners.del(hash);
}

export function markResponseListenerErrored(hash) {
    erroredResponseListeners.set(hash, true);
}

export function isResponseListenerErrored(hash) {
    return erroredResponseListeners.has(hash);
}

export function getRequestListener(_ref) {
    var name = _ref.name,
        win = _ref.win,
        domain = _ref.domain;


    if (win === WILDCARD) {
        win = null;
    }

    if (domain === WILDCARD) {
        domain = null;
    }

    if (!name) {
        throw new Error('Name required to get request listener');
    }

    for (var _i2 = 0, _ref3 = [win, global.WINDOW_WILDCARD], _length2 = _ref3 == null ? 0 : _ref3.length; _i2 < _length2; _i2++) {
        var winQualifier = _ref3[_i2];
        if (!winQualifier) {
            continue;
        }

        var nameListeners = requestListeners.get(winQualifier);

        if (!nameListeners) {
            continue;
        }

        var domainListeners = nameListeners[name];

        if (!domainListeners) {
            continue;
        }

        if (domain && typeof domain === 'string') {
            if (domainListeners[domain]) {
                return domainListeners[domain];
            }

            if (domainListeners[__DOMAIN_REGEX__]) {
                for (var _i4 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__], _length4 = _domainListeners$__DO2 == null ? 0 : _domainListeners$__DO2.length; _i4 < _length4; _i4++) {
                    var _ref5 = _domainListeners$__DO2[_i4];
                    var regex = _ref5.regex,
                        listener = _ref5.listener;

                    if (matchDomain(regex, domain)) {
                        return listener;
                    }
                }
            }
        }

        if (domainListeners[WILDCARD]) {
            return domainListeners[WILDCARD];
        }
    }
}

export function addRequestListener(_ref6, listener) {
    var name = _ref6.name,
        win = _ref6.win,
        domain = _ref6.domain;


    if (!name || typeof name !== 'string') {
        throw new Error('Name required to add request listener');
    }

    if (Array.isArray(win)) {
        var listenersCollection = [];

        for (var _i6 = 0, _win2 = win, _length6 = _win2 == null ? 0 : _win2.length; _i6 < _length6; _i6++) {
            var item = _win2[_i6];
            listenersCollection.push(addRequestListener({ name: name, domain: domain, win: item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _i8 = 0, _length8 = listenersCollection == null ? 0 : listenersCollection.length; _i8 < _length8; _i8++) {
                    var cancelListener = listenersCollection[_i8];
                    cancelListener.cancel();
                }
            }
        };
    }

    if (Array.isArray(domain)) {
        var _listenersCollection = [];

        for (var _i10 = 0, _domain2 = domain, _length10 = _domain2 == null ? 0 : _domain2.length; _i10 < _length10; _i10++) {
            var _item = _domain2[_i10];
            _listenersCollection.push(addRequestListener({ name: name, win: win, domain: _item }, listener));
        }

        return {
            cancel: function cancel() {
                for (var _i12 = 0, _length12 = _listenersCollection == null ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) {
                    var cancelListener = _listenersCollection[_i12];
                    cancelListener.cancel();
                }
            }
        };
    }

    var existingListener = getRequestListener({ name: name, win: win, domain: domain });

    if (!win || win === WILDCARD) {
        win = global.WINDOW_WILDCARD;
    }

    domain = domain || WILDCARD;

    if (existingListener) {
        if (win && domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString() + ' for ' + (win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (win) {
            throw new Error('Request listener already exists for ' + name + ' for ' + (win === global.WINDOW_WILDCARD ? 'wildcard' : 'specified') + ' window');
        } else if (domain) {
            throw new Error('Request listener already exists for ' + name + ' on domain ' + domain.toString());
        } else {
            throw new Error('Request listener already exists for ' + name);
        }
    }

    var nameListeners = requestListeners.getOrSet(win, function () {
        return {};
    });
    // $FlowFixMe
    var domainListeners = getOrSet(nameListeners, name, function () {
        return {};
    });

    var strDomain = domain.toString();

    var regexListeners = void 0;
    var regexListener = void 0;

    if (isRegex(domain)) {
        regexListeners = getOrSet(domainListeners, __DOMAIN_REGEX__, function () {
            return [];
        });
        regexListener = { regex: domain, listener: listener };
        regexListeners.push(regexListener);
    } else {
        domainListeners[strDomain] = listener;
    }

    return {
        cancel: function cancel() {
            delete domainListeners[strDomain];

            if (regexListener) {
                regexListeners.splice(regexListeners.indexOf(regexListener, 1));

                if (!regexListeners.length) {
                    delete domainListeners[__DOMAIN_REGEX__];
                }
            }

            if (!Object.keys(domainListeners).length) {
                // $FlowFixMe
                delete nameListeners[name];
            }

            // $FlowFixMe
            if (win && !Object.keys(nameListeners).length) {
                requestListeners.del(win);
            }
        }
    };
}