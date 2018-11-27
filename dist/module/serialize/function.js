import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { matchDomain } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { once, uniqueID } from 'belter/src';
import { serializeType } from 'universal-serialize/src';

import { MESSAGE_NAME, WILDCARD, SERIALIZATION_TYPE } from '../conf';
import { global } from '../global';

import { ProxyWindow } from './window';

global.methods = global.methods || new WeakMap();
global.proxyWindowMethods = global.proxyWindowMethods || {};
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
            var methods = global.methods.get(source) || {};
            var meth = methods[data.id] || global.proxyWindowMethods[id];

            if (!meth) {
                throw new Error('Could not find method with id: ' + data.id);
            }

            var proxy = meth.proxy,
                domain = meth.domain,
                val = meth.val;


            if (!matchDomain(domain, origin)) {
                throw new Error('Method domain ' + meth.domain + ' does not match origin ' + origin);
            }

            if (proxy) {
                return proxy.matchWindow(source).then(function (match) {
                    if (!match) {
                        throw new Error('Proxy window does not match source');
                    }

                    delete global.proxyWindowMethods[id];
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
        global.proxyWindowMethods[id] = { proxy: destination, domain: domain, val: val };
    } else {
        var methods = global.methods.getOrSet(destination, function () {
            return {};
        });
        methods[id] = { domain: domain, val: val };
    }

    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, { id: id, name: val.name || key });
}

export function deserializeFunction(source, origin, _ref2) {
    var id = _ref2.id,
        name = _ref2.name;


    function crossDomainFunctionWrapper() {
        var args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id: id, name: name, args: args }, { domain: origin }).then(function (_ref3) {
            var data = _ref3.data;
            return data.result;
        });
    }

    crossDomainFunctionWrapper.fireAndForget = function crossDomainFireAndForgetFunctionWrapper() {
        var args = Array.prototype.slice.call(arguments);
        return global.send(source, MESSAGE_NAME.METHOD, { id: id, name: name, args: args }, { domain: origin, fireAndForget: true });
    };

    crossDomainFunctionWrapper.__name__ = name;
    crossDomainFunctionWrapper.__xdomain__ = true;

    crossDomainFunctionWrapper.source = source;
    crossDomainFunctionWrapper.origin = origin;

    return crossDomainFunctionWrapper;
}