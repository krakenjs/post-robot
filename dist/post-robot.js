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
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 29);
    }([ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(25);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__config__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(12);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.a;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__constants__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isAboutProtocol() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.ABOUT_PROTOCOL;
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
        function canReadFromWindow(win) {
            try {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.a)(win && win.location && win.location.href), 
                !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            var location = win.location;
            if (!location) throw new Error("Can not read window location");
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return CONSTANTS.FILE_PROTOCOL + "//";
            if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                var parent = getParent(win);
                return parent && canReadFromWindow(win) ? getActualDomain(parent) : CONSTANTS.ABOUT_PROTOCOL + "//";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            win = win || window;
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
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
        __webpack_exports__.e = isWindowClosed, __webpack_exports__.a = getAncestor, __webpack_exports__.j = isAncestor, 
        __webpack_exports__.b = isPopup, __webpack_exports__.c = isIframe, __webpack_exports__.f = matchDomain, 
        __webpack_exports__.d = isWindow;
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(19), CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            ABOUT_PROTOCOL: "about:",
            WILDCARD: "*"
        }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n", iframeWindows = [], iframeFrames = [];
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__promise__ = __webpack_require__(22);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__promise__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return global;
        });
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(0), global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function() {};
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(7);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.g;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.e;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.c;
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.b;
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.a;
        }), __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.h;
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.i;
        }), __webpack_require__.d(__webpack_exports__, "m", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.j;
        }), __webpack_require__.d(__webpack_exports__, "n", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.d;
        }), __webpack_require__.d(__webpack_exports__, "o", function() {
            return __WEBPACK_IMPORTED_MODULE_0__util__.k;
        });
        var __WEBPACK_IMPORTED_MODULE_1__log__ = __webpack_require__(9);
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_1__log__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__serialize__ = __webpack_require__(31);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.a;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.b;
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_2__serialize__.c;
        });
        var __WEBPACK_IMPORTED_MODULE_3__ready__ = __webpack_require__(30);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.a;
        }), __webpack_require__.d(__webpack_exports__, "p", function() {
            return __WEBPACK_IMPORTED_MODULE_3__ready__.b;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__receive__ = __webpack_require__(26);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.a;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__receive__.b;
        });
        var __WEBPACK_IMPORTED_MODULE_1__send__ = __webpack_require__(14);
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_1__send__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_2__listeners__ = __webpack_require__(13);
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.e;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.f;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.g;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_2__listeners__.d;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(10);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.WeakMap;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function stringifyError(err) {
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
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.b)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.POPUP : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.c)() ? __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.IFRAME : __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_TYPES.FULLPAGE;
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
        __webpack_exports__.a = stringifyError, __webpack_require__.d(__webpack_exports__, "d", function() {
            return once;
        }), __webpack_exports__.j = noop, __webpack_exports__.i = addEventListener, __webpack_exports__.e = uniqueID, 
        __webpack_exports__.f = replaceObject, __webpack_exports__.k = safeInterval, __webpack_exports__.g = isRegex, 
        __webpack_exports__.c = getWindowType, __webpack_exports__.b = jsonStringify, __webpack_exports__.h = jsonParse;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = (__webpack_require__(6), 
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
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function init() {
            __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__drivers__.a)(), 
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.a)(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib__.b)({
                on: __WEBPACK_IMPORTED_MODULE_3__public__.f,
                send: __WEBPACK_IMPORTED_MODULE_3__public__.b
            })), __WEBPACK_IMPORTED_MODULE_2__global__.a.initialized = !0;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        }), __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return bridge;
        }), __webpack_exports__.init = init;
        var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_3__public__ = __webpack_require__(15);
        __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.a;
        }), __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.b;
        }), __webpack_require__.d(__webpack_exports__, "request", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.c;
        }), __webpack_require__.d(__webpack_exports__, "sendToParent", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.d;
        }), __webpack_require__.d(__webpack_exports__, "client", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.e;
        }), __webpack_require__.d(__webpack_exports__, "on", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.f;
        }), __webpack_require__.d(__webpack_exports__, "listen", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.g;
        }), __webpack_require__.d(__webpack_exports__, "once", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.h;
        }), __webpack_require__.d(__webpack_exports__, "listener", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.i;
        }), __webpack_require__.d(__webpack_exports__, "CONFIG", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.j;
        }), __webpack_require__.d(__webpack_exports__, "CONSTANTS", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.k;
        }), __webpack_require__.d(__webpack_exports__, "disable", function() {
            return __WEBPACK_IMPORTED_MODULE_3__public__.l;
        });
        var __WEBPACK_IMPORTED_MODULE_4__clean__ = __webpack_require__(24);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_4__clean__.a;
        });
        var __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__ = __webpack_require__(2);
        __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_5_zalgo_promise_src__.a;
        });
        var bridge = null;
        init();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return log;
        });
        var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = {
            clearLogs: function() {
                if (window.console && window.console.clear && window.console.clear(), __WEBPACK_IMPORTED_MODULE_1__conf__.b.LOG_TO_PAGE) {
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
                            json = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.b)(item, null, 2);
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
                        var logLevel = window.LOG_LEVEL || __WEBPACK_IMPORTED_MODULE_1__conf__.b.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                        args.unshift("::"), args.unshift("" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__.c)().toLowerCase()), 
                        args.unshift("[post-robot]"), __WEBPACK_IMPORTED_MODULE_1__conf__.b.LOG_TO_PAGE && log.writeToPage(level, args), 
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
        var __WEBPACK_IMPORTED_MODULE_0__weakmap__ = __webpack_require__(18);
        __webpack_require__.d(__webpack_exports__, "WeakMap", function() {
            return __WEBPACK_IMPORTED_MODULE_0__weakmap__.a;
        });
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(global) {
            function getGlobal() {
                var glob = void 0;
                if ("undefined" != typeof window) glob = window; else {
                    if (void 0 === global) throw new Error("Can not find global");
                    glob = global;
                }
                var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                return zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [], zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0, 
                zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [], 
                zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [], zalgoGlobal;
            }
            __webpack_exports__.a = getGlobal;
        }).call(__webpack_exports__, __webpack_require__(20));
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
        function markResponseListenerErrored(hash) {
            __WEBPACK_IMPORTED_MODULE_3__global__.a.erroredResponseListeners[hash] = !0;
        }
        function isResponseListenerErrored(hash) {
            return Boolean(__WEBPACK_IMPORTED_MODULE_3__global__.a.erroredResponseListeners[hash]);
        }
        function getRequestListener(_ref) {
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            if (win === __WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD && (win = null), domain === __WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD && (domain = null), 
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
                            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.f)(regex, domain)) return listener;
                        }
                    }
                    if (winListeners[__WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD]) return winListeners[__WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD];
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
            if (win && win !== __WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD || (win = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD), 
            domain = domain || __WEBPACK_IMPORTED_MODULE_5__conf__.a.WILDCARD, existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
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
        __webpack_exports__.f = addResponseListener, __webpack_exports__.b = getResponseListener, 
        __webpack_exports__.d = deleteResponseListener, __webpack_exports__.g = markResponseListenerErrored, 
        __webpack_exports__.a = isResponseListenerErrored, __webpack_exports__.c = getRequestListener, 
        __webpack_exports__.e = addRequestListener;
        var __WEBPACK_IMPORTED_MODULE_1_cross_domain_safe_weakmap_src__ = (__webpack_require__(2), 
        __webpack_require__(6)), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_4__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_5__conf__ = __webpack_require__(0);
        __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.responseListeners || {}, 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.requestListeners || {}, 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD = __WEBPACK_IMPORTED_MODULE_3__global__.a.WINDOW_WILDCARD || new function() {}(), 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.erroredResponseListeners = __WEBPACK_IMPORTED_MODULE_3__global__.a.erroredResponseListeners || {};
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
                if (level = -1 !== __WEBPACK_IMPORTED_MODULE_2__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || __WEBPACK_IMPORTED_MODULE_2__conf__.a.WILDCARD, "\n\n", message ]), 
                win === window && !__WEBPACK_IMPORTED_MODULE_2__conf__.b.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(win)) throw new Error("Window is closed");
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.debug("Running send message strategies", message);
                var messages = [], serializedMessage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.h)(_defineProperty({}, __WEBPACK_IMPORTED_MODULE_2__conf__.a.WINDOW_PROPS.POSTROBOT, message), null, 2);
                return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.map(Object.keys(__WEBPACK_IMPORTED_MODULE_4__strategies__.a), function(strategyName) {
                    return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                        if (!__WEBPACK_IMPORTED_MODULE_2__conf__.b.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
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
        __webpack_exports__.a = sendMessage;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_4__strategies__ = __webpack_require__(28), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return parent;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__client__ = __webpack_require__(32);
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.a;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.b;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.c;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_1__client__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_2__server__ = __webpack_require__(34);
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.a;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.b;
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.c;
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return __WEBPACK_IMPORTED_MODULE_2__server__.d;
        });
        var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(33);
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.a;
        }), __webpack_require__.d(__webpack_exports__, "k", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.b;
        }), __webpack_require__.d(__webpack_exports__, "l", function() {
            return __WEBPACK_IMPORTED_MODULE_3__config__.c;
        });
        var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.a)();
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
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__native__ = __webpack_require__(16), __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(17), _createClass = function() {
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
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.d)(value) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(value)) {
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
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.d)(key)) return !1;
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
        function dispatchPossiblyUnhandledError(err) {
            if (-1 === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().dispatchedErrors.indexOf(err)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().dispatchedErrors.push(err), 
                setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.length; j++) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function onPossiblyUnhandledException(handler) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.push(handler), 
            {
                cancel: function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.splice(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__global__.a)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                }
            };
        }
        __webpack_exports__.a = dispatchPossiblyUnhandledError, __webpack_exports__.b = onPossiblyUnhandledException;
        var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(11);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ZalgoPromise;
        });
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(23), __WEBPACK_IMPORTED_MODULE_1__exceptions__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(11), _createClass = function() {
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
        }(), ZalgoPromise = function() {
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
                        this.dispatching = !0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount += 1;
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
                        handlers.length = 0, this.dispatching = !1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount -= 1, 
                        0 === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount && ZalgoPromise.flushQueue();
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
                    if ("undefined" == typeof Promise) throw new Error("Could not find Promise");
                    return Promise.resolve(this);
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
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises.push(promise), 
                    0 === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().activeCount && ZalgoPromise.flushQueue(), 
                    promise;
                }
            }, {
                key: "flushQueue",
                value: function() {
                    var promisesToFlush = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global__.a)().flushPromises = [];
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
        __webpack_exports__.a = isPromise;
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
        var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(3);
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
        var _ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(12), CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            CHILD_WINDOW_TIMEOUT: 5e3,
            ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
            RES_TIMEOUT: 1 / 0,
            LOG_TO_PAGE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, __WEBPACK_IMPORTED_MODULE_0__constants__.a.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE),
            ALLOW_SAME_ORIGIN: !1
        };
        0 === window.location.href.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__.a.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            var parsedMessage = void 0;
            try {
                parsedMessage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib__.j)(message);
            } catch (err) {
                return;
            }
            if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[__WEBPACK_IMPORTED_MODULE_1__conf__.a.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && __WEBPACK_IMPORTED_MODULE_4__types__.a[parsedMessage.type]) return parsedMessage;
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
                if (0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.a.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.a.FILE_PROTOCOL) || (origin = message.sourceDomain), 
                -1 === __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.indexOf(message.id)) {
                    __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages.push(message.id);
                    var level = void 0;
                    if (level = -1 !== __WEBPACK_IMPORTED_MODULE_1__conf__.c.indexOf(message.name) || message.type === __WEBPACK_IMPORTED_MODULE_1__conf__.a.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                    __WEBPACK_IMPORTED_MODULE_2__lib__.g.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(source)) return void __WEBPACK_IMPORTED_MODULE_2__lib__.g.debug("Source window is closed - can not send " + message.type + " " + message.name);
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
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_3__global__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(27), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages = __WEBPACK_IMPORTED_MODULE_3__global__.a.receivedMessages || [], 
        __WEBPACK_IMPORTED_MODULE_3__global__.a.receiveMessage = receiveMessage;
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
        var _RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_4__send__ = __webpack_require__(14), __WEBPACK_IMPORTED_MODULE_5__listeners__ = __webpack_require__(13), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash)) {
                var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.b)(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                options.ack = !0;
            }
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.e)(source) ? __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.resolve() : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__send__.a)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.c)({
                name: message.name,
                win: source,
                domain: origin
            });
            return __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.all([ respond({
                type: __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.ACK
            }), __WEBPACK_IMPORTED_MODULE_0_zalgo_promise_src__.a.try(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var error = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err).replace(/^Error: /, ""), code = err.code;
                return respond({
                    type: __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.RESPONSE,
                    ack: __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_ACK.ERROR,
                    error: error,
                    code: code
                });
            }) ]).then(__WEBPACK_IMPORTED_MODULE_3__lib__.m).catch(function(err) {
                if (options && options.handleError) return options.handleError(err);
                __WEBPACK_IMPORTED_MODULE_3__lib__.g.error(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib__.i)(err));
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.a)(message.hash)) {
                var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.b)(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__listeners__.d)(message.hash), 
                message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_ACK.ERROR) {
                    var err = new Error(message.error);
                    return message.code && (err.code = message.code), options.respond(err, null);
                }
                if (message.ack === __WEBPACK_IMPORTED_MODULE_2__conf__.a.POST_MESSAGE_ACK.SUCCESS) {
                    var data = message.data || message.response;
                    return options.respond(null, {
                        source: source,
                        origin: origin,
                        data: data
                    });
                }
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return SEND_MESSAGE_STRATEGIES;
        });
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1__conf__ = __webpack_require__(0), SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[__WEBPACK_IMPORTED_MODULE_1__conf__.a.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ __WEBPACK_IMPORTED_MODULE_1__conf__.a.WILDCARD ], 
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.a.MOCK_PROTOCOL)) {
                    if (window.location.protocol === __WEBPACK_IMPORTED_MODULE_1__conf__.a.FILE_PROTOCOL) return __WEBPACK_IMPORTED_MODULE_1__conf__.a.WILDCARD;
                    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.h)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.i)(win);
                }
                return 0 === dom.indexOf(__WEBPACK_IMPORTED_MODULE_1__conf__.a.FILE_PROTOCOL) ? __WEBPACK_IMPORTED_MODULE_1__conf__.a.WILDCARD : dom;
            }), domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__interface__ = __webpack_require__(8);
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.cleanUpWindow;
        }), __webpack_require__.d(__webpack_exports__, "Promise", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.Promise;
        }), __webpack_require__.d(__webpack_exports__, "bridge", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.bridge;
        }), __webpack_require__.d(__webpack_exports__, "init", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.init;
        }), __webpack_require__.d(__webpack_exports__, "parent", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.parent;
        }), __webpack_require__.d(__webpack_exports__, "send", function() {
            return __WEBPACK_IMPORTED_MODULE_0__interface__.send;
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
            __WEBPACK_IMPORTED_MODULE_5__global__.a.on(__WEBPACK_IMPORTED_MODULE_3__conf__.a.POST_MESSAGE_NAMES.READY, {
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.a.WILDCARD
            }, function(event) {
                var win = event.source, promise = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises.get(win);
                promise ? promise.resolve(event) : (promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a().resolve(event), 
                __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises.set(win, promise));
            });
            var parent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.a)();
            parent && __WEBPACK_IMPORTED_MODULE_5__global__.a.send(parent, __WEBPACK_IMPORTED_MODULE_3__conf__.a.POST_MESSAGE_NAMES.READY, {}, {
                domain: __WEBPACK_IMPORTED_MODULE_3__conf__.a.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                __WEBPACK_IMPORTED_MODULE_4__log__.a.debug(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__.a)(err));
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises.get(win);
            return promise || (promise = new __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a(), 
            __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises.set(win, promise), -1 !== timeout && setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise);
        }
        __webpack_exports__.a = initOnReady, __webpack_exports__.b = onWindowReady;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__log__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(7);
        __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises = __WEBPACK_IMPORTED_MODULE_5__global__.a.readyPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.e)(), methods = __WEBPACK_IMPORTED_MODULE_6__global__.a.methods.get(destination);
            return methods || (methods = {}, __WEBPACK_IMPORTED_MODULE_6__global__.a.methods.set(destination, methods)), 
            methods[id] = {
                domain: domain,
                method: method
            }, {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.ERROR,
                __message__: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.a)(err),
                __code__: err.code
            };
        }
        function serializePromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeZalgoPromise(destination, domain, promise, name) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.ZALGO_PROMISE,
                __then__: serializeMethod(destination, domain, function(resolve, reject) {
                    return promise.then(resolve, reject);
                }, name + ".then")
            };
        }
        function serializeRegex(regex) {
            return {
                __type__: __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.REGEX,
                __source__: regex.source
            };
        }
        function serializeMethods(destination, domain, obj) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? serializeError(item) : window.Promise && item instanceof window.Promise ? serializePromise(destination, domain, item, key.toString()) : __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__.a.isPromise(item) ? serializeZalgoPromise(destination, domain, item, key.toString()) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.g)(item) ? serializeRegex(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return __WEBPACK_IMPORTED_MODULE_5__log__.a.debug("Call foreign method", obj.__name__, args), 
                __WEBPACK_IMPORTED_MODULE_6__global__.a.send(source, __WEBPACK_IMPORTED_MODULE_3__conf__.a.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return __WEBPACK_IMPORTED_MODULE_5__log__.a.debug("Got foreign method result", obj.__name__, data.result), 
                    data.result;
                }, function(err) {
                    throw __WEBPACK_IMPORTED_MODULE_5__log__.a.debug("Got foreign method error", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.a)(err)), 
                    err;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.__xdomain__ = !0, wrapper.source = source, 
            wrapper.origin = origin, wrapper;
        }
        function deserializeError(source, origin, obj) {
            var err = new Error(obj.__message__);
            return obj.__code__ && (err.code = obj.__code__), err;
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
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.f)({
                obj: obj
            }, function(item, key) {
                if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item) return isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, __WEBPACK_IMPORTED_MODULE_3__conf__.a.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
            }).obj;
        }
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return listenForMethods;
        }), __webpack_exports__.b = serializeMethods, __webpack_exports__.c = deserializeMethods;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_2_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(7), __WEBPACK_IMPORTED_MODULE_5__log__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(3), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_6__global__.a.methods = __WEBPACK_IMPORTED_MODULE_6__global__.a.methods || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a();
        var listenForMethods = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__.d)(function() {
            __WEBPACK_IMPORTED_MODULE_6__global__.a.on(__WEBPACK_IMPORTED_MODULE_3__conf__.a.POST_MESSAGE_NAMES.METHOD, {
                origin: __WEBPACK_IMPORTED_MODULE_3__conf__.a.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = __WEBPACK_IMPORTED_MODULE_6__global__.a.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_cross_domain_utils_src__.f)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return __WEBPACK_IMPORTED_MODULE_5__log__.a.debug("Call local method", data.name, data.args), 
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
                domain = options.domain || __WEBPACK_IMPORTED_MODULE_3__conf__.a.WILDCARD;
                var hash = options.name + "_" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.d)();
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.e)(win)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.get(win);
                requestPromises || (requestPromises = [], __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises.set(win, requestPromises));
                var requestPromise = __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.try(function() {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.j)(window, win)) return __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__.a.resolve(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib__.p)(win, options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.b.CHILD_WINDOW_TIMEOUT));
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
                        }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.d)(hash, responseListener)), 
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.e)(win, {
                            type: __WEBPACK_IMPORTED_MODULE_3__conf__.a.POST_MESSAGE_TYPE.REQUEST,
                            hash: hash,
                            name: name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, domain).catch(reject), options.fireAndForget) return resolve();
                        var ackTimeout = __WEBPACK_IMPORTED_MODULE_3__conf__.b.ACK_TIMEOUT, resTimeout = options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.b.RES_TIMEOUT, cycleTime = 100, cycle = function cycle() {
                            if (!hasResult) {
                                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.e)(win)) return reject(responseListener.ack ? new Error("Window closed for " + name + " before response") : new Error("Window closed for " + name + " before ack"));
                                ackTimeout -= cycleTime, resTimeout -= cycleTime;
                                if (responseListener.ack) {
                                    if (resTimeout === 1 / 0) return;
                                    cycleTime = Math.min(resTimeout, 2e3);
                                } else {
                                    if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.g)() + " in " + __WEBPACK_IMPORTED_MODULE_3__conf__.b.ACK_TIMEOUT + "ms"));
                                    if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__.g)() + " in " + (options.timeout || __WEBPACK_IMPORTED_MODULE_3__conf__.b.RES_TIMEOUT) + "ms"));
                                }
                                setTimeout(cycle, cycleTime);
                            }
                        };
                        setTimeout(cycle, cycleTime);
                    });
                });
                return requestPromise.catch(function() {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.f)(hash), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__drivers__.g)(hash);
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
        }), __webpack_exports__.b = request, __webpack_exports__.c = sendToParent, __webpack_exports__.d = client;
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__ = __webpack_require__(6), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_3__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_4__drivers__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_5__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(3);
        __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises = __WEBPACK_IMPORTED_MODULE_6__global__.a.requestPromises || new __WEBPACK_IMPORTED_MODULE_0_cross_domain_safe_weakmap_src__.a(), 
        __WEBPACK_IMPORTED_MODULE_6__global__.a.send = _send;
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function disable() {
            delete window[__WEBPACK_IMPORTED_MODULE_0__conf__.a.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", __WEBPACK_IMPORTED_MODULE_1__drivers__.b);
        }
        __webpack_exports__.c = disable;
        var __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_1__drivers__ = __webpack_require__(5);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.b;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__conf__.a;
        });
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
                domain: domain || __WEBPACK_IMPORTED_MODULE_4__conf__.a.WILDCARD,
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
                win && "object" === (void 0 === win ? "undefined" : _typeof(win)) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__.e)(win) && (interval.cancel(), 
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
        var __WEBPACK_IMPORTED_MODULE_0_cross_domain_utils_src__ = __webpack_require__(1), __WEBPACK_IMPORTED_MODULE_1_zalgo_promise_src__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2__lib__ = __webpack_require__(4), __WEBPACK_IMPORTED_MODULE_3__drivers__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_4__conf__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_5__global__ = __webpack_require__(3), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        __WEBPACK_IMPORTED_MODULE_5__global__.a.on = _on;
    } ]);
});
//# sourceMappingURL=post-robot.js.map