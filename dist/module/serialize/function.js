import { matchDomain, getDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID, isRegex } from 'belter/src';
import { serializeType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { global, windowStore, globalStore } from '../global';

import { ProxyWindow } from './window';

var methodStore = windowStore('methodStore');
var proxyWindowMethods = globalStore('proxyWindowMethods');
global.listeningForFunctions = global.listeningForFunctions || false;

function addMethod(id, val, name, source, domain) {
    if (ProxyWindow.isProxyWindow(source)) {
        proxyWindowMethods.set(id, { val: val, name: name, domain: domain, source: source });
    } else {
        proxyWindowMethods.del(id);
        // $FlowFixMe
        var methods = methodStore.getOrSet(source, function () {
            return {};
        });
        methods[id] = { domain: domain, name: name, val: val, source: source };
    }
}

function lookupMethod(source, id) {
    var methods = methodStore.getOrSet(source, function () {
        return {};
    });
    return methods[id] || proxyWindowMethods.get(id);
}

var listenForFunctionCalls = once(function () {
    if (global.listeningForFunctions) {
        return;
    }

    global.listeningForFunctions = true;

    global.on(MESSAGE_NAME.METHOD, { origin: WILDCARD }, function (_ref) {
        var source = _ref.source,
            origin = _ref.origin,
            data = _ref.data;
        var id = data.id,
            name = data.name;


        return ZalgoPromise['try'](function () {
            var meth = lookupMethod(source, id);

            if (!meth) {
                throw new Error('Could not find method \'' + data.name + '\' with id: ' + data.id + ' in ' + getDomain(window));
            }

            var methodSource = meth.source,
                domain = meth.domain,
                val = meth.val;


            return ZalgoPromise['try'](function () {
                if (!matchDomain(domain, origin)) {
                    // $FlowFixMe
                    throw new Error('Method \'' + data.name + '\' domain ' + JSON.stringify(isRegex(meth.domain) ? meth.domain.source : meth.domain) + ' does not match origin ' + origin + ' in ' + getDomain(window));
                }

                if (ProxyWindow.isProxyWindow(methodSource)) {
                    // $FlowFixMe
                    return methodSource.matchWindow(source).then(function (match) {
                        // eslint-disable-line max-nested-callbacks
                        if (!match) {
                            throw new Error('Method call \'' + data.name + '\' failed - proxy window does not match source in ' + getDomain(window));
                        }
                    });
                }
            }).then(function () {
                return val.apply({ source: source, origin: origin }, data.args);
            }, function (err) {
                return ZalgoPromise['try'](function () {
                    // eslint-disable-line max-nested-callbacks
                    if (val.onError) {
                        return val.onError(err);
                    }
                }).then(function () {
                    // eslint-disable-line max-nested-callbacks
                    throw err;
                });
            }).then(function (result) {
                return { result: result, id: id, name: name };
            });
        });
    });
});

export function serializeFunction(destination, domain, val, key) {
    listenForFunctionCalls();

    var id = val.__id__ || uniqueID();
    destination = ProxyWindow.unwrap(destination);
    var name = val.__name__ || val.name || key;

    if (ProxyWindow.isProxyWindow(destination)) {
        addMethod(id, val, name, destination, domain);

        // $FlowFixMe
        destination.awaitWindow().then(function (win) {
            addMethod(id, val, name, win, domain);
        });
    } else {
        addMethod(id, val, name, destination, domain);
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id: id, name: name });
}

export function deserializeFunction(source, origin, _ref2) {
    var id = _ref2.id,
        name = _ref2.name;

    var getDeserializedFunction = function getDeserializedFunction() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        function crossDomainFunctionWrapper() {
            var _arguments = arguments;

            var originalStack = void 0;

            if (__DEBUG__) {
                originalStack = new Error('Original call to ' + name + '():').stack;
            }

            return ProxyWindow.toProxyWindow(source).awaitWindow().then(function (win) {
                var meth = lookupMethod(win, id);

                if (meth && meth.val !== crossDomainFunctionWrapper) {
                    return meth.val.apply({ source: window, origin: getDomain() }, _arguments);
                } else {
                    return global.send(win, MESSAGE_NAME.METHOD, { id: id, name: name, args: Array.prototype.slice.call(_arguments) }, { domain: origin, fireAndForget: opts.fireAndForget }).then(function (res) {
                        if (!opts.fireAndForget) {
                            return res.data.result;
                        }
                    });
                }
            })['catch'](function (err) {
                // $FlowFixMe
                if (__DEBUG__ && originalStack && err.stack) {
                    // $FlowFixMe
                    err.stack = err.stack + '\n\n' + originalStack;
                }
                throw err;
            });
        }

        crossDomainFunctionWrapper.__name__ = name;
        crossDomainFunctionWrapper.__origin__ = origin;
        crossDomainFunctionWrapper.__source__ = source;
        crossDomainFunctionWrapper.__id__ = id;

        crossDomainFunctionWrapper.origin = origin;

        return crossDomainFunctionWrapper;
    };

    var crossDomainFunctionWrapper = getDeserializedFunction();
    crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({ fireAndForget: true });

    return crossDomainFunctionWrapper;
}