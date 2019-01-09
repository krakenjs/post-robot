var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
            var methods = methodStore.getOrSet(source, function () {
                return {};
            });
            var meth = methods[data.id] || proxyWindowMethods.get(id);

            if (!meth) {
                throw new Error('Could not find method \'' + data.name + '\' with id: ' + data.id + ' in ' + getDomain(window));
            }

            var proxy = meth.proxy,
                domain = meth.domain,
                val = meth.val;


            if (!matchDomain(domain, origin)) {
                // $FlowFixMe
                throw new Error('Method \'' + data.name + '\' domain ' + JSON.stringify(isRegex(meth.domain) ? meth.domain.source : meth.domain) + ' does not match origin ' + origin + ' in ' + getDomain(window));
            }

            if (proxy) {
                // $FlowFixMe
                return proxy.matchWindow(source).then(function (match) {
                    if (!match) {
                        throw new Error('Method call \'' + data.name + '\' failed - proxy window does not match source in ' + getDomain(window));
                    }
                    return val;
                });
            }

            return val;
        }).then(function (method) {
            return method.apply({ source: source, origin: origin, data: data }, data.args);
        }).then(function (result) {
            return { result: result, id: id, name: name };
        });
    });
});

export function serializeFunction(destination, domain, val, key) {
    listenForFunctionCalls();

    var id = uniqueID();
    destination = ProxyWindow.unwrap(destination);

    if (ProxyWindow.isProxyWindow(destination)) {
        proxyWindowMethods.set(id, { proxy: destination, domain: domain, val: val });
        // $FlowFixMe
        destination.awaitWindow().then(function (win) {
            proxyWindowMethods.del(id);
            var methods = methodStore.getOrSet(win, function () {
                return {};
            });
            methods[id] = { domain: domain, val: val };
        });
    } else {
        // $FlowFixMe
        var methods = methodStore.getOrSet(destination, function () {
            return {};
        });
        methods[id] = { domain: domain, val: val };
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id: id, name: val.name || key });
}

export function deserializeFunction(source, origin, _ref2) {
    var id = _ref2.id,
        name = _ref2.name;

    function innerWrapper(args) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var originalStack = void 0;

        if (__DEBUG__) {
            originalStack = new Error('Original call to ' + name + '():').stack;
        }

        return ZalgoPromise['try'](function () {
            // $FlowFixMe
            return ProxyWindow.isProxyWindow(source) ? source.awaitWindow() : source;
        }).then(function (win) {
            return global.send(win, MESSAGE_NAME.METHOD, { id: id, name: name, args: args }, _extends({ domain: origin }, opts));
        })['catch'](function (err) {
            // $FlowFixMe
            if (__DEBUG__ && originalStack && err.stack) {
                // $FlowFixMe
                err.stack = err.stack + '\n\n' + originalStack;
            }
            throw err;
        });
    }

    function crossDomainFunctionWrapper() {
        return innerWrapper(Array.prototype.slice.call(arguments)).then(function (_ref3) {
            var data = _ref3.data;
            return data.result;
        });
    }

    crossDomainFunctionWrapper.fireAndForget = function crossDomainFireAndForgetFunctionWrapper() {
        return innerWrapper(Array.prototype.slice.call(arguments), { fireAndForget: true });
    };

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}