!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("postRobot", [], factory) : "object" == typeof exports ? exports.postRobot = factory() : root.postRobot = factory();
}("undefined" != typeof self ? self : this, (function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        }, __webpack_require__.t = function(value, mode) {
            if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return {}.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        __webpack_require__.r(__webpack_exports__);
        var PROTOCOL = {
            MOCK: "mock:",
            FILE: "file:",
            ABOUT: "about:"
        }, WILDCARD = "*", WINDOW_TYPE = {
            IFRAME: "iframe",
            POPUP: "popup"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
        }
        function getParent(win) {
            if (void 0 === win && (win = window), win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {}
        }
        function getOpener(win) {
            if (void 0 === win && (win = window), win && !getParent(win)) try {
                return win.opener;
            } catch (err) {}
        }
        function canReadFromWindow(win) {
            try {
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            void 0 === win && (win = window);
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
            if (protocol === PROTOCOL.ABOUT) {
                var parent = getParent(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            void 0 === win && (win = window);
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
        }
        function isSameDomain(win) {
            if (!function(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function assertSameDomain(win) {
            if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
            return win;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== function(win) {
                var result = [];
                try {
                    for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
                } catch (err) {}
                return result;
            }(child).indexOf(parent);
        }
        function getFrames(win) {
            var frames, len, result = [];
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            try {
                len = frames.length;
            } catch (err) {}
            if (0 === len) return result;
            if (len) {
                for (var i = 0; i < len; i++) {
                    var frame = void 0;
                    try {
                        frame = frames[i];
                    } catch (err) {
                        continue;
                    }
                    result.push(frame);
                }
                return result;
            }
            for (var _i = 0; _i < 100; _i++) {
                var _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
                var frame = _getFrames2[_i3];
                result.push(frame);
                for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
            }
            return result;
        }
        function getTop(win) {
            void 0 === win && (win = window);
            try {
                if (win.top) return win.top;
            } catch (err) {}
            if (getParent(win) === win) return win;
            try {
                if (isAncestorParent(window, win) && window.top) return window.top;
            } catch (err) {}
            try {
                if (isAncestorParent(win, window) && window.top) return window.top;
            } catch (err) {}
            for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
                var frame = _getAllChildFrames4[_i7];
                try {
                    if (frame.top) return frame.top;
                } catch (err) {}
                if (getParent(frame) === frame) return frame;
            }
        }
        function getAllFramesInWindow(win) {
            var top = getTop(win);
            if (!top) throw new Error("Can not determine top window");
            return [].concat(getAllChildFrames(top), [ top ]);
        }
        var iframeWindows = [], iframeFrames = [];
        function isWindowClosed(win, allowMock) {
            void 0 === allowMock && (allowMock = !0);
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            var iframeIndex = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && function(frame) {
                    if (!frame.contentWindow) return !0;
                    if (!frame.parentNode) return !0;
                    var doc = frame.ownerDocument;
                    return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                }(frame)) return !0;
            }
            return !1;
        }
        function getUserAgent(win) {
            return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _i9 = 0; _i9 < winFrames.length; _i9++) {
                var childFrame = winFrames[_i9];
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame)) return childFrame;
                } catch (err) {}
            }
            try {
                if (-1 !== winFrames.indexOf(win.frames[name])) return win.frames[name];
            } catch (err) {}
            try {
                if (-1 !== winFrames.indexOf(win[name])) return win[name];
            } catch (err) {}
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            return void 0 === win && (win = window), getOpener(win = win || window) || getParent(win) || void 0;
        }
        function anyMatch(collection1, collection2) {
            for (var _i17 = 0; _i17 < collection1.length; _i17++) for (var item1 = collection1[_i17], _i19 = 0; _i19 < collection2.length; _i19++) if (item1 === collection2[_i19]) return !0;
            return !1;
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
            1));
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === WILDCARD || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some((function(subpattern) {
                return matchDomain(subpattern, origin);
            })));
        }
        function getDomainFromUrl(url) {
            return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : getDomain();
        }
        function isWindow(obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if ("[object Window]" === {}.toString.call(obj)) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
            } catch (err) {
                return !0;
            }
            return !1;
        }
        function closeWindow(win) {
            try {
                win.close();
            } catch (err) {}
        }
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
                if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
                var _toString = {}.toString;
                if (_toString) {
                    var name = _toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
        function flushActive() {
            if (!activeCount && flushPromise) {
                var promise = flushPromise;
                flushPromise = null, promise.resolve();
            }
        }
        function startActive() {
            activeCount += 1;
        }
        function endActive() {
            activeCount -= 1, flushActive();
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
                this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
                this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
                this.handlers = [], handler) {
                    var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                    startActive();
                    try {
                        handler((function(res) {
                            isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                        }), (function(err) {
                            isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                        }));
                    } catch (err) {
                        return endActive(), void this.reject(err);
                    }
                    endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            var _proto = ZalgoPromise.prototype;
            return _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                return this.resolved = !0, this.value = result, this.dispatch(), this;
            }, _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                return this.rejected = !0, this.error = error, this.errorHandled || setTimeout((function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err), setTimeout((function() {
                                throw err;
                            }), 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }), 1), this.dispatch(), this;
            }, _proto.asyncReject = function(error) {
                return this.errorHandled = !0, this.reject(error), this;
            }, _proto.dispatch = function() {
                var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0, startActive();
                    for (var chain = function(firstPromise, secondPromise) {
                        return firstPromise.then((function(res) {
                            secondPromise.resolve(res);
                        }), (function(err) {
                            secondPromise.reject(err);
                        }));
                    }, i = 0; i < handlers.length; i++) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, _result2 = void 0;
                        if (resolved) try {
                            _result2 = onSuccess ? onSuccess(this.value) : this.value;
                        } catch (err) {
                            promise.reject(err);
                            continue;
                        } else if (rejected) {
                            if (!onError) {
                                promise.reject(this.error);
                                continue;
                            }
                            try {
                                _result2 = onError(this.error);
                            } catch (err) {
                                promise.reject(err);
                                continue;
                            }
                        }
                        _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? (_result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error), 
                        _result2.errorHandled = !0) : utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                    }
                    handlers.length = 0, this.dispatching = !1, endActive();
                }
            }, _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise;
                return this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                }), this.errorHandled = !0, this.dispatch(), promise;
            }, _proto.catch = function(onError) {
                return this.then(void 0, onError);
            }, _proto.finally = function(onFinally) {
                if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then((function(result) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        return result;
                    }));
                }), (function(err) {
                    return ZalgoPromise.try(onFinally).then((function() {
                        throw err;
                    }));
                }));
            }, _proto.timeout = function(time, err) {
                var _this3 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout((function() {
                    _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                }), time);
                return this.then((function(result) {
                    return clearTimeout(timeout), result;
                }));
            }, _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            }, ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                    return value.then(resolve, reject);
                })) : (new ZalgoPromise).resolve(value);
            }, ZalgoPromise.reject = function(error) {
                return (new ZalgoPromise).reject(error);
            }, ZalgoPromise.asyncReject = function(error) {
                return (new ZalgoPromise).asyncReject(error);
            }, ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise, count = promises.length, results = [];
                if (!count) return promise.resolve(results), promise;
                for (var chain = function(i, firstPromise, secondPromise) {
                    return firstPromise.then((function(res) {
                        results[i] = res, 0 == (count -= 1) && promise.resolve(results);
                    }), (function(err) {
                        secondPromise.reject(err);
                    }));
                }, i = 0; i < promises.length; i++) {
                    var prom = promises[i];
                    if (prom instanceof ZalgoPromise) {
                        if (prom.resolved) {
                            results[i] = prom.value, count -= 1;
                            continue;
                        }
                    } else if (!utils_isPromise(prom)) {
                        results[i] = prom, count -= 1;
                        continue;
                    }
                    chain(i, ZalgoPromise.resolve(prom), promise);
                }
                return 0 === count && promise.resolve(results), promise;
            }, ZalgoPromise.hash = function(promises) {
                var result = {};
                return ZalgoPromise.all(Object.keys(promises).map((function(key) {
                    return ZalgoPromise.resolve(promises[key]).then((function(value) {
                        result[key] = value;
                    }));
                }))).then((function() {
                    return result;
                }));
            }, ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    return possiblyUnhandledPromiseHandlers.push(handler), {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            }, ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    return endActive(), ZalgoPromise.reject(err);
                }
                return endActive(), ZalgoPromise.resolve(result);
            }, ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise((function(resolve) {
                    setTimeout(resolve, _delay);
                }));
            }, ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            }, ZalgoPromise.flush = function() {
                return promise = flushPromise = flushPromise || new ZalgoPromise, flushActive(), 
                promise;
                var promise;
            }, ZalgoPromise;
        }();
        function _extends() {
            return (_extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }).apply(this, arguments);
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var objectIDs, weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap, testKey = {};
                        return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap;
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            return _proto._cleanupClosedWindows = function() {
                for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                    }
                }
            }, _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            }, _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var name = this.name, entry = key[name];
                    return void (entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    }));
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys, values = this.values, index = util_safeIndexOf(keys, key);
                -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
            }, _proto.get = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return weakmap.get(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return entry && entry[0] === key ? entry[1] : void 0;
                } catch (err) {}
                this._cleanupClosedWindows();
                var index = util_safeIndexOf(this.keys, key);
                if (-1 !== index) return this.values[index];
            }, _proto.delete = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.delete(key);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys, index = util_safeIndexOf(keys, key);
                -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
            }, _proto.has = function(key) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    if (weakmap.has(key)) return !0;
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                } catch (err) {}
                return this._cleanupClosedWindows(), -1 !== util_safeIndexOf(this.keys, key);
            }, _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                return this.set(key, value), value;
            }, CrossDomainSafeWeakMap;
        }();
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, (function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            })) + "_" + function(str) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                })));
                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
                throw new Error("Can not find window.btoa or Buffer");
            }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        function memoizePromise(method) {
            var fn, cache = {};
            function memoizedPromiseFunction() {
                for (var _this2 = this, _arguments = arguments, _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var key = function(args) {
                    try {
                        return JSON.stringify([].slice.call(args), (function(subkey, val) {
                            return "function" == typeof val ? "memoize[" + function(obj) {
                                if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap, null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                                var uid = objectIDs.get(obj);
                                return uid || (uid = typeof obj + ":" + uniqueID(), objectIDs.set(obj, uid)), uid;
                            }(val) + "]" : val;
                        }));
                    } catch (err) {
                        throw new Error("Arguments not serializable -- can not be used to memoize");
                    }
                }(args);
                return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = promise_ZalgoPromise.try((function() {
                    return method.apply(_this2, _arguments);
                })).finally((function() {
                    delete cache[key];
                })), cache[key]);
            }
            return memoizedPromiseFunction.reset = function() {
                cache = {};
            }, function(fn, name) {
                try {
                    delete fn.name, fn.name = name;
                } catch (err) {}
                return fn.__name__ = fn.displayName = name, fn;
            }(memoizedPromiseFunction, ((fn = method).name || fn.__name__ || fn.displayName || "anonymous") + "::promiseMemoized");
        }
        function src_util_noop() {}
        function stringifyError(err, level) {
            if (void 0 === level && (level = 1), level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack, message = err && err.message;
                    if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                    if (stack) return stack;
                    if (message) return message;
                }
                return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
            } catch (newErr) {
                return "Error while stringifying error: " + stringifyError(newErr, level + 1);
            }
        }
        function stringify(item) {
            return "string" == typeof item ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item);
        }
        function util_isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        function util_getOrSet(obj, key, getter) {
            if (obj.hasOwnProperty(key)) return obj[key];
            var val = getter();
            return obj[key] = val, val;
        }
        Object.create(Error.prototype);
        var MESSAGE_NAME = {
            METHOD: "postrobot_method",
            HELLO: "postrobot_hello",
            OPEN_TUNNEL: "postrobot_open_tunnel"
        }, BRIDGE_NAME_PREFIX = "__postrobot_bridge__", constants_WILDCARD = "*", SERIALIZATION_TYPE = {
            CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
            CROSS_DOMAIN_FUNCTION: "cross_domain_function",
            CROSS_DOMAIN_WINDOW: "cross_domain_window"
        };
        function global_getGlobal(win) {
            return void 0 === win && (win = window), win !== window ? win.__post_robot_10_0_22__ : win.__post_robot_10_0_22__ = win.__post_robot_10_0_22__ || {};
        }
        var getObj = function() {
            return {};
        };
        function globalStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            util_getOrSet(global_getGlobal(), key, (function() {
                var store = defStore();
                return {
                    has: function(storeKey) {
                        return store.hasOwnProperty(storeKey);
                    },
                    get: function(storeKey, defVal) {
                        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
                    },
                    set: function(storeKey, val) {
                        return store[storeKey] = val, val;
                    },
                    del: function(storeKey) {
                        delete store[storeKey];
                    },
                    getOrSet: function(storeKey, getter) {
                        return util_getOrSet(store, storeKey, getter);
                    },
                    reset: function() {
                        store = defStore();
                    },
                    keys: function() {
                        return Object.keys(store);
                    }
                };
            }));
        }
        var WildCard = function() {};
        function getWildcard() {
            var global = global_getGlobal();
            return global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard, global.WINDOW_WILDCARD;
        }
        function windowStore(key, defStore) {
            return void 0 === key && (key = "store"), void 0 === defStore && (defStore = getObj), 
            globalStore("windowStore").getOrSet(key, (function() {
                var winStore = new weakmap_CrossDomainSafeWeakMap, getStore = function(win) {
                    return winStore.getOrSet(win, defStore);
                };
                return {
                    has: function(win) {
                        return getStore(win).hasOwnProperty(key);
                    },
                    get: function(win, defVal) {
                        var store = getStore(win);
                        return store.hasOwnProperty(key) ? store[key] : defVal;
                    },
                    set: function(win, val) {
                        return getStore(win)[key] = val, val;
                    },
                    del: function(win) {
                        delete getStore(win)[key];
                    },
                    getOrSet: function(win, getter) {
                        return util_getOrSet(getStore(win), key, getter);
                    }
                };
            }));
        }
        function getInstanceID() {
            return globalStore("instance").getOrSet("instanceID", uniqueID);
        }
        function resolveHelloPromise(win, _ref) {
            var domain = _ref.domain, helloPromises = windowStore("helloPromises"), existingPromise = helloPromises.get(win);
            existingPromise && existingPromise.resolve({
                domain: domain
            });
            var newPromise = promise_ZalgoPromise.resolve({
                domain: domain
            });
            return helloPromises.set(win, newPromise), newPromise;
        }
        function sayHello(win, _ref4) {
            return (0, _ref4.send)(win, MESSAGE_NAME.HELLO, {
                instanceID: getInstanceID()
            }, {
                domain: constants_WILDCARD,
                timeout: -1
            }).then((function(_ref5) {
                var origin = _ref5.origin, instanceID = _ref5.data.instanceID;
                return resolveHelloPromise(win, {
                    domain: origin
                }), {
                    win: win,
                    domain: origin,
                    instanceID: instanceID
                };
            }));
        }
        function getWindowInstanceID(win, _ref6) {
            var send = _ref6.send;
            return windowStore("windowInstanceIDPromises").getOrSet(win, (function() {
                return sayHello(win, {
                    send: send
                }).then((function(_ref7) {
                    return _ref7.instanceID;
                }));
            }));
        }
        function awaitWindowHello(win, timeout, name) {
            void 0 === timeout && (timeout = 5e3), void 0 === name && (name = "Window");
            var promise = function(win) {
                return windowStore("helloPromises").getOrSet(win, (function() {
                    return new promise_ZalgoPromise;
                }));
            }(win);
            return -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms"))), 
            promise;
        }
        function markWindowKnown(win) {
            windowStore("knownWindows").set(win, !0);
        }
        var _SERIALIZER, TYPE = {
            FUNCTION: "function",
            ERROR: "error",
            PROMISE: "promise",
            REGEX: "regex",
            DATE: "date",
            ARRAY: "array",
            OBJECT: "object",
            STRING: "string",
            NUMBER: "number",
            BOOLEAN: "boolean",
            NULL: "null",
            UNDEFINED: "undefined"
        };
        function isSerializedType(item) {
            return "object" == typeof item && null !== item && "string" == typeof item.__type__;
        }
        function determineType(val) {
            return void 0 === val ? TYPE.UNDEFINED : null === val ? TYPE.NULL : Array.isArray(val) ? TYPE.ARRAY : "function" == typeof val ? TYPE.FUNCTION : "object" == typeof val ? val instanceof Error ? TYPE.ERROR : "function" == typeof val.then ? TYPE.PROMISE : "[object RegExp]" === {}.toString.call(val) ? TYPE.REGEX : "[object Date]" === {}.toString.call(val) ? TYPE.DATE : TYPE.OBJECT : "string" == typeof val ? TYPE.STRING : "number" == typeof val ? TYPE.NUMBER : "boolean" == typeof val ? TYPE.BOOLEAN : void 0;
        }
        function serializeType(type, val) {
            return {
                __type__: type,
                __val__: val
            };
        }
        var _DESERIALIZER, SERIALIZER = ((_SERIALIZER = {})[TYPE.FUNCTION] = function() {}, 
        _SERIALIZER[TYPE.ERROR] = function(_ref) {
            return serializeType(TYPE.ERROR, {
                message: _ref.message,
                stack: _ref.stack,
                code: _ref.code
            });
        }, _SERIALIZER[TYPE.PROMISE] = function() {}, _SERIALIZER[TYPE.REGEX] = function(val) {
            return serializeType(TYPE.REGEX, val.source);
        }, _SERIALIZER[TYPE.DATE] = function(val) {
            return serializeType(TYPE.DATE, val.toJSON());
        }, _SERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _SERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _SERIALIZER), defaultSerializers = {}, DESERIALIZER = ((_DESERIALIZER = {})[TYPE.FUNCTION] = function() {
            throw new Error("Function serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.ERROR] = function(_ref2) {
            var stack = _ref2.stack, code = _ref2.code, error = new Error(_ref2.message);
            return error.code = code, error.stack = stack + "\n\n" + error.stack, error;
        }, _DESERIALIZER[TYPE.PROMISE] = function() {
            throw new Error("Promise serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER[TYPE.REGEX] = function(val) {
            return new RegExp(val);
        }, _DESERIALIZER[TYPE.DATE] = function(val) {
            return new Date(val);
        }, _DESERIALIZER[TYPE.ARRAY] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.OBJECT] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.STRING] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NUMBER] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.BOOLEAN] = function(val) {
            return val;
        }, _DESERIALIZER[TYPE.NULL] = function(val) {
            return val;
        }, _DESERIALIZER), defaultDeserializers = {};
        function needsBridgeForBrowser() {
            return !!getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i);
        }
        function needsBridgeForWin(win) {
            return !isSameTopWindow(window, win);
        }
        function needsBridgeForDomain(domain, win) {
            if (domain) {
                if (getDomain() !== getDomainFromUrl(domain)) return !0;
            } else if (win && !isSameDomain(win)) return !0;
            return !1;
        }
        function needsBridge(_ref) {
            var win = _ref.win, domain = _ref.domain;
            return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
        }
        function getBridgeName(domain) {
            var sanitizedDomain = (domain = domain || getDomainFromUrl(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
            return BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
        }
        function isBridge() {
            return Boolean(window.name && window.name === getBridgeName(getDomain()));
        }
        var documentBodyReady = new promise_ZalgoPromise((function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval((function() {
                if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
            }), 10);
        }));
        function registerRemoteWindow(win) {
            windowStore("remoteWindowPromises").getOrSet(win, (function() {
                return new promise_ZalgoPromise;
            }));
        }
        function findRemoteWindow(win) {
            var remoteWinPromise = windowStore("remoteWindowPromises").get(win);
            if (!remoteWinPromise) throw new Error("Remote window promise not found");
            return remoteWinPromise;
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            findRemoteWindow(win).resolve((function(remoteWin, remoteDomain, message) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if (!matchDomain(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                sendMessage.fireAndForget(message);
            }));
        }
        function rejectRemoteSendMessage(win, err) {
            findRemoteWindow(win).reject(err).catch(src_util_noop);
        }
        function linkWindow(_ref3) {
            for (var win = _ref3.win, name = _ref3.name, domain = _ref3.domain, popupWindowsByName = globalStore("popupWindowsByName"), popupWindowsByWin = windowStore("popupWindowsByWin"), _i2 = 0, _popupWindowsByName$k2 = popupWindowsByName.keys(); _i2 < _popupWindowsByName$k2.length; _i2++) {
                var winName = _popupWindowsByName$k2[_i2], _details = popupWindowsByName.get(winName);
                _details && !isWindowClosed(_details.win) || popupWindowsByName.del(winName);
            }
            var details = popupWindowsByWin.getOrSet(win, (function() {
                return name ? popupWindowsByName.getOrSet(name, (function() {
                    return {
                        win: win,
                        name: name
                    };
                })) : {
                    win: win
                };
            }));
            if (details.win && details.win !== win) throw new Error("Different window already linked for window: " + (name || "undefined"));
            return name && (details.name = name, popupWindowsByName.set(name, details)), domain && (details.domain = domain, 
            registerRemoteWindow(win)), popupWindowsByWin.set(win, details), details;
        }
        function setupBridge(_ref) {
            var windowOpen, on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage;
            windowOpen = window.open, window.open = function(url, name, options, last) {
                var win = windowOpen.call(this, function(url) {
                    if (0 !== getDomainFromUrl(url).indexOf(PROTOCOL.MOCK)) return url;
                    throw new Error("Mock urls not supported out of test mode");
                }(url), name, options, last);
                return win ? (linkWindow({
                    win: win,
                    name: name,
                    domain: url ? getDomainFromUrl(url) : null
                }), win) : win;
            }, function(_ref) {
                var on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage, popupWindowsByName = globalStore("popupWindowsByName");
                on(MESSAGE_NAME.OPEN_TUNNEL, (function(_ref2) {
                    var source = _ref2.source, origin = _ref2.origin, data = _ref2.data, bridgePromise = globalStore("bridges").get(origin);
                    if (!bridgePromise) throw new Error("Can not find bridge promise for domain " + origin);
                    return bridgePromise.then((function(bridge) {
                        if (source !== bridge) throw new Error("Message source does not matched registered bridge for domain " + origin);
                        if (!data.name) throw new Error("Register window expected to be passed window name");
                        if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                        if (!popupWindowsByName.has(data.name)) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                        if (!popupWindowsByName.get(data.name).domain) throw new Error("We do not have a registered domain for window " + data.name);
                        if (popupWindowsByName.get(data.name).domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + popupWindowsByName.get(data.name).domain);
                        return registerRemoteSendMessage(popupWindowsByName.get(data.name).win, origin, data.sendMessage), 
                        {
                            sendMessage: function(message) {
                                if (window && !window.closed) {
                                    var winDetails = popupWindowsByName.get(data.name);
                                    if (winDetails) try {
                                        receiveMessage({
                                            data: message,
                                            origin: winDetails.domain,
                                            source: winDetails.win
                                        }, {
                                            on: on,
                                            send: send
                                        });
                                    } catch (err) {
                                        promise_ZalgoPromise.reject(err);
                                    }
                                }
                            }
                        };
                    }));
                }));
            }({
                on: on,
                send: send,
                receiveMessage: receiveMessage
            }), function(_ref2) {
                var send = _ref2.send;
                global_getGlobal(window).openTunnelToParent = function(_ref3) {
                    var name = _ref3.name, source = _ref3.source, canary = _ref3.canary, sendMessage = _ref3.sendMessage, tunnelWindows = globalStore("tunnelWindows"), parentWindow = getParent(window);
                    if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                    var id = function(_ref) {
                        var name = _ref.name, source = _ref.source, canary = _ref.canary, sendMessage = _ref.sendMessage;
                        !function() {
                            for (var tunnelWindows = globalStore("tunnelWindows"), _i2 = 0, _tunnelWindows$keys2 = tunnelWindows.keys(); _i2 < _tunnelWindows$keys2.length; _i2++) {
                                var key = _tunnelWindows$keys2[_i2];
                                isWindowClosed(tunnelWindows[key].source) && tunnelWindows.del(key);
                            }
                        }();
                        var id = uniqueID();
                        return globalStore("tunnelWindows").set(id, {
                            name: name,
                            source: source,
                            canary: canary,
                            sendMessage: sendMessage
                        }), id;
                    }({
                        name: name,
                        source: source,
                        canary: canary,
                        sendMessage: sendMessage
                    });
                    return send(parentWindow, MESSAGE_NAME.OPEN_TUNNEL, {
                        name: name,
                        sendMessage: function() {
                            var tunnelWindow = tunnelWindows.get(id);
                            if (tunnelWindow && tunnelWindow.source && !isWindowClosed(tunnelWindow.source)) {
                                try {
                                    tunnelWindow.canary();
                                } catch (err) {
                                    return;
                                }
                                tunnelWindow.sendMessage.apply(this, arguments);
                            }
                        }
                    }, {
                        domain: constants_WILDCARD
                    });
                };
            }({
                on: on,
                send: send
            }), function(_ref) {
                var on = _ref.on, send = _ref.send, receiveMessage = _ref.receiveMessage;
                promise_ZalgoPromise.try((function() {
                    var win, opener = getOpener(window);
                    if (opener && needsBridge({
                        win: opener
                    })) return registerRemoteWindow(opener), (win = opener, windowStore("remoteBridgeAwaiters").getOrSet(win, (function() {
                        return promise_ZalgoPromise.try((function() {
                            var frame = getFrameByName(win, getBridgeName(getDomain()));
                            if (frame) return isSameDomain(frame) && global_getGlobal(assertSameDomain(frame)) ? frame : new promise_ZalgoPromise((function(resolve) {
                                var interval, timeout;
                                interval = setInterval((function() {
                                    if (frame && isSameDomain(frame) && global_getGlobal(assertSameDomain(frame))) return clearInterval(interval), 
                                    clearTimeout(timeout), resolve(frame);
                                }), 100), timeout = setTimeout((function() {
                                    return clearInterval(interval), resolve();
                                }), 2e3);
                            }));
                        }));
                    }))).then((function(bridge) {
                        return bridge ? window.name ? global_getGlobal(assertSameDomain(bridge)).openTunnelToParent({
                            name: window.name,
                            source: window,
                            canary: function() {},
                            sendMessage: function(message) {
                                if (window && !window.closed) try {
                                    receiveMessage({
                                        data: message,
                                        origin: this.origin,
                                        source: this.source
                                    }, {
                                        on: on,
                                        send: send
                                    });
                                } catch (err) {
                                    promise_ZalgoPromise.reject(err);
                                }
                            }
                        }).then((function(_ref2) {
                            var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                            if (source !== opener) throw new Error("Source does not match opener");
                            registerRemoteSendMessage(source, origin, data.sendMessage);
                        })).catch((function(err) {
                            throw rejectRemoteSendMessage(opener, err), err;
                        })) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                    }));
                }));
            }({
                on: on,
                send: send,
                receiveMessage: receiveMessage
            });
        }
        function cleanupProxyWindows() {
            for (var idToProxyWindow = globalStore("idToProxyWindow"), _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(); _i2 < _idToProxyWindow$keys2.length; _i2++) {
                var id = _idToProxyWindow$keys2[_i2];
                idToProxyWindow.get(id).shouldClean() && idToProxyWindow.del(id);
            }
        }
        function getSerializedWindow(winPromise, _ref) {
            var windowName, send = _ref.send, _ref$id = _ref.id;
            return {
                id: void 0 === _ref$id ? uniqueID() : _ref$id,
                getType: function() {
                    return winPromise.then((function(win) {
                        return getOpener(win) ? WINDOW_TYPE.POPUP : WINDOW_TYPE.IFRAME;
                    }));
                },
                getInstanceID: memoizePromise((function() {
                    return winPromise.then((function(win) {
                        return getWindowInstanceID(win, {
                            send: send
                        });
                    }));
                })),
                close: function() {
                    return winPromise.then(closeWindow);
                },
                getName: function() {
                    return winPromise.then((function(win) {
                        if (!isWindowClosed(win)) return windowName;
                    }));
                },
                focus: function() {
                    return winPromise.then((function(win) {
                        win.focus();
                    }));
                },
                isClosed: function() {
                    return winPromise.then((function(win) {
                        return isWindowClosed(win);
                    }));
                },
                setLocation: function(href) {
                    return winPromise.then((function(win) {
                        if (isSameDomain(win)) try {
                            if (win.location && "function" == typeof win.location.replace) return void win.location.replace(href);
                        } catch (err) {}
                        win.location = href;
                    }));
                },
                setName: function(name) {
                    return winPromise.then((function(win) {
                        linkWindow({
                            win: win,
                            name: name
                        });
                        var sameDomainWin = assertSameDomain(win);
                        sameDomainWin.name = name, sameDomainWin.frameElement && sameDomainWin.frameElement.setAttribute("name", name), 
                        windowName = name;
                    }));
                }
            };
        }
        var window_ProxyWindow = function() {
            function ProxyWindow(_ref2) {
                var send = _ref2.send, win = _ref2.win, serializedWindow = _ref2.serializedWindow;
                this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, 
                this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new promise_ZalgoPromise, 
                this.serializedWindow = serializedWindow || getSerializedWindow(this.actualWindowPromise, {
                    send: send
                }), globalStore("idToProxyWindow").set(this.getID(), this), win && this.setWindow(win, {
                    send: send
                });
            }
            var _proto = ProxyWindow.prototype;
            return _proto.getID = function() {
                return this.serializedWindow.id;
            }, _proto.getType = function() {
                return this.serializedWindow.getType();
            }, _proto.isPopup = function() {
                return this.getType() === WINDOW_TYPE.POPUP;
            }, _proto.setLocation = function(href) {
                var _this = this;
                return this.serializedWindow.setLocation(href).then((function() {
                    return _this;
                }));
            }, _proto.getName = function() {
                return this.serializedWindow.getName();
            }, _proto.setName = function(name) {
                var _this2 = this;
                return this.serializedWindow.setName(name).then((function() {
                    return _this2;
                }));
            }, _proto.close = function() {
                var _this3 = this;
                return this.serializedWindow.close().then((function() {
                    return _this3;
                }));
            }, _proto.focus = function() {
                var _this4 = this;
                return promise_ZalgoPromise.all([ this.isPopup() && this.getName().then((function(name) {
                    name && window.open("", name);
                })), this.serializedWindow.focus() ]).then((function() {
                    return _this4;
                }));
            }, _proto.isClosed = function() {
                return this.serializedWindow.isClosed();
            }, _proto.getWindow = function() {
                return this.actualWindow;
            }, _proto.setWindow = function(win, _ref3) {
                var send = _ref3.send;
                this.actualWindow = win, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = getSerializedWindow(this.actualWindowPromise, {
                    send: send,
                    id: this.getID()
                }), windowStore("winToProxyWindow").set(win, this);
            }, _proto.awaitWindow = function() {
                return this.actualWindowPromise;
            }, _proto.matchWindow = function(win, _ref4) {
                var _this5 = this, send = _ref4.send;
                return promise_ZalgoPromise.try((function() {
                    return _this5.actualWindow ? win === _this5.actualWindow : promise_ZalgoPromise.hash({
                        proxyInstanceID: _this5.getInstanceID(),
                        knownWindowInstanceID: getWindowInstanceID(win, {
                            send: send
                        })
                    }).then((function(_ref5) {
                        var match = _ref5.proxyInstanceID === _ref5.knownWindowInstanceID;
                        return match && _this5.setWindow(win, {
                            send: send
                        }), match;
                    }));
                }));
            }, _proto.unwrap = function() {
                return this.actualWindow || this;
            }, _proto.getInstanceID = function() {
                return this.serializedWindow.getInstanceID();
            }, _proto.shouldClean = function() {
                return Boolean(this.actualWindow && isWindowClosed(this.actualWindow));
            }, _proto.serialize = function() {
                return this.serializedWindow;
            }, ProxyWindow.unwrap = function(win) {
                return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
            }, ProxyWindow.serialize = function(win, _ref6) {
                var send = _ref6.send;
                return cleanupProxyWindows(), ProxyWindow.toProxyWindow(win, {
                    send: send
                }).serialize();
            }, ProxyWindow.deserialize = function(serializedWindow, _ref7) {
                var send = _ref7.send;
                return cleanupProxyWindows(), globalStore("idToProxyWindow").get(serializedWindow.id) || new ProxyWindow({
                    serializedWindow: serializedWindow,
                    send: send
                });
            }, ProxyWindow.isProxyWindow = function(obj) {
                return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
            }, ProxyWindow.toProxyWindow = function(win, _ref8) {
                var send = _ref8.send;
                if (cleanupProxyWindows(), ProxyWindow.isProxyWindow(win)) return win;
                var actualWindow = win;
                return windowStore("winToProxyWindow").get(actualWindow) || new ProxyWindow({
                    win: actualWindow,
                    send: send
                });
            }, ProxyWindow;
        }();
        function addMethod(id, val, name, source, domain) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            window_ProxyWindow.isProxyWindow(source) ? proxyWindowMethods.set(id, {
                val: val,
                name: name,
                domain: domain,
                source: source
            }) : (proxyWindowMethods.del(id), methodStore.getOrSet(source, (function() {
                return {};
            }))[id] = {
                domain: domain,
                name: name,
                val: val,
                source: source
            });
        }
        function lookupMethod(source, id) {
            var methodStore = windowStore("methodStore"), proxyWindowMethods = globalStore("proxyWindowMethods");
            return methodStore.getOrSet(source, (function() {
                return {};
            }))[id] || proxyWindowMethods.get(id);
        }
        function function_serializeFunction(destination, domain, val, key, _ref3) {
            !function(_ref) {
                var on = _ref.on, send = _ref.send;
                globalStore("builtinListeners").getOrSet("functionCalls", (function() {
                    return on(MESSAGE_NAME.METHOD, {
                        domain: constants_WILDCARD
                    }, (function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data, id = data.id, name = data.name, meth = lookupMethod(source, id);
                        if (!meth) throw new Error("Could not find method '" + name + "' with id: " + data.id + " in " + getDomain(window));
                        var methodSource = meth.source, domain = meth.domain, val = meth.val;
                        return promise_ZalgoPromise.try((function() {
                            if (!matchDomain(domain, origin)) throw new Error("Method '" + data.name + "' domain " + JSON.stringify(util_isRegex(meth.domain) ? meth.domain.source : meth.domain) + " does not match origin " + origin + " in " + getDomain(window));
                            if (window_ProxyWindow.isProxyWindow(methodSource)) return methodSource.matchWindow(source, {
                                send: send
                            }).then((function(match) {
                                if (!match) throw new Error("Method call '" + data.name + "' failed - proxy window does not match source in " + getDomain(window));
                            }));
                        })).then((function() {
                            return val.apply({
                                source: source,
                                origin: origin
                            }, data.args);
                        }), (function(err) {
                            return promise_ZalgoPromise.try((function() {
                                if (val.onError) return val.onError(err);
                            })).then((function() {
                                throw err.stack && (err.stack = "Remote call to " + name + "()\n\n" + err.stack), 
                                err;
                            }));
                        })).then((function(result) {
                            return {
                                result: result,
                                id: id,
                                name: name
                            };
                        }));
                    }));
                }));
            }({
                on: _ref3.on,
                send: _ref3.send
            });
            var id = val.__id__ || uniqueID();
            destination = window_ProxyWindow.unwrap(destination);
            var name = val.__name__ || val.name || key;
            return 0 === name.indexOf("anonymous::") && (name = name.replace("anonymous::", key + "::")), 
            window_ProxyWindow.isProxyWindow(destination) ? (addMethod(id, val, name, destination, domain), 
            destination.awaitWindow().then((function(win) {
                addMethod(id, val, name, win, domain);
            }))) : addMethod(id, val, name, destination, domain), serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION, {
                id: id,
                name: name
            });
        }
        function serializeMessage(destination, domain, obj, _ref) {
            var _serialize, on = _ref.on, send = _ref.send;
            return function(obj, serializers) {
                void 0 === serializers && (serializers = defaultSerializers);
                var result = JSON.stringify(obj, (function(key) {
                    var val = this[key];
                    if (isSerializedType(this)) return val;
                    var type = determineType(val);
                    if (!type) return val;
                    var serializer = serializers[type] || SERIALIZER[type];
                    return serializer ? serializer(val, key) : val;
                }));
                return void 0 === result ? TYPE.UNDEFINED : result;
            }(obj, ((_serialize = {})[TYPE.PROMISE] = function(val, key) {
                return function(destination, domain, val, key, _ref) {
                    return serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
                        then: function_serializeFunction(destination, domain, (function(resolve, reject) {
                            return val.then(resolve, reject);
                        }), key, {
                            on: _ref.on,
                            send: _ref.send
                        })
                    });
                }(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.FUNCTION] = function(val, key) {
                return function_serializeFunction(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[TYPE.OBJECT] = function(val) {
                return isWindow(val) || window_ProxyWindow.isProxyWindow(val) ? serializeType(SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, window_ProxyWindow.serialize(val, {
                    send: send
                })) : val;
            }, _serialize));
        }
        function deserializeMessage(source, origin, message, _ref2) {
            var _deserialize, on = _ref2.on, send = _ref2.send;
            return function(str, deserializers) {
                if (void 0 === deserializers && (deserializers = defaultDeserializers), str !== TYPE.UNDEFINED) return JSON.parse(str, (function(key, val) {
                    if (isSerializedType(this)) return val;
                    var type, value;
                    if (isSerializedType(val) ? (type = val.__type__, value = val.__val__) : (type = determineType(val), 
                    value = val), !type) return value;
                    var deserializer = deserializers[type] || DESERIALIZER[type];
                    return deserializer ? deserializer(value, key) : value;
                }));
            }(message, ((_deserialize = {})[SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE] = function(serializedPromise) {
                return function(source, origin, _ref2) {
                    return new promise_ZalgoPromise(_ref2.then);
                }(0, 0, serializedPromise);
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION] = function(serializedFunction) {
                return function(source, origin, _ref4, _ref5) {
                    var id = _ref4.id, name = _ref4.name, send = _ref5.send, getDeserializedFunction = function(opts) {
                        function crossDomainFunctionWrapper() {
                            var _arguments = arguments;
                            return window_ProxyWindow.toProxyWindow(source, {
                                send: send
                            }).awaitWindow().then((function(win) {
                                var meth = lookupMethod(win, id);
                                if (meth && meth.val !== crossDomainFunctionWrapper) return meth.val.apply({
                                    source: window,
                                    origin: getDomain()
                                }, _arguments);
                                var options = {
                                    domain: origin,
                                    fireAndForget: opts.fireAndForget
                                }, _args = [].slice.call(_arguments);
                                return send(win, MESSAGE_NAME.METHOD, {
                                    id: id,
                                    name: name,
                                    args: _args
                                }, options).then((function(res) {
                                    if (!opts.fireAndForget) return res.data.result;
                                }));
                            })).catch((function(err) {
                                throw err;
                            }));
                        }
                        return void 0 === opts && (opts = {}), crossDomainFunctionWrapper.__name__ = name, 
                        crossDomainFunctionWrapper.__origin__ = origin, crossDomainFunctionWrapper.__source__ = source, 
                        crossDomainFunctionWrapper.__id__ = id, crossDomainFunctionWrapper.origin = origin, 
                        crossDomainFunctionWrapper;
                    }, crossDomainFunctionWrapper = getDeserializedFunction();
                    return crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({
                        fireAndForget: !0
                    }), crossDomainFunctionWrapper;
                }(source, origin, serializedFunction, {
                    on: on,
                    send: send
                });
            }, _deserialize[SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW] = function(serializedWindow) {
                return window_ProxyWindow.deserialize(serializedWindow, {
                    send: send
                });
            }, _deserialize));
        }
        var SEND_MESSAGE_STRATEGIES = {};
        function send_sendMessage(win, domain, message, _ref) {
            var _serializeMessage, on = _ref.on, send = _ref.send;
            if (isWindowClosed(win)) throw new Error("Window is closed");
            for (var serializedMessage = serializeMessage(win, domain, ((_serializeMessage = {}).__post_robot_10_0_22__ = _extends({
                id: uniqueID(),
                origin: getDomain(window)
            }, message), _serializeMessage), {
                on: on,
                send: send
            }), strategies = Object.keys(SEND_MESSAGE_STRATEGIES), errors = [], _i2 = 0; _i2 < strategies.length; _i2++) {
                var strategyName = strategies[_i2];
                try {
                    SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                } catch (err) {
                    errors.push(err);
                }
            }
            if (errors.length === strategies.length) throw new Error("All post-robot messaging strategies failed:\n\n" + errors.map((function(err, i) {
                return i + ". " + stringifyError(err);
            })).join("\n\n"));
        }
        SEND_MESSAGE_STRATEGIES.postrobot_post_message = function(win, serializedMessage, domain) {
            (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ constants_WILDCARD ]).map((function(dom) {
                return 0 === dom.indexOf(PROTOCOL.FILE) ? constants_WILDCARD : dom;
            })).forEach((function(dom) {
                win.postMessage(serializedMessage, dom);
            }));
        }, SEND_MESSAGE_STRATEGIES.postrobot_bridge = function(win, serializedMessage, domain) {
            if (!needsBridgeForBrowser() && !isBridge()) throw new Error("Bridge not needed for browser");
            if (isSameDomain(win)) throw new Error("Post message through bridge disabled between same domain windows");
            if (!1 !== isSameTopWindow(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
            !function(win, domain, message) {
                var messagingChild = isOpener(window, win), messagingParent = isOpener(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                findRemoteWindow(win).then((function(sendMessage) {
                    return sendMessage(win, domain, message);
                }));
            }(win, domain, serializedMessage);
        }, SEND_MESSAGE_STRATEGIES.postrobot_global = function(win, serializedMessage) {
            if (!getUserAgent(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
            if (!isSameDomain(win)) throw new Error("Post message through global disabled between different domain windows");
            if (!1 !== isSameTopWindow(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
            var foreignGlobal = global_getGlobal(win);
            if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
            foreignGlobal.receiveMessage({
                source: window,
                origin: getDomain(),
                data: serializedMessage
            });
        };
        var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
        function getResponseListener(hash) {
            return globalStore("responseListeners").get(hash);
        }
        function deleteResponseListener(hash) {
            globalStore("responseListeners").del(hash);
        }
        function isResponseListenerErrored(hash) {
            return globalStore("erroredResponseListeners").has(hash);
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain, requestListeners = windowStore("requestListeners");
            if (win === constants_WILDCARD && (win = null), domain === constants_WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            for (var _i4 = 0, _ref3 = [ win, getWildcard() ]; _i4 < _ref3.length; _i4++) {
                var winQualifier = _ref3[_i4];
                if (winQualifier) {
                    var nameListeners = requestListeners.get(winQualifier);
                    if (nameListeners) {
                        var domainListeners = nameListeners[name];
                        if (domainListeners) {
                            if (domain && "string" == typeof domain) {
                                if (domainListeners[domain]) return domainListeners[domain];
                                if (domainListeners[__DOMAIN_REGEX__]) for (var _i6 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__]; _i6 < _domainListeners$__DO2.length; _i6++) {
                                    var _domainListeners$__DO3 = _domainListeners$__DO2[_i6], listener = _domainListeners$__DO3.listener;
                                    if (matchDomain(_domainListeners$__DO3.regex, domain)) return listener;
                                }
                            }
                            if (domainListeners[constants_WILDCARD]) return domainListeners[constants_WILDCARD];
                        }
                    }
                }
            }
        }
        var RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {}).postrobot_message_request = function(source, origin, message, _ref) {
            var on = _ref.on, send = _ref.send, options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin
            }), logName = message.name === MESSAGE_NAME.METHOD && message.data && "string" == typeof message.data.name ? message.data.name + "()" : message.name;
            function sendResponse(type, ack, response) {
                if (void 0 === response && (response = {}), !message.fireAndForget && !isWindowClosed(source)) try {
                    send_sendMessage(source, origin, _extends({
                        type: type,
                        ack: ack,
                        hash: message.hash,
                        name: message.name
                    }, response), {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    throw new Error("Send response message failed for " + logName + " in " + getDomain() + "\n\n" + stringifyError(err));
                }
            }
            return promise_ZalgoPromise.all([ sendResponse("postrobot_message_ack"), promise_ZalgoPromise.try((function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                return options.handler({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            })).then((function(data) {
                return sendResponse("postrobot_message_response", "success", {
                    data: data
                });
            }), (function(error) {
                return sendResponse("postrobot_message_response", "error", {
                    error: error
                });
            })) ]).then(src_util_noop).catch((function(err) {
                if (options && options.handleError) return options.handleError(err);
                throw err;
            }));
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_ack = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                try {
                    if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    if (source !== options.win) throw new Error("Ack source does not match registered window");
                } catch (err) {
                    options.promise.reject(err);
                }
                options.ack = !0;
            }
        }, _RECEIVE_MESSAGE_TYPE.postrobot_message_response = function(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var pattern, options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (pattern = options.domain, 
                Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString()));
                if (source !== options.win) throw new Error("Response source does not match registered window");
                deleteResponseListener(message.hash), "error" === message.ack ? options.promise.reject(message.error) : "success" === message.ack && options.promise.resolve({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }
        }, _RECEIVE_MESSAGE_TYPE);
        function receive_receiveMessage(event, _ref2) {
            var on = _ref2.on, send = _ref2.send, receivedMessages = globalStore("receivedMessages");
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, message = function(message, source, origin, _ref) {
                var parsedMessage, on = _ref.on, send = _ref.send;
                try {
                    parsedMessage = deserializeMessage(source, origin, message, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    return;
                }
                if (parsedMessage && "object" == typeof parsedMessage && null !== parsedMessage && (parsedMessage = parsedMessage.__post_robot_10_0_22__) && "object" == typeof parsedMessage && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
            }(event.data, source, origin, {
                on: on,
                send: send
            });
            message && (markWindowKnown(source), receivedMessages.has(message.id) || (receivedMessages.set(message.id, !0), 
            isWindowClosed(source) && !message.fireAndForget || (0 === message.origin.indexOf(PROTOCOL.FILE) && (origin = PROTOCOL.FILE + "//"), 
            RECEIVE_MESSAGE_TYPES[message.type](source, origin, message, {
                on: on,
                send: send
            }))));
        }
        function on_on(name, options, handler) {
            if (!name) throw new Error("Expected name");
            if ("function" == typeof options && (handler = options, options = {}), !handler) throw new Error("Expected handler");
            (options = options || {}).name = name, options.handler = handler || options.handler;
            var win = options.window, domain = options.domain, requestListener = function addRequestListener(_ref4, listener) {
                var name = _ref4.name, win = _ref4.win, domain = _ref4.domain, requestListeners = windowStore("requestListeners");
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _i8 = 0, _win2 = win; _i8 < _win2.length; _i8++) listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: _win2[_i8]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i10 = 0; _i10 < listenersCollection.length; _i10++) listenersCollection[_i10].cancel();
                        }
                    };
                }
                if (Array.isArray(domain)) {
                    for (var _listenersCollection = [], _i12 = 0, _domain2 = domain; _i12 < _domain2.length; _i12++) _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _domain2[_i12]
                    }, listener));
                    return {
                        cancel: function() {
                            for (var _i14 = 0; _i14 < _listenersCollection.length; _i14++) _listenersCollection[_i14].cancel();
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                if (win && win !== constants_WILDCARD || (win = getWildcard()), domain = domain || constants_WILDCARD, 
                existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var regexListeners, regexListener, nameListeners = requestListeners.getOrSet(win, (function() {
                    return {};
                })), domainListeners = util_getOrSet(nameListeners, name, (function() {
                    return {};
                })), strDomain = domain.toString();
                return util_isRegex(domain) ? (regexListeners = util_getOrSet(domainListeners, __DOMAIN_REGEX__, (function() {
                    return [];
                }))).push(regexListener = {
                    regex: domain,
                    listener: listener
                }) : domainListeners[strDomain] = listener, {
                    cancel: function() {
                        delete domainListeners[strDomain], regexListener && (regexListeners.splice(regexListeners.indexOf(regexListener, 1)), 
                        regexListeners.length || delete domainListeners[__DOMAIN_REGEX__]), Object.keys(domainListeners).length || delete nameListeners[name], 
                        win && !Object.keys(nameListeners).length && requestListeners.del(win);
                    }
                };
            }({
                name: name,
                win: win,
                domain: domain
            }, {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: win,
                domain: domain || constants_WILDCARD,
                name: name
            });
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function on_once(name, options, handler) {
            "function" == typeof (options = options || {}) && (handler = options, options = {});
            var listener, promise = new promise_ZalgoPromise;
            return options.errorHandler = function(err) {
                listener.cancel(), promise.reject(err);
            }, listener = on_on(name, options, (function(event) {
                if (listener.cancel(), promise.resolve(event), handler) return handler(event);
            })), promise.cancel = listener.cancel, promise;
        }
        var src_bridge, send_send = function send(win, name, data, options) {
            var domain = (options = options || {}).domain || constants_WILDCARD, responseTimeout = options.timeout || -1, childTimeout = options.timeout || 5e3, fireAndForget = options.fireAndForget || !1;
            return promise_ZalgoPromise.try((function() {
                if (function(name, win, domain) {
                    if (!name) throw new Error("Expected name");
                    if (domain && "string" != typeof domain && !Array.isArray(domain) && !util_isRegex(domain)) throw new TypeError("Expected domain to be a string, array, or regex");
                    if (isWindowClosed(win)) throw new Error("Target window is closed");
                }(name, win, domain), function(parent, child) {
                    var actualParent = getAncestor(child);
                    if (actualParent) return actualParent === parent;
                    if (child === parent) return !1;
                    if (getTop(child) === child) return !1;
                    for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) if (_getFrames8[_i15] === child) return !0;
                    return !1;
                }(window, win)) return awaitWindowHello(win, childTimeout);
            })).then((function(_temp) {
                return function(win, targetDomain, actualDomain, _ref) {
                    var send = _ref.send;
                    return "string" == typeof targetDomain ? promise_ZalgoPromise.resolve(targetDomain) : promise_ZalgoPromise.try((function() {
                        return actualDomain || sayHello(win, {
                            send: send
                        }).then((function(_ref2) {
                            return _ref2.domain;
                        }));
                    })).then((function(normalizedDomain) {
                        if (!matchDomain(targetDomain, targetDomain)) throw new Error("Domain " + stringify(targetDomain) + " does not match " + stringify(targetDomain));
                        return normalizedDomain;
                    }));
                }(win, domain, (void 0 === _temp ? {} : _temp).domain, {
                    send: send
                });
            })).then((function(targetDomain) {
                domain = targetDomain;
                var method, timeout, logName = name === MESSAGE_NAME.METHOD && data && "string" == typeof data.name ? data.name + "()" : name, promise = new promise_ZalgoPromise, hash = name + "_" + uniqueID();
                if (!fireAndForget) {
                    var responseListener = {
                        name: name,
                        win: win,
                        domain: domain,
                        promise: promise
                    };
                    !function(hash, listener) {
                        globalStore("responseListeners").set(hash, listener);
                    }(hash, responseListener);
                    var reqPromises = windowStore("requestPromises").getOrSet(win, (function() {
                        return [];
                    }));
                    reqPromises.push(promise), promise.catch((function() {
                        !function(hash) {
                            globalStore("erroredResponseListeners").set(hash, !0);
                        }(hash), deleteResponseListener(hash);
                    }));
                    var totalAckTimeout = function(win) {
                        return windowStore("knownWindows").get(win, !1);
                    }(win) ? 1e4 : 2e3, totalResTimeout = responseTimeout, ackTimeout = totalAckTimeout, resTimeout = totalResTimeout, interval = (method = function() {
                        return isWindowClosed(win) ? promise.reject(new Error("Window closed for " + name + " before " + (responseListener.ack ? "response" : "ack"))) : responseListener.cancelled ? promise.reject(new Error("Response listener was cancelled for " + name)) : (ackTimeout = Math.max(ackTimeout - 500, 0), 
                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - 500, 0)), responseListener.ack || 0 !== ackTimeout ? 0 === resTimeout ? promise.reject(new Error("No response for postMessage " + logName + " in " + getDomain() + " in " + totalResTimeout + "ms")) : void 0 : promise.reject(new Error("No ack for postMessage " + logName + " in " + getDomain() + " in " + totalAckTimeout + "ms")));
                    }, 500, function loop() {
                        timeout = setTimeout((function() {
                            method(), loop();
                        }), 500);
                    }(), {
                        cancel: function() {
                            clearTimeout(timeout);
                        }
                    });
                    promise.finally((function() {
                        interval.cancel(), reqPromises.splice(reqPromises.indexOf(promise, 1));
                    })).catch(src_util_noop);
                }
                try {
                    send_sendMessage(win, domain, {
                        type: "postrobot_message_request",
                        hash: hash,
                        name: name,
                        data: data,
                        fireAndForget: fireAndForget
                    }, {
                        on: on_on,
                        send: send
                    });
                } catch (err) {
                    throw new Error("Send request message failed for " + logName + " in " + getDomain() + "\n\n" + stringifyError(err));
                }
                return fireAndForget ? promise.resolve() : promise;
            }));
        };
        function setup_serializeMessage(destination, domain, obj) {
            return serializeMessage(destination, domain, obj, {
                on: on_on,
                send: send_send
            });
        }
        function setup_deserializeMessage(source, origin, message) {
            return deserializeMessage(source, origin, message, {
                on: on_on,
                send: send_send
            });
        }
        function createProxyWindow(win) {
            return new window_ProxyWindow({
                send: send_send,
                win: win
            });
        }
        function setup_toProxyWindow(win) {
            return window_ProxyWindow.toProxyWindow(win, {
                send: send_send
            });
        }
        function setup() {
            var _ref5, on, send;
            global_getGlobal().initialized || (global_getGlobal().initialized = !0, function(_ref3) {
                var on = _ref3.on, send = _ref3.send, global = global_getGlobal();
                global.receiveMessage = global.receiveMessage || function(message) {
                    return receive_receiveMessage(message, {
                        on: on,
                        send: send
                    });
                };
            }({
                on: on_on,
                send: send_send
            }), on = (_ref5 = {
                on: on_on,
                send: send_send
            }).on, send = _ref5.send, globalStore().getOrSet("postMessageListener", (function() {
                return (obj = window).addEventListener("message", handler = function(event) {
                    !function(event, _ref4) {
                        var on = _ref4.on, send = _ref4.send, source = event.source || event.sourceElement, origin = event.origin || event.originalEvent && event.originalEvent.origin, data = event.data;
                        if ("null" === origin && (origin = PROTOCOL.FILE + "//"), source) {
                            if (!origin) throw new Error("Post message did not have origin domain");
                            receive_receiveMessage({
                                source: source,
                                origin: origin,
                                data: data
                            }, {
                                on: on,
                                send: send
                            });
                        }
                    }(event, {
                        on: on,
                        send: send
                    });
                }), {
                    cancel: function() {
                        obj.removeEventListener("message", handler);
                    }
                };
                var obj, handler;
            })), setupBridge({
                on: on_on,
                send: send_send,
                receiveMessage: receive_receiveMessage
            }), function(_ref8) {
                var on = _ref8.on, send = _ref8.send;
                globalStore("builtinListeners").getOrSet("helloListener", (function() {
                    var listener = on(MESSAGE_NAME.HELLO, {
                        domain: constants_WILDCARD
                    }, (function(_ref3) {
                        return resolveHelloPromise(_ref3.source, {
                            domain: _ref3.origin
                        }), {
                            instanceID: getInstanceID()
                        };
                    })), parent = getAncestor();
                    return parent && sayHello(parent, {
                        send: send
                    }).catch(src_util_noop), listener;
                }));
            }({
                on: on_on,
                send: send_send
            }));
        }
        function destroy() {
            var listener;
            !function() {
                for (var responseListeners = globalStore("responseListeners"), _i2 = 0, _responseListeners$ke2 = responseListeners.keys(); _i2 < _responseListeners$ke2.length; _i2++) {
                    var hash = _responseListeners$ke2[_i2], listener = responseListeners.get(hash);
                    listener && (listener.cancelled = !0), responseListeners.del(hash);
                }
            }(), (listener = globalStore().get("postMessageListener")) && listener.cancel(), 
            delete window.__post_robot_10_0_22__;
        }
        function cleanUpWindow(win) {
            for (var _i2 = 0, _requestPromises$get2 = windowStore("requestPromises").get(win, []); _i2 < _requestPromises$get2.length; _i2++) _requestPromises$get2[_i2].reject(new Error("Window cleaned up before response")).catch(src_util_noop);
        }
        __webpack_require__.d(__webpack_exports__, "bridge", (function() {
            return src_bridge;
        })), __webpack_require__.d(__webpack_exports__, "Promise", (function() {
            return promise_ZalgoPromise;
        })), __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return !0;
        })), __webpack_require__.d(__webpack_exports__, "ProxyWindow", (function() {
            return window_ProxyWindow;
        })), __webpack_require__.d(__webpack_exports__, "setup", (function() {
            return setup;
        })), __webpack_require__.d(__webpack_exports__, "destroy", (function() {
            return destroy;
        })), __webpack_require__.d(__webpack_exports__, "serializeMessage", (function() {
            return setup_serializeMessage;
        })), __webpack_require__.d(__webpack_exports__, "deserializeMessage", (function() {
            return setup_deserializeMessage;
        })), __webpack_require__.d(__webpack_exports__, "createProxyWindow", (function() {
            return createProxyWindow;
        })), __webpack_require__.d(__webpack_exports__, "toProxyWindow", (function() {
            return setup_toProxyWindow;
        })), __webpack_require__.d(__webpack_exports__, "on", (function() {
            return on_on;
        })), __webpack_require__.d(__webpack_exports__, "once", (function() {
            return on_once;
        })), __webpack_require__.d(__webpack_exports__, "send", (function() {
            return send_send;
        })), __webpack_require__.d(__webpack_exports__, "markWindowKnown", (function() {
            return markWindowKnown;
        })), __webpack_require__.d(__webpack_exports__, "cleanUpWindow", (function() {
            return cleanUpWindow;
        })), src_bridge = {
            setupBridge: setupBridge,
            openBridge: function(url, domain) {
                var bridges = globalStore("bridges"), bridgeFrames = globalStore("bridgeFrames");
                return domain = domain || getDomainFromUrl(url), bridges.getOrSet(domain, (function() {
                    return promise_ZalgoPromise.try((function() {
                        if (getDomain() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                        var name = getBridgeName(domain);
                        if (getFrameByName(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                        var iframe = function(name, url) {
                            var iframe = document.createElement("iframe");
                            return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
                            iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
                            iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
                            iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
                            iframe.src = url, iframe;
                        }(name, url);
                        return bridgeFrames.set(domain, iframe), documentBodyReady.then((function(body) {
                            body.appendChild(iframe);
                            var bridge = iframe.contentWindow;
                            return new promise_ZalgoPromise((function(resolve, reject) {
                                iframe.addEventListener("load", resolve), iframe.addEventListener("error", reject);
                            })).then((function() {
                                return awaitWindowHello(bridge, 5e3, "Bridge " + url);
                            })).then((function() {
                                return bridge;
                            }));
                        }));
                    }));
                }));
            },
            linkWindow: linkWindow,
            linkUrl: function(win, url) {
                linkWindow({
                    win: win,
                    domain: getDomainFromUrl(url)
                });
            },
            isBridge: isBridge,
            needsBridge: needsBridge,
            needsBridgeForBrowser: needsBridgeForBrowser,
            hasBridge: function(url, domain) {
                return globalStore("bridges").has(domain || getDomainFromUrl(url));
            },
            needsBridgeForWin: needsBridgeForWin,
            needsBridgeForDomain: needsBridgeForDomain,
            destroyBridges: function() {
                for (var bridges = globalStore("bridges"), bridgeFrames = globalStore("bridgeFrames"), _i4 = 0, _bridgeFrames$keys2 = bridgeFrames.keys(); _i4 < _bridgeFrames$keys2.length; _i4++) {
                    var frame = bridgeFrames.get(_bridgeFrames$keys2[_i4]);
                    frame && frame.parentNode && frame.parentNode.removeChild(frame);
                }
                bridgeFrames.reset(), bridges.reset();
            }
        }, setup();
    } ]);
}));
//# sourceMappingURL=post-robot.ie.js.map