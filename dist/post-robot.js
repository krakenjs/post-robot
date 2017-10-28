!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("postRobot", [], factory) : "object" == typeof exports ? exports.postRobot = factory() : root.postRobot = factory();
}(this, function() {
    return function(modules) {
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
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 60);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(56);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__config__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(30);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getActualDomain(win) {
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return "file://";
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            win = win || window;
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
        }
        function isBlankDomain(win) {
            try {
                if (!win.location.href) return !0;
                if ("about:blank" === win.location.href) return !0;
            } catch (err) {}
            return !1;
        }
        function isActuallySameDomain(win) {
            try {
                var desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (isBlankDomain(win)) return !0;
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }
        function isSameDomain(win) {
            if (!isActuallySameDomain(win)) return !1;
            try {
                if (isBlankDomain(win)) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function getParent(win) {
            if (win) try {
                if (win.parent && win.parent !== win) return win.parent;
            } catch (err) {
                return;
            }
        }
        function getOpener(win) {
            if (win && !getParent(win)) try {
                return win.opener;
            } catch (err) {
                return;
            }
        }
        function getParents(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            var childParent = getParent(child);
            return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
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
            for (var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i2 >= _iterator.length) break;
                    _ref = _iterator[_i2++];
                } else {
                    if (_i2 = _iterator.next(), _i2.done) break;
                    _ref = _i2.value;
                }
                var frame = _ref;
                result.push(frame);
                for (var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref2;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i3++];
                    } else {
                        if (_i3 = _iterator2.next(), _i3.done) break;
                        _ref2 = _i3.value;
                    }
                    var childFrame = _ref2;
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
                for (var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i4 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i4++];
                    } else {
                        if (_i4 = _iterator3.next(), _i4.done) break;
                        _ref3 = _i4.value;
                    }
                    var frame = _ref3;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function isFrameWindowClosed(frame) {
            if (!frame.contentWindow) return !0;
            if (!frame.parentNode) return !0;
            var doc = frame.ownerDocument;
            return !(!doc || !doc.body || doc.body.contains(frame));
        }
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
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
            try {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(win === win);
            } catch (err) {
                return !0;
            }
            var iframeIndex = safeIndexOf(iframeWindows, win);
            if (-1 !== iframeIndex) {
                var frame = iframeFrames[iframeIndex];
                if (frame && isFrameWindowClosed(frame)) return !0;
            }
            return !1;
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent || void 0;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator7 = getFrames(parent), _isArray7 = Array.isArray(_iterator7), _i9 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i9 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i9++];
                } else {
                    if (_i9 = _iterator7.next(), _i9.done) break;
                    _ref7 = _i9.value;
                }
                if (_ref7 === child) return !0;
            }
            return !1;
        }
        function isPopup() {
            return Boolean(getOpener(window));
        }
        function isIframe() {
            return Boolean(getParent(window));
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(pattern) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(origin) && pattern.some(function(subpattern) {
                return matchDomain(subpattern, origin);
            }));
        }
        function isWindow(obj) {
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(obj === obj);
            } catch (err) {
                return !0;
            }
            try {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(obj && obj.__cross_domain_utils_window_check__);
            } catch (err) {
                return !0;
            }
            return !1;
        }
        __webpack_exports__.i = getActualDomain, __webpack_exports__.g = getDomain, __webpack_exports__.h = isActuallySameDomain, 
        __webpack_exports__.f = isWindowClosed, __webpack_exports__.a = getAncestor, __webpack_exports__.j = isAncestor, 
        __webpack_exports__.c = isPopup, __webpack_exports__.d = isIframe, __webpack_exports__.b = matchDomain, 
        __webpack_exports__.e = isWindow;
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(38), CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n", iframeWindows = [], iframeFrames = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__promise__ = __webpack_require__(53);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__promise__.a;
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function Duplex(options) {
            if (!(this instanceof Duplex)) return new Duplex(options);
            Readable.call(this, options), Writable.call(this, options), options && !1 === options.readable && (this.readable = !1), 
            options && !1 === options.writable && (this.writable = !1), this.allowHalfOpen = !0, 
            options && !1 === options.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", onend);
        }
        function onend() {
            this.allowHalfOpen || this._writableState.ended || processNextTick(onEndNT, this);
        }
        function onEndNT(self) {
            self.end();
        }
        var processNextTick = __webpack_require__(16), objectKeys = Object.keys || function(obj) {
            var keys = [];
            for (var key in obj) keys.push(key);
            return keys;
        };
        module.exports = Duplex;
        var util = __webpack_require__(10);
        util.inherits = __webpack_require__(7);
        var Readable = __webpack_require__(25), Writable = __webpack_require__(27);
        util.inherits(Duplex, Readable);
        for (var keys = objectKeys(Writable.prototype), v = 0; v < keys.length; v++) {
            var method = keys[v];
            Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
        }
        Object.defineProperty(Duplex.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed);
            },
            set: function(value) {
                void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = value, 
                this._writableState.destroyed = value);
            }
        }), Duplex.prototype._destroy = function(err, cb) {
            this.push(null), this.end(), processNextTick(cb, err);
        };
    }, function(module, exports) {
        var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        g = function() {
            return this;
        }();
        try {
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
        }
        module.exports = g;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return global;
        });
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(0), global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function() {};
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(17);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.a;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.f;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.d;
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.c;
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.b;
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.h;
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.i;
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.j;
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.e;
        }), __webpack_require__.d(__webpack_exports__, "o", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.k;
        });
        var __WEBPACK_IMPORTED_MODULE_1__log__ = __webpack_require__(19);
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_1__log__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__serialize__ = __webpack_require__(62);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.a;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.b;
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_3__ready__ = __webpack_require__(61);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.a;
        }), __webpack_require__.d(__webpack_exports__, "p", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.b;
        });
    }, function(module, exports) {
        "function" == typeof Object.create ? module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__receive__ = __webpack_require__(57);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.a;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.b;
        });
        var __WEBPACK_IMPORTED_MODULE_1__send__ = __webpack_require__(32);
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_1__send__.b;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_1__send__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__listeners__ = __webpack_require__(31);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.d;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.e;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.c;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function init() {
            __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__drivers__.a)(), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)()), 
            __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized = !0;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        }), __webpack_exports__.init = init, __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return bridge;
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_3__clean__ = __webpack_require__(55);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_3__clean__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_4__public__ = __webpack_require__(65);
        __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.a;
        }), __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.b;
        }), __webpack_require__.d(__webpack_exports__, "msgpackSupport", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.c;
        }), __webpack_require__.d(__webpack_exports__, "enableMsgpack", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.d;
        }), __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.e;
        }), __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.f;
        }), __webpack_require__.d(__webpack_exports__, "client", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.g;
        }), __webpack_require__.d(__webpack_exports__, "on", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.h;
        }), __webpack_require__.d(__webpack_exports__, "listen", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.i;
        }), __webpack_require__.d(__webpack_exports__, "once", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.j;
        }), __webpack_require__.d(__webpack_exports__, "listener", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.k;
        }), __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.l;
        }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.m;
        }), __webpack_require__.d(__webpack_exports__, "disable", function() {
            return __WEBPACK_IMPORTED_MODULE_4__public__.n;
        });
        var __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__ = __webpack_require__(2);
        __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__.a;
        }), init();
        var bridge = null;
    }, function(module, exports, __webpack_require__) {
        (function(Buffer) {
            function isArray(arg) {
                return Array.isArray ? Array.isArray(arg) : "[object Array]" === objectToString(arg);
            }
            function isBoolean(arg) {
                return "boolean" == typeof arg;
            }
            function isNull(arg) {
                return null === arg;
            }
            function isNullOrUndefined(arg) {
                return null == arg;
            }
            function isNumber(arg) {
                return "number" == typeof arg;
            }
            function isString(arg) {
                return "string" == typeof arg;
            }
            function isSymbol(arg) {
                return "symbol" === (void 0 === arg ? "undefined" : _typeof(arg));
            }
            function isUndefined(arg) {
                return void 0 === arg;
            }
            function isRegExp(re) {
                return "[object RegExp]" === objectToString(re);
            }
            function isObject(arg) {
                return "object" === (void 0 === arg ? "undefined" : _typeof(arg)) && null !== arg;
            }
            function isDate(d) {
                return "[object Date]" === objectToString(d);
            }
            function isError(e) {
                return "[object Error]" === objectToString(e) || e instanceof Error;
            }
            function isFunction(arg) {
                return "function" == typeof arg;
            }
            function isPrimitive(arg) {
                return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" === (void 0 === arg ? "undefined" : _typeof(arg)) || void 0 === arg;
            }
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
            exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
            exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
            exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
            exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = Buffer.isBuffer;
        }).call(exports, __webpack_require__(15).Buffer);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(20);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.WeakMap;
        });
    }, function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, 
        process.listeners = function(name) {
            return [];
        }, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        function copyProps(src, dst) {
            for (var key in src) dst[key] = src[key];
        }
        function SafeBuffer(arg, encodingOrOffset, length) {
            return Buffer(arg, encodingOrOffset, length);
        }
        var buffer = __webpack_require__(15), Buffer = buffer.Buffer;
        Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow ? module.exports = buffer : (copyProps(buffer, exports), 
        exports.Buffer = SafeBuffer), copyProps(Buffer, SafeBuffer), SafeBuffer.from = function(arg, encodingOrOffset, length) {
            if ("number" == typeof arg) throw new TypeError("Argument must not be a number");
            return Buffer(arg, encodingOrOffset, length);
        }, SafeBuffer.alloc = function(size, fill, encoding) {
            if ("number" != typeof size) throw new TypeError("Argument must be a number");
            var buf = Buffer(size);
            return void 0 !== fill ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0), 
            buf;
        }, SafeBuffer.allocUnsafe = function(size) {
            if ("number" != typeof size) throw new TypeError("Argument must be a number");
            return Buffer(size);
        }, SafeBuffer.allocUnsafeSlow = function(size) {
            if ("number" != typeof size) throw new TypeError("Argument must be a number");
            return buffer.SlowBuffer(size);
        };
    }, function(module, exports, __webpack_require__) {
        (function(Buffer) {
            function BufferList(callback) {
                if (!(this instanceof BufferList)) return new BufferList(callback);
                if (this._bufs = [], this.length = 0, "function" == typeof callback) {
                    this._callback = callback;
                    var piper = function(err) {
                        this._callback && (this._callback(err), this._callback = null);
                    }.bind(this);
                    this.on("pipe", function(src) {
                        src.on("error", piper);
                    }), this.on("unpipe", function(src) {
                        src.removeListener("error", piper);
                    });
                } else this.append(callback);
                DuplexStream.call(this);
            }
            var DuplexStream = __webpack_require__(43);
            __webpack_require__(18).inherits(BufferList, DuplexStream), BufferList.prototype._offset = function(offset) {
                var _t, tot = 0, i = 0;
                if (0 === offset) return [ 0, 0 ];
                for (;i < this._bufs.length; i++) {
                    if (_t = tot + this._bufs[i].length, offset < _t || i == this._bufs.length - 1) return [ i, offset - tot ];
                    tot = _t;
                }
            }, BufferList.prototype.append = function(buf) {
                var i = 0;
                if (Buffer.isBuffer(buf)) this._appendBuffer(buf); else if (Array.isArray(buf)) for (;i < buf.length; i++) this.append(buf[i]); else if (buf instanceof BufferList) for (;i < buf._bufs.length; i++) this.append(buf._bufs[i]); else null != buf && ("number" == typeof buf && (buf = buf.toString()), 
                this._appendBuffer(new Buffer(buf)));
                return this;
            }, BufferList.prototype._appendBuffer = function(buf) {
                this._bufs.push(buf), this.length += buf.length;
            }, BufferList.prototype._write = function(buf, encoding, callback) {
                this._appendBuffer(buf), "function" == typeof callback && callback();
            }, BufferList.prototype._read = function(size) {
                if (!this.length) return this.push(null);
                size = Math.min(size, this.length), this.push(this.slice(0, size)), this.consume(size);
            }, BufferList.prototype.end = function(chunk) {
                DuplexStream.prototype.end.call(this, chunk), this._callback && (this._callback(null, this.slice()), 
                this._callback = null);
            }, BufferList.prototype.get = function(index) {
                return this.slice(index, index + 1)[0];
            }, BufferList.prototype.slice = function(start, end) {
                return "number" == typeof start && start < 0 && (start += this.length), "number" == typeof end && end < 0 && (end += this.length), 
                this.copy(null, 0, start, end);
            }, BufferList.prototype.copy = function(dst, dstStart, srcStart, srcEnd) {
                if (("number" != typeof srcStart || srcStart < 0) && (srcStart = 0), ("number" != typeof srcEnd || srcEnd > this.length) && (srcEnd = this.length), 
                srcStart >= this.length) return dst || new Buffer(0);
                if (srcEnd <= 0) return dst || new Buffer(0);
                var l, i, copy = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy && dstStart || 0, start = off[1];
                if (0 === srcStart && srcEnd == this.length) {
                    if (!copy) return 1 === this._bufs.length ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
                    for (i = 0; i < this._bufs.length; i++) this._bufs[i].copy(dst, bufoff), bufoff += this._bufs[i].length;
                    return dst;
                }
                if (bytes <= this._bufs[off[0]].length - start) return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
                for (copy || (dst = new Buffer(len)), i = off[0]; i < this._bufs.length; i++) {
                    if (l = this._bufs[i].length - start, !(bytes > l)) {
                        this._bufs[i].copy(dst, bufoff, start, start + bytes);
                        break;
                    }
                    this._bufs[i].copy(dst, bufoff, start), bufoff += l, bytes -= l, start && (start = 0);
                }
                return dst;
            }, BufferList.prototype.shallowSlice = function(start, end) {
                start = start || 0, end = end || this.length, start < 0 && (start += this.length), 
                end < 0 && (end += this.length);
                var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
                return 0 == endOffset[1] ? buffers.pop() : buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]), 
                0 != startOffset[1] && (buffers[0] = buffers[0].slice(startOffset[1])), new BufferList(buffers);
            }, BufferList.prototype.toString = function(encoding, start, end) {
                return this.slice(start, end).toString(encoding);
            }, BufferList.prototype.consume = function(bytes) {
                for (;this._bufs.length; ) {
                    if (!(bytes >= this._bufs[0].length)) {
                        this._bufs[0] = this._bufs[0].slice(bytes), this.length -= bytes;
                        break;
                    }
                    bytes -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
                }
                return this;
            }, BufferList.prototype.duplicate = function() {
                for (var i = 0, copy = new BufferList(); i < this._bufs.length; i++) copy.append(this._bufs[i]);
                return copy;
            }, BufferList.prototype.destroy = function() {
                this._bufs.length = 0, this.length = 0, this.push(null);
            }, function() {
                var methods = {
                    readDoubleBE: 8,
                    readDoubleLE: 8,
                    readFloatBE: 4,
                    readFloatLE: 4,
                    readInt32BE: 4,
                    readInt32LE: 4,
                    readUInt32BE: 4,
                    readUInt32LE: 4,
                    readInt16BE: 2,
                    readInt16LE: 2,
                    readUInt16BE: 2,
                    readUInt16LE: 2,
                    readInt8: 1,
                    readUInt8: 1
                };
                for (var m in methods) !function(m) {
                    BufferList.prototype[m] = function(offset) {
                        return this.slice(offset, offset + methods[m])[m](0);
                    };
                }(m);
            }(), module.exports = BufferList;
        }).call(exports, __webpack_require__(15).Buffer);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            function kMaxLength() {
                return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function createBuffer(that, length) {
                if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
                return Buffer.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer.prototype) : (null === that && (that = new Buffer(length)), 
                that.length = length), that;
            }
            function Buffer(arg, encodingOrOffset, length) {
                if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
                if ("number" == typeof arg) {
                    if ("string" == typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
                    return allocUnsafe(this, arg);
                }
                return from(this, arg, encodingOrOffset, length);
            }
            function from(that, value, encodingOrOffset, length) {
                if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer ? fromArrayBuffer(that, value, encodingOrOffset, length) : "string" == typeof value ? fromString(that, value, encodingOrOffset) : fromObject(that, value);
            }
            function assertSize(size) {
                if ("number" != typeof size) throw new TypeError('"size" argument must be a number');
                if (size < 0) throw new RangeError('"size" argument must not be negative');
            }
            function alloc(that, size, fill, encoding) {
                return assertSize(size), size <= 0 ? createBuffer(that, size) : void 0 !== fill ? "string" == typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill) : createBuffer(that, size);
            }
            function allocUnsafe(that, size) {
                if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : 0 | checked(size)), 
                !Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
                return that;
            }
            function fromString(that, string, encoding) {
                if ("string" == typeof encoding && "" !== encoding || (encoding = "utf8"), !Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
                var length = 0 | byteLength(string, encoding);
                that = createBuffer(that, length);
                var actual = that.write(string, encoding);
                return actual !== length && (that = that.slice(0, actual)), that;
            }
            function fromArrayLike(that, array) {
                var length = array.length < 0 ? 0 : 0 | checked(array.length);
                that = createBuffer(that, length);
                for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
                return that;
            }
            function fromArrayBuffer(that, array, byteOffset, length) {
                if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
                if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
                return array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length), 
                Buffer.TYPED_ARRAY_SUPPORT ? (that = array, that.__proto__ = Buffer.prototype) : that = fromArrayLike(that, array), 
                that;
            }
            function fromObject(that, obj) {
                if (Buffer.isBuffer(obj)) {
                    var len = 0 | checked(obj.length);
                    return that = createBuffer(that, len), 0 === that.length ? that : (obj.copy(that, 0, 0, len), 
                    that);
                }
                if (obj) {
                    if ("undefined" != typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) return "number" != typeof obj.length || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
                    if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            function checked(length) {
                if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                return 0 | length;
            }
            function SlowBuffer(length) {
                return +length != length && (length = 0), Buffer.alloc(+length);
            }
            function byteLength(string, encoding) {
                if (Buffer.isBuffer(string)) return string.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
                "string" != typeof string && (string = "" + string);
                var len = string.length;
                if (0 === len) return 0;
                for (var loweredCase = !1; ;) switch (encoding) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return len;

                  case "utf8":
                  case "utf-8":
                  case void 0:
                    return utf8ToBytes(string).length;

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * len;

                  case "hex":
                    return len >>> 1;

                  case "base64":
                    return base64ToBytes(string).length;

                  default:
                    if (loweredCase) return utf8ToBytes(string).length;
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }
            function slowToString(encoding, start, end) {
                var loweredCase = !1;
                if ((void 0 === start || start < 0) && (start = 0), start > this.length) return "";
                if ((void 0 === end || end > this.length) && (end = this.length), end <= 0) return "";
                if (end >>>= 0, start >>>= 0, end <= start) return "";
                for (encoding || (encoding = "utf8"); ;) switch (encoding) {
                  case "hex":
                    return hexSlice(this, start, end);

                  case "utf8":
                  case "utf-8":
                    return utf8Slice(this, start, end);

                  case "ascii":
                    return asciiSlice(this, start, end);

                  case "latin1":
                  case "binary":
                    return latin1Slice(this, start, end);

                  case "base64":
                    return base64Slice(this, start, end);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return utf16leSlice(this, start, end);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = (encoding + "").toLowerCase(), loweredCase = !0;
                }
            }
            function swap(b, n, m) {
                var i = b[n];
                b[n] = b[m], b[m] = i;
            }
            function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                if (0 === buffer.length) return -1;
                if ("string" == typeof byteOffset ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), 
                byteOffset = +byteOffset, isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1), 
                byteOffset < 0 && (byteOffset = buffer.length + byteOffset), byteOffset >= buffer.length) {
                    if (dir) return -1;
                    byteOffset = buffer.length - 1;
                } else if (byteOffset < 0) {
                    if (!dir) return -1;
                    byteOffset = 0;
                }
                if ("string" == typeof val && (val = Buffer.from(val, encoding)), Buffer.isBuffer(val)) return 0 === val.length ? -1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                if ("number" == typeof val) return val &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset) : arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
                throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                function read(buf, i) {
                    return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
                }
                var indexSize = 1, arrLength = arr.length, valLength = val.length;
                if (void 0 !== encoding && ("ucs2" === (encoding = String(encoding).toLowerCase()) || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding)) {
                    if (arr.length < 2 || val.length < 2) return -1;
                    indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2;
                }
                var i;
                if (dir) {
                    var foundIndex = -1;
                    for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
                        if (-1 === foundIndex && (foundIndex = i), i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                    } else -1 !== foundIndex && (i -= i - foundIndex), foundIndex = -1;
                } else for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), 
                i = byteOffset; i >= 0; i--) {
                    for (var found = !0, j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
                        found = !1;
                        break;
                    }
                    if (found) return i;
                }
                return -1;
            }
            function hexWrite(buf, string, offset, length) {
                offset = Number(offset) || 0;
                var remaining = buf.length - offset;
                length ? (length = Number(length)) > remaining && (length = remaining) : length = remaining;
                var strLen = string.length;
                if (strLen % 2 != 0) throw new TypeError("Invalid hex string");
                length > strLen / 2 && (length = strLen / 2);
                for (var i = 0; i < length; ++i) {
                    var parsed = parseInt(string.substr(2 * i, 2), 16);
                    if (isNaN(parsed)) return i;
                    buf[offset + i] = parsed;
                }
                return i;
            }
            function utf8Write(buf, string, offset, length) {
                return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
            }
            function asciiWrite(buf, string, offset, length) {
                return blitBuffer(asciiToBytes(string), buf, offset, length);
            }
            function latin1Write(buf, string, offset, length) {
                return asciiWrite(buf, string, offset, length);
            }
            function base64Write(buf, string, offset, length) {
                return blitBuffer(base64ToBytes(string), buf, offset, length);
            }
            function ucs2Write(buf, string, offset, length) {
                return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
            }
            function base64Slice(buf, start, end) {
                return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
            }
            function utf8Slice(buf, start, end) {
                end = Math.min(buf.length, end);
                for (var res = [], i = start; i < end; ) {
                    var firstByte = buf[i], codePoint = null, bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                    if (i + bytesPerSequence <= end) {
                        var secondByte, thirdByte, fourthByte, tempCodePoint;
                        switch (bytesPerSequence) {
                          case 1:
                            firstByte < 128 && (codePoint = firstByte);
                            break;

                          case 2:
                            secondByte = buf[i + 1], 128 == (192 & secondByte) && (tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte) > 127 && (codePoint = tempCodePoint);
                            break;

                          case 3:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], 128 == (192 & secondByte) && 128 == (192 & thirdByte) && (tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte) > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
                            break;

                          case 4:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], 128 == (192 & secondByte) && 128 == (192 & thirdByte) && 128 == (192 & fourthByte) && (tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte) > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
                        }
                    }
                    null === codePoint ? (codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (codePoint -= 65536, 
                    res.push(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | 1023 & codePoint), 
                    res.push(codePoint), i += bytesPerSequence;
                }
                return decodeCodePointsArray(res);
            }
            function decodeCodePointsArray(codePoints) {
                var len = codePoints.length;
                if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
                for (var res = "", i = 0; i < len; ) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
                return res;
            }
            function asciiSlice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
                return ret;
            }
            function latin1Slice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
                return ret;
            }
            function hexSlice(buf, start, end) {
                var len = buf.length;
                (!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
                for (var out = "", i = start; i < end; ++i) out += toHex(buf[i]);
                return out;
            }
            function utf16leSlice(buf, start, end) {
                for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
                return res;
            }
            function checkOffset(offset, ext, length) {
                if (offset % 1 != 0 || offset < 0) throw new RangeError("offset is not uint");
                if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
            }
            function checkInt(buf, value, offset, ext, max, min) {
                if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
            }
            function objectWriteUInt16(buf, value, offset, littleEndian) {
                value < 0 && (value = 65535 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
            }
            function objectWriteUInt32(buf, value, offset, littleEndian) {
                value < 0 && (value = 4294967295 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
            }
            function checkIEEE754(buf, value, offset, ext, max, min) {
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
                if (offset < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38), 
                ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
            }
            function writeDouble(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308), 
                ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
            }
            function base64clean(str) {
                if (str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2) return "";
                for (;str.length % 4 != 0; ) str += "=";
                return str;
            }
            function stringtrim(str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
            }
            function toHex(n) {
                return n < 16 ? "0" + n.toString(16) : n.toString(16);
            }
            function utf8ToBytes(string, units) {
                units = units || 1 / 0;
                for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
                    if ((codePoint = string.charCodeAt(i)) > 55295 && codePoint < 57344) {
                        if (!leadSurrogate) {
                            if (codePoint > 56319) {
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            if (i + 1 === length) {
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            leadSurrogate = codePoint;
                            continue;
                        }
                        if (codePoint < 56320) {
                            (units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
                            continue;
                        }
                        codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
                    } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
                    if (leadSurrogate = null, codePoint < 128) {
                        if ((units -= 1) < 0) break;
                        bytes.push(codePoint);
                    } else if (codePoint < 2048) {
                        if ((units -= 2) < 0) break;
                        bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
                    } else if (codePoint < 65536) {
                        if ((units -= 3) < 0) break;
                        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    } else {
                        if (!(codePoint < 1114112)) throw new Error("Invalid code point");
                        if ((units -= 4) < 0) break;
                        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    }
                }
                return bytes;
            }
            function asciiToBytes(str) {
                for (var byteArray = [], i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
                return byteArray;
            }
            function utf16leToBytes(str, units) {
                for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i) c = str.charCodeAt(i), 
                hi = c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
                return byteArray;
            }
            function base64ToBytes(str) {
                return base64.toByteArray(base64clean(str));
            }
            function blitBuffer(src, dst, offset, length) {
                for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i) dst[i + offset] = src[i];
                return i;
            }
            function isnan(val) {
                return val !== val;
            }
            /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
            var base64 = __webpack_require__(34), ieee754 = __webpack_require__(39), isArray = __webpack_require__(22);
            exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50, 
            Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var arr = new Uint8Array(1);
                    return arr.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42;
                        }
                    }, 42 === arr.foo() && "function" == typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
                } catch (e) {
                    return !1;
                }
            }(), exports.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, Buffer._augment = function(arr) {
                return arr.__proto__ = Buffer.prototype, arr;
            }, Buffer.from = function(value, encodingOrOffset, length) {
                return from(null, value, encodingOrOffset, length);
            }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, 
            Buffer.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: !0
            })), Buffer.alloc = function(size, fill, encoding) {
                return alloc(null, size, fill, encoding);
            }, Buffer.allocUnsafe = function(size) {
                return allocUnsafe(null, size);
            }, Buffer.allocUnsafeSlow = function(size) {
                return allocUnsafe(null, size);
            }, Buffer.isBuffer = function(b) {
                return !(null == b || !b._isBuffer);
            }, Buffer.compare = function(a, b) {
                if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
                if (a === b) return 0;
                for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
                    x = a[i], y = b[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.isEncoding = function(encoding) {
                switch (String(encoding).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;

                  default:
                    return !1;
                }
            }, Buffer.concat = function(list, length) {
                if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === list.length) return Buffer.alloc(0);
                var i;
                if (void 0 === length) for (length = 0, i = 0; i < list.length; ++i) length += list[i].length;
                var buffer = Buffer.allocUnsafe(length), pos = 0;
                for (i = 0; i < list.length; ++i) {
                    var buf = list[i];
                    if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
                    buf.copy(buffer, pos), pos += buf.length;
                }
                return buffer;
            }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                var len = this.length;
                if (len % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
                return this;
            }, Buffer.prototype.swap32 = function() {
                var len = this.length;
                if (len % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var i = 0; i < len; i += 4) swap(this, i, i + 3), swap(this, i + 1, i + 2);
                return this;
            }, Buffer.prototype.swap64 = function() {
                var len = this.length;
                if (len % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var i = 0; i < len; i += 8) swap(this, i, i + 7), swap(this, i + 1, i + 6), 
                swap(this, i + 2, i + 5), swap(this, i + 3, i + 4);
                return this;
            }, Buffer.prototype.toString = function() {
                var length = 0 | this.length;
                return 0 === length ? "" : 0 === arguments.length ? utf8Slice(this, 0, length) : slowToString.apply(this, arguments);
            }, Buffer.prototype.equals = function(b) {
                if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                return this === b || 0 === Buffer.compare(this, b);
            }, Buffer.prototype.inspect = function() {
                var str = "", max = exports.INSPECT_MAX_BYTES;
                return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), 
                this.length > max && (str += " ... ")), "<Buffer " + str + ">";
            }, Buffer.prototype.compare = function(target, start, end, thisStart, thisEnd) {
                if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === start && (start = 0), void 0 === end && (end = target ? target.length : 0), 
                void 0 === thisStart && (thisStart = 0), void 0 === thisEnd && (thisEnd = this.length), 
                start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
                if (thisStart >= thisEnd && start >= end) return 0;
                if (thisStart >= thisEnd) return -1;
                if (start >= end) return 1;
                if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target) return 0;
                for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart, thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
                    x = thisCopy[i], y = targetCopy[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.prototype.includes = function(val, byteOffset, encoding) {
                return -1 !== this.indexOf(val, byteOffset, encoding);
            }, Buffer.prototype.indexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !0);
            }, Buffer.prototype.lastIndexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !1);
            }, Buffer.prototype.write = function(string, offset, length, encoding) {
                if (void 0 === offset) encoding = "utf8", length = this.length, offset = 0; else if (void 0 === length && "string" == typeof offset) encoding = offset, 
                length = this.length, offset = 0; else {
                    if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    offset |= 0, isFinite(length) ? (length |= 0, void 0 === encoding && (encoding = "utf8")) : (encoding = length, 
                    length = void 0);
                }
                var remaining = this.length - offset;
                if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                encoding || (encoding = "utf8");
                for (var loweredCase = !1; ;) switch (encoding) {
                  case "hex":
                    return hexWrite(this, string, offset, length);

                  case "utf8":
                  case "utf-8":
                    return utf8Write(this, string, offset, length);

                  case "ascii":
                    return asciiWrite(this, string, offset, length);

                  case "latin1":
                  case "binary":
                    return latin1Write(this, string, offset, length);

                  case "base64":
                    return base64Write(this, string, offset, length);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return ucs2Write(this, string, offset, length);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }, Buffer.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            var MAX_ARGUMENTS_LENGTH = 4096;
            Buffer.prototype.slice = function(start, end) {
                var len = this.length;
                start = ~~start, end = void 0 === end ? len : ~~end, start < 0 ? (start += len) < 0 && (start = 0) : start > len && (start = len), 
                end < 0 ? (end += len) < 0 && (end = 0) : end > len && (end = len), end < start && (end = start);
                var newBuf;
                if (Buffer.TYPED_ARRAY_SUPPORT) newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer.prototype; else {
                    var sliceLen = end - start;
                    newBuf = new Buffer(sliceLen, void 0);
                    for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
                }
                return newBuf;
            }, Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return val;
            }, Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset + --byteLength], mul = 1; byteLength > 0 && (mul *= 256); ) val += this[offset + --byteLength] * mul;
                return val;
            }, Buffer.prototype.readUInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), this[offset];
            }, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
            }, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
            }, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
            }, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
            }, Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var i = byteLength, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256); ) val += this[offset + --i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), 128 & this[offset] ? -1 * (255 - this[offset] + 1) : this[offset];
            }, Buffer.prototype.readInt16LE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset] | this[offset + 1] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt16BE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset + 1] | this[offset] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
            }, Buffer.prototype.readInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
            }, Buffer.prototype.readFloatLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !0, 23, 4);
            }, Buffer.prototype.readFloatBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !1, 23, 4);
            }, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !0, 52, 8);
            }, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !1, 52, 8);
            }, Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength) - 1, 0);
                }
                var mul = 1, i = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength) - 1, 0);
                }
                var i = byteLength - 1, mul = 1;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 255, 0), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = 255 & value, 
                offset + 1;
            }, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, 
                this[offset + 1] = value >>> 8, this[offset] = 255 & value) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, 
                this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = 0, mul = 1, sub = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = byteLength - 1, mul = 1, sub = 0;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 127, -128), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), value < 0 && (value = 255 + value + 1), 
                this[offset] = 255 & value, offset + 1;
            }, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8, 
                this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                value < 0 && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, 
                this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !1, noAssert);
            }, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !1, noAssert);
            }, Buffer.prototype.copy = function(target, targetStart, start, end) {
                if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart = target.length), 
                targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start) return 0;
                if (0 === target.length || 0 === this.length) return 0;
                if (targetStart < 0) throw new RangeError("targetStart out of bounds");
                if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
                if (end < 0) throw new RangeError("sourceEnd out of bounds");
                end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length - targetStart + start);
                var i, len = end - start;
                if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
                return len;
            }, Buffer.prototype.fill = function(val, start, end, encoding) {
                if ("string" == typeof val) {
                    if ("string" == typeof start ? (encoding = start, start = 0, end = this.length) : "string" == typeof end && (encoding = end, 
                    end = this.length), 1 === val.length) {
                        var code = val.charCodeAt(0);
                        code < 256 && (val = code);
                    }
                    if (void 0 !== encoding && "string" != typeof encoding) throw new TypeError("encoding must be a string");
                    if ("string" == typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
                } else "number" == typeof val && (val &= 255);
                if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
                if (end <= start) return this;
                start >>>= 0, end = void 0 === end ? this.length : end >>> 0, val || (val = 0);
                var i;
                if ("number" == typeof val) for (i = start; i < end; ++i) this[i] = val; else {
                    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString()), len = bytes.length;
                    for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
                }
                return this;
            };
            var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        }).call(exports, __webpack_require__(4));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(process) {
            function nextTick(fn, arg1, arg2, arg3) {
                if ("function" != typeof fn) throw new TypeError('"callback" argument must be a function');
                var args, i, len = arguments.length;
                switch (len) {
                  case 0:
                  case 1:
                    return process.nextTick(fn);

                  case 2:
                    return process.nextTick(function() {
                        fn.call(null, arg1);
                    });

                  case 3:
                    return process.nextTick(function() {
                        fn.call(null, arg1, arg2);
                    });

                  case 4:
                    return process.nextTick(function() {
                        fn.call(null, arg1, arg2, arg3);
                    });

                  default:
                    for (args = new Array(len - 1), i = 0; i < args.length; ) args[i++] = arguments[i];
                    return process.nextTick(function() {
                        fn.apply(null, args);
                    });
                }
            }
            !process.version || 0 === process.version.indexOf("v0.") || 0 === process.version.indexOf("v1.") && 0 !== process.version.indexOf("v1.8.") ? module.exports = nextTick : module.exports = process.nextTick;
        }).call(exports, __webpack_require__(12));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function stringifyError(err) {
            if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
            if ("string" == typeof err) return err;
            if (err instanceof Error) {
                var stack = err && err.stack, message = err && err.message;
                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                if (stack) return stack;
                if (message) return message;
            }
            return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
        }
        function noop() {}
        function addEventListener(obj, event, handler) {
            return obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler), 
            {
                cancel: function() {
                    obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                }
            };
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function eachArray(item, callback) {
            for (var i = 0; i < item.length; i++) callback(item[i], i);
        }
        function eachObject(item, callback) {
            for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
        }
        function each(item, callback) {
            Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
        }
        function replaceObject(item, callback) {
            var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            var newobj = void 0;
            if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                if (!Array.isArray(item)) throw new Error("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                newobj = [];
            } else newobj = {};
            return each(item, function(childItem, key) {
                var result = callback(childItem, key);
                void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
            }), newobj;
        }
        function safeInterval(method, time) {
            function runInterval() {
                timeout = setTimeout(runInterval, time), method.call();
            }
            var timeout = void 0;
            return timeout = setTimeout(runInterval, time), {
                cancel: function() {
                    clearTimeout(timeout);
                }
            };
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function getWindowType() {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.c)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.POPUP : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.d)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.IFRAME : __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify(obj, replacer, indent) {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({}) && (objectToJSON = Object.prototype.toJSON, delete Object.prototype.toJSON), 
                "{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([]) && (arrayToJSON = Array.prototype.toJSON, delete Array.prototype.toJSON), 
                "[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.call(this, obj, replacer, indent);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON), arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse(item) {
            return JSON.parse(item);
        }
        __webpack_exports__.b = stringifyError, __webpack_require__.d(__webpack_exports__, "e", function() {
            return once;
        }), __webpack_exports__.j = noop, __webpack_exports__.i = addEventListener, __webpack_exports__.f = uniqueID, 
        __webpack_exports__.g = replaceObject, __webpack_exports__.k = safeInterval, __webpack_exports__.a = isRegex, 
        __webpack_exports__.d = getWindowType, __webpack_exports__.c = jsonStringify, __webpack_exports__.h = jsonParse;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = (__webpack_require__(11), 
        __webpack_require__(1)), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(0), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, once = function(method) {
            if (!method) return method;
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        };
    }, function(module, exports, __webpack_require__) {
        (function(global, process) {
            function inspect(obj, opts) {
                var ctx = {
                    seen: [],
                    stylize: stylizeNoColor
                };
                return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), 
                isBoolean(opts) ? ctx.showHidden = opts : opts && exports._extend(ctx, opts), isUndefined(ctx.showHidden) && (ctx.showHidden = !1), 
                isUndefined(ctx.depth) && (ctx.depth = 2), isUndefined(ctx.colors) && (ctx.colors = !1), 
                isUndefined(ctx.customInspect) && (ctx.customInspect = !0), ctx.colors && (ctx.stylize = stylizeWithColor), 
                formatValue(ctx, obj, ctx.depth);
            }
            function stylizeWithColor(str, styleType) {
                var style = inspect.styles[styleType];
                return style ? "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m" : str;
            }
            function stylizeNoColor(str, styleType) {
                return str;
            }
            function arrayToHash(array) {
                var hash = {};
                return array.forEach(function(val, idx) {
                    hash[val] = !0;
                }), hash;
            }
            function formatValue(ctx, value, recurseTimes) {
                if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && (!value.constructor || value.constructor.prototype !== value)) {
                    var ret = value.inspect(recurseTimes, ctx);
                    return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
                }
                var primitive = formatPrimitive(ctx, value);
                if (primitive) return primitive;
                var keys = Object.keys(value), visibleKeys = arrayToHash(keys);
                if (ctx.showHidden && (keys = Object.getOwnPropertyNames(value)), isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
                if (0 === keys.length) {
                    if (isFunction(value)) {
                        var name = value.name ? ": " + value.name : "";
                        return ctx.stylize("[Function" + name + "]", "special");
                    }
                    if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                    if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                    if (isError(value)) return formatError(value);
                }
                var base = "", array = !1, braces = [ "{", "}" ];
                if (isArray(value) && (array = !0, braces = [ "[", "]" ]), isFunction(value)) {
                    base = " [Function" + (value.name ? ": " + value.name : "") + "]";
                }
                if (isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), 
                isError(value) && (base = " " + formatError(value)), 0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
                if (recurseTimes < 0) return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
                ctx.seen.push(value);
                var output;
                return output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
                }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
            }
            function formatPrimitive(ctx, value) {
                if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
                if (isString(value)) {
                    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return ctx.stylize(simple, "string");
                }
                return isNumber(value) ? ctx.stylize("" + value, "number") : isBoolean(value) ? ctx.stylize("" + value, "boolean") : isNull(value) ? ctx.stylize("null", "null") : void 0;
            }
            function formatError(value) {
                return "[" + Error.prototype.toString.call(value) + "]";
            }
            function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
                for (var output = [], i = 0, l = value.length; i < l; ++i) hasOwnProperty(value, String(i)) ? output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), !0)) : output.push("");
                return keys.forEach(function(key) {
                    key.match(/^\d+$/) || output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, !0));
                }), output;
            }
            function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
                var name, str, desc;
                if (desc = Object.getOwnPropertyDescriptor(value, key) || {
                    value: value[key]
                }, desc.get ? str = desc.set ? ctx.stylize("[Getter/Setter]", "special") : ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), 
                hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (ctx.seen.indexOf(desc.value) < 0 ? (str = isNull(recurseTimes) ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1), 
                str.indexOf("\n") > -1 && (str = array ? str.split("\n").map(function(line) {
                    return "  " + line;
                }).join("\n").substr(2) : "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                }).join("\n"))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
                    if (array && key.match(/^\d+$/)) return str;
                    name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), 
                    name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                    name = ctx.stylize(name, "string"));
                }
                return name + ": " + str;
            }
            function reduceToSingleString(output, base, braces) {
                var numLinesEst = 0;
                return output.reduce(function(prev, cur) {
                    return numLinesEst++, cur.indexOf("\n") >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0) > 60 ? braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
            }
            function isArray(ar) {
                return Array.isArray(ar);
            }
            function isBoolean(arg) {
                return "boolean" == typeof arg;
            }
            function isNull(arg) {
                return null === arg;
            }
            function isNullOrUndefined(arg) {
                return null == arg;
            }
            function isNumber(arg) {
                return "number" == typeof arg;
            }
            function isString(arg) {
                return "string" == typeof arg;
            }
            function isSymbol(arg) {
                return "symbol" === (void 0 === arg ? "undefined" : _typeof(arg));
            }
            function isUndefined(arg) {
                return void 0 === arg;
            }
            function isRegExp(re) {
                return isObject(re) && "[object RegExp]" === objectToString(re);
            }
            function isObject(arg) {
                return "object" === (void 0 === arg ? "undefined" : _typeof(arg)) && null !== arg;
            }
            function isDate(d) {
                return isObject(d) && "[object Date]" === objectToString(d);
            }
            function isError(e) {
                return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error);
            }
            function isFunction(arg) {
                return "function" == typeof arg;
            }
            function isPrimitive(arg) {
                return null === arg || "boolean" == typeof arg || "number" == typeof arg || "string" == typeof arg || "symbol" === (void 0 === arg ? "undefined" : _typeof(arg)) || void 0 === arg;
            }
            function objectToString(o) {
                return Object.prototype.toString.call(o);
            }
            function pad(n) {
                return n < 10 ? "0" + n.toString(10) : n.toString(10);
            }
            function timestamp() {
                var d = new Date(), time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
                return [ d.getDate(), months[d.getMonth()], time ].join(" ");
            }
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, formatRegExp = /%[sdj%]/g;
            exports.format = function(f) {
                if (!isString(f)) {
                    for (var objects = [], i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
                    return objects.join(" ");
                }
                for (var i = 1, args = arguments, len = args.length, str = String(f).replace(formatRegExp, function(x) {
                    if ("%%" === x) return "%";
                    if (i >= len) return x;
                    switch (x) {
                      case "%s":
                        return String(args[i++]);

                      case "%d":
                        return Number(args[i++]);

                      case "%j":
                        try {
                            return JSON.stringify(args[i++]);
                        } catch (_) {
                            return "[Circular]";
                        }

                      default:
                        return x;
                    }
                }), x = args[i]; i < len; x = args[++i]) isNull(x) || !isObject(x) ? str += " " + x : str += " " + inspect(x);
                return str;
            }, exports.deprecate = function(fn, msg) {
                function deprecated() {
                    if (!warned) {
                        if (process.throwDeprecation) throw new Error(msg);
                        process.traceDeprecation ? console.trace(msg) : console.error(msg), warned = !0;
                    }
                    return fn.apply(this, arguments);
                }
                if (isUndefined(global.process)) return function() {
                    return exports.deprecate(fn, msg).apply(this, arguments);
                };
                if (!0 === process.noDeprecation) return fn;
                var warned = !1;
                return deprecated;
            };
            var debugEnviron, debugs = {};
            exports.debuglog = function(set) {
                if (isUndefined(debugEnviron) && (debugEnviron = process.env.NODE_DEBUG || ""), 
                set = set.toUpperCase(), !debugs[set]) if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
                    var pid = process.pid;
                    debugs[set] = function() {
                        var msg = exports.format.apply(exports, arguments);
                        console.error("%s %d: %s", set, pid, msg);
                    };
                } else debugs[set] = function() {};
                return debugs[set];
            }, exports.inspect = inspect, inspect.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            }, inspect.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, 
            exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, 
            exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, 
            exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, 
            exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = __webpack_require__(51);
            var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            exports.log = function() {
                console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
            }, exports.inherits = __webpack_require__(50), exports._extend = function(origin, add) {
                if (!add || !isObject(add)) return origin;
                for (var keys = Object.keys(add), i = keys.length; i--; ) origin[keys[i]] = add[keys[i]];
                return origin;
            };
        }).call(exports, __webpack_require__(4), __webpack_require__(12));
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return log;
        });
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(17), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = {
            clearLogs: function() {
                if (window.console && window.console.clear && window.console.clear(), __WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    container || (container = document.createElement("div"), container.id = "postRobotLogs", 
                    container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;", 
                    document.body && document.body.appendChild(container));
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.c)(item, null, 2);
                        } catch (e) {
                            json = "[object]";
                        }
                        return "\n\n" + json + "\n\n";
                    }).join(" "), msg = date + " " + level + " " + payload;
                    el.innerHTML = msg;
                    var color = {
                        log: "#ddd",
                        warn: "orange",
                        error: "red",
                        info: "blue",
                        debug: "#aaa"
                    }[level];
                    el.style.cssText = "margin-top: 10px; color: " + color + ";", container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                });
            },
            logLevel: function(level, args) {
                setTimeout(function() {
                    try {
                        var logLevel = window.LOG_LEVEL || __WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                        args.unshift("::"), args.unshift("" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.d)().toLowerCase()), 
                        args.unshift("[post-robot]"), __WEBPACK_IMPORTED_MODULE_1__conf__.a.LOG_TO_PAGE && log.writeToPage(level, args), 
                        !window.console) return;
                        if (window.console[level] || (level = "log"), !window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                log.logLevel("debug", args);
            },
            info: function() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                log.logLevel("info", args);
            },
            warn: function() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                log.logLevel("warn", args);
            },
            error: function() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
                log.logLevel("error", args);
            }
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__weakmap__ = __webpack_require__(37);
        __webpack_require__.d(__webpack_exports__, "WeakMap", function() {
            return __WEBPACK_IMPORTED_MODULE_0__weakmap__.a;
        });
    }, function(module, exports) {
        function EventEmitter() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
        }
        function isFunction(arg) {
            return "function" == typeof arg;
        }
        function isNumber(arg) {
            return "number" == typeof arg;
        }
        function isObject(arg) {
            return "object" === (void 0 === arg ? "undefined" : _typeof(arg)) && null !== arg;
        }
        function isUndefined(arg) {
            return void 0 === arg;
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        module.exports = EventEmitter, EventEmitter.EventEmitter = EventEmitter, EventEmitter.prototype._events = void 0, 
        EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, 
        EventEmitter.prototype.setMaxListeners = function(n) {
            if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
            return this._maxListeners = n, this;
        }, EventEmitter.prototype.emit = function(type) {
            var er, handler, len, args, i, listeners;
            if (this._events || (this._events = {}), "error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
                if ((er = arguments[1]) instanceof Error) throw er;
                var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
                throw err.context = er, err;
            }
            if (handler = this._events[type], isUndefined(handler)) return !1;
            if (isFunction(handler)) switch (arguments.length) {
              case 1:
                handler.call(this);
                break;

              case 2:
                handler.call(this, arguments[1]);
                break;

              case 3:
                handler.call(this, arguments[1], arguments[2]);
                break;

              default:
                args = Array.prototype.slice.call(arguments, 1), handler.apply(this, args);
            } else if (isObject(handler)) for (args = Array.prototype.slice.call(arguments, 1), 
            listeners = handler.slice(), len = listeners.length, i = 0; i < len; i++) listeners[i].apply(this, args);
            return !0;
        }, EventEmitter.prototype.addListener = function(type, listener) {
            var m;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener), 
            this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener, 
            isObject(this._events[type]) && !this._events[type].warned && (m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners) && m > 0 && this._events[type].length > m && (this._events[type].warned = !0, 
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length), 
            "function" == typeof console.trace && console.trace()), this;
        }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.once = function(type, listener) {
            function g() {
                this.removeListener(type, g), fired || (fired = !0, listener.apply(this, arguments));
            }
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            var fired = !1;
            return g.listener = listener, this.on(type, g), this;
        }, EventEmitter.prototype.removeListener = function(type, listener) {
            var list, position, length, i;
            if (!isFunction(listener)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[type]) return this;
            if (list = this._events[type], length = list.length, position = -1, list === listener || isFunction(list.listener) && list.listener === listener) delete this._events[type], 
            this._events.removeListener && this.emit("removeListener", type, listener); else if (isObject(list)) {
                for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                    position = i;
                    break;
                }
                if (position < 0) return this;
                1 === list.length ? (list.length = 0, delete this._events[type]) : list.splice(position, 1), 
                this._events.removeListener && this.emit("removeListener", type, listener);
            }
            return this;
        }, EventEmitter.prototype.removeAllListeners = function(type) {
            var key, listeners;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type], 
            this;
            if (0 === arguments.length) {
                for (key in this._events) "removeListener" !== key && this.removeAllListeners(key);
                return this.removeAllListeners("removeListener"), this._events = {}, this;
            }
            if (listeners = this._events[type], isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) for (;listeners.length; ) this.removeListener(type, listeners[listeners.length - 1]);
            return delete this._events[type], this;
        }, EventEmitter.prototype.listeners = function(type) {
            return this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
        }, EventEmitter.prototype.listenerCount = function(type) {
            if (this._events) {
                var evlistener = this._events[type];
                if (isFunction(evlistener)) return 1;
                if (evlistener) return evlistener.length;
            }
            return 0;
        }, EventEmitter.listenerCount = function(emitter, type) {
            return emitter.listenerCount(type);
        };
    }, function(module, exports) {
        var toString = {}.toString;
        module.exports = Array.isArray || function(arr) {
            return "[object Array]" == toString.call(arr);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function msgpack(options) {
            function registerEncoder(check, encode) {
                return assert(check, "must have an encode function"), assert(encode, "must have an encode function"), 
                encodingTypes.push({
                    check: check,
                    encode: encode
                }), this;
            }
            function registerDecoder(type, decode) {
                return assert(type >= 0, "must have a non-negative type"), assert(decode, "must have a decode function"), 
                decodingTypes.push({
                    type: type,
                    decode: decode
                }), this;
            }
            function register(type, constructor, encode, decode) {
                function check(obj) {
                    return obj instanceof constructor;
                }
                function reEncode(obj) {
                    var buf = bl(), header = Buffer.allocUnsafe(1);
                    return header.writeInt8(type, 0), buf.append(header), buf.append(encode(obj)), buf;
                }
                return assert(constructor, "must have a constructor"), assert(encode, "must have an encode function"), 
                assert(type >= 0, "must have a non-negative type"), assert(decode, "must have a decode function"), 
                this.registerEncoder(check, reEncode), this.registerDecoder(type, decode), this;
            }
            var encodingTypes = [], decodingTypes = [];
            return options = options || {
                forceFloat64: !1,
                compatibilityMode: !1
            }, {
                encode: buildEncode(encodingTypes, options.forceFloat64, options.compatibilityMode),
                decode: buildDecode(decodingTypes),
                register: register,
                registerEncoder: registerEncoder,
                registerDecoder: registerDecoder,
                encoder: streams.encoder,
                decoder: streams.decoder,
                buffer: !0,
                type: "msgpack5",
                IncompleteBufferError: buildDecode.IncompleteBufferError
            };
        }
        var Buffer = __webpack_require__(13).Buffer, assert = __webpack_require__(33), bl = __webpack_require__(14), streams = __webpack_require__(42), buildDecode = __webpack_require__(40), buildEncode = __webpack_require__(41);
        module.exports = msgpack;
    }, function(module, exports, __webpack_require__) {
        function assertEncoding(encoding) {
            if (encoding && !isBufferEncoding(encoding)) throw new Error("Unknown encoding: " + encoding);
        }
        function passThroughWrite(buffer) {
            return buffer.toString(this.encoding);
        }
        function utf16DetectIncompleteChar(buffer) {
            this.charReceived = buffer.length % 2, this.charLength = this.charReceived ? 2 : 0;
        }
        function base64DetectIncompleteChar(buffer) {
            this.charReceived = buffer.length % 3, this.charLength = this.charReceived ? 3 : 0;
        }
        var Buffer = __webpack_require__(15).Buffer, isBufferEncoding = Buffer.isEncoding || function(encoding) {
            switch (encoding && encoding.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return !0;

              default:
                return !1;
            }
        }, StringDecoder = exports.StringDecoder = function(encoding) {
            switch (this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, ""), 
            assertEncoding(encoding), this.encoding) {
              case "utf8":
                this.surrogateSize = 3;
                break;

              case "ucs2":
              case "utf16le":
                this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
                break;

              case "base64":
                this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
                break;

              default:
                return void (this.write = passThroughWrite);
            }
            this.charBuffer = new Buffer(6), this.charReceived = 0, this.charLength = 0;
        };
        StringDecoder.prototype.write = function(buffer) {
            for (var charStr = ""; this.charLength; ) {
                var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
                if (buffer.copy(this.charBuffer, this.charReceived, 0, available), this.charReceived += available, 
                this.charReceived < this.charLength) return "";
                buffer = buffer.slice(available, buffer.length), charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
                var charCode = charStr.charCodeAt(charStr.length - 1);
                if (!(charCode >= 55296 && charCode <= 56319)) {
                    if (this.charReceived = this.charLength = 0, 0 === buffer.length) return charStr;
                    break;
                }
                this.charLength += this.surrogateSize, charStr = "";
            }
            this.detectIncompleteChar(buffer);
            var end = buffer.length;
            this.charLength && (buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end), 
            end -= this.charReceived), charStr += buffer.toString(this.encoding, 0, end);
            var end = charStr.length - 1, charCode = charStr.charCodeAt(end);
            if (charCode >= 55296 && charCode <= 56319) {
                var size = this.surrogateSize;
                return this.charLength += size, this.charReceived += size, this.charBuffer.copy(this.charBuffer, size, 0, size), 
                buffer.copy(this.charBuffer, 0, 0, size), charStr.substring(0, end);
            }
            return charStr;
        }, StringDecoder.prototype.detectIncompleteChar = function(buffer) {
            for (var i = buffer.length >= 3 ? 3 : buffer.length; i > 0; i--) {
                var c = buffer[buffer.length - i];
                if (1 == i && c >> 5 == 6) {
                    this.charLength = 2;
                    break;
                }
                if (i <= 2 && c >> 4 == 14) {
                    this.charLength = 3;
                    break;
                }
                if (i <= 3 && c >> 3 == 30) {
                    this.charLength = 4;
                    break;
                }
            }
            this.charReceived = i;
        }, StringDecoder.prototype.end = function(buffer) {
            var res = "";
            if (buffer && buffer.length && (res = this.write(buffer)), this.charReceived) {
                var cr = this.charReceived, buf = this.charBuffer, enc = this.encoding;
                res += buf.slice(0, cr).toString(enc);
            }
            return res;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(global, process) {
            function _uint8ArrayToBuffer(chunk) {
                return Buffer.from(chunk);
            }
            function _isUint8Array(obj) {
                return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            function prependListener(emitter, event, fn) {
                if ("function" == typeof emitter.prependListener) return emitter.prependListener(event, fn);
                emitter._events && emitter._events[event] ? isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [ fn, emitter._events[event] ] : emitter.on(event, fn);
            }
            function ReadableState(options, stream) {
                Duplex = Duplex || __webpack_require__(3), options = options || {}, this.objectMode = !!options.objectMode, 
                stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.readableObjectMode);
                var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16384;
                this.highWaterMark = hwm || 0 === hwm ? hwm : defaultHwm, this.highWaterMark = Math.floor(this.highWaterMark), 
                this.buffer = new BufferList(), this.length = 0, this.pipes = null, this.pipesCount = 0, 
                this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, 
                this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, 
                this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = options.defaultEncoding || "utf8", 
                this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, 
                options.encoding && (StringDecoder || (StringDecoder = __webpack_require__(24).StringDecoder), 
                this.decoder = new StringDecoder(options.encoding), this.encoding = options.encoding);
            }
            function Readable(options) {
                if (Duplex = Duplex || __webpack_require__(3), !(this instanceof Readable)) return new Readable(options);
                this._readableState = new ReadableState(options, this), this.readable = !0, options && ("function" == typeof options.read && (this._read = options.read), 
                "function" == typeof options.destroy && (this._destroy = options.destroy)), Stream.call(this);
            }
            function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
                var state = stream._readableState;
                if (null === chunk) state.reading = !1, onEofChunk(stream, state); else {
                    var er;
                    skipChunkCheck || (er = chunkInvalid(state, chunk)), er ? stream.emit("error", er) : state.objectMode || chunk && chunk.length > 0 ? ("string" == typeof chunk || state.objectMode || Object.getPrototypeOf(chunk) === Buffer.prototype || (chunk = _uint8ArrayToBuffer(chunk)), 
                    addToFront ? state.endEmitted ? stream.emit("error", new Error("stream.unshift() after end event")) : addChunk(stream, state, chunk, !0) : state.ended ? stream.emit("error", new Error("stream.push() after EOF")) : (state.reading = !1, 
                    state.decoder && !encoding ? (chunk = state.decoder.write(chunk), state.objectMode || 0 !== chunk.length ? addChunk(stream, state, chunk, !1) : maybeReadMore(stream, state)) : addChunk(stream, state, chunk, !1))) : addToFront || (state.reading = !1);
                }
                return needMoreData(state);
            }
            function addChunk(stream, state, chunk, addToFront) {
                state.flowing && 0 === state.length && !state.sync ? (stream.emit("data", chunk), 
                stream.read(0)) : (state.length += state.objectMode ? 1 : chunk.length, addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), 
                state.needReadable && emitReadable(stream)), maybeReadMore(stream, state);
            }
            function chunkInvalid(state, chunk) {
                var er;
                return _isUint8Array(chunk) || "string" == typeof chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk")), 
                er;
            }
            function needMoreData(state) {
                return !state.ended && (state.needReadable || state.length < state.highWaterMark || 0 === state.length);
            }
            function computeNewHighWaterMark(n) {
                return n >= MAX_HWM ? n = MAX_HWM : (n--, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, 
                n |= n >>> 8, n |= n >>> 16, n++), n;
            }
            function howMuchToRead(n, state) {
                return n <= 0 || 0 === state.length && state.ended ? 0 : state.objectMode ? 1 : n !== n ? state.flowing && state.length ? state.buffer.head.data.length : state.length : (n > state.highWaterMark && (state.highWaterMark = computeNewHighWaterMark(n)), 
                n <= state.length ? n : state.ended ? state.length : (state.needReadable = !0, 0));
            }
            function onEofChunk(stream, state) {
                if (!state.ended) {
                    if (state.decoder) {
                        var chunk = state.decoder.end();
                        chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
                    }
                    state.ended = !0, emitReadable(stream);
                }
            }
            function emitReadable(stream) {
                var state = stream._readableState;
                state.needReadable = !1, state.emittedReadable || (debug("emitReadable", state.flowing), 
                state.emittedReadable = !0, state.sync ? processNextTick(emitReadable_, stream) : emitReadable_(stream));
            }
            function emitReadable_(stream) {
                debug("emit readable"), stream.emit("readable"), flow(stream);
            }
            function maybeReadMore(stream, state) {
                state.readingMore || (state.readingMore = !0, processNextTick(maybeReadMore_, stream, state));
            }
            function maybeReadMore_(stream, state) {
                for (var len = state.length; !state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark && (debug("maybeReadMore read 0"), 
                stream.read(0), len !== state.length); ) len = state.length;
                state.readingMore = !1;
            }
            function pipeOnDrain(src) {
                return function() {
                    var state = src._readableState;
                    debug("pipeOnDrain", state.awaitDrain), state.awaitDrain && state.awaitDrain--, 
                    0 === state.awaitDrain && EElistenerCount(src, "data") && (state.flowing = !0, flow(src));
                };
            }
            function nReadingNextTick(self) {
                debug("readable nexttick read 0"), self.read(0);
            }
            function resume(stream, state) {
                state.resumeScheduled || (state.resumeScheduled = !0, processNextTick(resume_, stream, state));
            }
            function resume_(stream, state) {
                state.reading || (debug("resume read 0"), stream.read(0)), state.resumeScheduled = !1, 
                state.awaitDrain = 0, stream.emit("resume"), flow(stream), state.flowing && !state.reading && stream.read(0);
            }
            function flow(stream) {
                var state = stream._readableState;
                for (debug("flow", state.flowing); state.flowing && null !== stream.read(); ) ;
            }
            function fromList(n, state) {
                if (0 === state.length) return null;
                var ret;
                return state.objectMode ? ret = state.buffer.shift() : !n || n >= state.length ? (ret = state.decoder ? state.buffer.join("") : 1 === state.buffer.length ? state.buffer.head.data : state.buffer.concat(state.length), 
                state.buffer.clear()) : ret = fromListPartial(n, state.buffer, state.decoder), ret;
            }
            function fromListPartial(n, list, hasStrings) {
                var ret;
                return n < list.head.data.length ? (ret = list.head.data.slice(0, n), list.head.data = list.head.data.slice(n)) : ret = n === list.head.data.length ? list.shift() : hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list), 
                ret;
            }
            function copyFromBufferString(n, list) {
                var p = list.head, c = 1, ret = p.data;
                for (n -= ret.length; p = p.next; ) {
                    var str = p.data, nb = n > str.length ? str.length : n;
                    if (nb === str.length ? ret += str : ret += str.slice(0, n), 0 === (n -= nb)) {
                        nb === str.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, 
                        p.data = str.slice(nb));
                        break;
                    }
                    ++c;
                }
                return list.length -= c, ret;
            }
            function copyFromBuffer(n, list) {
                var ret = Buffer.allocUnsafe(n), p = list.head, c = 1;
                for (p.data.copy(ret), n -= p.data.length; p = p.next; ) {
                    var buf = p.data, nb = n > buf.length ? buf.length : n;
                    if (buf.copy(ret, ret.length - n, 0, nb), 0 === (n -= nb)) {
                        nb === buf.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, 
                        p.data = buf.slice(nb));
                        break;
                    }
                    ++c;
                }
                return list.length -= c, ret;
            }
            function endReadable(stream) {
                var state = stream._readableState;
                if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                state.endEmitted || (state.ended = !0, processNextTick(endReadableNT, state, stream));
            }
            function endReadableNT(state, stream) {
                state.endEmitted || 0 !== state.length || (state.endEmitted = !0, stream.readable = !1, 
                stream.emit("end"));
            }
            function indexOf(xs, x) {
                for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
                return -1;
            }
            var processNextTick = __webpack_require__(16);
            module.exports = Readable;
            var Duplex, isArray = __webpack_require__(22);
            Readable.ReadableState = ReadableState;
            var EElistenerCount = (__webpack_require__(21).EventEmitter, function(emitter, type) {
                return emitter.listeners(type).length;
            }), Stream = __webpack_require__(29), Buffer = __webpack_require__(13).Buffer, OurUint8Array = global.Uint8Array || function() {}, util = __webpack_require__(10);
            util.inherits = __webpack_require__(7);
            var debugUtil = __webpack_require__(67), debug = void 0;
            debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
            var StringDecoder, BufferList = __webpack_require__(45), destroyImpl = __webpack_require__(28);
            util.inherits(Readable, Stream);
            var kProxyEvents = [ "error", "close", "destroy", "pause", "resume" ];
            Object.defineProperty(Readable.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && this._readableState.destroyed;
                },
                set: function(value) {
                    this._readableState && (this._readableState.destroyed = value);
                }
            }), Readable.prototype.destroy = destroyImpl.destroy, Readable.prototype._undestroy = destroyImpl.undestroy, 
            Readable.prototype._destroy = function(err, cb) {
                this.push(null), cb(err);
            }, Readable.prototype.push = function(chunk, encoding) {
                var skipChunkCheck, state = this._readableState;
                return state.objectMode ? skipChunkCheck = !0 : "string" == typeof chunk && (encoding = encoding || state.defaultEncoding, 
                encoding !== state.encoding && (chunk = Buffer.from(chunk, encoding), encoding = ""), 
                skipChunkCheck = !0), readableAddChunk(this, chunk, encoding, !1, skipChunkCheck);
            }, Readable.prototype.unshift = function(chunk) {
                return readableAddChunk(this, chunk, null, !0, !1);
            }, Readable.prototype.isPaused = function() {
                return !1 === this._readableState.flowing;
            }, Readable.prototype.setEncoding = function(enc) {
                return StringDecoder || (StringDecoder = __webpack_require__(24).StringDecoder), 
                this._readableState.decoder = new StringDecoder(enc), this._readableState.encoding = enc, 
                this;
            };
            var MAX_HWM = 8388608;
            Readable.prototype.read = function(n) {
                debug("read", n), n = parseInt(n, 10);
                var state = this._readableState, nOrig = n;
                if (0 !== n && (state.emittedReadable = !1), 0 === n && state.needReadable && (state.length >= state.highWaterMark || state.ended)) return debug("read: emitReadable", state.length, state.ended), 
                0 === state.length && state.ended ? endReadable(this) : emitReadable(this), null;
                if (0 === (n = howMuchToRead(n, state)) && state.ended) return 0 === state.length && endReadable(this), 
                null;
                var doRead = state.needReadable;
                debug("need readable", doRead), (0 === state.length || state.length - n < state.highWaterMark) && (doRead = !0, 
                debug("length less than watermark", doRead)), state.ended || state.reading ? (doRead = !1, 
                debug("reading or ended", doRead)) : doRead && (debug("do read"), state.reading = !0, 
                state.sync = !0, 0 === state.length && (state.needReadable = !0), this._read(state.highWaterMark), 
                state.sync = !1, state.reading || (n = howMuchToRead(nOrig, state)));
                var ret;
                return ret = n > 0 ? fromList(n, state) : null, null === ret ? (state.needReadable = !0, 
                n = 0) : state.length -= n, 0 === state.length && (state.ended || (state.needReadable = !0), 
                nOrig !== n && state.ended && endReadable(this)), null !== ret && this.emit("data", ret), 
                ret;
            }, Readable.prototype._read = function(n) {
                this.emit("error", new Error("_read() is not implemented"));
            }, Readable.prototype.pipe = function(dest, pipeOpts) {
                function onunpipe(readable, unpipeInfo) {
                    debug("onunpipe"), readable === src && unpipeInfo && !1 === unpipeInfo.hasUnpiped && (unpipeInfo.hasUnpiped = !0, 
                    cleanup());
                }
                function onend() {
                    debug("onend"), dest.end();
                }
                function cleanup() {
                    debug("cleanup"), dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), 
                    dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), 
                    src.removeListener("end", onend), src.removeListener("end", unpipe), src.removeListener("data", ondata), 
                    cleanedUp = !0, !state.awaitDrain || dest._writableState && !dest._writableState.needDrain || ondrain();
                }
                function ondata(chunk) {
                    debug("ondata"), increasedAwaitDrain = !1, !1 !== dest.write(chunk) || increasedAwaitDrain || ((1 === state.pipesCount && state.pipes === dest || state.pipesCount > 1 && -1 !== indexOf(state.pipes, dest)) && !cleanedUp && (debug("false write response, pause", src._readableState.awaitDrain), 
                    src._readableState.awaitDrain++, increasedAwaitDrain = !0), src.pause());
                }
                function onerror(er) {
                    debug("onerror", er), unpipe(), dest.removeListener("error", onerror), 0 === EElistenerCount(dest, "error") && dest.emit("error", er);
                }
                function onclose() {
                    dest.removeListener("finish", onfinish), unpipe();
                }
                function onfinish() {
                    debug("onfinish"), dest.removeListener("close", onclose), unpipe();
                }
                function unpipe() {
                    debug("unpipe"), src.unpipe(dest);
                }
                var src = this, state = this._readableState;
                switch (state.pipesCount) {
                  case 0:
                    state.pipes = dest;
                    break;

                  case 1:
                    state.pipes = [ state.pipes, dest ];
                    break;

                  default:
                    state.pipes.push(dest);
                }
                state.pipesCount += 1, debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
                var doEnd = (!pipeOpts || !1 !== pipeOpts.end) && dest !== process.stdout && dest !== process.stderr, endFn = doEnd ? onend : unpipe;
                state.endEmitted ? processNextTick(endFn) : src.once("end", endFn), dest.on("unpipe", onunpipe);
                var ondrain = pipeOnDrain(src);
                dest.on("drain", ondrain);
                var cleanedUp = !1, increasedAwaitDrain = !1;
                return src.on("data", ondata), prependListener(dest, "error", onerror), dest.once("close", onclose), 
                dest.once("finish", onfinish), dest.emit("pipe", src), state.flowing || (debug("pipe resume"), 
                src.resume()), dest;
            }, Readable.prototype.unpipe = function(dest) {
                var state = this._readableState, unpipeInfo = {
                    hasUnpiped: !1
                };
                if (0 === state.pipesCount) return this;
                if (1 === state.pipesCount) return dest && dest !== state.pipes ? this : (dest || (dest = state.pipes), 
                state.pipes = null, state.pipesCount = 0, state.flowing = !1, dest && dest.emit("unpipe", this, unpipeInfo), 
                this);
                if (!dest) {
                    var dests = state.pipes, len = state.pipesCount;
                    state.pipes = null, state.pipesCount = 0, state.flowing = !1;
                    for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, unpipeInfo);
                    return this;
                }
                var index = indexOf(state.pipes, dest);
                return -1 === index ? this : (state.pipes.splice(index, 1), state.pipesCount -= 1, 
                1 === state.pipesCount && (state.pipes = state.pipes[0]), dest.emit("unpipe", this, unpipeInfo), 
                this);
            }, Readable.prototype.on = function(ev, fn) {
                var res = Stream.prototype.on.call(this, ev, fn);
                if ("data" === ev) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === ev) {
                    var state = this._readableState;
                    state.endEmitted || state.readableListening || (state.readableListening = state.needReadable = !0, 
                    state.emittedReadable = !1, state.reading ? state.length && emitReadable(this) : processNextTick(nReadingNextTick, this));
                }
                return res;
            }, Readable.prototype.addListener = Readable.prototype.on, Readable.prototype.resume = function() {
                var state = this._readableState;
                return state.flowing || (debug("resume"), state.flowing = !0, resume(this, state)), 
                this;
            }, Readable.prototype.pause = function() {
                return debug("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (debug("pause"), 
                this._readableState.flowing = !1, this.emit("pause")), this;
            }, Readable.prototype.wrap = function(stream) {
                var state = this._readableState, paused = !1, self = this;
                stream.on("end", function() {
                    if (debug("wrapped end"), state.decoder && !state.ended) {
                        var chunk = state.decoder.end();
                        chunk && chunk.length && self.push(chunk);
                    }
                    self.push(null);
                }), stream.on("data", function(chunk) {
                    if (debug("wrapped data"), state.decoder && (chunk = state.decoder.write(chunk)), 
                    (!state.objectMode || null !== chunk && void 0 !== chunk) && (state.objectMode || chunk && chunk.length)) {
                        self.push(chunk) || (paused = !0, stream.pause());
                    }
                });
                for (var i in stream) void 0 === this[i] && "function" == typeof stream[i] && (this[i] = function(method) {
                    return function() {
                        return stream[method].apply(stream, arguments);
                    };
                }(i));
                for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
                return self._read = function(n) {
                    debug("wrapped _read", n), paused && (paused = !1, stream.resume());
                }, self;
            }, Readable._fromList = fromList;
        }).call(exports, __webpack_require__(4), __webpack_require__(12));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function TransformState(stream) {
            this.afterTransform = function(er, data) {
                return afterTransform(stream, er, data);
            }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, 
            this.writeencoding = null;
        }
        function afterTransform(stream, er, data) {
            var ts = stream._transformState;
            ts.transforming = !1;
            var cb = ts.writecb;
            if (!cb) return stream.emit("error", new Error("write callback called multiple times"));
            ts.writechunk = null, ts.writecb = null, null !== data && void 0 !== data && stream.push(data), 
            cb(er);
            var rs = stream._readableState;
            rs.reading = !1, (rs.needReadable || rs.length < rs.highWaterMark) && stream._read(rs.highWaterMark);
        }
        function Transform(options) {
            if (!(this instanceof Transform)) return new Transform(options);
            Duplex.call(this, options), this._transformState = new TransformState(this);
            var stream = this;
            this._readableState.needReadable = !0, this._readableState.sync = !1, options && ("function" == typeof options.transform && (this._transform = options.transform), 
            "function" == typeof options.flush && (this._flush = options.flush)), this.once("prefinish", function() {
                "function" == typeof this._flush ? this._flush(function(er, data) {
                    done(stream, er, data);
                }) : done(stream);
            });
        }
        function done(stream, er, data) {
            if (er) return stream.emit("error", er);
            null !== data && void 0 !== data && stream.push(data);
            var ws = stream._writableState, ts = stream._transformState;
            if (ws.length) throw new Error("Calling transform done when ws.length != 0");
            if (ts.transforming) throw new Error("Calling transform done when still transforming");
            return stream.push(null);
        }
        module.exports = Transform;
        var Duplex = __webpack_require__(3), util = __webpack_require__(10);
        util.inherits = __webpack_require__(7), util.inherits(Transform, Duplex), Transform.prototype.push = function(chunk, encoding) {
            return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, chunk, encoding);
        }, Transform.prototype._transform = function(chunk, encoding, cb) {
            throw new Error("_transform() is not implemented");
        }, Transform.prototype._write = function(chunk, encoding, cb) {
            var ts = this._transformState;
            if (ts.writecb = cb, ts.writechunk = chunk, ts.writeencoding = encoding, !ts.transforming) {
                var rs = this._readableState;
                (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
            }
        }, Transform.prototype._read = function(n) {
            var ts = this._transformState;
            null !== ts.writechunk && ts.writecb && !ts.transforming ? (ts.transforming = !0, 
            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)) : ts.needTransform = !0;
        }, Transform.prototype._destroy = function(err, cb) {
            var _this = this;
            Duplex.prototype._destroy.call(this, err, function(err2) {
                cb(err2), _this.emit("close");
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(process, setImmediate, global) {
            function CorkedRequest(state) {
                var _this = this;
                this.next = null, this.entry = null, this.finish = function() {
                    onCorkedFinish(_this, state);
                };
            }
            function _uint8ArrayToBuffer(chunk) {
                return Buffer.from(chunk);
            }
            function _isUint8Array(obj) {
                return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
            }
            function nop() {}
            function WritableState(options, stream) {
                Duplex = Duplex || __webpack_require__(3), options = options || {}, this.objectMode = !!options.objectMode, 
                stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.writableObjectMode);
                var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16384;
                this.highWaterMark = hwm || 0 === hwm ? hwm : defaultHwm, this.highWaterMark = Math.floor(this.highWaterMark), 
                this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, 
                this.destroyed = !1;
                var noDecode = !1 === options.decodeStrings;
                this.decodeStrings = !noDecode, this.defaultEncoding = options.defaultEncoding || "utf8", 
                this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, 
                this.onwrite = function(er) {
                    onwrite(stream, er);
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, 
                this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, 
                this.corkedRequestsFree = new CorkedRequest(this);
            }
            function Writable(options) {
                if (Duplex = Duplex || __webpack_require__(3), !(realHasInstance.call(Writable, this) || this instanceof Duplex)) return new Writable(options);
                this._writableState = new WritableState(options, this), this.writable = !0, options && ("function" == typeof options.write && (this._write = options.write), 
                "function" == typeof options.writev && (this._writev = options.writev), "function" == typeof options.destroy && (this._destroy = options.destroy), 
                "function" == typeof options.final && (this._final = options.final)), Stream.call(this);
            }
            function writeAfterEnd(stream, cb) {
                var er = new Error("write after end");
                stream.emit("error", er), processNextTick(cb, er);
            }
            function validChunk(stream, state, chunk, cb) {
                var valid = !0, er = !1;
                return null === chunk ? er = new TypeError("May not write null values to stream") : "string" == typeof chunk || void 0 === chunk || state.objectMode || (er = new TypeError("Invalid non-string/buffer chunk")), 
                er && (stream.emit("error", er), processNextTick(cb, er), valid = !1), valid;
            }
            function decodeChunk(state, chunk, encoding) {
                return state.objectMode || !1 === state.decodeStrings || "string" != typeof chunk || (chunk = Buffer.from(chunk, encoding)), 
                chunk;
            }
            function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
                if (!isBuf) {
                    var newChunk = decodeChunk(state, chunk, encoding);
                    chunk !== newChunk && (isBuf = !0, encoding = "buffer", chunk = newChunk);
                }
                var len = state.objectMode ? 1 : chunk.length;
                state.length += len;
                var ret = state.length < state.highWaterMark;
                if (ret || (state.needDrain = !0), state.writing || state.corked) {
                    var last = state.lastBufferedRequest;
                    state.lastBufferedRequest = {
                        chunk: chunk,
                        encoding: encoding,
                        isBuf: isBuf,
                        callback: cb,
                        next: null
                    }, last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest, 
                    state.bufferedRequestCount += 1;
                } else doWrite(stream, state, !1, len, chunk, encoding, cb);
                return ret;
            }
            function doWrite(stream, state, writev, len, chunk, encoding, cb) {
                state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite), 
                state.sync = !1;
            }
            function onwriteError(stream, state, sync, er, cb) {
                --state.pendingcb, sync ? (processNextTick(cb, er), processNextTick(finishMaybe, stream, state), 
                stream._writableState.errorEmitted = !0, stream.emit("error", er)) : (cb(er), stream._writableState.errorEmitted = !0, 
                stream.emit("error", er), finishMaybe(stream, state));
            }
            function onwriteStateUpdate(state) {
                state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
            }
            function onwrite(stream, er) {
                var state = stream._writableState, sync = state.sync, cb = state.writecb;
                if (onwriteStateUpdate(state), er) onwriteError(stream, state, sync, er, cb); else {
                    var finished = needFinish(state);
                    finished || state.corked || state.bufferProcessing || !state.bufferedRequest || clearBuffer(stream, state), 
                    sync ? asyncWrite(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
                }
            }
            function afterWrite(stream, state, finished, cb) {
                finished || onwriteDrain(stream, state), state.pendingcb--, cb(), finishMaybe(stream, state);
            }
            function onwriteDrain(stream, state) {
                0 === state.length && state.needDrain && (state.needDrain = !1, stream.emit("drain"));
            }
            function clearBuffer(stream, state) {
                state.bufferProcessing = !0;
                var entry = state.bufferedRequest;
                if (stream._writev && entry && entry.next) {
                    var l = state.bufferedRequestCount, buffer = new Array(l), holder = state.corkedRequestsFree;
                    holder.entry = entry;
                    for (var count = 0, allBuffers = !0; entry; ) buffer[count] = entry, entry.isBuf || (allBuffers = !1), 
                    entry = entry.next, count += 1;
                    buffer.allBuffers = allBuffers, doWrite(stream, state, !0, state.length, buffer, "", holder.finish), 
                    state.pendingcb++, state.lastBufferedRequest = null, holder.next ? (state.corkedRequestsFree = holder.next, 
                    holder.next = null) : state.corkedRequestsFree = new CorkedRequest(state);
                } else {
                    for (;entry; ) {
                        var chunk = entry.chunk, encoding = entry.encoding, cb = entry.callback;
                        if (doWrite(stream, state, !1, state.objectMode ? 1 : chunk.length, chunk, encoding, cb), 
                        entry = entry.next, state.writing) break;
                    }
                    null === entry && (state.lastBufferedRequest = null);
                }
                state.bufferedRequestCount = 0, state.bufferedRequest = entry, state.bufferProcessing = !1;
            }
            function needFinish(state) {
                return state.ending && 0 === state.length && null === state.bufferedRequest && !state.finished && !state.writing;
            }
            function callFinal(stream, state) {
                stream._final(function(err) {
                    state.pendingcb--, err && stream.emit("error", err), state.prefinished = !0, stream.emit("prefinish"), 
                    finishMaybe(stream, state);
                });
            }
            function prefinish(stream, state) {
                state.prefinished || state.finalCalled || ("function" == typeof stream._final ? (state.pendingcb++, 
                state.finalCalled = !0, processNextTick(callFinal, stream, state)) : (state.prefinished = !0, 
                stream.emit("prefinish")));
            }
            function finishMaybe(stream, state) {
                var need = needFinish(state);
                return need && (prefinish(stream, state), 0 === state.pendingcb && (state.finished = !0, 
                stream.emit("finish"))), need;
            }
            function endWritable(stream, state, cb) {
                state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? processNextTick(cb) : stream.once("finish", cb)), 
                state.ended = !0, stream.writable = !1;
            }
            function onCorkedFinish(corkReq, state, err) {
                var entry = corkReq.entry;
                for (corkReq.entry = null; entry; ) {
                    var cb = entry.callback;
                    state.pendingcb--, cb(err), entry = entry.next;
                }
                state.corkedRequestsFree ? state.corkedRequestsFree.next = corkReq : state.corkedRequestsFree = corkReq;
            }
            var processNextTick = __webpack_require__(16);
            module.exports = Writable;
            var Duplex, asyncWrite = !process.browser && [ "v0.10", "v0.9." ].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
            Writable.WritableState = WritableState;
            var util = __webpack_require__(10);
            util.inherits = __webpack_require__(7);
            var internalUtil = {
                deprecate: __webpack_require__(49)
            }, Stream = __webpack_require__(29), Buffer = __webpack_require__(13).Buffer, OurUint8Array = global.Uint8Array || function() {}, destroyImpl = __webpack_require__(28);
            util.inherits(Writable, Stream), WritableState.prototype.getBuffer = function() {
                for (var current = this.bufferedRequest, out = []; current; ) out.push(current), 
                current = current.next;
                return out;
            }, function() {
                try {
                    Object.defineProperty(WritableState.prototype, "buffer", {
                        get: internalUtil.deprecate(function() {
                            return this.getBuffer();
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    });
                } catch (_) {}
            }();
            var realHasInstance;
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (realHasInstance = Function.prototype[Symbol.hasInstance], 
            Object.defineProperty(Writable, Symbol.hasInstance, {
                value: function(object) {
                    return !!realHasInstance.call(this, object) || object && object._writableState instanceof WritableState;
                }
            })) : realHasInstance = function(object) {
                return object instanceof this;
            }, Writable.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"));
            }, Writable.prototype.write = function(chunk, encoding, cb) {
                var state = this._writableState, ret = !1, isBuf = _isUint8Array(chunk) && !state.objectMode;
                return isBuf && !Buffer.isBuffer(chunk) && (chunk = _uint8ArrayToBuffer(chunk)), 
                "function" == typeof encoding && (cb = encoding, encoding = null), isBuf ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding), 
                "function" != typeof cb && (cb = nop), state.ended ? writeAfterEnd(this, cb) : (isBuf || validChunk(this, state, chunk, cb)) && (state.pendingcb++, 
                ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb)), ret;
            }, Writable.prototype.cork = function() {
                this._writableState.corked++;
            }, Writable.prototype.uncork = function() {
                var state = this._writableState;
                state.corked && (state.corked--, state.writing || state.corked || state.finished || state.bufferProcessing || !state.bufferedRequest || clearBuffer(this, state));
            }, Writable.prototype.setDefaultEncoding = function(encoding) {
                if ("string" == typeof encoding && (encoding = encoding.toLowerCase()), !([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
                return this._writableState.defaultEncoding = encoding, this;
            }, Writable.prototype._write = function(chunk, encoding, cb) {
                cb(new Error("_write() is not implemented"));
            }, Writable.prototype._writev = null, Writable.prototype.end = function(chunk, encoding, cb) {
                var state = this._writableState;
                "function" == typeof chunk ? (cb = chunk, chunk = null, encoding = null) : "function" == typeof encoding && (cb = encoding, 
                encoding = null), null !== chunk && void 0 !== chunk && this.write(chunk, encoding), 
                state.corked && (state.corked = 1, this.uncork()), state.ending || state.finished || endWritable(this, state, cb);
            }, Object.defineProperty(Writable.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._writableState && this._writableState.destroyed;
                },
                set: function(value) {
                    this._writableState && (this._writableState.destroyed = value);
                }
            }), Writable.prototype.destroy = destroyImpl.destroy, Writable.prototype._undestroy = destroyImpl.undestroy, 
            Writable.prototype._destroy = function(err, cb) {
                this.end(), cb(err);
            };
        }).call(exports, __webpack_require__(12), __webpack_require__(48).setImmediate, __webpack_require__(4));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function destroy(err, cb) {
            var _this = this, readableDestroyed = this._readableState && this._readableState.destroyed, writableDestroyed = this._writableState && this._writableState.destroyed;
            if (readableDestroyed || writableDestroyed) return void (cb ? cb(err) : !err || this._writableState && this._writableState.errorEmitted || processNextTick(emitErrorNT, this, err));
            this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), 
            this._destroy(err || null, function(err) {
                !cb && err ? (processNextTick(emitErrorNT, _this, err), _this._writableState && (_this._writableState.errorEmitted = !0)) : cb && cb(err);
            });
        }
        function undestroy() {
            this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, 
            this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, 
            this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, 
            this._writableState.errorEmitted = !1);
        }
        function emitErrorNT(self, err) {
            self.emit("error", err);
        }
        var processNextTick = __webpack_require__(16);
        module.exports = {
            destroy: destroy,
            undestroy: undestroy
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(21).EventEmitter;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CONSTANTS;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return POST_MESSAGE_NAMES_LIST;
        });
        var CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack"
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error"
            },
            POST_MESSAGE_NAMES: {
                METHOD: "postrobot_method",
                READY: "postrobot_ready",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe"
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__"
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method",
                ERROR: "postrobot_error",
                PROMISE: "postrobot_promise",
                ZALGO_PROMISE: "postrobot_zalgo_promise",
                REGEX: "regex"
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global"
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*"
        }, POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function addResponseListener(hash, listener) {
            __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash] = listener;
        }
        function getResponseListener(hash) {
            return __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners[hash];
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            if (win === __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD && (win = null), domain === __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            var nameListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners[name];
            if (nameListeners) for (var _arr = [ win, __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                if (winListeners) {
                    if (domain && "string" == typeof domain) {
                        if (winListeners[domain]) return winListeners[domain];
                        if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray) {
                                if (_i2 >= _iterator.length) break;
                                _ref3 = _iterator[_i2++];
                            } else {
                                if (_i2 = _iterator.next(), _i2.done) break;
                                _ref3 = _i2.value;
                            }
                            var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.b)(regex, domain)) return listener;
                        }
                    }
                    if (winListeners[__WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD]) return winListeners[__WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD];
                }
            }
        }
        function addRequestListener(_ref5, listener) {
            var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
            if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
            if (Array.isArray(win)) {
                for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray2) {
                        if (_i3 >= _iterator2.length) break;
                        _ref6 = _iterator2[_i3++];
                    } else {
                        if (_i3 = _iterator2.next(), _i3.done) break;
                        _ref6 = _i3.value;
                    }
                    var item = _ref6;
                    listenersCollection.push(addRequestListener({
                        name: name,
                        domain: domain,
                        win: item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref7;
                            if (_isArray3) {
                                if (_i4 >= _iterator3.length) break;
                                _ref7 = _iterator3[_i4++];
                            } else {
                                if (_i4 = _iterator3.next(), _i4.done) break;
                                _ref7 = _i4.value;
                            }
                            _ref7.cancel();
                        }
                    }
                };
            }
            if (Array.isArray(domain)) {
                for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray4) {
                        if (_i5 >= _iterator4.length) break;
                        _ref8 = _iterator4[_i5++];
                    } else {
                        if (_i5 = _iterator4.next(), _i5.done) break;
                        _ref8 = _i5.value;
                    }
                    var _item = _ref8;
                    _listenersCollection.push(addRequestListener({
                        name: name,
                        win: win,
                        domain: _item
                    }, listener));
                }
                return {
                    cancel: function() {
                        for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                            var _ref9;
                            if (_isArray5) {
                                if (_i6 >= _iterator5.length) break;
                                _ref9 = _iterator5[_i6++];
                            } else {
                                if (_i6 = _iterator5.next(), _i6.done) break;
                                _ref9 = _i6.value;
                            }
                            _ref9.cancel();
                        }
                    }
                };
            }
            var existingListener = getRequestListener({
                name: name,
                win: win,
                domain: domain
            });
            if (win && win !== __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD || (win = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD), 
            domain = domain || __WEBPACK_IMPORTED_MODULE_5__conf__.b.WILDCARD, existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for specified window") : win ? new Error("Request listener already exists for " + name + " for specified window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
            var requestListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners, nameListeners = requestListeners[name];
            nameListeners || (nameListeners = new __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__.a(), 
            requestListeners[name] = nameListeners);
            var winListeners = nameListeners.get(win);
            winListeners || (winListeners = {}, nameListeners.set(win, winListeners));
            var strDomain = domain.toString(), regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__lib__.c)(domain) ? (regexListeners || (regexListeners = [], 
            winListeners[__DOMAIN_REGEX__] = regexListeners), regexListener = {
                regex: domain,
                listener: listener
            }, regexListeners.push(regexListener)) : winListeners[strDomain] = listener, {
                cancel: function() {
                    winListeners && (delete winListeners[strDomain], win && 0 === Object.keys(winListeners).length && nameListeners.delete(win), 
                    regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1)));
                }
            };
        }
        __webpack_exports__.e = addResponseListener, __webpack_exports__.a = getResponseListener, 
        __webpack_exports__.c = deleteResponseListener, __webpack_exports__.b = getRequestListener, 
        __webpack_exports__.d = addRequestListener;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = (__webpack_require__(2), 
        __webpack_require__(11)), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_4__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_5__conf__ = __webpack_require__(0);
        __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners || {}, 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners || {}, 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD || new function() {}();
        var __DOMAIN_REGEX__ = "__domain_regex__";
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function buildMessage(win, message) {
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.d)(), type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.e)(), sourceDomain = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.g)(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                message = buildMessage(win, message, {
                    data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.f)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                if (level = -1 !== __WEBPACK_IMPORTED_MODULE_2__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || __WEBPACK_IMPORTED_MODULE_2__conf__.b.WILDCARD, "\n\n", message ]), 
                win === window) throw new Error("Attemping to send message to self");
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.f)(win)) throw new Error("Window is closed");
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.debug("Running send message strategies", message);
                var messages = [], encoder = __WEBPACK_IMPORTED_MODULE_3__lib__.h;
                msgpack_support.get(win) && (encoder = msgpack_encode);
                var serializedMessage = encoder(_defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__conf__.b.WINDOW_PROPS.POSTROBOT, message), null, 2);
                return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.map(Object.keys(__WEBPACK_IMPORTED_MODULE_4__strategies__.a), function(strategyName) {
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        if (!__WEBPACK_IMPORTED_MODULE_2__conf__.a.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return __WEBPACK_IMPORTED_MODULE_4__strategies__.a[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        return messages.push(strategyName + ": success"), !0;
                    }, function(err) {
                        return messages.push(strategyName + ": " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err) + "\n"), 
                        !1;
                    });
                }).then(function(results) {
                    var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    if (__WEBPACK_IMPORTED_MODULE_3__lib__.g.debug(status), !success) throw new Error(status);
                });
            });
        }
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return msgpack_support;
        }), __webpack_exports__.a = sendMessage;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_4__strategies__ = __webpack_require__(59), __WEBPACK_IMPORTED_MODULE_5_msgpack5__ = __webpack_require__(23), _extends = (__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_msgpack5__), 
        Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }), msgpack5 = __WEBPACK_IMPORTED_MODULE_5_msgpack5__(), msgpack_encode = function(a) {
            return msgpack5.encode(a);
        }, msgpack_support = new (WeakMap || Map)();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            function compare(a, b) {
                if (a === b) return 0;
                for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
                    x = a[i], y = b[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }
            function isBuffer(b) {
                return global.Buffer && "function" == typeof global.Buffer.isBuffer ? global.Buffer.isBuffer(b) : !(null == b || !b._isBuffer);
            }
            function pToString(obj) {
                return Object.prototype.toString.call(obj);
            }
            function isView(arrbuf) {
                return !isBuffer(arrbuf) && ("function" == typeof global.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(arrbuf) : !!arrbuf && (arrbuf instanceof DataView || !!(arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer))));
            }
            function getName(func) {
                if (util.isFunction(func)) {
                    if (functionsHaveNames) return func.name;
                    var str = func.toString(), match = str.match(regex);
                    return match && match[1];
                }
            }
            function truncate(s, n) {
                return "string" == typeof s ? s.length < n ? s : s.slice(0, n) : s;
            }
            function inspect(something) {
                if (functionsHaveNames || !util.isFunction(something)) return util.inspect(something);
                var rawname = getName(something);
                return "[Function" + (rawname ? ": " + rawname : "") + "]";
            }
            function getMessage(self) {
                return truncate(inspect(self.actual), 128) + " " + self.operator + " " + truncate(inspect(self.expected), 128);
            }
            function fail(actual, expected, message, operator, stackStartFunction) {
                throw new assert.AssertionError({
                    message: message,
                    actual: actual,
                    expected: expected,
                    operator: operator,
                    stackStartFunction: stackStartFunction
                });
            }
            function ok(value, message) {
                value || fail(value, !0, message, "==", assert.ok);
            }
            function _deepEqual(actual, expected, strict, memos) {
                if (actual === expected) return !0;
                if (isBuffer(actual) && isBuffer(expected)) return 0 === compare(actual, expected);
                if (util.isDate(actual) && util.isDate(expected)) return actual.getTime() === expected.getTime();
                if (util.isRegExp(actual) && util.isRegExp(expected)) return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
                if (null !== actual && "object" === (void 0 === actual ? "undefined" : _typeof(actual)) || null !== expected && "object" === (void 0 === expected ? "undefined" : _typeof(expected))) {
                    if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) return 0 === compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer));
                    if (isBuffer(actual) !== isBuffer(expected)) return !1;
                    memos = memos || {
                        actual: [],
                        expected: []
                    };
                    var actualIndex = memos.actual.indexOf(actual);
                    return -1 !== actualIndex && actualIndex === memos.expected.indexOf(expected) || (memos.actual.push(actual), 
                    memos.expected.push(expected), objEquiv(actual, expected, strict, memos));
                }
                return strict ? actual === expected : actual == expected;
            }
            function isArguments(object) {
                return "[object Arguments]" == Object.prototype.toString.call(object);
            }
            function objEquiv(a, b, strict, actualVisitedObjects) {
                if (null === a || void 0 === a || null === b || void 0 === b) return !1;
                if (util.isPrimitive(a) || util.isPrimitive(b)) return a === b;
                if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return !1;
                var aIsArgs = isArguments(a), bIsArgs = isArguments(b);
                if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return !1;
                if (aIsArgs) return a = pSlice.call(a), b = pSlice.call(b), _deepEqual(a, b, strict);
                var key, i, ka = objectKeys(a), kb = objectKeys(b);
                if (ka.length !== kb.length) return !1;
                for (ka.sort(), kb.sort(), i = ka.length - 1; i >= 0; i--) if (ka[i] !== kb[i]) return !1;
                for (i = ka.length - 1; i >= 0; i--) if (key = ka[i], !_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return !1;
                return !0;
            }
            function notDeepStrictEqual(actual, expected, message) {
                _deepEqual(actual, expected, !0) && fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual);
            }
            function expectedException(actual, expected) {
                if (!actual || !expected) return !1;
                if ("[object RegExp]" == Object.prototype.toString.call(expected)) return expected.test(actual);
                try {
                    if (actual instanceof expected) return !0;
                } catch (e) {}
                return !Error.isPrototypeOf(expected) && !0 === expected.call({}, actual);
            }
            function _tryBlock(block) {
                var error;
                try {
                    block();
                } catch (e) {
                    error = e;
                }
                return error;
            }
            function _throws(shouldThrow, block, expected, message) {
                var actual;
                if ("function" != typeof block) throw new TypeError('"block" argument must be a function');
                "string" == typeof expected && (message = expected, expected = null), actual = _tryBlock(block), 
                message = (expected && expected.name ? " (" + expected.name + ")." : ".") + (message ? " " + message : "."), 
                shouldThrow && !actual && fail(actual, expected, "Missing expected exception" + message);
                var userProvidedMessage = "string" == typeof message, isUnwantedException = !shouldThrow && util.isError(actual), isUnexpectedException = !shouldThrow && actual && !expected;
                if ((isUnwantedException && userProvidedMessage && expectedException(actual, expected) || isUnexpectedException) && fail(actual, expected, "Got unwanted exception" + message), 
                shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) throw actual;
            }
            /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, util = __webpack_require__(18), hasOwn = Object.prototype.hasOwnProperty, pSlice = Array.prototype.slice, functionsHaveNames = function() {
                return "foo" === function() {}.name;
            }(), assert = module.exports = ok, regex = /\s*function\s+([^\(\s]*)\s*/;
            assert.AssertionError = function(options) {
                this.name = "AssertionError", this.actual = options.actual, this.expected = options.expected, 
                this.operator = options.operator, options.message ? (this.message = options.message, 
                this.generatedMessage = !1) : (this.message = getMessage(this), this.generatedMessage = !0);
                var stackStartFunction = options.stackStartFunction || fail;
                if (Error.captureStackTrace) Error.captureStackTrace(this, stackStartFunction); else {
                    var err = new Error();
                    if (err.stack) {
                        var out = err.stack, fn_name = getName(stackStartFunction), idx = out.indexOf("\n" + fn_name);
                        if (idx >= 0) {
                            var next_line = out.indexOf("\n", idx + 1);
                            out = out.substring(next_line + 1);
                        }
                        this.stack = out;
                    }
                }
            }, util.inherits(assert.AssertionError, Error), assert.fail = fail, assert.ok = ok, 
            assert.equal = function(actual, expected, message) {
                actual != expected && fail(actual, expected, message, "==", assert.equal);
            }, assert.notEqual = function(actual, expected, message) {
                actual == expected && fail(actual, expected, message, "!=", assert.notEqual);
            }, assert.deepEqual = function(actual, expected, message) {
                _deepEqual(actual, expected, !1) || fail(actual, expected, message, "deepEqual", assert.deepEqual);
            }, assert.deepStrictEqual = function(actual, expected, message) {
                _deepEqual(actual, expected, !0) || fail(actual, expected, message, "deepStrictEqual", assert.deepStrictEqual);
            }, assert.notDeepEqual = function(actual, expected, message) {
                _deepEqual(actual, expected, !1) && fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
            }, assert.notDeepStrictEqual = notDeepStrictEqual, assert.strictEqual = function(actual, expected, message) {
                actual !== expected && fail(actual, expected, message, "===", assert.strictEqual);
            }, assert.notStrictEqual = function(actual, expected, message) {
                actual === expected && fail(actual, expected, message, "!==", assert.notStrictEqual);
            }, assert.throws = function(block, error, message) {
                _throws(!0, block, error, message);
            }, assert.doesNotThrow = function(block, error, message) {
                _throws(!1, block, error, message);
            }, assert.ifError = function(err) {
                if (err) throw err;
            };
            var objectKeys = Object.keys || function(obj) {
                var keys = [];
                for (var key in obj) hasOwn.call(obj, key) && keys.push(key);
                return keys;
            };
        }).call(exports, __webpack_require__(4));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function placeHoldersCount(b64) {
            var len = b64.length;
            if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
        }
        function byteLength(b64) {
            return 3 * b64.length / 4 - placeHoldersCount(b64);
        }
        function toByteArray(b64) {
            var i, l, tmp, placeHolders, arr, len = b64.length;
            placeHolders = placeHoldersCount(b64), arr = new Arr(3 * len / 4 - placeHolders), 
            l = placeHolders > 0 ? len - 4 : len;
            var L = 0;
            for (i = 0; i < l; i += 4) tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], 
            arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp;
            return 2 === placeHolders ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, 
            arr[L++] = 255 & tmp) : 1 === placeHolders && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, 
            arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp), arr;
        }
        function tripletToBase64(num) {
            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
        }
        function encodeChunk(uint8, start, end) {
            for (var tmp, output = [], i = start; i < end; i += 3) tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], 
            output.push(tripletToBase64(tmp));
            return output.join("");
        }
        function fromByteArray(uint8) {
            for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], i = 0, len2 = len - extraBytes; i < len2; i += 16383) parts.push(encodeChunk(uint8, i, i + 16383 > len2 ? len2 : i + 16383));
            return 1 === extraBytes ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], 
            output += "==") : 2 === extraBytes && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], 
            output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], 
            output += "="), parts.push(output), parts.join("");
        }
        exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
        for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], 
        revLookup[code.charCodeAt(i)] = i;
        revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function hasNativeWeakMap() {
            if (!window.WeakMap) return !1;
            if (!window.Object.freeze) return !1;
            try {
                var testWeakMap = new window.WeakMap(), testKey = {};
                return window.Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), 
                "__testvalue__" === testWeakMap.get(testKey);
            } catch (err) {
                return !1;
            }
        }
        __webpack_exports__.a = hasNativeWeakMap;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        function noop() {}
        __webpack_exports__.b = safeIndexOf, __webpack_exports__.a = noop;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CrossDomainSafeWeakMap;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__native__ = __webpack_require__(35), __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(36), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), defineProperty = Object.defineProperty, counter = Date.now() % 1e9, CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                if (_classCallCheck(this, CrossDomainSafeWeakMap), counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__native__.a)()) try {
                    this.weakmap = new window.WeakMap();
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            return _createClass(CrossDomainSafeWeakMap, [ {
                key: "_cleanupClosedWindows",
                value: function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(value) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.f)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                        }
                    }
                }
            }, {
                key: "isSafeToReadWrite",
                value: function(key) {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(key)) return !1;
                    try {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.a)(key && key.self), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.a)(key && key[this.name]);
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                }
            }, {
                key: "set",
                value: function(key, value) {
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
                        var keys = this.keys, values = this.values, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
                    }
                }
            }, {
                key: "get",
                value: function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        if (-1 === index) return;
                        return this.values[index];
                    }
                    var entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                }
            }, {
                key: "delete",
                value: function(key) {
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
                        var keys = this.keys, index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(keys, key);
                        -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
                    }
                }
            }, {
                key: "has",
                value: function(key) {
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
                    return this._cleanupClosedWindows(), -1 !== __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__.b)(this.keys, key);
                }
            } ]), CrossDomainSafeWeakMap;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function noop() {}
        __webpack_exports__.b = isRegex, __webpack_exports__.a = noop;
    }, function(module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
            for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
            i += d, nBits -= 8) ;
            for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
            i += d, nBits -= 8) ;
            if (0 === e) e = 1 - eBias; else {
                if (e === eMax) return m ? NaN : 1 / 0 * (s ? -1 : 1);
                m += Math.pow(2, mLen), e -= eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }, exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
            for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, 
            e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
            c *= 2), value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, 
            c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
            e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
            i += d, m /= 256, mLen -= 8) ;
            for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
            e /= 256, eLen -= 8) ;
            buffer[offset + i - d] |= 128 * s;
        };
    }, function(module, exports, __webpack_require__) {
        function IncompleteBufferError(message) {
            Error.call(this), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), 
            this.name = this.constructor.name, this.message = message || "unable to decode";
        }
        var bl = __webpack_require__(14);
        __webpack_require__(18).inherits(IncompleteBufferError, Error), module.exports = function(decodingTypes) {
            function getSize(first) {
                switch (first) {
                  case 196:
                    return 2;

                  case 197:
                    return 3;

                  case 198:
                    return 5;

                  case 199:
                    return 3;

                  case 200:
                    return 4;

                  case 201:
                    return 6;

                  case 202:
                    return 5;

                  case 203:
                    return 9;

                  case 204:
                    return 2;

                  case 205:
                    return 3;

                  case 206:
                    return 5;

                  case 207:
                    return 9;

                  case 208:
                    return 2;

                  case 209:
                    return 3;

                  case 210:
                    return 5;

                  case 211:
                    return 9;

                  case 212:
                    return 3;

                  case 213:
                    return 4;

                  case 214:
                    return 6;

                  case 215:
                    return 10;

                  case 216:
                    return 18;

                  case 217:
                    return 2;

                  case 218:
                    return 3;

                  case 219:
                    return 5;

                  case 222:
                    return 3;

                  default:
                    return -1;
                }
            }
            function hasMinBufferSize(first, length) {
                var size = getSize(first);
                return !(-1 !== size && length < size);
            }
            function isValidDataSize(dataLength, bufLength, headerLength) {
                return bufLength >= headerLength + dataLength;
            }
            function buildDecodeResult(value, bytesConsumed) {
                return {
                    value: value,
                    bytesConsumed: bytesConsumed
                };
            }
            function decode(buf) {
                buf instanceof bl || (buf = bl().append(buf));
                var result = tryDecode(buf);
                if (result) return buf.consume(result.bytesConsumed), result.value;
                throw new IncompleteBufferError();
            }
            function tryDecode(buf, offset) {
                offset = void 0 === offset ? 0 : offset;
                var bufLength = buf.length - offset;
                if (bufLength <= 0) return null;
                var length, type, bytePos, first = buf.readUInt8(offset), result = 0;
                if (!hasMinBufferSize(first, bufLength)) return null;
                switch (first) {
                  case 192:
                    return buildDecodeResult(null, 1);

                  case 194:
                    return buildDecodeResult(!1, 1);

                  case 195:
                    return buildDecodeResult(!0, 1);

                  case 204:
                    return result = buf.readUInt8(offset + 1), buildDecodeResult(result, 2);

                  case 205:
                    return result = buf.readUInt16BE(offset + 1), buildDecodeResult(result, 3);

                  case 206:
                    return result = buf.readUInt32BE(offset + 1), buildDecodeResult(result, 5);

                  case 207:
                    for (bytePos = 7; bytePos >= 0; bytePos--) result += buf.readUInt8(offset + bytePos + 1) * Math.pow(2, 8 * (7 - bytePos));
                    return buildDecodeResult(result, 9);

                  case 208:
                    return result = buf.readInt8(offset + 1), buildDecodeResult(result, 2);

                  case 209:
                    return result = buf.readInt16BE(offset + 1), buildDecodeResult(result, 3);

                  case 210:
                    return result = buf.readInt32BE(offset + 1), buildDecodeResult(result, 5);

                  case 211:
                    return result = readInt64BE(buf.slice(offset + 1, offset + 9), 0), buildDecodeResult(result, 9);

                  case 202:
                    return result = buf.readFloatBE(offset + 1), buildDecodeResult(result, 5);

                  case 203:
                    return result = buf.readDoubleBE(offset + 1), buildDecodeResult(result, 9);

                  case 217:
                    return length = buf.readUInt8(offset + 1), isValidDataSize(length, bufLength, 2) ? (result = buf.toString("utf8", offset + 2, offset + 2 + length), 
                    buildDecodeResult(result, 2 + length)) : null;

                  case 218:
                    return length = buf.readUInt16BE(offset + 1), isValidDataSize(length, bufLength, 3) ? (result = buf.toString("utf8", offset + 3, offset + 3 + length), 
                    buildDecodeResult(result, 3 + length)) : null;

                  case 219:
                    return length = buf.readUInt32BE(offset + 1), isValidDataSize(length, bufLength, 5) ? (result = buf.toString("utf8", offset + 5, offset + 5 + length), 
                    buildDecodeResult(result, 5 + length)) : null;

                  case 196:
                    return length = buf.readUInt8(offset + 1), isValidDataSize(length, bufLength, 2) ? (result = buf.slice(offset + 2, offset + 2 + length), 
                    buildDecodeResult(result, 2 + length)) : null;

                  case 197:
                    return length = buf.readUInt16BE(offset + 1), isValidDataSize(length, bufLength, 3) ? (result = buf.slice(offset + 3, offset + 3 + length), 
                    buildDecodeResult(result, 3 + length)) : null;

                  case 198:
                    return length = buf.readUInt32BE(offset + 1), isValidDataSize(length, bufLength, 5) ? (result = buf.slice(offset + 5, offset + 5 + length), 
                    buildDecodeResult(result, 5 + length)) : null;

                  case 220:
                    return bufLength < 3 ? null : (length = buf.readUInt16BE(offset + 1), decodeArray(buf, offset, length, 3));

                  case 221:
                    return bufLength < 5 ? null : (length = buf.readUInt32BE(offset + 1), decodeArray(buf, offset, length, 5));

                  case 222:
                    return length = buf.readUInt16BE(offset + 1), decodeMap(buf, offset, length, 3);

                  case 223:
                    throw new Error("map too big to decode in JS");

                  case 212:
                    return decodeFixExt(buf, offset, 1);

                  case 213:
                    return decodeFixExt(buf, offset, 2);

                  case 214:
                    return decodeFixExt(buf, offset, 4);

                  case 215:
                    return decodeFixExt(buf, offset, 8);

                  case 216:
                    return decodeFixExt(buf, offset, 16);

                  case 199:
                    return length = buf.readUInt8(offset + 1), type = buf.readUInt8(offset + 2), isValidDataSize(length, bufLength, 3) ? decodeExt(buf, offset, type, length, 3) : null;

                  case 200:
                    return length = buf.readUInt16BE(offset + 1), type = buf.readUInt8(offset + 3), 
                    isValidDataSize(length, bufLength, 4) ? decodeExt(buf, offset, type, length, 4) : null;

                  case 201:
                    return length = buf.readUInt32BE(offset + 1), type = buf.readUInt8(offset + 5), 
                    isValidDataSize(length, bufLength, 6) ? decodeExt(buf, offset, type, length, 6) : null;
                }
                if (144 == (240 & first)) return length = 15 & first, decodeArray(buf, offset, length, 1);
                if (128 == (240 & first)) return length = 15 & first, decodeMap(buf, offset, length, 1);
                if (160 == (224 & first)) return length = 31 & first, isValidDataSize(length, bufLength, 1) ? (result = buf.toString("utf8", offset + 1, offset + length + 1), 
                buildDecodeResult(result, length + 1)) : null;
                if (first >= 224) return result = first - 256, buildDecodeResult(result, 1);
                if (first < 128) return buildDecodeResult(first, 1);
                throw new Error("not implemented yet");
            }
            function readInt64BE(buf, offset) {
                var negate = 128 == (128 & buf[offset]);
                if (negate) for (var carry = 1, i = offset + 7; i >= offset; i--) {
                    var v = (255 ^ buf[i]) + carry;
                    buf[i] = 255 & v, carry = v >> 8;
                }
                return (4294967296 * buf.readUInt32BE(offset + 0) + buf.readUInt32BE(offset + 4)) * (negate ? -1 : 1);
            }
            function decodeArray(buf, offset, length, headerLength) {
                var i, result = [], totalBytesConsumed = 0;
                for (offset += headerLength, i = 0; i < length; i++) {
                    var decodeResult = tryDecode(buf, offset);
                    if (!decodeResult) return null;
                    result.push(decodeResult.value), offset += decodeResult.bytesConsumed, totalBytesConsumed += decodeResult.bytesConsumed;
                }
                return buildDecodeResult(result, headerLength + totalBytesConsumed);
            }
            function decodeMap(buf, offset, length, headerLength) {
                var key, i, result = {}, totalBytesConsumed = 0;
                for (offset += headerLength, i = 0; i < length; i++) {
                    var keyResult = tryDecode(buf, offset);
                    if (!keyResult) return null;
                    offset += keyResult.bytesConsumed;
                    var valueResult = tryDecode(buf, offset);
                    if (!valueResult) return null;
                    key = keyResult.value, result[key] = valueResult.value, offset += valueResult.bytesConsumed, 
                    totalBytesConsumed += keyResult.bytesConsumed + valueResult.bytesConsumed;
                }
                return buildDecodeResult(result, headerLength + totalBytesConsumed);
            }
            function decodeFixExt(buf, offset, size) {
                return decodeExt(buf, offset, buf.readUInt8(offset + 1), size, 2);
            }
            function decodeExt(buf, offset, type, size, headerSize) {
                var i, toDecode;
                for (offset += headerSize, i = 0; i < decodingTypes.length; i++) if (type === decodingTypes[i].type) {
                    toDecode = buf.slice(offset, offset + size);
                    var value = decodingTypes[i].decode(toDecode);
                    return buildDecodeResult(value, headerSize + size);
                }
                throw new Error("unable to find ext type " + type);
            }
            return decode;
        }, module.exports.IncompleteBufferError = IncompleteBufferError;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function write64BitUint(buf, obj) {
            for (var currByte = 7; currByte >= 0; currByte--) buf[currByte + 1] = 255 & obj, 
            obj /= 256;
        }
        function write64BitInt(buf, offset, num) {
            var negate = num < 0;
            negate && (num = Math.abs(num));
            var lo = num % 4294967296, hi = num / 4294967296;
            if (buf.writeUInt32BE(Math.floor(hi), offset + 0), buf.writeUInt32BE(lo, offset + 4), 
            negate) for (var carry = 1, i = offset + 7; i >= offset; i--) {
                var v = (255 ^ buf[i]) + carry;
                buf[i] = 255 & v, carry = v >> 8;
            }
        }
        function isFloat(n) {
            return n !== Math.floor(n);
        }
        function encodeFloat(obj, forceFloat64) {
            var buf;
            return buf = Buffer.allocUnsafe(5), buf[0] = 202, buf.writeFloatBE(obj, 1), (forceFloat64 || Math.abs(obj - buf.readFloatBE(1)) > TOLERANCE) && (buf = Buffer.allocUnsafe(9), 
            buf[0] = 203, buf.writeDoubleBE(obj, 1)), buf;
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, Buffer = __webpack_require__(13).Buffer, bl = __webpack_require__(14), TOLERANCE = .1;
        module.exports = function(encodingTypes, forceFloat64, compatibilityMode) {
            function encode(obj, avoidSlice) {
                var buf, len;
                if (void 0 === obj) throw new Error("undefined is not encodable in msgpack!");
                if (null === obj) buf = Buffer.allocUnsafe(1), buf[0] = 192; else if (!0 === obj) buf = Buffer.allocUnsafe(1), 
                buf[0] = 195; else if (!1 === obj) buf = Buffer.allocUnsafe(1), buf[0] = 194; else if ("string" == typeof obj) len = Buffer.byteLength(obj), 
                len < 32 ? (buf = Buffer.allocUnsafe(1 + len), buf[0] = 160 | len, len > 0 && buf.write(obj, 1)) : len <= 255 && !compatibilityMode ? (buf = Buffer.allocUnsafe(2 + len), 
                buf[0] = 217, buf[1] = len, buf.write(obj, 2)) : len <= 65535 ? (buf = Buffer.allocUnsafe(3 + len), 
                buf[0] = 218, buf.writeUInt16BE(len, 1), buf.write(obj, 3)) : (buf = Buffer.allocUnsafe(5 + len), 
                buf[0] = 219, buf.writeUInt32BE(len, 1), buf.write(obj, 5)); else if (obj && obj.readUInt32LE) obj.length <= 255 ? (buf = Buffer.allocUnsafe(2), 
                buf[0] = 196, buf[1] = obj.length) : obj.length <= 65535 ? (buf = Buffer.allocUnsafe(3), 
                buf[0] = 197, buf.writeUInt16BE(obj.length, 1)) : (buf = Buffer.allocUnsafe(5), 
                buf[0] = 198, buf.writeUInt32BE(obj.length, 1)), buf = bl([ buf, obj ]); else if (Array.isArray(obj)) obj.length < 16 ? (buf = Buffer.allocUnsafe(1), 
                buf[0] = 144 | obj.length) : obj.length < 65536 ? (buf = Buffer.allocUnsafe(3), 
                buf[0] = 220, buf.writeUInt16BE(obj.length, 1)) : (buf = Buffer.allocUnsafe(5), 
                buf[0] = 221, buf.writeUInt32BE(obj.length, 1)), buf = obj.reduce(function(acc, obj) {
                    return acc.append(encode(obj, !0)), acc;
                }, bl().append(buf)); else if ("object" === (void 0 === obj ? "undefined" : _typeof(obj))) buf = encodeExt(obj) || encodeObject(obj); else if ("number" == typeof obj) {
                    if (isFloat(obj)) return encodeFloat(obj, forceFloat64);
                    if (obj >= 0) if (obj < 128) buf = Buffer.allocUnsafe(1), buf[0] = obj; else if (obj < 256) buf = Buffer.allocUnsafe(2), 
                    buf[0] = 204, buf[1] = obj; else if (obj < 65536) buf = Buffer.allocUnsafe(3), buf[0] = 205, 
                    buf.writeUInt16BE(obj, 1); else if (obj <= 4294967295) buf = Buffer.allocUnsafe(5), 
                    buf[0] = 206, buf.writeUInt32BE(obj, 1); else {
                        if (!(obj <= 9007199254740991)) return encodeFloat(obj, !0);
                        buf = Buffer.allocUnsafe(9), buf[0] = 207, write64BitUint(buf, obj);
                    } else if (obj >= -32) buf = Buffer.allocUnsafe(1), buf[0] = 256 + obj; else if (obj >= -128) buf = Buffer.allocUnsafe(2), 
                    buf[0] = 208, buf.writeInt8(obj, 1); else if (obj >= -32768) buf = Buffer.allocUnsafe(3), 
                    buf[0] = 209, buf.writeInt16BE(obj, 1); else if (obj > -214748365) buf = Buffer.allocUnsafe(5), 
                    buf[0] = 210, buf.writeInt32BE(obj, 1); else {
                        if (!(obj >= -9007199254740991)) return encodeFloat(obj, !0);
                        buf = Buffer.allocUnsafe(9), buf[0] = 211, write64BitInt(buf, 1, obj);
                    }
                }
                if (!buf) throw new Error("not implemented yet");
                return avoidSlice ? buf : buf.slice();
            }
            function encodeExt(obj) {
                var i, encoded, length = -1, headers = [];
                for (i = 0; i < encodingTypes.length; i++) if (encodingTypes[i].check(obj)) {
                    encoded = encodingTypes[i].encode(obj);
                    break;
                }
                return encoded ? (length = encoded.length - 1, 1 === length ? headers.push(212) : 2 === length ? headers.push(213) : 4 === length ? headers.push(214) : 8 === length ? headers.push(215) : 16 === length ? headers.push(216) : length < 256 ? (headers.push(199), 
                headers.push(length)) : length < 65536 ? (headers.push(200), headers.push(length >> 8), 
                headers.push(255 & length)) : (headers.push(201), headers.push(length >> 24), headers.push(length >> 16 & 255), 
                headers.push(length >> 8 & 255), headers.push(255 & length)), bl().append(Buffer.from(headers)).append(encoded)) : null;
            }
            function encodeObject(obj) {
                var key, header, acc = [], length = 0;
                for (key in obj) obj.hasOwnProperty(key) && void 0 !== obj[key] && "function" != typeof obj[key] && (++length, 
                acc.push(encode(key, !0)), acc.push(encode(obj[key], !0)));
                return length < 16 ? (header = Buffer.allocUnsafe(1), header[0] = 128 | length) : (header = Buffer.allocUnsafe(3), 
                header[0] = 222, header.writeUInt16BE(length, 1)), acc.unshift(header), acc.reduce(function(list, buf) {
                    return list.append(buf);
                }, bl());
            }
            return encode;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function Base(opts) {
            opts = opts || {}, opts.objectMode = !0, opts.highWaterMark = 16, Transform.call(this, opts), 
            this._msgpack = opts.msgpack;
        }
        function Encoder(opts) {
            if (!(this instanceof Encoder)) return opts = opts || {}, opts.msgpack = this, new Encoder(opts);
            Base.call(this, opts);
        }
        function Decoder(opts) {
            if (!(this instanceof Decoder)) return opts = opts || {}, opts.msgpack = this, new Decoder(opts);
            Base.call(this, opts), this._chunks = bl();
        }
        var Transform = __webpack_require__(46).Transform, inherits = __webpack_require__(7), bl = __webpack_require__(14);
        inherits(Base, Transform), inherits(Encoder, Base), Encoder.prototype._transform = function(obj, enc, done) {
            var buf = null;
            try {
                buf = this._msgpack.encode(obj).slice(0);
            } catch (err) {
                return this.emit("error", err), done();
            }
            this.push(buf), done();
        }, inherits(Decoder, Base), Decoder.prototype._transform = function(buf, enc, done) {
            buf && this._chunks.append(buf);
            try {
                var result = this._msgpack.decode(this._chunks);
                this.push(result);
            } catch (err) {
                return void (err instanceof this._msgpack.IncompleteBufferError ? done() : this.emit("error", err));
            }
            this._chunks.length > 0 ? this._transform(null, enc, done) : done();
        }, module.exports.decoder = Decoder, module.exports.encoder = Encoder;
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(3);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function PassThrough(options) {
            if (!(this instanceof PassThrough)) return new PassThrough(options);
            Transform.call(this, options);
        }
        module.exports = PassThrough;
        var Transform = __webpack_require__(26), util = __webpack_require__(10);
        util.inherits = __webpack_require__(7), util.inherits(PassThrough, Transform), PassThrough.prototype._transform = function(chunk, encoding, cb) {
            cb(null, chunk);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function copyBuffer(src, target, offset) {
            src.copy(target, offset);
        }
        var Buffer = __webpack_require__(13).Buffer;
        module.exports = function() {
            function BufferList() {
                _classCallCheck(this, BufferList), this.head = null, this.tail = null, this.length = 0;
            }
            return BufferList.prototype.push = function(v) {
                var entry = {
                    data: v,
                    next: null
                };
                this.length > 0 ? this.tail.next = entry : this.head = entry, this.tail = entry, 
                ++this.length;
            }, BufferList.prototype.unshift = function(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                0 === this.length && (this.tail = entry), this.head = entry, ++this.length;
            }, BufferList.prototype.shift = function() {
                if (0 !== this.length) {
                    var ret = this.head.data;
                    return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, 
                    --this.length, ret;
                }
            }, BufferList.prototype.clear = function() {
                this.head = this.tail = null, this.length = 0;
            }, BufferList.prototype.join = function(s) {
                if (0 === this.length) return "";
                for (var p = this.head, ret = "" + p.data; p = p.next; ) ret += s + p.data;
                return ret;
            }, BufferList.prototype.concat = function(n) {
                if (0 === this.length) return Buffer.alloc(0);
                if (1 === this.length) return this.head.data;
                for (var ret = Buffer.allocUnsafe(n >>> 0), p = this.head, i = 0; p; ) copyBuffer(p.data, ret, i), 
                i += p.data.length, p = p.next;
                return ret;
            }, BufferList;
        }();
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(25), exports.Stream = exports, exports.Readable = exports, 
        exports.Writable = __webpack_require__(27), exports.Duplex = __webpack_require__(3), 
        exports.Transform = __webpack_require__(26), exports.PassThrough = __webpack_require__(44);
    }, function(module, exports, __webpack_require__) {
        (function(global, process) {
            !function(global, undefined) {
                "use strict";
                function setImmediate(callback) {
                    "function" != typeof callback && (callback = new Function("" + callback));
                    for (var args = new Array(arguments.length - 1), i = 0; i < args.length; i++) args[i] = arguments[i + 1];
                    var task = {
                        callback: callback,
                        args: args
                    };
                    return tasksByHandle[nextHandle] = task, registerImmediate(nextHandle), nextHandle++;
                }
                function clearImmediate(handle) {
                    delete tasksByHandle[handle];
                }
                function run(task) {
                    var callback = task.callback, args = task.args;
                    switch (args.length) {
                      case 0:
                        callback();
                        break;

                      case 1:
                        callback(args[0]);
                        break;

                      case 2:
                        callback(args[0], args[1]);
                        break;

                      case 3:
                        callback(args[0], args[1], args[2]);
                        break;

                      default:
                        callback.apply(undefined, args);
                    }
                }
                function runIfPresent(handle) {
                    if (currentlyRunningATask) setTimeout(runIfPresent, 0, handle); else {
                        var task = tasksByHandle[handle];
                        if (task) {
                            currentlyRunningATask = !0;
                            try {
                                run(task);
                            } finally {
                                clearImmediate(handle), currentlyRunningATask = !1;
                            }
                        }
                    }
                }
                if (!global.setImmediate) {
                    var registerImmediate, nextHandle = 1, tasksByHandle = {}, currentlyRunningATask = !1, doc = global.document, attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                    attachTo = attachTo && attachTo.setTimeout ? attachTo : global, "[object process]" === {}.toString.call(global.process) ? function() {
                        registerImmediate = function(handle) {
                            process.nextTick(function() {
                                runIfPresent(handle);
                            });
                        };
                    }() : function() {
                        if (global.postMessage && !global.importScripts) {
                            var postMessageIsAsynchronous = !0, oldOnMessage = global.onmessage;
                            return global.onmessage = function() {
                                postMessageIsAsynchronous = !1;
                            }, global.postMessage("", "*"), global.onmessage = oldOnMessage, postMessageIsAsynchronous;
                        }
                    }() ? function() {
                        var messagePrefix = "setImmediate$" + Math.random() + "$", onGlobalMessage = function(event) {
                            event.source === global && "string" == typeof event.data && 0 === event.data.indexOf(messagePrefix) && runIfPresent(+event.data.slice(messagePrefix.length));
                        };
                        global.addEventListener ? global.addEventListener("message", onGlobalMessage, !1) : global.attachEvent("onmessage", onGlobalMessage), 
                        registerImmediate = function(handle) {
                            global.postMessage(messagePrefix + handle, "*");
                        };
                    }() : global.MessageChannel ? function() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = function(event) {
                            runIfPresent(event.data);
                        }, registerImmediate = function(handle) {
                            channel.port2.postMessage(handle);
                        };
                    }() : doc && "onreadystatechange" in doc.createElement("script") ? function() {
                        var html = doc.documentElement;
                        registerImmediate = function(handle) {
                            var script = doc.createElement("script");
                            script.onreadystatechange = function() {
                                runIfPresent(handle), script.onreadystatechange = null, html.removeChild(script), 
                                script = null;
                            }, html.appendChild(script);
                        };
                    }() : function() {
                        registerImmediate = function(handle) {
                            setTimeout(runIfPresent, 0, handle);
                        };
                    }(), attachTo.setImmediate = setImmediate, attachTo.clearImmediate = clearImmediate;
                }
            }("undefined" == typeof self ? void 0 === global ? this : global : self);
        }).call(exports, __webpack_require__(4), __webpack_require__(12));
    }, function(module, exports, __webpack_require__) {
        function Timeout(id, clearFn) {
            this._id = id, this._clearFn = clearFn;
        }
        var apply = Function.prototype.apply;
        exports.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        }, exports.setInterval = function() {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        }, exports.clearTimeout = exports.clearInterval = function(timeout) {
            timeout && timeout.close();
        }, Timeout.prototype.unref = Timeout.prototype.ref = function() {}, Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
        }, exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = msecs;
        }, exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId), item._idleTimeout = -1;
        }, exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                item._onTimeout && item._onTimeout();
            }, msecs));
        }, __webpack_require__(47), exports.setImmediate = setImmediate, exports.clearImmediate = clearImmediate;
    }, function(module, exports, __webpack_require__) {
        (function(global) {
            function deprecate(fn, msg) {
                function deprecated() {
                    if (!warned) {
                        if (config("throwDeprecation")) throw new Error(msg);
                        config("traceDeprecation") ? console.trace(msg) : console.warn(msg), warned = !0;
                    }
                    return fn.apply(this, arguments);
                }
                if (config("noDeprecation")) return fn;
                var warned = !1;
                return deprecated;
            }
            function config(name) {
                try {
                    if (!global.localStorage) return !1;
                } catch (_) {
                    return !1;
                }
                var val = global.localStorage[name];
                return null != val && "true" === String(val).toLowerCase();
            }
            module.exports = deprecate;
        }).call(exports, __webpack_require__(4));
    }, function(module, exports) {
        "function" == typeof Object.create ? module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : module.exports = function(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
        };
    }, function(module, exports) {
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        module.exports = function(arg) {
            return arg && "object" === (void 0 === arg ? "undefined" : _typeof(arg)) && "function" == typeof arg.copy && "function" == typeof arg.fill && "function" == typeof arg.readUInt8;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function dispatchPossiblyUnhandledError(err) {
            if (-1 === dispatchedErrors.indexOf(err)) {
                dispatchedErrors.push(err), setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function onPossiblyUnhandledException(handler) {
            return possiblyUnhandledPromiseHandlers.push(handler), {
                cancel: function() {
                    possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                }
            };
        }
        __webpack_exports__.a = dispatchPossiblyUnhandledError, __webpack_exports__.b = onPossiblyUnhandledException;
        var possiblyUnhandledPromiseHandlers = [], dispatchedErrors = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ZalgoPromise;
        });
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(54), __WEBPACK_IMPORTED_MODULE_1__exceptions__ = __webpack_require__(52), _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), global = window.__zalgopromise__ = window.__zalgopromise__ || {
            flushPromises: [],
            activeCount: 0
        }, ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                if (_classCallCheck(this, ZalgoPromise), this.resolved = !1, this.rejected = !1, 
                this.errorHandled = !1, this.handlers = [], handler) {
                    var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                    try {
                        handler(function(res) {
                            isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                        }, function(err) {
                            isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                        });
                    } catch (err) {
                        return void this.reject(err);
                    }
                    isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            return _createClass(ZalgoPromise, [ {
                key: "resolve",
                value: function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result)) throw new Error("Can not resolve promise with another promise");
                    return this.resolved = !0, this.value = result, this.dispatch(), this;
                }
            }, {
                key: "reject",
                value: function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__exceptions__.a)(error);
                    }, 1), this.dispatch(), this;
                }
            }, {
                key: "asyncReject",
                value: function(error) {
                    this.errorHandled = !0, this.reject(error);
                }
            }, {
                key: "dispatch",
                value: function() {
                    var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0, global.activeCount += 1;
                        for (var i = 0; i < handlers.length; i++) {
                            (function(i) {
                                var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                                if (resolved) try {
                                    result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                                } catch (err) {
                                    return promise.reject(err), "continue";
                                } else if (rejected) {
                                    if (!onError) return promise.reject(_this3.error), "continue";
                                    try {
                                        result = onError(_this3.error);
                                    } catch (err) {
                                        return promise.reject(err), "continue";
                                    }
                                }
                                result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                                result.errorHandled = !0) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                    promise.resolve(res);
                                }, function(err) {
                                    promise.reject(err);
                                }) : promise.resolve(result);
                            })(i);
                        }
                        handlers.length = 0, this.dispatching = !1, global.activeCount -= 1, 0 === global.activeCount && ZalgoPromise.flushQueue();
                    }
                }
            }, {
                key: "then",
                value: function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    return this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    }), this.errorHandled = !0, this.dispatch(), promise;
                }
            }, {
                key: "catch",
                value: function(onError) {
                    return this.then(void 0, onError);
                }
            }, {
                key: "finally",
                value: function(handler) {
                    return this.then(function(result) {
                        return ZalgoPromise.try(handler).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(handler).then(function() {
                            throw err;
                        });
                    });
                }
            }, {
                key: "timeout",
                value: function(time, err) {
                    var _this4 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        return clearTimeout(timeout), result;
                    });
                }
            }, {
                key: "toPromise",
                value: function() {
                    if (!window.Promise) throw new Error("Could not find window.Promise");
                    return window.Promise.resolve(this);
                }
            } ], [ {
                key: "resolve",
                value: function(value) {
                    return value instanceof ZalgoPromise ? value : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                }
            }, {
                key: "reject",
                value: function(error) {
                    return new ZalgoPromise().reject(error);
                }
            }, {
                key: "all",
                value: function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) return promise.resolve(results), promise;
                    for (var i = 0; i < promises.length; i++) {
                        (function(i) {
                            var prom = promises[i];
                            if (prom instanceof ZalgoPromise) {
                                if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                            } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(prom)) return results[i] = prom, 
                            count -= 1, "continue";
                            ZalgoPromise.resolve(prom).then(function(result) {
                                results[i] = result, 0 === (count -= 1) && promise.resolve(results);
                            }, function(err) {
                                promise.reject(err);
                            });
                        })(i);
                    }
                    return 0 === count && promise.resolve(results), promise;
                }
            }, {
                key: "hash",
                value: function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                }
            }, {
                key: "map",
                value: function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                }
            }, {
                key: "onPossiblyUnhandledException",
                value: function(handler) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__exceptions__.b)(handler);
                }
            }, {
                key: "try",
                value: function(method, context, args) {
                    var result = void 0;
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        return ZalgoPromise.reject(err);
                    }
                    return ZalgoPromise.resolve(result);
                }
            }, {
                key: "delay",
                value: function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                }
            }, {
                key: "isPromise",
                value: function(value) {
                    return !!(value && value instanceof ZalgoPromise) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__.a)(value);
                }
            }, {
                key: "flush",
                value: function() {
                    var promise = new ZalgoPromise();
                    return global.flushPromises.push(promise), 0 === global.activeCount && ZalgoPromise.flushQueue(), 
                    promise;
                }
            }, {
                key: "flushQueue",
                value: function() {
                    var promisesToFlush = global.flushPromises;
                    global.flushPromises = [];
                    for (var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref;
                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            if (_i = _iterator.next(), _i.done) break;
                            _ref = _i.value;
                        }
                        _ref.resolve();
                    }
                }
            } ]), ZalgoPromise;
        }();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Promise && item instanceof window.Promise) return !0;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (toString) {
                    var name = toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if ("function" == typeof item.then) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        __webpack_exports__.a = isPromise;
        var toString = {}.toString;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function cleanUpWindow(win) {
            var requestPromises = __WEBPACK_IMPORTED_MODULE_0__global__.a.requestPromises.get(win);
            if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var promise = _ref;
                promise.reject(new Error("No response from window - cleaned up"));
            }
            __WEBPACK_IMPORTED_MODULE_0__global__.a.popupWindowsByWin && __WEBPACK_IMPORTED_MODULE_0__global__.a.popupWindowsByWin.delete(win), 
            __WEBPACK_IMPORTED_MODULE_0__global__.a.remoteWindows && __WEBPACK_IMPORTED_MODULE_0__global__.a.remoteWindows.delete(win), 
            __WEBPACK_IMPORTED_MODULE_0__global__.a.requestPromises.delete(win), __WEBPACK_IMPORTED_MODULE_0__global__.a.methods.delete(win), 
            __WEBPACK_IMPORTED_MODULE_0__global__.a.readyPromises.delete(win);
        }
        __webpack_exports__.a = cleanUpWindow;
        var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(5);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CONFIG;
        });
        var _ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(30), CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            RES_TIMEOUT: 1 / 0,
            LOG_TO_PAGE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__.a.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            var parsedMessage = void 0;
            try {
                parsedMessage = "string" == typeof message ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.j)(message) : msgpack5.decode(message);
            } catch (err) {
                return;
            }
            if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[__WEBPACK_IMPORTED_MODULE_1__conf__.b.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && __WEBPACK_IMPORTED_MODULE_4__types__.a[parsedMessage.type]) return parsedMessage;
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message) {
                if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                if (0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) || (origin = message.sourceDomain), 
                -1 === __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.indexOf(message.id)) {
                    __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.push(message.id);
                    var level = void 0;
                    if (level = -1 !== __WEBPACK_IMPORTED_MODULE_1__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_1__conf__.b.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                    __WEBPACK_IMPORTED_MODULE_2__lib__.g.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.f)(source)) return void __WEBPACK_IMPORTED_MODULE_2__lib__.g.debug("Source window is closed - can not send " + message.type + " " + message.name);
                    message.data && (message.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.k)(source, origin, message.data)), 
                    __WEBPACK_IMPORTED_MODULE_4__types__.a[message.type](source, origin, message);
                }
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            var messageEvent = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent && event.originalEvent.origin,
                data: event.data
            };
            receiveMessage(messageEvent);
        }
        function listenForMessages() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.l)(window, "message", messageListener);
        }
        __webpack_exports__.b = messageListener, __webpack_exports__.a = listenForMessages;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(58), __WEBPACK_IMPORTED_MODULE_5_msgpack5__ = __webpack_require__(23), _typeof = (__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_msgpack5__), 
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }), msgpack5 = __WEBPACK_IMPORTED_MODULE_5_msgpack5__();
        __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages = __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages || [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return RECEIVE_MESSAGE_TYPES;
        });
        var _RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_4__send__ = __webpack_require__(32), __WEBPACK_IMPORTED_MODULE_5__listeners__ = __webpack_require__(31), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash);
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.b)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(source) ? __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve() : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__send__.a)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.b)({
                name: message.name,
                win: source,
                domain: origin
            });
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all([ respond({
                type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.ACK
            }), __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.b)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var error = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err).replace(/^Error: /, "");
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.ERROR,
                    error: error
                });
            }) ]).then(__WEBPACK_IMPORTED_MODULE_3__lib__.m).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.error(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err));
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash);
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.b)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.c)(message.hash), 
            message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error), null);
            if (message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.b.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return SEND_MESSAGE_STRATEGIES;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[__WEBPACK_IMPORTED_MODULE_1__conf__.b.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD ], 
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.MOCK_PROTOCOL)) {
                    if (window.location.protocol === __WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) return __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD;
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.h)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.i)(win);
                }
                return 0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.b.FILE_PROTOCOL) ? __WEBPACK_IMPORTED_MODULE_1__conf__.b.WILDCARD : dom;
            }), domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(9);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.cleanUpWindow;
        }), __webpack_require__.d(__webpack_exports__, "init", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.init;
        }), __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.bridge;
        }), __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.Promise;
        }), __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.parent;
        }), __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.send;
        }), __webpack_require__.d(__webpack_exports__, "msgpackSupport", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.msgpackSupport;
        }), __webpack_require__.d(__webpack_exports__, "enableMsgpack", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.enableMsgpack;
        }), __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.request;
        }), __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.sendToParent;
        }), __webpack_require__.d(__webpack_exports__, "client", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.client;
        }), __webpack_require__.d(__webpack_exports__, "on", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.on;
        }), __webpack_require__.d(__webpack_exports__, "listen", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.listen;
        }), __webpack_require__.d(__webpack_exports__, "once", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.once;
        }), __webpack_require__.d(__webpack_exports__, "listener", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.listener;
        }), __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.CONFIG;
        }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.CONSTANTS;
        }), __webpack_require__.d(__webpack_exports__, "disable", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.disable;
        }), __webpack_exports__.default = __WEBPACK_IMPORTED_MODULE_0__interface__;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function initOnReady() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interface__.on)(__WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.READY, {
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD
            }, function(event) {
                var win = event.source, promise = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.get(win);
                promise ? promise.resolve(event) : (promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a().resolve(event), 
                __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.set(win, promise));
            });
            var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.a)();
            parent && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__interface__.send)(parent, __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.READY, {}, {
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                __WEBPACK_IMPORTED_MODULE_5__log__.a.debug(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__.b)(err));
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.get(win);
            return promise || (promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a(), 
            __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises.set(win, promise), setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise);
        }
        __webpack_exports__.a = initOnReady, __webpack_exports__.b = onWindowReady;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__interface__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_5__log__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(17);
        __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.readyPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)(), methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.get(destination);
            return methods || (methods = {}, __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.set(destination, methods)), 
            methods[id] = {
                domain: domain,
                method: method
            }, {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ERROR,
                __message__: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.b)(err)
            };
        }
        function serializePromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeZalgoPromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeRegex(regex) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.REGEX,
                __source__: regex.source
            };
        }
        function serializeMethods(destination, domain, obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : window.Promise && item instanceof window.Promise ? serializePromise(destination, domain, item, key.toString()) : __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a.isPromise(item) ? serializeZalgoPromise(destination, domain, item, key.toString()) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.a)(item) ? serializeRegex(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Call foreign method", obj.__name__, args), 
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__interface__.send)(source, __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Got foreign method result", obj.__name__, data.result), 
                    data.result;
                }, function(err) {
                    throw __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Got foreign method error", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.b)(err)), 
                    err;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.__xdomain__ = !0, wrapper.source = source, 
            wrapper.origin = origin, wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeZalgoPromise(source, origin, prom) {
            return new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            });
        }
        function deserializePromise(source, origin, prom) {
            return window.Promise ? new window.Promise(function(resolve, reject) {
                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
            }) : deserializeZalgoPromise(source, origin, prom);
        }
        function deserializeRegex(source, origin, item) {
            return new RegExp(item.__source__);
        }
        function deserializeMethods(source, origin, obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)({
                obj: obj
            }, function(item, key) {
                if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item) return isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.b.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
            }).obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return listenForMethods;
        }), __webpack_exports__.b = serializeMethods, __webpack_exports__.c = deserializeMethods;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(17), __WEBPACK_IMPORTED_MODULE_5__interface__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_6__log__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_7__global__ = __webpack_require__(5), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_7__global__.a.methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
        var listenForMethods = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.e)(function() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__interface__.on)(__WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_NAMES.METHOD, {
                origin: __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = __WEBPACK_IMPORTED_MODULE_7__global__.a.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.b)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return __WEBPACK_IMPORTED_MODULE_6__log__.a.debug("Call local method", data.name, data.args), 
                __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a.try(function() {
                    return meth.method.apply({
                        source: source,
                        origin: origin,
                        data: data
                    }, data.args);
                }).then(function(result) {
                    return {
                        result: result,
                        id: data.id,
                        name: data.name
                    };
                });
            });
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function enableMsgpack(win) {
            __WEBPACK_IMPORTED_MODULE_4__drivers__.d.set(win, !0);
        }
        function request(options) {
            return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
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
                domain = options.domain || __WEBPACK_IMPORTED_MODULE_3__conf__.b.WILDCARD;
                var hash = options.name + "_" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.d)();
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.f)(win)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.get(win);
                requestPromises || (requestPromises = [], __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.set(win, requestPromises));
                var requestPromise = __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.j)(window, win)) return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.resolve(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(win));
                }).then(function() {
                    return new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                        var responseListener = void 0;
                        if (options.fireAndForget || (responseListener = {
                            name: name,
                            window: win,
                            domain: domain,
                            respond: function(err, result) {
                                err || (hasResult = !0, requestPromises.splice(requestPromises.indexOf(requestPromise, 1))), 
                                err ? reject(err) : resolve(result);
                            }
                        }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.e)(hash, responseListener)), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.f)(win, {
                            type: __WEBPACK_IMPORTED_MODULE_3__conf__.b.POST_MESSAGE_TYPE.REQUEST,
                            hash: hash,
                            name: name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, domain).catch(reject), options.fireAndForget) return resolve();
                        var ackTimeout = __WEBPACK_IMPORTED_MODULE_3__conf__.a.ACK_TIMEOUT, resTimeout = options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.a.RES_TIMEOUT, cycleTime = 100, cycle = function cycle() {
                            if (!hasResult) {
                                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.f)(win)) return reject(responseListener.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"));
                                ackTimeout -= cycleTime, resTimeout -= cycleTime;
                                if (responseListener.ack) {
                                    if (resTimeout === 1 / 0) return;
                                    cycleTime = Math.min(resTimeout, 2e3);
                                } else {
                                    if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + __WEBPACK_IMPORTED_MODULE_3__conf__.a.ACK_TIMEOUT + "ms"));
                                    if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + (options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.a.RES_TIMEOUT) + "ms"));
                                }
                                setTimeout(cycle, cycleTime);
                            }
                        };
                        setTimeout(cycle, cycleTime);
                    });
                });
                return requestPromise.catch(function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.g)(hash);
                }), requestPromises.push(requestPromise), requestPromise;
            });
        }
        function _send(window, name, data, options) {
            return options = options || {}, options.window = window, options.name = name, options.data = data, 
            request(options);
        }
        function sendToParent(name, data, options) {
            var win = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.a)();
            return win ? _send(win, name, data, options) : new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
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
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return _send;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return msgpackSupport;
        }), __webpack_exports__.c = enableMsgpack, __webpack_exports__.d = request, __webpack_exports__.e = sendToParent, 
        __webpack_exports__.f = client;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(11), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__drivers__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(5);
        __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
        var msgpackSupport = __WEBPACK_IMPORTED_MODULE_4__drivers__.d;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function disable() {
            delete window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", __WEBPACK_IMPORTED_MODULE_1__drivers__.b);
        }
        __webpack_exports__.c = disable;
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(8);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.a;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return parent;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(63);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.a;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.b;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.c;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.d;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.e;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.f;
        });
        var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__(66);
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.a;
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.b;
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.c;
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(64);
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.a;
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.b;
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.c;
        });
        var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.a)();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (!options.handler) throw new Error("Expected options.handler");
            var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                handler: options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                },
                window: win,
                domain: domain || __WEBPACK_IMPORTED_MODULE_4__conf__.b.WILDCARD,
                name: name
            }, requestListener = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__drivers__.c)({
                name: name,
                win: win,
                domain: domain
            }, listenerOptions);
            if (options.once) {
                var _handler = listenerOptions.handler;
                listenerOptions.handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.n)(function() {
                    return requestListener.cancel(), _handler.apply(this, arguments);
                });
            }
            if (listenerOptions.window && options.errorOnClose) var interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.o)(function() {
                win && "object" === (void 0 === win ? "undefined" : _typeof(win)) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.f)(win) && (interval.cancel(), 
                listenerOptions.handleError(new Error("Post message target window is closed")));
            }, 50);
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function _on(name, options, handler) {
            return "function" == typeof options && (handler = options, options = {}), options = options || {}, 
            options.name = name, options.handler = handler || options.handler, listen(options);
        }
        function once(name) {
            var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
            "function" == typeof options && (handler = options, options = {}), options = options || {}, 
            handler = handler || options.handler;
            var errorHandler = options.errorHandler, promise = new __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a(function(resolve, reject) {
                options = options || {}, options.name = name, options.once = !0, options.handler = function(event) {
                    if (resolve(event), handler) return handler(event);
                }, options.errorHandler = function(err) {
                    if (reject(err), errorHandler) return errorHandler(err);
                };
            }), onceListener = listen(options);
            return promise.cancel = onceListener.cancel, promise;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler) {
                    return _on(name, options, handler);
                }
            };
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return _on;
        }), __webpack_exports__.b = listen, __webpack_exports__.c = once, __webpack_exports__.d = listener;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_3__drivers__ = __webpack_require__(8), __WEBPACK_IMPORTED_MODULE_4__conf__ = __webpack_require__(0), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }, function(module, exports) {} ]);
});
//# sourceMappingURL=post-robot.js.map