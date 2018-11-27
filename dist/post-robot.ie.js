!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("postRobot", [], factory) : "object" == typeof exports ? exports.postRobot = factory() : root.postRobot = factory();
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = "./src/index.js");
    }({
        "./node_modules/belter/src/css.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
        },
        "./node_modules/belter/src/decorators.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/device.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function() {
                return !!(window.navigator.mockUserAgent || window.navigator.userAgent).match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
            };
        },
        "./node_modules/belter/src/dom.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), 
            __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
            var util = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__("./node_modules/belter/src/device.js");
            __webpack_exports__.b = function isLocalStorageEnabled() {
                return Object(util.f)(isLocalStorageEnabled, function() {
                    try {
                        if ("undefined" == typeof window) return !1;
                        if (window.localStorage) {
                            var value = Math.random().toString();
                            window.localStorage.setItem("__test__localStorage__", value);
                            var result = window.localStorage.getItem("__test__localStorage__");
                            window.localStorage.removeItem("__test__localStorage__");
                            if (value === result) return !0;
                        }
                    } catch (err) {}
                    return !1;
                });
            };
            __webpack_exports__.a = function(obj, event, handler) {
                obj.addEventListener(event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            };
            "function" == typeof Symbol && Symbol.iterator, Object.assign;
            Object.create(Error.prototype);
        },
        "./node_modules/belter/src/experiment.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js"), __webpack_require__("./node_modules/belter/src/storage.js");
        },
        "./node_modules/belter/src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/util.js");
        },
        "./node_modules/belter/src/http.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
        },
        "./node_modules/belter/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__("./node_modules/belter/src/device.js");
            var __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
            __webpack_require__.d(__webpack_exports__, "addEventListener", function() {
                return __WEBPACK_IMPORTED_MODULE_1__dom__.a;
            });
            __webpack_require__("./node_modules/belter/src/experiment.js"), __webpack_require__("./node_modules/belter/src/global.js"), 
            __webpack_require__("./node_modules/belter/src/storage.js");
            var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__("./node_modules/belter/src/util.js");
            __webpack_require__.d(__webpack_exports__, "getOrSet", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.e;
            });
            __webpack_require__.d(__webpack_exports__, "isRegex", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.g;
            });
            __webpack_require__.d(__webpack_exports__, "memoizePromise", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.i;
            });
            __webpack_require__.d(__webpack_exports__, "noop", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.j;
            });
            __webpack_require__.d(__webpack_exports__, "once", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.k;
            });
            __webpack_require__.d(__webpack_exports__, "safeInterval", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.m;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyError", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.o;
            });
            __webpack_require__.d(__webpack_exports__, "uniqueID", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.p;
            });
            __webpack_require__.d(__webpack_exports__, "weakMapMemoize", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.q;
            });
            __webpack_require__.d(__webpack_exports__, "weakMapMemoizePromise", function() {
                return __WEBPACK_IMPORTED_MODULE_5__util__.r;
            });
            __webpack_require__("./node_modules/belter/src/http.js");
            var __WEBPACK_IMPORTED_MODULE_7__types__ = __webpack_require__("./node_modules/belter/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__types__), __webpack_require__("./node_modules/belter/src/decorators.js"), 
            __webpack_require__("./node_modules/belter/src/css.js");
        },
        "./node_modules/belter/src/storage.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.a = function getStorage(_ref) {
                var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 3e5 : _ref$lifetime;
                return Object(__WEBPACK_IMPORTED_MODULE_0__util__.f)(getStorage, function() {
                    var STORAGE_KEY = "__" + name + "_" + version + "_storage__", accessedStorage = void 0;
                    function getState(handler) {
                        var localStorageEnabled = Object(__WEBPACK_IMPORTED_MODULE_1__dom__.b)(), storage = void 0;
                        accessedStorage && (storage = accessedStorage);
                        if (!storage && localStorageEnabled) {
                            var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                            rawStorage && (storage = JSON.parse(rawStorage));
                        }
                        storage || (storage = Object(__WEBPACK_IMPORTED_MODULE_0__util__.d)()[STORAGE_KEY]);
                        storage || (storage = {
                            id: Object(__WEBPACK_IMPORTED_MODULE_0__util__.p)()
                        });
                        storage.id || (storage.id = Object(__WEBPACK_IMPORTED_MODULE_0__util__.p)());
                        accessedStorage = storage;
                        var result = handler(storage);
                        localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : Object(__WEBPACK_IMPORTED_MODULE_0__util__.d)()[STORAGE_KEY] = storage;
                        accessedStorage = null;
                        return result;
                    }
                    function getSession(handler) {
                        return getState(function(storage) {
                            var session = storage.__session__, now = Date.now();
                            session && now - session.created > lifetime && (session = null);
                            session || (session = {
                                guid: Object(__WEBPACK_IMPORTED_MODULE_0__util__.p)(),
                                created: now
                            });
                            storage.__session__ = session;
                            return handler(session);
                        });
                    }
                    return {
                        getState: getState,
                        getID: function() {
                            return getState(function(storage) {
                                return storage.id;
                            });
                        },
                        getSessionState: function(handler) {
                            return getSession(function(session) {
                                session.state = session.state || {};
                                return handler(session.state);
                            });
                        },
                        getSessionID: function() {
                            return getSession(function(session) {
                                return session.guid;
                            });
                        }
                    };
                }, [ {
                    name: name,
                    version: version,
                    lifetime: lifetime
                } ]);
            };
            var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__("./node_modules/belter/src/util.js"), __WEBPACK_IMPORTED_MODULE_1__dom__ = __webpack_require__("./node_modules/belter/src/dom.js");
        },
        "./node_modules/belter/src/types.js": function(module, exports) {},
        "./node_modules/belter/src/util.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_exports__.p = uniqueID;
            __webpack_exports__.d = function() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof global) return global;
                throw new Error("No global found");
            };
            __webpack_exports__.h = function(method) {
                var _this = this, options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, cacheMap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                function memoizedFunction() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function() {
                        return {};
                    }), key = serializeArgs(args), cacheTime = options.time;
                    cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key];
                    if (cache[key]) return cache[key].value;
                    var time = Date.now(), value = method.apply(this, arguments);
                    cache[key] = {
                        time: time,
                        value: value
                    };
                    return cache[key].value;
                }
                memoizedFunction.reset = function() {
                    cacheMap.delete(options.thisNamespace ? _this : method);
                };
                options.name && (memoizedFunction.displayName = options.name + ":memoized");
                return memoizedFunction;
            };
            __webpack_exports__.i = function(method) {
                var cache = {};
                function memoizedPromiseFunction() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                    var key = serializeArgs(args);
                    if (cache.hasOwnProperty(key)) return cache[key];
                    cache[key] = method.apply(this, arguments).finally(function() {
                        delete cache[key];
                    });
                    return cache[key];
                }
                memoizedPromiseFunction.reset = function() {
                    cache = {};
                };
                return memoizedPromiseFunction;
            };
            __webpack_exports__.l = function(method) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                function promisifiedFunction() {
                    return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(method, this, arguments);
                }
                options.name && (promisifiedFunction.displayName = options.name + ":promisified");
                return promisifiedFunction;
            };
            __webpack_exports__.f = function(method, logic) {
                var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
            };
            __webpack_exports__.j = function() {};
            __webpack_exports__.k = function(method) {
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            __webpack_exports__.o = function stringifyError(err) {
                var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack, message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            };
            __webpack_exports__.n = function(item) {
                return "string" == typeof item ? item : item && "function" == typeof item.toString ? item.toString() : Object.prototype.toString.call(item);
            };
            __webpack_exports__.c = function(obj, source) {
                if (!source) return obj;
                if (Object.assign) return Object.assign(obj, source);
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            };
            __webpack_exports__.m = function(method, time) {
                var timeout = void 0;
                !function loop() {
                    timeout = setTimeout(function() {
                        method();
                        loop();
                    }, time);
                }();
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            __webpack_exports__.a = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            };
            __webpack_exports__.b = function(method) {
                var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100, timeout = void 0;
                return function() {
                    var _this3 = this, _arguments2 = arguments;
                    clearTimeout(timeout);
                    timeout = setTimeout(function() {
                        return method.apply(_this3, _arguments2);
                    }, time);
                };
            };
            __webpack_exports__.g = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            __webpack_require__.d(__webpack_exports__, "q", function() {
                return weakMapMemoize;
            });
            __webpack_require__.d(__webpack_exports__, "r", function() {
                return weakMapMemoizePromise;
            });
            __webpack_exports__.e = function(obj, key, getter) {
                if (obj.hasOwnProperty(key)) return obj[key];
                var val = getter();
                obj[key] = val;
                return val;
            };
            var __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function uniqueID() {
                var str, chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                }) + "_" + (str = new Date().toISOString().slice(11, 19).replace("T", "."), window.btoa(str)).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            }
            var objectIDs = void 0;
            function serializeArgs(args) {
                try {
                    return JSON.stringify(Array.prototype.slice.call(args), function(subkey, val) {
                        return "function" == typeof val ? "memoize[" + function(obj) {
                            objectIDs = objectIDs || new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                            if (null === obj || void 0 === obj || "object" !== (void 0 === obj ? "undefined" : _typeof(obj)) && "function" != typeof obj) throw new Error("Invalid object");
                            var uid = objectIDs.get(obj);
                            if (!uid) {
                                uid = (void 0 === obj ? "undefined" : _typeof(obj)) + ":" + uniqueID();
                                objectIDs.set(obj, uid);
                            }
                            return uid;
                        }(val) + "]" : val;
                    });
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
            }
            var weakMapMemoize = function(method) {
                var weakmap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                return function(arg) {
                    var _this4 = this;
                    return weakmap.getOrSet(arg, function() {
                        return method.call(_this4, arg);
                    });
                };
            }, weakMapMemoizePromise = function(method) {
                var weakmap = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a();
                return function(arg) {
                    var _this5 = this;
                    return weakmap.getOrSet(arg, function() {
                        return method.call(_this5, arg).finally(function() {
                            weakmap.delete(arg);
                        });
                    });
                };
            };
        },
        "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d({}, "WeakMap", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            function safeIndexOf(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }
            var defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof CrossDomainSafeWeakMap)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if (function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var testWeakMap = new WeakMap(), testKey = {};
                            Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return "__testvalue__" === testWeakMap.get(testKey);
                        } catch (err) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (Object(src.isWindow)(value) && Object(src.isWindowClosed)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function(key) {
                    if (Object(src.isWindow)(key)) return !1;
                    try {
                        key && key.self;
                        key && key[this.name];
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                };
                CrossDomainSafeWeakMap.prototype.set = function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
                        if (-1 === index) {
                            keys.push(key);
                            values.push(value);
                        } else values[index] = value;
                    }
                };
                CrossDomainSafeWeakMap.prototype.get = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        var index = safeIndexOf(this.keys, key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                };
                CrossDomainSafeWeakMap.prototype.delete = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } else {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = safeIndexOf(keys, key);
                        if (-1 !== index) {
                            keys.splice(index, 1);
                            this.values.splice(index, 1);
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.has = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        return weakmap.has(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) {
                        var entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    }
                    this._cleanupClosedWindows();
                    return -1 !== safeIndexOf(this.keys, key);
                };
                CrossDomainSafeWeakMap.prototype.getOrSet = function(key, getter) {
                    if (this.has(key)) return this.get(key);
                    var value = getter();
                    this.set(key, value);
                    return value;
                };
                return CrossDomainSafeWeakMap;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return weakmap_CrossDomainSafeWeakMap;
            });
        },
        "./node_modules/cross-domain-utils/src/constants.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return PROTOCOL;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return WILDCARD;
            });
            var PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:",
                ABOUT: "about:"
            }, WILDCARD = "*";
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            __webpack_require__.d(__webpack_exports__, "getActualDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.a;
            });
            __webpack_require__.d(__webpack_exports__, "getAllWindows", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.b;
            });
            __webpack_require__.d(__webpack_exports__, "getAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.c;
            });
            __webpack_require__.d(__webpack_exports__, "getDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.d;
            });
            __webpack_require__.d(__webpack_exports__, "getDomainFromUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.e;
            });
            __webpack_require__.d(__webpack_exports__, "getFrameByName", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.f;
            });
            __webpack_require__.d(__webpack_exports__, "getOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.g;
            });
            __webpack_require__.d(__webpack_exports__, "getParent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.h;
            });
            __webpack_require__.d(__webpack_exports__, "getUserAgent", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.i;
            });
            __webpack_require__.d(__webpack_exports__, "isActuallySameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.j;
            });
            __webpack_require__.d(__webpack_exports__, "isAncestor", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.k;
            });
            __webpack_require__.d(__webpack_exports__, "isOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.l;
            });
            __webpack_require__.d(__webpack_exports__, "isSameDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.m;
            });
            __webpack_require__.d(__webpack_exports__, "isSameTopWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.n;
            });
            __webpack_require__.d(__webpack_exports__, "isWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.o;
            });
            __webpack_require__.d(__webpack_exports__, "isWindowClosed", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.p;
            });
            __webpack_require__.d(__webpack_exports__, "linkFrameWindow", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.q;
            });
            __webpack_require__.d(__webpack_exports__, "matchDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.r;
            });
            __webpack_require__.d(__webpack_exports__, "stringifyDomainPattern", function() {
                return __WEBPACK_IMPORTED_MODULE_0__utils__.s;
            });
            var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__), __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports) {},
        "./node_modules/cross-domain-utils/src/utils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            var constants = __webpack_require__("./node_modules/cross-domain-utils/src/constants.js");
            __webpack_exports__.h = getParent;
            __webpack_exports__.g = getOpener;
            __webpack_exports__.a = getActualDomain;
            __webpack_exports__.d = getDomain;
            __webpack_exports__.j = isActuallySameDomain;
            __webpack_exports__.m = isSameDomain;
            __webpack_exports__.b = function getAllWindows() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, frames = getAllFramesInWindow(win), opener = function() {
                    var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                    return getOpener(getTop(win) || win);
                }(win);
                return opener ? [].concat(getAllWindows(opener), frames) : frames;
            };
            __webpack_exports__.p = isWindowClosed;
            __webpack_exports__.q = function(frame) {
                !function() {
                    for (var i = 0; i < iframeFrames.length; i++) if (isFrameWindowClosed(iframeFrames[i])) {
                        iframeFrames.splice(i, 1);
                        iframeWindows.splice(i, 1);
                    }
                    for (var _i8 = 0; _i8 < iframeWindows.length; _i8++) if (isWindowClosed(iframeWindows[_i8])) {
                        iframeFrames.splice(_i8, 1);
                        iframeWindows.splice(_i8, 1);
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            };
            __webpack_exports__.i = function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            };
            __webpack_exports__.f = function(win, name) {
                for (var winFrames = getFrames(win), _i10 = 0, _length8 = null == winFrames ? 0 : winFrames.length; _i10 < _length8; _i10++) {
                    var childFrame = winFrames[_i10];
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
            };
            __webpack_exports__.l = function(parent, child) {
                return parent === getOpener(child);
            };
            __webpack_exports__.c = getAncestor;
            __webpack_exports__.k = function(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _i16 = 0, _getFrames8 = getFrames(parent), _length14 = null == _getFrames8 ? 0 : _getFrames8.length; _i16 < _length14; _i16++) if (_getFrames8[_i16] === child) return !0;
                return !1;
            };
            __webpack_exports__.n = function(win1, win2) {
                var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
                1));
            };
            __webpack_exports__.r = function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === constants.b || origin === pattern;
                    if (isRegex(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                }));
            };
            __webpack_exports__.s = function(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
            };
            __webpack_exports__.e = function(url) {
                return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : getDomain();
            };
            __webpack_exports__.o = function(obj) {
                try {
                    if (obj === window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if ("[object Window]" === Object.prototype.toString.call(obj)) return !0;
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
                    obj && obj.__cross_domain_utils_window_check__;
                } catch (err) {
                    return !0;
                }
                return !1;
            };
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === constants.a.ABOUT;
            }
            function getParent(win) {
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
            function getOpener(win) {
                if (win && !getParent(win)) try {
                    return win.opener;
                } catch (err) {}
            }
            function canReadFromWindow(win) {
                try {
                    win && win.location && win.location.href;
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain(win) {
                var location = (win = win || window).location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === constants.a.FILE) return constants.a.FILE + "//";
                if (protocol === constants.a.ABOUT) {
                    var parent = getParent(win);
                    return parent && canReadFromWindow(parent) ? getActualDomain(parent) : constants.a.ABOUT + "//";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function getDomain(win) {
                var domain = getActualDomain(win = win || window);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(constants.a.MOCK) ? win.mockDomain : domain;
            }
            function isActuallySameDomain(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }
            function isSameDomain(win) {
                if (!isActuallySameDomain(win)) return !1;
                try {
                    if (win === window) return !0;
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                    if (getDomain(window) === getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : -1 !== function(win) {
                    var result = [];
                    try {
                        for (;win.parent !== win; ) {
                            result.push(win.parent);
                            win = win.parent;
                        }
                    } catch (err) {}
                    return result;
                }(child).indexOf(parent);
            }
            function getFrames(win) {
                var result = [], frames = void 0;
                try {
                    frames = win.frames;
                } catch (err) {
                    frames = win;
                }
                var len = void 0;
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
                for (var result = [], _i3 = 0, _getFrames2 = getFrames(win), _length2 = null == _getFrames2 ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
                    var frame = _getFrames2[_i3];
                    result.push(frame);
                    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = null == _getAllChildFrames2 ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
                        var childFrame = _getAllChildFrames2[_i5];
                        result.push(childFrame);
                    }
                }
                return result;
            }
            function getTop(win) {
                if (win) {
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
                    for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win), _length6 = null == _getAllChildFrames4 ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
                        var frame = _getAllChildFrames4[_i7];
                        try {
                            if (frame.top) return frame.top;
                        } catch (err) {}
                        if (getParent(frame) === frame) return frame;
                    }
                }
            }
            function getAllFramesInWindow(win) {
                var top = getTop(win);
                if (!top) throw new Error("Can not determine top window");
                return [].concat(getAllChildFrames(top), [ top ]);
            }
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
            }
            var iframeWindows = [], iframeFrames = [];
            function isWindowClosed(win) {
                var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
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
                    if (frame && isFrameWindowClosed(frame)) return !0;
                }
                return !1;
            }
            function getAncestor(win) {
                return getOpener(win = win || window) || getParent(win) || void 0;
            }
            function anyMatch(collection1, collection2) {
                for (var _i18 = 0, _length16 = null == collection1 ? 0 : collection1.length; _i18 < _length16; _i18++) for (var item1 = collection1[_i18], _i20 = 0, _length18 = null == collection2 ? 0 : collection2.length; _i20 < _length18; _i20++) if (item1 === collection2[_i20]) return !0;
                return !1;
            }
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
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
            function getGlobal() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if ("undefined" == typeof window) throw new TypeError("Can not find global");
                    glob = window;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                return zalgoGlobal;
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                        try {
                            handler(function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }, function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            });
                        } catch (err) {
                            this.reject(err);
                            return;
                        }
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                }
                ZalgoPromise.prototype.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === getGlobal().dispatchedErrors.indexOf(err)) {
                                getGlobal().dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }, 1);
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                };
                ZalgoPromise.prototype.dispatch = function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        getGlobal().activeCount += 1;
                        for (var _loop = function(i) {
                            var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                            if (resolved) try {
                                result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                            } catch (err) {
                                promise.reject(err);
                                return "continue";
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(_this3.error);
                                    return "continue";
                                }
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            }
                            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                result.errorHandled = !0;
                            } else utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                promise.resolve(res);
                            }, function(err) {
                                promise.reject(err);
                            }) : promise.resolve(result);
                        }, i = 0; i < handlers.length; i++) _loop(i);
                        handlers.length = 0;
                        this.dispatching = !1;
                        getGlobal().activeCount -= 1;
                        0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    }
                };
                ZalgoPromise.prototype.then = function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                };
                ZalgoPromise.prototype.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                ZalgoPromise.prototype.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then(function(result) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            throw err;
                        });
                    });
                };
                ZalgoPromise.prototype.timeout = function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                };
                ZalgoPromise.prototype.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return new ZalgoPromise().reject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var _loop2 = function(i) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then(function(result) {
                            results[i] = result;
                            0 == (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            promise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) _loop2(i);
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    var promise = new ZalgoPromise();
                    getGlobal().flushPromises.push(promise);
                    0 === getGlobal().activeCount && ZalgoPromise.flushQueue();
                    return promise;
                };
                ZalgoPromise.flushQueue = function() {
                    var promisesToFlush = getGlobal().flushPromises;
                    getGlobal().flushPromises = [];
                    for (var _i2 = 0, _length2 = null == promisesToFlush ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
                };
                return ZalgoPromise;
            }();
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return promise_ZalgoPromise;
            });
        },
        "./src/bridge/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./src/conf/index.js"), global = __webpack_require__("./src/global.js"), tunnelWindows = Object(global.b)("tunnelWindows");
            global.a.openTunnelToParent = function(_ref2) {
                var name = _ref2.name, source = _ref2.source, canary = _ref2.canary, sendMessage = _ref2.sendMessage, parentWindow = Object(cross_domain_utils_src.getParent)(window);
                if (!parentWindow) throw new Error("No parent window found to open tunnel to");
                var id = function(_ref) {
                    var name = _ref.name, source = _ref.source, canary = _ref.canary, sendMessage = _ref.sendMessage;
                    !function() {
                        for (var _i2 = 0, _tunnelWindows$keys2 = tunnelWindows.keys(), _length2 = null == _tunnelWindows$keys2 ? 0 : _tunnelWindows$keys2.length; _i2 < _length2; _i2++) {
                            var key = _tunnelWindows$keys2[_i2], tunnelWindow = tunnelWindows[key];
                            try {
                                Object(belter_src.noop)(tunnelWindow.source);
                            } catch (err) {
                                tunnelWindows.del(key);
                                continue;
                            }
                            Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source) && tunnelWindows.del(key);
                        }
                    }();
                    var id = Object(belter_src.uniqueID)();
                    tunnelWindows.set(id, {
                        name: name,
                        source: source,
                        canary: canary,
                        sendMessage: sendMessage
                    });
                    return id;
                }({
                    name: name,
                    source: source,
                    canary: canary,
                    sendMessage: sendMessage
                });
                return global.a.send(parentWindow, conf.d.OPEN_TUNNEL, {
                    name: name,
                    sendMessage: function() {
                        var tunnelWindow = tunnelWindows.get(id);
                        try {
                            Object(belter_src.noop)(tunnelWindow && tunnelWindow.source);
                        } catch (err) {
                            tunnelWindows.del(id);
                            return;
                        }
                        if (tunnelWindow && tunnelWindow.source && !Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source)) {
                            try {
                                tunnelWindow.canary();
                            } catch (err) {
                                return;
                            }
                            tunnelWindow.sendMessage.apply(this, arguments);
                        }
                    }
                }, {
                    domain: conf.i
                });
            };
            function needsBridgeForBrowser() {
                return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.b.ALLOW_POSTMESSAGE_POPUP;
            }
            function needsBridgeForWin(win) {
                return !Object(cross_domain_utils_src.isSameTopWindow)(window, win);
            }
            function needsBridgeForDomain(domain, win) {
                if (domain) {
                    if (Object(cross_domain_utils_src.getDomain)() !== Object(cross_domain_utils_src.getDomainFromUrl)(domain)) return !0;
                } else if (win && !Object(cross_domain_utils_src.isSameDomain)(win)) return !0;
                return !1;
            }
            function needsBridge(_ref) {
                var win = _ref.win, domain = _ref.domain;
                return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
            }
            function getBridgeName(domain) {
                var sanitizedDomain = (domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
                return conf.a + "_" + sanitizedDomain;
            }
            function isBridge() {
                return Boolean(window.name && window.name === getBridgeName(Object(cross_domain_utils_src.getDomain)()));
            }
            var documentBodyReady = new src.a(function(resolve) {
                if (window.document && window.document.body) return resolve(window.document.body);
                var interval = setInterval(function() {
                    if (window.document && window.document.body) {
                        clearInterval(interval);
                        return resolve(window.document.body);
                    }
                }, 10);
            }), remoteWindows = Object(global.c)("remoteWindows");
            function registerRemoteWindow(win) {
                remoteWindows.getOrSet(win, function() {
                    return new src.a();
                });
            }
            function findRemoteWindow(win) {
                var remoteWin = remoteWindows.get(win);
                if (!remoteWin) throw new Error("Remote window not found");
                return remoteWin;
            }
            function registerRemoteSendMessage(win, domain, sendMessage) {
                findRemoteWindow(win).resolve(function(remoteWin, remoteDomain, message) {
                    if (remoteWin !== win) throw new Error("Remote window does not match window");
                    if (!Object(cross_domain_utils_src.matchDomain)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                    sendMessage(message);
                });
            }
            function rejectRemoteSendMessage(win, err) {
                findRemoteWindow(win).reject(err).catch(belter_src.noop);
            }
            function sendBridgeMessage(win, domain, message) {
                var messagingChild = Object(cross_domain_utils_src.isOpener)(window, win), messagingParent = Object(cross_domain_utils_src.isOpener)(win, window);
                if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
                return findRemoteWindow(win).then(function(sendMessage) {
                    return sendMessage(win, domain, message);
                });
            }
            var awaitRemoteBridgeForWindow = Object(belter_src.weakMapMemoize)(function(win) {
                return src.a.try(function() {
                    try {
                        var frame = Object(cross_domain_utils_src.getFrameByName)(win, getBridgeName(Object(cross_domain_utils_src.getDomain)()));
                        if (!frame) return;
                        return Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.j.POSTROBOT] ? frame : new src.a(function(resolve) {
                            var interval = void 0, timeout = void 0;
                            interval = setInterval(function() {
                                if (frame && Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.j.POSTROBOT]) {
                                    clearInterval(interval);
                                    clearTimeout(timeout);
                                    return resolve(frame);
                                }
                            }, 100);
                            timeout = setTimeout(function() {
                                clearInterval(interval);
                                return resolve();
                            }, 2e3);
                        });
                    } catch (err) {}
                });
            });
            function openTunnelToOpener() {
                return src.a.try(function() {
                    var opener = Object(cross_domain_utils_src.getOpener)(window);
                    if (opener && needsBridge({
                        win: opener
                    })) {
                        registerRemoteWindow(opener);
                        return awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                            return bridge ? window.name ? bridge[conf.j.POSTROBOT].openTunnelToParent({
                                name: window.name,
                                source: window,
                                canary: function() {},
                                sendMessage: function(message) {
                                    try {
                                        Object(belter_src.noop)(window);
                                    } catch (err) {
                                        return;
                                    }
                                    if (window && !window.closed) try {
                                        global.a.receiveMessage({
                                            data: message,
                                            origin: this.origin,
                                            source: this.source
                                        });
                                    } catch (err) {
                                        src.a.reject(err);
                                    }
                                }
                            }).then(function(_ref) {
                                var source = _ref.source, origin = _ref.origin, data = _ref.data;
                                if (source !== opener) throw new Error("Source does not match opener");
                                registerRemoteSendMessage(source, origin, data.sendMessage);
                            }).catch(function(err) {
                                rejectRemoteSendMessage(opener, err);
                                throw err;
                            }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"));
                        });
                    }
                });
            }
            var lib = __webpack_require__("./src/lib/index.js"), bridges = Object(global.b)("bridges"), bridgeFrames = Object(global.b)("bridgeFrames"), popupWindowsByName = Object(global.b)("popupWindowsByName"), popupWindowsByWin = Object(global.c)("popupWindowsByWin");
            function hasBridge(url, domain) {
                return bridges.has(domain || Object(cross_domain_utils_src.getDomainFromUrl)(url));
            }
            function openBridge(url, domain) {
                domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
                return bridges.getOrSet(domain, function() {
                    return src.a.try(function() {
                        if (Object(cross_domain_utils_src.getDomain)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                        var name = getBridgeName(domain);
                        if (Object(cross_domain_utils_src.getFrameByName)(window, name)) throw new Error("Frame with name " + name + " already exists on page");
                        var iframe = function(name, url) {
                            var iframe = document.createElement("iframe");
                            iframe.setAttribute("name", name);
                            iframe.setAttribute("id", name);
                            iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;");
                            iframe.setAttribute("frameborder", "0");
                            iframe.setAttribute("border", "0");
                            iframe.setAttribute("scrolling", "no");
                            iframe.setAttribute("allowTransparency", "true");
                            iframe.setAttribute("tabindex", "-1");
                            iframe.setAttribute("hidden", "true");
                            iframe.setAttribute("title", "");
                            iframe.setAttribute("role", "presentation");
                            iframe.src = url;
                            return iframe;
                        }(name, url);
                        bridgeFrames.set(domain, iframe);
                        return documentBodyReady.then(function(body) {
                            body.appendChild(iframe);
                            var bridge = iframe.contentWindow;
                            !function(source, domain) {
                                global.a.on(conf.d.OPEN_TUNNEL, {
                                    window: source,
                                    domain: domain
                                }, function(_ref) {
                                    var origin = _ref.origin, data = _ref.data;
                                    if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                                    if (!data.name) throw new Error("Register window expected to be passed window name");
                                    if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                                    if (!popupWindowsByName.has(data.name)) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                                    if (!popupWindowsByName.get(data.name).domain) throw new Error("We do not have a registered domain for window " + data.name);
                                    if (popupWindowsByName.get(data.name).domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + popupWindowsByName.get(data.name).domain);
                                    registerRemoteSendMessage(popupWindowsByName.get(data.name).win, domain, data.sendMessage);
                                    return {
                                        sendMessage: function(message) {
                                            if (window && !window.closed) {
                                                var winDetails = popupWindowsByName.get(data.name);
                                                if (winDetails) try {
                                                    global.a.receiveMessage({
                                                        data: message,
                                                        origin: winDetails.domain,
                                                        source: winDetails.win
                                                    });
                                                } catch (err) {
                                                    src.a.reject(err);
                                                }
                                            }
                                        }
                                    };
                                });
                            }(bridge, domain);
                            return new src.a(function(resolve, reject) {
                                iframe.onload = resolve;
                                iframe.onerror = reject;
                            }).then(function() {
                                return Object(lib.a)(bridge, conf.b.BRIDGE_TIMEOUT, "Bridge " + url);
                            }).then(function() {
                                return bridge;
                            });
                        });
                    });
                });
            }
            var windowOpen = window.open;
            window.open = function(url, name, options, last) {
                var domain = url;
                if (url && 0 === url.indexOf(conf.f.MOCK)) {
                    var _url$split = url.split("|");
                    domain = _url$split[0];
                    url = _url$split[1];
                }
                domain && (domain = Object(cross_domain_utils_src.getDomainFromUrl)(domain));
                var win = windowOpen.call(this, url, name, options, last);
                if (!win) return win;
                url && registerRemoteWindow(win);
                for (var _i2 = 0, _popupWindowsByName$k2 = popupWindowsByName.keys(), _length2 = null == _popupWindowsByName$k2 ? 0 : _popupWindowsByName$k2.length; _i2 < _length2; _i2++) {
                    var winName = _popupWindowsByName$k2[_i2];
                    Object(cross_domain_utils_src.isWindowClosed)(popupWindowsByName.get(winName).win) && popupWindowsByName.del(winName);
                }
                if (name && win) {
                    var winOptions = popupWindowsByWin.getOrSet(win, function() {
                        return {};
                    });
                    winOptions.name = winOptions.name || name;
                    winOptions.win = winOptions.win || win;
                    winOptions.domain = winOptions.domain || domain;
                    popupWindowsByWin.set(win, winOptions);
                    popupWindowsByName.set(name, winOptions);
                }
                return win;
            };
            function linkUrl(win, url) {
                if (popupWindowsByWin.has(win)) {
                    popupWindowsByWin.get(win).domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                    registerRemoteWindow(win);
                }
            }
            function destroyBridges() {
                for (var _i4 = 0, _bridgeFrames$keys2 = bridgeFrames.keys(), _length4 = null == _bridgeFrames$keys2 ? 0 : _bridgeFrames$keys2.length; _i4 < _length4; _i4++) {
                    var domain = _bridgeFrames$keys2[_i4], frame = bridgeFrames.get(domain);
                    frame && frame.parentNode && frame.parentNode.removeChild(frame);
                }
                bridgeFrames.reset();
                bridges.reset();
            }
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "getBridgeName", function() {
                return getBridgeName;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "documentBodyReady", function() {
                return documentBodyReady;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteWindow", function() {
                return registerRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "findRemoteWindow", function() {
                return findRemoteWindow;
            });
            __webpack_require__.d(__webpack_exports__, "registerRemoteSendMessage", function() {
                return registerRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "rejectRemoteSendMessage", function() {
                return rejectRemoteSendMessage;
            });
            __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", function() {
                return sendBridgeMessage;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return destroyBridges;
            });
        },
        "./src/bridge/interface.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./src/bridge/index.js");
            __webpack_require__.d(__webpack_exports__, "openBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openBridge;
            });
            __webpack_require__.d(__webpack_exports__, "linkUrl", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.linkUrl;
            });
            __webpack_require__.d(__webpack_exports__, "isBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.isBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "hasBridge", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.hasBridge;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForWin;
            });
            __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForDomain;
            });
            __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.openTunnelToOpener;
            });
            __webpack_require__.d(__webpack_exports__, "destroyBridges", function() {
                return __WEBPACK_IMPORTED_MODULE_0__index__.destroyBridges;
            });
        },
        "./src/compat/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), conf = __webpack_require__("./src/conf/index.js");
            function emulateIERestrictions(sourceWindow, targetWindow) {
                if (!conf.b.ALLOW_POSTMESSAGE_POPUP && !1 === Object(src.isSameTopWindow)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
            }
            __webpack_require__.d(__webpack_exports__, "emulateIERestrictions", function() {
                return emulateIERestrictions;
            });
        },
        "./src/conf/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var _ALLOWED_POST_MESSAGE, MESSAGE_TYPE = {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            }, MESSAGE_ACK = {
                SUCCESS: "success",
                ERROR: "error"
            }, MESSAGE_NAME = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            }, WINDOW_PROP = {
                POSTROBOT: "__postRobot__"
            }, SEND_STRATEGY = {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            }, PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:"
            }, SERIALIZATION_TYPE = {
                CROSS_DOMAIN_ZALGO_PROMISE: "cross_domain_zalgo_promise",
                CROSS_DOMAIN_FUNCTION: "cross_domain_function",
                CROSS_DOMAIN_WINDOW: "cross_domain_window"
            }, CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: 2e3,
                ACK_TIMEOUT_KNOWN: 1e4,
                RES_TIMEOUT: -1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[SEND_STRATEGY.POST_MESSAGE] = !0, 
                _ALLOWED_POST_MESSAGE[SEND_STRATEGY.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[SEND_STRATEGY.GLOBAL] = !0, 
                _ALLOWED_POST_MESSAGE)
            };
            0 === window.location.href.indexOf(PROTOCOL.FILE) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return CONFIG;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return MESSAGE_TYPE;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return MESSAGE_ACK;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return MESSAGE_NAME;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return WINDOW_PROP;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return SEND_STRATEGY;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return PROTOCOL;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return "__postrobot_bridge__";
            });
            __webpack_require__.d(__webpack_exports__, !1, function() {
                return "__postrobot_proxy__";
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return "*";
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return SERIALIZATION_TYPE;
            });
        },
        "./src/global.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return global;
            });
            __webpack_exports__.c = function(key) {
                var defStore = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getObj;
                function getStore(win) {
                    return winStore.getOrSet(win, defStore);
                }
                return {
                    has: function(win) {
                        return getStore(win).hasOwnProperty(key);
                    },
                    get: function(win, defVal) {
                        var store = getStore(win);
                        return store.hasOwnProperty(key) ? store[key] : defVal;
                    },
                    set: function(win, val) {
                        getStore(win)[key] = val;
                        return val;
                    },
                    del: function(win) {
                        delete getStore(win)[key];
                    },
                    getOrSet: function(win, getter) {
                        var store = getStore(win);
                        if (store.hasOwnProperty(key)) return store[key];
                        var val = getter();
                        store[key] = val;
                        return val;
                    }
                };
            };
            __webpack_exports__.b = function(key) {
                var defStore = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : getObj, store = Object(__WEBPACK_IMPORTED_MODULE_2_belter_src__.getOrSet)(global, key, defStore);
                return {
                    has: function(storeKey) {
                        return store.hasOwnProperty(storeKey);
                    },
                    get: function(storeKey, defVal) {
                        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
                    },
                    set: function(storeKey, val) {
                        store[storeKey] = val;
                        return val;
                    },
                    del: function(storeKey) {
                        delete store[storeKey];
                    },
                    getOrSet: function(storeKey, getter) {
                        if (store.hasOwnProperty(storeKey)) return store[storeKey];
                        var val = getter();
                        store[storeKey] = val;
                        return val;
                    },
                    reset: function() {
                        store = defStore();
                    },
                    keys: function() {
                        return Object.keys(store);
                    }
                };
            };
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), __WEBPACK_IMPORTED_MODULE_2_belter_src__ = __webpack_require__("./node_modules/belter/src/index.js"), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__("./src/conf/index.js"), global = window[__WEBPACK_IMPORTED_MODULE_3__conf__.j.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_3__conf__.j.POSTROBOT] || {}, winStore = global.windowStore = global.windowStore || new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a(), getObj = function() {
                return {};
            };
        },
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __webpack_require__.d(interface_namespaceObject, "markWindowKnown", function() {
                return lib.e;
            });
            __webpack_require__.d(interface_namespaceObject, "serializeMessage", function() {
                return serializeMessage;
            });
            __webpack_require__.d(interface_namespaceObject, "deserializeMessage", function() {
                return deserializeMessage;
            });
            __webpack_require__.d(interface_namespaceObject, "ProxyWindow", function() {
                return window_ProxyWindow;
            });
            __webpack_require__.d(interface_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(interface_namespaceObject, "Promise", function() {
                return zalgo_promise_src.a;
            });
            __webpack_require__.d(interface_namespaceObject, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(interface_namespaceObject, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(interface_namespaceObject, "send", function() {
                return _send;
            });
            __webpack_require__.d(interface_namespaceObject, "requestPromises", function() {
                return requestPromises;
            });
            __webpack_require__.d(interface_namespaceObject, "request", function() {
                return request;
            });
            __webpack_require__.d(interface_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(interface_namespaceObject, "client", function() {
                return client;
            });
            __webpack_require__.d(interface_namespaceObject, "on", function() {
                return _on;
            });
            __webpack_require__.d(interface_namespaceObject, "listen", function() {
                return listen;
            });
            __webpack_require__.d(interface_namespaceObject, "once", function() {
                return once;
            });
            __webpack_require__.d(interface_namespaceObject, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(interface_namespaceObject, "CONFIG", function() {
                return conf.b;
            });
            __webpack_require__.d(interface_namespaceObject, "disable", function() {
                return disable;
            });
            var _SERIALIZER, lib = __webpack_require__("./src/lib/index.js"), src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./src/conf/index.js"), TYPE = {
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
            }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function isSerializedType(item) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && "string" == typeof item.__type__;
            }
            function determineType(val) {
                return void 0 === val ? TYPE.UNDEFINED : null === val ? TYPE.NULL : Array.isArray(val) ? TYPE.ARRAY : "function" == typeof val ? TYPE.FUNCTION : "object" === (void 0 === val ? "undefined" : _typeof(val)) ? val instanceof Error ? TYPE.ERROR : "function" == typeof val.then ? TYPE.PROMISE : "[object RegExp]" === Object.prototype.toString.call(val) ? TYPE.REGEX : "[object Date]" === Object.prototype.toString.call(val) ? TYPE.DATE : TYPE.OBJECT : "string" == typeof val ? TYPE.STRING : "number" == typeof val ? TYPE.NUMBER : "boolean" == typeof val ? TYPE.BOOLEAN : void 0;
            }
            function serializeType(type, val) {
                return {
                    __type__: type,
                    __val__: val
                };
            }
            var _DESERIALIZER, SERIALIZER = ((_SERIALIZER = {})[TYPE.FUNCTION] = function() {}, 
            _SERIALIZER[TYPE.ERROR] = function(_ref) {
                var message = _ref.message, stack = _ref.stack, code = _ref.code;
                return serializeType(TYPE.ERROR, {
                    message: message,
                    stack: stack,
                    code: code
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
                var message = _ref2.message, stack = _ref2.stack, code = _ref2.code, error = new Error(message);
                error.code = code;
                error.stack = stack + "\n\n" + error.stack;
                return error;
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
            }, _DESERIALIZER), defaultDeserializers = {}, zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), global = __webpack_require__("./src/global.js"), winToProxyWindow = Object(global.c)("winToProxyWindow"), idToProxyWindow = Object(global.b)("idToProxyWindow");
            function cleanupProxyWindows() {
                for (var _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(), _length2 = null == _idToProxyWindow$keys2 ? 0 : _idToProxyWindow$keys2.length; _i2 < _length2; _i2++) {
                    var _id = _idToProxyWindow$keys2[_i2];
                    idToProxyWindow.get(_id).shouldClean() && idToProxyWindow.del(_id);
                }
            }
            var window_ProxyWindow = function() {
                function ProxyWindow(serializedWindow, actualWindow) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof ProxyWindow)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.serializedWindow = serializedWindow;
                    this.actualWindowPromise = new zalgo_promise_src.a();
                    actualWindow && this.setWindow(actualWindow);
                    this.serializedWindow.getInstanceID = Object(belter_src.memoizePromise)(this.serializedWindow.getInstanceID);
                }
                ProxyWindow.prototype.setLocation = function(href) {
                    var _this = this;
                    return zalgo_promise_src.a.try(function() {
                        if (!_this.actualWindow) return _this.serializedWindow.setLocation(href);
                        _this.actualWindow.location = href;
                    }).then(function() {
                        return _this;
                    });
                };
                ProxyWindow.prototype.setName = function(name) {
                    var _this2 = this;
                    return zalgo_promise_src.a.try(function() {
                        if (!_this2.actualWindow) return _this2.serializedWindow.setName(name);
                        if (!Object(src.isSameDomain)(_this2.actualWindow)) throw new Error("Can not set name for window on different domain");
                        _this2.actualWindow.name = name;
                        _this2.actualWindow.frameElement && _this2.actualWindow.frameElement.setAttribute("name", name);
                    }).then(function() {
                        return _this2;
                    });
                };
                ProxyWindow.prototype.close = function() {
                    var _this3 = this;
                    return zalgo_promise_src.a.try(function() {
                        if (!_this3.actualWindow) return _this3.serializedWindow.close();
                        _this3.actualWindow.close();
                    }).then(function() {
                        return _this3;
                    });
                };
                ProxyWindow.prototype.focus = function() {
                    var _this4 = this;
                    return zalgo_promise_src.a.try(function() {
                        if (!_this4.actualWindow) return _this4.serializedWindow.focus();
                        _this4.actualWindow.focus();
                    }).then(function() {
                        return _this4;
                    });
                };
                ProxyWindow.prototype.isClosed = function() {
                    var _this5 = this;
                    return zalgo_promise_src.a.try(function() {
                        return _this5.actualWindow ? Object(src.isWindowClosed)(_this5.actualWindow) : _this5.serializedWindow.isClosed();
                    });
                };
                ProxyWindow.prototype.setWindow = function(win) {
                    this.actualWindow = win;
                    this.actualWindowPromise.resolve(win);
                };
                ProxyWindow.prototype.matchWindow = function(win) {
                    var _this6 = this;
                    return zalgo_promise_src.a.try(function() {
                        return _this6.actualWindow ? win === _this6.actualWindow : zalgo_promise_src.a.all([ _this6.getInstanceID(), Object(lib.b)(win) ]).then(function(_ref) {
                            var match = _ref[0] === _ref[1];
                            match && _this6.setWindow(win);
                            return match;
                        });
                    });
                };
                ProxyWindow.prototype.unwrap = function() {
                    return this.actualWindow || this;
                };
                ProxyWindow.prototype.awaitWindow = function() {
                    return this.actualWindowPromise;
                };
                ProxyWindow.prototype.getInstanceID = function() {
                    return this.actualWindow ? Object(lib.b)(this.actualWindow) : this.serializedWindow.getInstanceID();
                };
                ProxyWindow.prototype.serialize = function() {
                    return this.serializedWindow;
                };
                ProxyWindow.prototype.shouldClean = function() {
                    return this.actualWindow && Object(src.isWindowClosed)(this.actualWindow);
                };
                ProxyWindow.unwrap = function(win) {
                    return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
                };
                ProxyWindow.serialize = function(win) {
                    cleanupProxyWindows();
                    return ProxyWindow.toProxyWindow(win).serialize();
                };
                ProxyWindow.deserialize = function(serializedWindow) {
                    cleanupProxyWindows();
                    return idToProxyWindow.getOrSet(serializedWindow.id, function() {
                        return new ProxyWindow(serializedWindow);
                    });
                };
                ProxyWindow.isProxyWindow = function(obj) {
                    return obj instanceof ProxyWindow;
                };
                ProxyWindow.toProxyWindow = function(win) {
                    cleanupProxyWindows();
                    return ProxyWindow.isProxyWindow(win) ? win : winToProxyWindow.getOrSet(win, function() {
                        var id = Object(belter_src.uniqueID)();
                        return idToProxyWindow.set(id, new ProxyWindow({
                            id: id,
                            getInstanceID: function() {
                                return Object(lib.b)(win);
                            },
                            close: function() {
                                return zalgo_promise_src.a.try(function() {
                                    win.close();
                                });
                            },
                            focus: function() {
                                return zalgo_promise_src.a.try(function() {
                                    win.focus();
                                });
                            },
                            isClosed: function() {
                                return zalgo_promise_src.a.try(function() {
                                    return Object(src.isWindowClosed)(win);
                                });
                            },
                            setLocation: function(href) {
                                return zalgo_promise_src.a.try(function() {
                                    if (Object(src.isSameDomain)(win)) try {
                                        if (win.location && "function" == typeof win.location.replace) {
                                            win.location.replace(href);
                                            return;
                                        }
                                    } catch (err) {}
                                    win.location = href;
                                });
                            },
                            setName: function(name) {
                                return zalgo_promise_src.a.try(function() {
                                    win.name = name;
                                });
                            }
                        }, win));
                    });
                };
                return ProxyWindow;
            }(), methodStore = Object(global.c)("methodStore"), proxyWindowMethods = Object(global.b)("proxyWindowMethods");
            global.a.listeningForFunctions = global.a.listeningForFunctions || !1;
            var listenForFunctionCalls = Object(belter_src.once)(function() {
                if (!global.a.listeningForFunctions) {
                    global.a.listeningForFunctions = !0;
                    global.a.on(conf.d.METHOD, {
                        origin: conf.i
                    }, function(_ref) {
                        var source = _ref.source, origin = _ref.origin, data = _ref.data, id = data.id, name = data.name;
                        return zalgo_promise_src.a.try(function() {
                            var meth = methodStore.get(source, function() {
                                return {};
                            })[data.id] || proxyWindowMethods.get(id);
                            if (!meth) throw new Error("Could not find method with id: " + data.id);
                            var proxy = meth.proxy, domain = meth.domain, val = meth.val;
                            if (!Object(src.matchDomain)(domain, origin)) throw new Error("Method domain " + JSON.stringify(meth.domain) + " does not match origin " + origin);
                            return proxy ? proxy.matchWindow(source).then(function(match) {
                                if (!match) throw new Error("Proxy window does not match source");
                                return val;
                            }) : val;
                        }).then(function(method) {
                            return method.apply({
                                source: source,
                                origin: origin,
                                data: data
                            }, data.args);
                        }).then(function(result) {
                            return {
                                result: result,
                                id: id,
                                name: name
                            };
                        });
                    });
                }
            });
            function function_serializeFunction(destination, domain, val, key) {
                listenForFunctionCalls();
                var id = Object(belter_src.uniqueID)();
                destination = window_ProxyWindow.unwrap(destination);
                if (window_ProxyWindow.isProxyWindow(destination)) {
                    proxyWindowMethods.set(id, {
                        proxy: destination,
                        domain: domain,
                        val: val
                    });
                    destination.awaitWindow().then(function(win) {
                        proxyWindowMethods.del(id);
                        methodStore.getOrSet(win, function() {
                            return {};
                        })[id] = {
                            domain: domain,
                            val: val
                        };
                    });
                } else methodStore.getOrSet(destination, function() {
                    return {};
                })[id] = {
                    domain: domain,
                    val: val
                };
                return serializeType(conf.h.CROSS_DOMAIN_FUNCTION, {
                    id: id,
                    name: val.name || key
                });
            }
            function serializeMessage(destination, domain, obj) {
                var _serialize;
                return function(obj) {
                    var serializers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : defaultSerializers, result = JSON.stringify(obj, function(key) {
                        var val = this[key];
                        if (isSerializedType(this)) return val;
                        var type = determineType(val);
                        if (!type) return val;
                        var serializer = serializers[type] || SERIALIZER[type];
                        return serializer ? serializer(val, key) : val;
                    });
                    return void 0 === result ? TYPE.UNDEFINED : result;
                }(obj, ((_serialize = {})[TYPE.PROMISE] = function(val, key) {
                    return function(destination, domain, val, key) {
                        return serializeType(conf.h.CROSS_DOMAIN_ZALGO_PROMISE, {
                            then: function_serializeFunction(destination, domain, function(resolve, reject) {
                                return val.then(resolve, reject);
                            }, key)
                        });
                    }(destination, domain, val, key);
                }, _serialize[TYPE.FUNCTION] = function(val, key) {
                    return function_serializeFunction(destination, domain, val, key);
                }, _serialize[TYPE.OBJECT] = function(val) {
                    return Object(src.isWindow)(val) || window_ProxyWindow.isProxyWindow(val) ? (win = val, 
                    serializeType(conf.h.CROSS_DOMAIN_WINDOW, window_ProxyWindow.serialize(win))) : val;
                    var win;
                }, _serialize));
            }
            function deserializeMessage(source, origin, message) {
                var _deserialize;
                return function(str) {
                    var deserializers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : defaultDeserializers;
                    if (str !== TYPE.UNDEFINED) return JSON.parse(str, function(key, val) {
                        if (isSerializedType(this)) return val;
                        var type = void 0, value = void 0;
                        if (isSerializedType(val)) {
                            type = val.__type__;
                            value = val.__val__;
                        } else {
                            type = determineType(val);
                            value = val;
                        }
                        if (!type) return value;
                        var deserializer = deserializers[type] || DESERIALIZER[type];
                        return deserializer ? deserializer(value, key) : value;
                    });
                }(message, ((_deserialize = {})[conf.h.CROSS_DOMAIN_ZALGO_PROMISE] = function(serializedPromise) {
                    return then = serializedPromise.then, new zalgo_promise_src.a(then);
                    var then;
                }, _deserialize[conf.h.CROSS_DOMAIN_FUNCTION] = function(serializedFunction) {
                    return function(source, origin, _ref2) {
                        var id = _ref2.id, name = _ref2.name;
                        function crossDomainFunctionWrapper() {
                            var args = Array.prototype.slice.call(arguments);
                            return global.a.send(source, conf.d.METHOD, {
                                id: id,
                                name: name,
                                args: args
                            }, {
                                domain: origin
                            }).then(function(_ref3) {
                                return _ref3.data.result;
                            });
                        }
                        crossDomainFunctionWrapper.fireAndForget = function() {
                            var args = Array.prototype.slice.call(arguments);
                            return global.a.send(source, conf.d.METHOD, {
                                id: id,
                                name: name,
                                args: args
                            }, {
                                domain: origin,
                                fireAndForget: !0
                            });
                        };
                        crossDomainFunctionWrapper.__name__ = name;
                        crossDomainFunctionWrapper.__xdomain__ = !0;
                        crossDomainFunctionWrapper.source = source;
                        crossDomainFunctionWrapper.origin = origin;
                        return crossDomainFunctionWrapper;
                    }(source, origin, serializedFunction);
                }, _deserialize[conf.h.CROSS_DOMAIN_WINDOW] = function(serializedWindow) {
                    return win = serializedWindow, window_ProxyWindow.deserialize(win);
                    var win;
                }, _deserialize));
            }
            var SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[conf.g.POST_MESSAGE] = function(win, serializedMessage, domain) {
                try {
                    __webpack_require__("./src/compat/index.js").emulateIERestrictions(window, win);
                } catch (err) {
                    return;
                }
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ conf.i ]).map(function(dom) {
                    if (0 === dom.indexOf(conf.f.MOCK)) {
                        if (window.location.protocol === conf.f.FILE) return conf.i;
                        if (!Object(src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return Object(src.getActualDomain)(win);
                    }
                    return 0 === dom.indexOf(conf.f.FILE) ? conf.i : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _require = __webpack_require__("./src/bridge/index.js"), sendBridgeMessage = _require.sendBridgeMessage, needsBridgeForBrowser = _require.needsBridgeForBrowser, isBridge = _require.isBridge;
            SEND_MESSAGE_STRATEGIES[conf.g.BRIDGE] = function(win, serializedMessage, domain) {
                if (needsBridgeForBrowser() || isBridge()) {
                    if (Object(src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                    if (!1 !== Object(src.isSameTopWindow)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                    return sendBridgeMessage(win, domain, serializedMessage);
                }
            };
            SEND_MESSAGE_STRATEGIES[conf.g.GLOBAL] = function(win, serializedMessage) {
                if (Object(lib.f)()) {
                    if (!Object(src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
                    if (!1 !== Object(src.isSameTopWindow)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                    var foreignGlobal = win[conf.j.POSTROBOT];
                    if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                    return foreignGlobal.receiveMessage({
                        source: window,
                        origin: Object(src.getDomain)(),
                        data: serializedMessage
                    });
                }
            };
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function sendMessage(win, domain, message) {
                return zalgo_promise_src.a.try(function() {
                    var _serializeMessage;
                    if (Object(src.isWindowClosed)(win)) throw new Error("Window is closed");
                    var serializedMessage = serializeMessage(win, domain, ((_serializeMessage = {})[conf.j.POSTROBOT] = _extends({
                        id: Object(belter_src.uniqueID)()
                    }, message), _serializeMessage)), messages = [];
                    return zalgo_promise_src.a.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return zalgo_promise_src.a.try(function() {
                            if (!conf.b.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + Object(belter_src.stringifyError)(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        if (!success) throw new Error(status);
                    });
                });
            }
            var responseListeners = Object(global.b)("responseListeners"), requestListeners = Object(global.c)("requestListeners"), erroredResponseListeners = Object(global.b)("erroredResponseListeners");
            global.a.WINDOW_WILDCARD = global.a.WINDOW_WILDCARD || new function() {}();
            var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
            function getResponseListener(hash) {
                return responseListeners.get(hash);
            }
            function deleteResponseListener(hash) {
                responseListeners.del(hash);
            }
            function isResponseListenerErrored(hash) {
                return erroredResponseListeners.has(hash);
            }
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === conf.i && (win = null);
                domain === conf.i && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                for (var _i2 = 0, _ref3 = [ win, global.a.WINDOW_WILDCARD ], _length2 = null == _ref3 ? 0 : _ref3.length; _i2 < _length2; _i2++) {
                    var winQualifier = _ref3[_i2];
                    if (winQualifier) {
                        var nameListeners = requestListeners.get(winQualifier);
                        if (nameListeners) {
                            var domainListeners = nameListeners[name];
                            if (domainListeners) {
                                if (domain && "string" == typeof domain) {
                                    if (domainListeners[domain]) return domainListeners[domain];
                                    if (domainListeners[__DOMAIN_REGEX__]) for (var _i4 = 0, _domainListeners$__DO2 = domainListeners[__DOMAIN_REGEX__], _length4 = null == _domainListeners$__DO2 ? 0 : _domainListeners$__DO2.length; _i4 < _length4; _i4++) {
                                        var _ref5 = _domainListeners$__DO2[_i4], regex = _ref5.regex, listener = _ref5.listener;
                                        if (Object(src.matchDomain)(regex, domain)) return listener;
                                    }
                                }
                                if (domainListeners[conf.i]) return domainListeners[conf.i];
                            }
                        }
                    }
                }
            }
            var types__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[conf.e.REQUEST] = function(source, origin, message) {
                var options = getRequestListener({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function sendResponse(type) {
                    var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return message.fireAndForget || Object(src.isWindowClosed)(source) ? zalgo_promise_src.a.resolve() : sendMessage(source, origin, types__extends({
                        type: type,
                        hash: message.hash,
                        name: message.name
                    }, data));
                }
                return zalgo_promise_src.a.all([ sendResponse(conf.e.ACK), zalgo_promise_src.a.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return sendResponse(conf.e.RESPONSE, {
                        ack: conf.c.SUCCESS,
                        data: data
                    });
                }, function(error) {
                    return sendResponse(conf.e.RESPONSE, {
                        ack: conf.c.ERROR,
                        error: error
                    });
                }) ]).then(belter_src.noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    throw err;
                });
            }, _RECEIVE_MESSAGE_TYPE[conf.e.ACK] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }, _RECEIVE_MESSAGE_TYPE[conf.e.RESPONSE] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!Object(src.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + Object(src.stringifyDomainPattern)(options.domain));
                    deleteResponseListener(message.hash);
                    if (message.ack === conf.c.ERROR) return options.respond(message.error, null);
                    if (message.ack === conf.c.SUCCESS) {
                        var data = message.data;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }, _RECEIVE_MESSAGE_TYPE), receive__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, receivedMessages = Object(global.b)("receivedMessages");
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, message = function(message, source, origin) {
                    var parsedMessage = void 0;
                    try {
                        parsedMessage = deserializeMessage(source, origin, message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[conf.j.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data, source, origin);
                if (message) {
                    Object(lib.e)(source);
                    if (!receivedMessages.has(message.id)) {
                        receivedMessages.set(message.id, !0);
                        Object(src.isWindowClosed)(source) && !message.fireAndForget || RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                    }
                }
            }
            function messageListener(event) {
                try {
                    Object(belter_src.noop)(event.source);
                } catch (err) {
                    return;
                }
                var messageEvent = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                };
                try {
                    __webpack_require__("./src/compat/index.js").emulateIERestrictions(messageEvent.source, window);
                } catch (err) {
                    return;
                }
                receiveMessage(messageEvent);
            }
            global.a.receiveMessage = receiveMessage;
            var requestPromises = Object(global.c)("requestPromises");
            function request(options) {
                return zalgo_promise_src.a.try(function() {
                    if (!options.name) throw new Error("Expected options.name");
                    var name = options.name, targetWindow = void 0, domain = void 0;
                    if ("string" == typeof options.window) {
                        var el = document.getElementById(options.window);
                        if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        targetWindow = el.contentWindow;
                    } else if (options.window instanceof HTMLIFrameElement) {
                        if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                    } else targetWindow = options.window;
                    if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    var win = targetWindow;
                    domain = options.domain || conf.i;
                    var hash = options.name + "_" + Object(belter_src.uniqueID)();
                    if (Object(src.isWindowClosed)(win)) throw new Error("Target window is closed");
                    var hasResult = !1, reqPromises = requestPromises.getOrSet(win, function() {
                        return [];
                    }), requestPromise = zalgo_promise_src.a.try(function() {
                        if (Object(src.isAncestor)(window, win)) return Object(lib.a)(win, options.timeout || conf.b.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).domain;
                        if (Object(belter_src.isRegex)(domain) && !origin) return Object(lib.g)(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).domain;
                        if (Object(belter_src.isRegex)(domain)) {
                            if (!Object(src.matchDomain)(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new zalgo_promise_src.a(function(resolve, reject) {
                            var responseListener = void 0;
                            options.fireAndForget || function(hash, listener) {
                                responseListeners.set(hash, listener);
                            }(hash, responseListener = {
                                name: name,
                                window: win,
                                domain: actualDomain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        reqPromises.splice(reqPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            });
                            sendMessage(win, actualDomain, {
                                type: conf.e.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: Boolean(options.fireAndForget)
                            }).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var totalAckTimeout = Object(lib.d)(win) ? conf.b.ACK_TIMEOUT_KNOWN : conf.b.ACK_TIMEOUT, totalResTimeout = options.timeout || conf.b.RES_TIMEOUT, ackTimeout = totalAckTimeout, resTimeout = totalResTimeout, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if (Object(src.isWindowClosed)(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                    -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                    if (responseListener.ack) {
                                        if (-1 === resTimeout) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (0 === ackTimeout) return reject(new Error("No ack for postMessage " + name + " in " + Object(src.getDomain)() + " in " + totalAckTimeout + "ms"));
                                        if (0 === resTimeout) return reject(new Error("No response for postMessage " + name + " in " + Object(src.getDomain)() + " in " + totalResTimeout + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        !function(hash) {
                            erroredResponseListeners.set(hash, !0);
                        }(hash);
                        deleteResponseListener(hash);
                    });
                    reqPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            function sendToParent(name, data, options) {
                var win = Object(src.getAncestor)();
                return win ? _send(win, name, data, options) : new zalgo_promise_src.a(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            }
            global.a.send = _send;
            var server__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || conf.i,
                    name: name
                }, requestListener = function addRequestListener(_ref6, listener) {
                    var name = _ref6.name, win = _ref6.win, domain = _ref6.domain;
                    if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _i6 = 0, _win2 = win, _length6 = null == _win2 ? 0 : _win2.length; _i6 < _length6; _i6++) {
                            var item = _win2[_i6];
                            listenersCollection.push(addRequestListener({
                                name: name,
                                domain: domain,
                                win: item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i8 = 0, _length8 = null == listenersCollection ? 0 : listenersCollection.length; _i8 < _length8; _i8++) listenersCollection[_i8].cancel();
                            }
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _i10 = 0, _domain2 = domain, _length10 = null == _domain2 ? 0 : _domain2.length; _i10 < _length10; _i10++) {
                            var _item = _domain2[_i10];
                            _listenersCollection.push(addRequestListener({
                                name: name,
                                win: win,
                                domain: _item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i12 = 0, _length12 = null == _listenersCollection ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) _listenersCollection[_i12].cancel();
                            }
                        };
                    }
                    var existingListener = getRequestListener({
                        name: name,
                        win: win,
                        domain: domain
                    });
                    win && win !== conf.i || (win = global.a.WINDOW_WILDCARD);
                    domain = domain || conf.i;
                    if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === global.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                    var nameListeners = requestListeners.getOrSet(win, function() {
                        return {};
                    }), domainListeners = Object(belter_src.getOrSet)(nameListeners, name, function() {
                        return {};
                    }), strDomain = domain.toString(), regexListeners = void 0, regexListener = void 0;
                    if (Object(belter_src.isRegex)(domain)) {
                        regexListeners = Object(belter_src.getOrSet)(domainListeners, __DOMAIN_REGEX__, function() {
                            return [];
                        });
                        regexListener = {
                            regex: domain,
                            listener: listener
                        };
                        regexListeners.push(regexListener);
                    } else domainListeners[strDomain] = listener;
                    return {
                        cancel: function() {
                            delete domainListeners[strDomain];
                            if (regexListener) {
                                regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                                regexListeners.length || delete domainListeners[__DOMAIN_REGEX__];
                            }
                            Object.keys(domainListeners).length || delete nameListeners[name];
                            win && !Object.keys(nameListeners).length && requestListeners.del(win);
                        }
                    };
                }({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = Object(belter_src.once)(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = Object(belter_src.safeInterval)(function() {
                    if (win && "object" === (void 0 === win ? "undefined" : server__typeof(win)) && Object(src.isWindowClosed)(win)) {
                        interval.cancel();
                        listenerOptions.handleError(new Error("Post message target window is closed"));
                    }
                }, 50);
                return {
                    cancel: function() {
                        requestListener.cancel();
                    }
                };
            }
            function _on(name, options, handler) {
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                (options = options || {}).name = name;
                options.handler = handler || options.handler;
                return listen(options);
            }
            function once(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new zalgo_promise_src.a(function(resolve, reject) {
                    (options = options || {}).name = name;
                    options.once = !0;
                    options.handler = function(event) {
                        resolve(event);
                        if (handler) return handler(event);
                    };
                    options.errorHandler = function(err) {
                        reject(err);
                        if (errorHandler) return errorHandler(err);
                    };
                }), onceListener = listen(options);
                promise.cancel = onceListener.cancel;
                return promise;
            }
            function server_listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            }
            global.a.on = _on;
            function disable() {
                delete window[conf.j.POSTROBOT];
                window.removeEventListener("message", messageListener);
            }
            var public_parent = Object(src.getAncestor)();
            function cleanUpWindow(win) {
                for (var _i2 = 0, _requestPromises$get2 = requestPromises.get(win, []), _length2 = null == _requestPromises$get2 ? 0 : _requestPromises$get2.length; _i2 < _length2; _i2++) _requestPromises$get2[_i2].reject(new Error("Window cleaned up before response"));
            }
            var bridge = __webpack_require__("./src/bridge/interface.js");
            if (!global.a.initialized) {
                global.a.initialized = !0;
                Object(belter_src.addEventListener)(window, "message", messageListener);
                bridge && bridge.openTunnelToOpener();
                Object(lib.c)();
            }
            __webpack_require__.d(__webpack_exports__, "markWindowKnown", function() {
                return lib.e;
            });
            __webpack_require__.d(__webpack_exports__, "serializeMessage", function() {
                return serializeMessage;
            });
            __webpack_require__.d(__webpack_exports__, "deserializeMessage", function() {
                return deserializeMessage;
            });
            __webpack_require__.d(__webpack_exports__, "ProxyWindow", function() {
                return window_ProxyWindow;
            });
            __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __webpack_require__.d(__webpack_exports__, "Promise", function() {
                return zalgo_promise_src.a;
            });
            __webpack_require__.d(__webpack_exports__, "bridge", function() {
                return bridge;
            });
            __webpack_require__.d(__webpack_exports__, "parent", function() {
                return public_parent;
            });
            __webpack_require__.d(__webpack_exports__, "send", function() {
                return _send;
            });
            __webpack_require__.d(__webpack_exports__, "requestPromises", function() {
                return requestPromises;
            });
            __webpack_require__.d(__webpack_exports__, "request", function() {
                return request;
            });
            __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
                return sendToParent;
            });
            __webpack_require__.d(__webpack_exports__, "client", function() {
                return client;
            });
            __webpack_require__.d(__webpack_exports__, "on", function() {
                return _on;
            });
            __webpack_require__.d(__webpack_exports__, "listen", function() {
                return listen;
            });
            __webpack_require__.d(__webpack_exports__, "once", function() {
                return once;
            });
            __webpack_require__.d(__webpack_exports__, "listener", function() {
                return server_listener;
            });
            __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
                return conf.b;
            });
            __webpack_require__.d(__webpack_exports__, "disable", function() {
                return disable;
            });
            __webpack_exports__.default = interface_namespaceObject;
        },
        "./src/lib/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), belter_src = __webpack_require__("./node_modules/belter/src/index.js"), conf = __webpack_require__("./src/conf/index.js"), global = __webpack_require__("./src/global.js");
            global.a.instanceID = global.a.instanceID || Object(belter_src.uniqueID)();
            var helloPromises = Object(global.c)("helloPromises");
            function getHelloPromise(win) {
                return helloPromises.getOrSet(win, function() {
                    return new zalgo_promise_src.a();
                });
            }
            var listenForHello = Object(belter_src.once)(function() {
                global.a.on(conf.d.HELLO, {
                    domain: conf.i
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin;
                    getHelloPromise(source).resolve({
                        win: source,
                        domain: origin
                    });
                    return {
                        instanceID: global.a.instanceID
                    };
                });
            });
            function sayHello(win) {
                return global.a.send(win, conf.d.HELLO, {
                    instanceID: global.a.instanceID
                }, {
                    domain: conf.i,
                    timeout: -1
                }).then(function(_ref2) {
                    var origin = _ref2.origin, instanceID = _ref2.data.instanceID;
                    getHelloPromise(win).resolve({
                        win: win,
                        domain: origin
                    });
                    return {
                        win: win,
                        domain: origin,
                        instanceID: instanceID
                    };
                });
            }
            var getWindowInstanceID = Object(belter_src.weakMapMemoizePromise)(function(win) {
                return sayHello(win).then(function(_ref3) {
                    return _ref3.instanceID;
                });
            });
            function initHello() {
                listenForHello();
                for (var _i2 = 0, _getAllWindows2 = Object(src.getAllWindows)(), _length2 = null == _getAllWindows2 ? 0 : _getAllWindows2.length; _i2 < _length2; _i2++) {
                    var win = _getAllWindows2[_i2];
                    win !== window && sayHello(win).catch(belter_src.noop);
                }
            }
            function awaitWindowHello(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = getHelloPromise(win);
                -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms")));
                return promise;
            }
            function needsGlobalMessagingForBrowser() {
                return !!Object(src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.b.ALLOW_POSTMESSAGE_POPUP;
            }
            var knownWindows = Object(global.c)("knownWindows");
            function markWindowKnown(win) {
                knownWindows.set(win, !0);
            }
            function isWindowKnown(win) {
                return knownWindows.get(win, !1);
            }
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return sayHello;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return getWindowInstanceID;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return initHello;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return awaitWindowHello;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return needsGlobalMessagingForBrowser;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return markWindowKnown;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return isWindowKnown;
            });
        }
    });
});
//# sourceMappingURL=post-robot.ie.js.map