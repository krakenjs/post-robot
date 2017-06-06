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
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 39);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _config = __webpack_require__(29);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _constants = __webpack_require__(13);
        Object.keys(_constants).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _constants[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        function setWindowMatch(win, match) {
            global.domainMatches = global.domainMatches || new _src.WeakMap(), global.domainMatches.set(win, match), 
            domainMatchTimeout || (domainMatchTimeout = setTimeout(function() {
                global.domainMatches = new _src.WeakMap(), domainMatchTimeout = null;
            }, 1));
        }
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
        function isActuallySameDomain(win) {
            if (global.domainMatches.has(win)) {
                var _match = global.domainMatches.get(win);
                if (_match) return !0;
            }
            var match = !1;
            try {
                getActualDomain(win) === getActualDomain(window) && (match = !0);
            } catch (err) {}
            return match || setWindowMatch(win, match), match;
        }
        function isSameDomain(win) {
            if (global.domainMatches.has(win)) return global.domainMatches.get(win);
            var match = !1;
            try {
                getDomain(window) === getDomain(win) && (match = !0);
            } catch (err) {}
            return setWindowMatch(win, match), match;
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
            return childParent ? childParent === parent : getParents(child).indexOf(parent) !== -1;
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
        function getAllFramesInWindow(win) {
            var result = getAllChildFrames(win);
            result.push(win);
            for (var _iterator3 = getParents(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                var _ref3;
                if (_isArray3) {
                    if (_i4 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i4++];
                } else {
                    if (_i4 = _iterator3.next(), _i4.done) break;
                    _ref3 = _i4.value;
                }
                var parent = _ref3;
                result.push(parent);
                for (var _iterator4 = getFrames(parent), _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i5 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i5++];
                    } else {
                        if (_i5 = _iterator4.next(), _i5.done) break;
                        _ref4 = _i5.value;
                    }
                    var frame = _ref4;
                    result.indexOf(frame) === -1 && result.push(frame);
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
                    if (isAncestorParent(window, win)) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window)) return window.top;
                } catch (err) {}
                for (var _iterator5 = getAllChildFrames(win), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray5) {
                        if (_i6 >= _iterator5.length) break;
                        _ref5 = _iterator5[_i6++];
                    } else {
                        if (_i6 = _iterator5.next(), _i6.done) break;
                        _ref5 = _i6.value;
                    }
                    var frame = _ref5;
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
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
                return !err || "Call was rejected by callee.\r\n" !== err.message;
            }
            if (allowMock && isSameDomain(win)) try {
                if (win.mockclosed) return !0;
            } catch (err) {}
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            return !1;
        }
        function getUserAgent(win) {
            return win = win || window, win.navigator.mockUserAgent || win.navigator.userAgent;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _iterator6 = winFrames, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                var _ref6;
                if (_isArray6) {
                    if (_i7 >= _iterator6.length) break;
                    _ref6 = _iterator6[_i7++];
                } else {
                    if (_i7 = _iterator6.next(), _i7.done) break;
                    _ref6 = _i7.value;
                }
                var childFrame = _ref6;
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) return childFrame;
                } catch (err) {}
            }
            try {
                if (winFrames.indexOf(win.frames[name]) !== -1) return win.frames[name];
            } catch (err) {}
            try {
                if (winFrames.indexOf(win[name]) !== -1) return win[name];
            } catch (err) {}
        }
        function findChildFrameByName(win, name) {
            var frame = getFrameByName(win, name);
            if (frame) return frame;
            for (var _iterator7 = getFrames(win), _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator](); ;) {
                var _ref7;
                if (_isArray7) {
                    if (_i8 >= _iterator7.length) break;
                    _ref7 = _iterator7[_i8++];
                } else {
                    if (_i8 = _iterator7.next(), _i8.done) break;
                    _ref7 = _i8.value;
                }
                var childFrame = _ref7, namedFrame = findChildFrameByName(childFrame, name);
                if (namedFrame) return namedFrame;
            }
        }
        function findFrameByName(win, name) {
            var frame = void 0;
            return frame = getFrameByName(win, name), frame ? frame : findChildFrameByName(getTop(win), name);
        }
        function isParent(win, frame) {
            var frameParent = getParent(frame);
            if (frameParent) return frameParent === win;
            for (var _iterator8 = getFrames(win), _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                var _ref8;
                if (_isArray8) {
                    if (_i9 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i9++];
                } else {
                    if (_i9 = _iterator8.next(), _i9.done) break;
                    _ref8 = _i9.value;
                }
                var childFrame = _ref8;
                if (childFrame === frame) return !0;
            }
            return !1;
        }
        function isOpener(parent, child) {
            return parent === getOpener(child);
        }
        function getAncestor(win) {
            win = win || window;
            var opener = getOpener(win);
            if (opener) return opener;
            var parent = getParent(win);
            return parent ? parent : void 0;
        }
        function getAncestors(win) {
            for (var results = [], ancestor = win; ancestor; ) ancestor = getAncestor(ancestor), 
            ancestor && results.push(ancestor);
            return results;
        }
        function isAncestor(parent, child) {
            var actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (var _iterator9 = getFrames(parent), _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                var _ref9;
                if (_isArray9) {
                    if (_i10 >= _iterator9.length) break;
                    _ref9 = _iterator9[_i10++];
                } else {
                    if (_i10 = _iterator9.next(), _i10.done) break;
                    _ref9 = _i10.value;
                }
                var frame = _ref9;
                if (frame === child) return !0;
            }
            return !1;
        }
        function isPopup() {
            return Boolean(getOpener(window));
        }
        function isIframe() {
            return Boolean(getParent(window));
        }
        function isFullpage() {
            return Boolean(!isIframe() && !isPopup());
        }
        function anyMatch(collection1, collection2) {
            for (var _iterator10 = collection1, _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator](); ;) {
                var _ref10;
                if (_isArray10) {
                    if (_i11 >= _iterator10.length) break;
                    _ref10 = _iterator10[_i11++];
                } else {
                    if (_i11 = _iterator10.next(), _i11.done) break;
                    _ref10 = _i11.value;
                }
                for (var item1 = _ref10, _iterator11 = collection2, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator](); ;) {
                    var _ref11;
                    if (_isArray11) {
                        if (_i12 >= _iterator11.length) break;
                        _ref11 = _iterator11[_i12++];
                    } else {
                        if (_i12 = _iterator11.next(), _i12.done) break;
                        _ref11 = _i12.value;
                    }
                    var item2 = _ref11;
                    if (item1 === item2) return !0;
                }
            }
        }
        function isSameTopWindow(win1, win2) {
            var top1 = getTop(win1), top2 = getTop(win2);
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            var opener1 = getOpener(top1), opener2 = getOpener(top2);
            return (!opener1 || !anyMatch(getAllFramesInWindow(opener1), allFrames2)) && ((!opener2 || !anyMatch(getAllFramesInWindow(opener2), allFrames1)) && void 0);
        }
        function matchDomain(domain, origin) {
            return "string" == typeof domain ? !(0, _util.isRegex)(origin) && (!Array.isArray(origin) && (domain === CONSTANTS.WILDCARD || origin === domain)) : (0, 
            _util.isRegex)(domain) ? (0, _util.isRegex)(origin) ? domain.toString() === origin.toString() : !Array.isArray(origin) && origin.match(domain) : !!Array.isArray(domain) && (!(0, 
            _util.isRegex)(origin) && (Array.isArray(origin) ? JSON.stringify(domain) === JSON.stringify(origin) : domain.indexOf(origin) !== -1));
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getActualDomain = getActualDomain, exports.getDomain = getDomain, exports.isActuallySameDomain = isActuallySameDomain, 
        exports.isSameDomain = isSameDomain, exports.getParent = getParent, exports.getOpener = getOpener, 
        exports.getParents = getParents, exports.isAncestorParent = isAncestorParent, exports.getFrames = getFrames, 
        exports.getAllChildFrames = getAllChildFrames, exports.getAllFramesInWindow = getAllFramesInWindow, 
        exports.getTop = getTop, exports.isWindowClosed = isWindowClosed, exports.getUserAgent = getUserAgent, 
        exports.getFrameByName = getFrameByName, exports.findChildFrameByName = findChildFrameByName, 
        exports.findFrameByName = findFrameByName, exports.isParent = isParent, exports.isOpener = isOpener, 
        exports.getAncestor = getAncestor, exports.getAncestors = getAncestors, exports.isAncestor = isAncestor, 
        exports.isPopup = isPopup, exports.isIframe = isIframe, exports.isFullpage = isFullpage, 
        exports.isSameTopWindow = isSameTopWindow, exports.matchDomain = matchDomain;
        var _src = __webpack_require__(4), _util = __webpack_require__(22), global = window.__crossDomainUtils__ = window.__crossDomainUtils__ || {};
        global.domainMatches = global.domainMatches || new _src.WeakMap();
        var domainMatchTimeout = void 0, CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            WILDCARD: "*"
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _promise = __webpack_require__(16);
        Object.keys(_promise).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _promise[key];
                }
            });
        });
        var _util = __webpack_require__(7);
        Object.keys(_util).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _util[key];
                }
            });
        });
        var _log = __webpack_require__(11);
        Object.keys(_log).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _log[key];
                }
            });
        });
        var _methods = __webpack_require__(33);
        Object.keys(_methods).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _methods[key];
                }
            });
        });
        var _tick = __webpack_require__(17);
        Object.keys(_tick).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _tick[key];
                }
            });
        });
        var _ready = __webpack_require__(34);
        Object.keys(_ready).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ready[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.global = void 0;
        var _conf = __webpack_require__(0), global = exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function() {};
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(18);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = _interopRequireWildcard(_interface);
        exports.default = INTERFACE;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _receive = __webpack_require__(30);
        Object.keys(_receive).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _receive[key];
                }
            });
        });
        var _send = __webpack_require__(15);
        Object.keys(_send).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _send[key];
                }
            });
        });
        var _listeners = __webpack_require__(14);
        Object.keys(_listeners).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _listeners[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function init() {
            _global.global.initialized || ((0, _drivers.listenForMessages)(), __webpack_require__(10).openTunnelToOpener(), 
            (0, _lib.initOnReady)(), (0, _lib.listenForMethods)()), _global.global.initialized = !0;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Promise = exports.cleanUpWindow = void 0;
        var _clean = __webpack_require__(27);
        Object.defineProperty(exports, "cleanUpWindow", {
            enumerable: !0,
            get: function() {
                return _clean.cleanUpWindow;
            }
        }), exports.init = init;
        var _public = __webpack_require__(37);
        Object.keys(_public).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _public[key];
                }
            });
        });
        var _lib = __webpack_require__(2);
        Object.defineProperty(exports, "Promise", {
            enumerable: !0,
            get: function() {
                return _lib.Promise;
            }
        });
        var _drivers = __webpack_require__(5), _global = __webpack_require__(3);
        init();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function once(method) {
            if (!method) return method;
            var called = !1;
            return function() {
                if (!called) return called = !0, method.apply(this, arguments);
            };
        }
        function noop() {}
        function safeHasProp(obj, name) {
            try {
                return !!obj[name];
            } catch (err) {
                return !1;
            }
        }
        function safeGetProp(obj, name) {
            try {
                return obj[name];
            } catch (err) {
                return;
            }
        }
        function listen(win, event, handler) {
            return win.addEventListener ? win.addEventListener(event, handler) : win.attachEvent("on" + event, handler), 
            {
                cancel: function() {
                    win.removeEventListener ? win.removeEventListener(event, handler) : win.detachEvent("on" + event, handler);
                }
            };
        }
        function apply(method, context, args) {
            return "function" == typeof method.apply ? method.apply(context, args) : method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        }
        function find(collection, method, def) {
            if (!collection) return def;
            for (var i = 0; i < collection.length; i++) if (method(collection[i])) return collection[i];
            return def;
        }
        function map(collection, method) {
            for (var results = [], i = 0; i < collection.length; i++) results.push(method(collection[i]));
            return results;
        }
        function some(collection, method) {
            method = method || Boolean;
            for (var i = 0; i < collection.length; i++) if (method(collection[i])) return !0;
            return !1;
        }
        function keys(mapping) {
            var result = [];
            for (var key in mapping) mapping.hasOwnProperty(key) && result.push(key);
            return result;
        }
        function values(mapping) {
            var result = [];
            for (var key in mapping) mapping.hasOwnProperty(key) && result.push(mapping[key]);
            return result;
        }
        function getByValue(mapping, value) {
            for (var key in mapping) if (mapping.hasOwnProperty(key) && mapping[key] === value) return key;
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            });
        }
        function memoize(method) {
            var results = {};
            return function() {
                var args = JSON.stringify(Array.prototype.slice.call(arguments));
                return results.hasOwnProperty(args) || (results[args] = method.apply(this, arguments)), 
                results[args];
            };
        }
        function extend(obj, source) {
            if (!source) return obj;
            for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function each(obj, callback) {
            if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) callback(obj[i], i); else if ("object" === ("undefined" == typeof obj ? "undefined" : _typeof(obj)) && null !== obj) for (var key in obj) obj.hasOwnProperty(key) && callback(obj[key], key);
        }
        function replaceObject(obj, callback) {
            var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            var newobj = Array.isArray(obj) ? [] : {};
            return each(obj, function(item, key) {
                var result = callback(item, key);
                void 0 !== result ? newobj[key] = result : "object" === ("undefined" == typeof item ? "undefined" : _typeof(item)) && null !== item ? newobj[key] = replaceObject(item, callback, depth + 1) : newobj[key] = item;
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
        function intervalTimeout(time, interval, method) {
            var _safeInterval = safeInterval(function() {
                time -= interval, time = time <= 0 ? 0 : time, 0 === time && _safeInterval.cancel(), 
                method(time);
            }, interval);
            return safeInterval;
        }
        function getDomainFromUrl(url) {
            var domain = void 0;
            return url.match(/^(https?|mock|file):\/\//) ? (domain = url, domain = domain.split("/").slice(0, 3).join("/")) : (0, 
            _src2.getDomain)();
        }
        function safeGet(obj, prop) {
            var result = void 0;
            try {
                result = obj[prop];
            } catch (err) {}
            return result;
        }
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        function weakMapMemoize(method) {
            var weakmap = new _src.WeakMap();
            return function(arg) {
                var result = weakmap.get(arg);
                return "undefined" != typeof result ? result : (result = method.call(this, arg), 
                "undefined" != typeof result && weakmap.set(arg, result), result);
            };
        }
        function getWindowType() {
            return (0, _src2.isPopup)() ? _conf.CONSTANTS.WINDOW_TYPES.POPUP : (0, _src2.isIframe)() ? _conf.CONSTANTS.WINDOW_TYPES.IFRAME : _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify() {
            var objectToJSON = void 0, arrayToJSON = void 0;
            try {
                if ("{}" !== JSON.stringify({}) && (objectToJSON = Object.prototype.toJSON, delete Object.prototype.toJSON), 
                "{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                if ("[]" !== JSON.stringify([]) && (arrayToJSON = Array.prototype.toJSON, delete Array.prototype.toJSON), 
                "[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            var result = JSON.stringify.apply(this, arguments);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON), arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error("Can not repair JSON.stringify: " + err.message);
            }
            return result;
        }
        function jsonParse() {
            return JSON.parse.apply(this, arguments);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.once = once, exports.noop = noop, exports.safeHasProp = safeHasProp, exports.safeGetProp = safeGetProp, 
        exports.listen = listen, exports.apply = apply, exports.find = find, exports.map = map, 
        exports.some = some, exports.keys = keys, exports.values = values, exports.getByValue = getByValue, 
        exports.uniqueID = uniqueID, exports.memoize = memoize, exports.extend = extend, 
        exports.each = each, exports.replaceObject = replaceObject, exports.safeInterval = safeInterval, 
        exports.intervalTimeout = intervalTimeout, exports.getDomainFromUrl = getDomainFromUrl, 
        exports.safeGet = safeGet, exports.isRegex = isRegex, exports.weakMapMemoize = weakMapMemoize, 
        exports.getWindowType = getWindowType, exports.jsonStringify = jsonStringify, exports.jsonParse = jsonParse;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function trycatch(method, successHandler, errorHandler) {
            function flush() {
                if (isCalled) {
                    if (isError) return errorHandler(err);
                    if (isSuccess) return successHandler(res);
                }
            }
            var isCalled = !1, isSuccess = !1, isError = !1, err = void 0, res = void 0;
            try {
                method(function(result) {
                    res = result, isSuccess = !0, flush();
                }, function(error) {
                    err = error, isError = !0, flush();
                });
            } catch (error) {
                return errorHandler(error);
            }
            isCalled = !0, flush();
        }
        function addPossiblyUnhandledPromise(promise) {
            possiblyUnhandledPromises.push(promise), possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
        }
        function flushPossiblyUnhandledPromises() {
            possiblyUnhandledPromiseTimeout = null;
            var promises = possiblyUnhandledPromises;
            possiblyUnhandledPromises = [];
            for (var _loop = function(i) {
                var promise = promises[i];
                return promise.silentReject ? "continue" : (promise.handlers.push({
                    onError: function(err) {
                        promise.silentReject || dispatchError(err);
                    }
                }), void promise.dispatch());
            }, i = 0; i < promises.length; i++) {
                _loop(i);
            }
        }
        function dispatchError(err) {
            if (dispatchedErrors.indexOf(err) === -1) {
                dispatchedErrors.push(err), setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
            }
        }
        function isPromise(item) {
            try {
                if (!item) return !1;
                if (window.Window && item instanceof window.Window) return !1;
                if (window.constructor && item instanceof window.constructor) return !1;
                if (toString) {
                    var name = toString.call(item);
                    if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                }
                if (item && item.then instanceof Function) return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function patchPromise() {
            window.Promise = SyncPromise;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.patchPromise = patchPromise;
        var possiblyUnhandledPromiseHandlers = [], possiblyUnhandledPromises = [], possiblyUnhandledPromiseTimeout = void 0, dispatchedErrors = [], toString = {}.toString, SyncPromise = exports.SyncPromise = function(handler) {
            if (this.resolved = !1, this.rejected = !1, this.silentReject = !1, this.handlers = [], 
            addPossiblyUnhandledPromise(this), handler) {
                var self = this;
                trycatch(handler, function(res) {
                    return self.resolve(res);
                }, function(err) {
                    return self.reject(err);
                });
            }
        };
        SyncPromise.resolve = function(value) {
            return isPromise(value) ? value : new SyncPromise().resolve(value);
        }, SyncPromise.reject = function(error) {
            return new SyncPromise().reject(error);
        }, SyncPromise.prototype.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (isPromise(result)) throw new Error("Can not resolve promise with another promise");
            return this.resolved = !0, this.value = result, this.dispatch(), this;
        }, SyncPromise.prototype.reject = function(error) {
            if (this.resolved || this.rejected) return this;
            if (isPromise(error)) throw new Error("Can not reject promise with another promise");
            return error || (error = new Error("Expected reject to be called with Error, got " + error)), 
            this.rejected = !0, this.value = error, this.dispatch(), this;
        }, SyncPromise.prototype.asyncReject = function(error) {
            this.silentReject = !0, this.reject(error);
        }, SyncPromise.prototype.dispatch = function() {
            var _this = this;
            if (this.resolved || this.rejected) for (var _loop2 = function() {
                var handler = _this.handlers.shift(), isError = !1, result = void 0, error = void 0;
                try {
                    _this.resolved ? result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value : _this.rejected && (handler.onError ? result = handler.onError(_this.value) : (isError = !0, 
                    error = _this.value));
                } catch (err) {
                    isError = !0, error = err;
                }
                if (result === _this) throw new Error("Can not return a promise from the the then handler of the same promise");
                return handler.promise ? void (isError ? handler.promise.reject(error) : isPromise(result) ? result.then(function(res) {
                    handler.promise.resolve(res);
                }, function(err) {
                    handler.promise.reject(err);
                }) : handler.promise.resolve(result)) : "continue";
            }; this.handlers.length; ) {
                _loop2();
            }
        }, SyncPromise.prototype.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new SyncPromise(null, this);
            return this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            }), this.silentReject = !0, this.dispatch(), promise;
        }, SyncPromise.prototype.catch = function(onError) {
            return this.then(null, onError);
        }, SyncPromise.prototype.finally = function(handler) {
            return this.then(function(result) {
                return SyncPromise.try(handler).then(function() {
                    return result;
                });
            }, function(err) {
                return SyncPromise.try(handler).then(function() {
                    throw err;
                });
            });
        }, SyncPromise.all = function(promises) {
            for (var promise = new SyncPromise(), count = promises.length, results = [], _loop3 = function(i) {
                var prom = isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i]);
                prom.then(function(result) {
                    results[i] = result, count -= 1, 0 === count && promise.resolve(results);
                }, function(err) {
                    promise.reject(err);
                });
            }, i = 0; i < promises.length; i++) _loop3(i);
            return count || promise.resolve(results), promise;
        }, SyncPromise.onPossiblyUnhandledException = function(handler) {
            possiblyUnhandledPromiseHandlers.push(handler);
        }, SyncPromise.try = function(method) {
            return SyncPromise.resolve().then(method);
        }, SyncPromise.delay = function(delay) {
            return new SyncPromise(function(resolve) {
                setTimeout(resolve, delay);
            });
        }, SyncPromise.hash = function(obj) {
            var results = {}, promises = [], _loop4 = function(key) {
                obj.hasOwnProperty(key) && promises.push(SyncPromise.resolve(obj[key]).then(function(result) {
                    results[key] = result;
                }));
            };
            for (var key in obj) _loop4(key);
            return SyncPromise.all(promises).then(function() {
                return results;
            });
        }, SyncPromise.promisifyCall = function() {
            var args = Array.prototype.slice.call(arguments), method = args.shift();
            if ("function" != typeof method) throw new Error("Expected promisifyCall to be called with a function");
            return new SyncPromise(function(resolve, reject) {
                return args.push(function(err, result) {
                    return err ? reject(err) : resolve(result);
                }), method.apply(null, args);
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function needsBridgeForBrowser() {
            return !!(0, _src2.getUserAgent)(window).match(/MSIE|trident|edge/i) || !_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP;
        }
        function needsBridgeForWin(win) {
            return (!win || !(0, _src2.isSameTopWindow)(window, win)) && (!win || !(0, _src2.isSameDomain)(win));
        }
        function needsBridgeForDomain(domain) {
            return !domain || (0, _src2.getDomain)() !== (0, _lib.getDomainFromUrl)(domain);
        }
        function needsBridge(_ref) {
            var win = _ref.win, domain = _ref.domain;
            return needsBridgeForBrowser() && needsBridgeForWin(win) && needsBridgeForDomain(domain);
        }
        function getBridgeName(domain) {
            domain = domain || (0, _lib.getDomainFromUrl)(domain);
            var sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, "_"), id = _conf.CONSTANTS.BRIDGE_NAME_PREFIX + "_" + sanitizedDomain;
            return id;
        }
        function isBridge() {
            return window.name && window.name === getBridgeName((0, _src2.getDomain)());
        }
        function registerRemoteWindow(win) {
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _conf.CONFIG.BRIDGE_TIMEOUT;
            _global.global.remoteWindows.set(win, {
                sendMessagePromise: new _lib.promise.Promise()
            });
        }
        function findRemoteWindow(win) {
            return _global.global.remoteWindows.get(win);
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
            var sendMessageWrapper = function(remoteWin, message, remoteDomain) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if (!(0, _src2.matchDomain)(remoteDomain, domain)) throw new Error("Remote domain " + remoteDomain + " does not match domain " + domain);
                sendMessage(message);
            };
            remoteWindow.sendMessagePromise.resolve(sendMessageWrapper), remoteWindow.sendMessagePromise = _lib.promise.Promise.resolve(sendMessageWrapper);
        }
        function rejectRemoteSendMessage(win, err) {
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
            remoteWindow.sendMessagePromise.asyncReject(err);
        }
        function sendBridgeMessage(win, message, domain) {
            var messagingChild = (0, _src2.isOpener)(window, win), messagingParent = (0, _src2.isOpener)(win, window);
            if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
            var remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to send message to");
            return remoteWindow.sendMessagePromise.then(function(sendMessage) {
                return sendMessage(win, message, domain);
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.documentBodyReady = void 0, exports.needsBridgeForBrowser = needsBridgeForBrowser, 
        exports.needsBridgeForWin = needsBridgeForWin, exports.needsBridgeForDomain = needsBridgeForDomain, 
        exports.needsBridge = needsBridge, exports.getBridgeName = getBridgeName, exports.isBridge = isBridge, 
        exports.registerRemoteWindow = registerRemoteWindow, exports.findRemoteWindow = findRemoteWindow, 
        exports.registerRemoteSendMessage = registerRemoteSendMessage, exports.rejectRemoteSendMessage = rejectRemoteSendMessage, 
        exports.sendBridgeMessage = sendBridgeMessage;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _global = __webpack_require__(3), _drivers = __webpack_require__(5);
        exports.documentBodyReady = new _lib.promise.Promise(function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(function() {
                if (window.document && window.document.body) return clearInterval(interval), resolve(window.document.body);
            }, 10);
        });
        _global.global.remoteWindows = _global.global.remoteWindows || new _src.WeakMap(), 
        _global.global.receiveMessage = function(event) {
            return (0, _drivers.receiveMessage)(event);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _bridge = __webpack_require__(23);
        Object.keys(_bridge).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _bridge[key];
                }
            });
        });
        var _child = __webpack_require__(24);
        Object.keys(_child).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _child[key];
                }
            });
        });
        var _common = __webpack_require__(9);
        Object.keys(_common).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _common[key];
                }
            });
        });
        var _parent = __webpack_require__(26);
        Object.keys(_parent).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _parent[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.log = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _util = __webpack_require__(7), _conf = __webpack_require__(0), LOG_LEVELS = [ "debug", "info", "warn", "error" ];
        Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
        var log = exports.log = {
            clearLogs: function() {
                if (window.console && window.console.clear && window.console.clear(), _conf.CONFIG.LOG_TO_PAGE) {
                    var container = document.getElementById("postRobotLogs");
                    container && container.parentNode.removeChild(container);
                }
            },
            writeToPage: function(level, args) {
                setTimeout(function() {
                    var container = document.getElementById("postRobotLogs");
                    container || (container = document.createElement("div"), container.id = "postRobotLogs", 
                    container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;", 
                    document.body.appendChild(container));
                    var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = (0, 
                    _util.map)(args, function(item) {
                        if ("string" == typeof item) return item;
                        if (!item) return Object.prototype.toString.call(item);
                        var json = void 0;
                        try {
                            json = (0, _util.jsonStringify)(item, 0, 2);
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
                        var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;
                        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                        if (args = Array.prototype.slice.call(args), args.unshift("" + window.location.host + window.location.pathname), 
                        args.unshift("::"), args.unshift("" + (0, _util.getWindowType)().toLowerCase()), 
                        args.unshift("[post-robot]"), _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args), 
                        !window.console) return;
                        if (window.console[level] || (level = "log"), !window.console[level]) return;
                        window.console[level].apply(window.console, args);
                    } catch (err) {}
                }, 1);
            },
            debug: function() {
                log.logLevel("debug", arguments);
            },
            info: function() {
                log.logLevel("info", arguments);
            },
            warn: function() {
                log.logLevel("warn", arguments);
            },
            error: function() {
                log.logLevel("error", arguments);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _ie = __webpack_require__(28);
        Object.keys(_ie).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _ie[key];
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var CONSTANTS = exports.CONSTANTS = {
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
                ERROR: "postrobot_error"
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
        };
        exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function(key) {
            return CONSTANTS.POST_MESSAGE_NAMES[key];
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function resetListeners() {
            _global.global.responseListeners = {}, _global.global.requestListeners = {};
        }
        function addResponseListener(hash, listener) {
            _global.global.responseListeners[hash] = listener;
        }
        function getResponseListener(hash) {
            return _global.global.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete _global.global.responseListeners[hash];
        }
        function getRequestListener(qualifiers) {
            var name = qualifiers.name, win = qualifiers.win, domain = qualifiers.domain;
            if (win === _conf.CONSTANTS.WILDCARD && (win = null), domain === _conf.CONSTANTS.WILDCARD && (domain = null), 
            !name) throw new Error("Name required to get request listener");
            var nameListeners = _global.global.requestListeners[name];
            if (nameListeners) for (var _arr = [ win, _global.global.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                if (winListeners) {
                    for (var _arr2 = [ domain, _conf.CONSTANTS.WILDCARD ], _i2 = 0; _i2 < _arr2.length; _i2++) {
                        var domainQualifier = _arr2[_i2];
                        if (domainQualifier && (domainQualifier = domainQualifier.toString(), winListeners[domainQualifier])) return winListeners[domainQualifier];
                    }
                    if (winListeners[__DOMAIN_REGEX__]) for (var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray) {
                            if (_i3 >= _iterator.length) break;
                            _ref2 = _iterator[_i3++];
                        } else {
                            if (_i3 = _iterator.next(), _i3.done) break;
                            _ref2 = _i3.value;
                        }
                        var _ref3 = _ref2, regex = _ref3.regex, listener = _ref3.listener;
                        if ((0, _src2.matchDomain)(regex, domain)) return listener;
                    }
                }
            }
        }
        function addRequestListener(qualifiers, listener) {
            var name = qualifiers.name, win = qualifiers.win, domain = qualifiers.domain;
            if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
            if (Array.isArray(win)) for (var _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i4 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref4;
                if (_isArray2) {
                    if (_i4 >= _iterator2.length) break;
                    _ref4 = _iterator2[_i4++];
                } else {
                    if (_i4 = _iterator2.next(), _i4.done) break;
                    _ref4 = _i4.value;
                }
                var item = _ref4;
                addRequestListener({
                    name: name,
                    domain: domain,
                    win: item
                }, listener);
            } else {
                if (!Array.isArray(domain)) {
                    var existingListener = getRequestListener(qualifiers);
                    if (win && win !== _conf.CONSTANTS.WILDCARD || (win = _global.global.WINDOW_WILDCARD), 
                    domain = domain || _conf.CONSTANTS.WILDCARD, existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain + " for specified window") : win ? new Error("Request listener already exists for " + name + " for specified window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain) : new Error("Request listener already exists for " + name);
                    var requestListeners = _global.global.requestListeners, nameListeners = requestListeners[name];
                    nameListeners || (nameListeners = new _src.WeakMap(), requestListeners[name] = nameListeners);
                    var winListeners = nameListeners.get(win);
                    winListeners || (winListeners = {}, nameListeners.set(win, winListeners));
                    var strDomain = domain.toString();
                    winListeners[strDomain] = listener;
                    var regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
                    return (0, _lib.isRegex)(domain) && (regexListeners || (regexListeners = [], winListeners[__DOMAIN_REGEX__] = regexListeners), 
                    regexListener = {
                        regex: domain,
                        listener: listener
                    }, regexListeners.push(regexListener)), {
                        cancel: function() {
                            delete winListeners[strDomain], 0 === Object.keys(winListeners).length && nameListeners.delete(win), 
                            regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                        }
                    };
                }
                for (var _iterator3 = domain, _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray3) {
                        if (_i5 >= _iterator3.length) break;
                        _ref5 = _iterator3[_i5++];
                    } else {
                        if (_i5 = _iterator3.next(), _i5.done) break;
                        _ref5 = _i5.value;
                    }
                    var _item = _ref5;
                    addRequestListener({
                        name: name,
                        win: win,
                        domain: _item
                    }, listener);
                }
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.resetListeners = resetListeners, exports.addResponseListener = addResponseListener, 
        exports.getResponseListener = getResponseListener, exports.deleteResponseListener = deleteResponseListener, 
        exports.getRequestListener = getRequestListener, exports.addRequestListener = addRequestListener;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _global = __webpack_require__(3), _lib = __webpack_require__(2), _conf = __webpack_require__(0);
        _global.global.responseListeners = _global.global.responseListeners || {}, _global.global.requestListeners = _global.global.requestListeners || {}, 
        _global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function() {}();
        var __DOMAIN_REGEX__ = "__domain_regex__";
    }, function(module, exports, __webpack_require__) {
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
            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = (0, 
            _lib.uniqueID)(), type = (0, _lib.getWindowType)(), sourceDomain = (0, _src.getDomain)(window);
            return _extends({}, message, options, {
                sourceDomain: sourceDomain,
                id: message.id || id,
                windowType: type
            });
        }
        function sendMessage(win, message, domain) {
            return _lib.promise.run(function() {
                message = buildMessage(win, message, {
                    data: (0, _lib.serializeMethods)(win, domain, message.data),
                    domain: domain
                });
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message ]), 
                _conf.CONFIG.MOCK_MODE) return delete message.target, window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
                    origin: (0, _src.getDomain)(window),
                    source: window,
                    data: (0, _lib.jsonStringify)(message, 0, 2)
                });
                if (win === window) throw new Error("Attemping to send message to self");
                if ((0, _src.isWindowClosed)(win)) throw new Error("Window is closed");
                _lib.log.debug("Running send message strategies", message);
                var messages = [], serializedMessage = (0, _lib.jsonStringify)(_defineProperty({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), 0, 2);
                return _lib.promise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                    return _lib.promise.run(function() {
                        if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                        return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                    }).then(function() {
                        return messages.push(strategyName + ": success"), !0;
                    }, function(err) {
                        return messages.push(strategyName + ": " + (err.stack || err.toString()) + "\n"), 
                        !1;
                    });
                }).then(function(results) {
                    var success = (0, _lib.some)(results), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                    if (_lib.log.debug(status), !success) throw new Error(status);
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.buildMessage = buildMessage, exports.sendMessage = sendMessage;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _strategies = __webpack_require__(32);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.promise = exports.Promise = void 0;
        var _promise = __webpack_require__(8), _tick = __webpack_require__(17), Promise = exports.Promise = _promise.SyncPromise, promise = exports.promise = {
            Promise: Promise,
            run: function(method) {
                return Promise.resolve().then(method);
            },
            nextTick: function(method) {
                return new Promise(function(resolve, reject) {
                    (0, _tick.nextTick)(function() {
                        return promise.run(method).then(resolve, reject);
                    });
                });
            },
            method: function(_method) {
                return function() {
                    var _this = this, _arguments = arguments;
                    return Promise.resolve().then(function() {
                        return _method.apply(_this, _arguments);
                    });
                };
            },
            nodeify: function(prom, callback) {
                return callback ? void prom.then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                }) : prom;
            },
            map: function(items, method) {
                for (var results = [], _loop = function(i) {
                    results.push(promise.run(function() {
                        return method(items[i]);
                    }));
                }, i = 0; i < items.length; i++) _loop(i);
                return Promise.all(results);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function nextTick(method) {
            queue.push(method), window.postMessage(tickMessageName, _conf.CONSTANTS.WILDCARD);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.nextTick = nextTick;
        var _util = __webpack_require__(7), _conf = __webpack_require__(0), tickMessageName = "__nextTick__postRobot__" + (0, 
        _util.uniqueID)(), queue = [];
        window.addEventListener("message", function(event) {
            if (event.data === tickMessageName) {
                var method = queue.shift();
                method.call();
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _weakmap = __webpack_require__(21);
        Object.defineProperty(exports, "WeakMap", {
            enumerable: !0,
            get: function() {
                return _weakmap.WeakMap;
            }
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function hasNativeWeakMap() {
            if (!window.WeakMap) return !1;
            if (!window.Object.freeze) return !1;
            try {
                var testWeakMap = new window.WeakMap(), testKey = {}, testValue = "__testvalue__";
                return window.Object.freeze(testKey), testWeakMap.set(testKey, testValue), testWeakMap.get(testKey) === testValue;
            } catch (err) {
                return !1;
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.hasNativeWeakMap = hasNativeWeakMap;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isWindow(obj) {
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {}
            return !1;
        }
        function isClosedWindow(obj) {
            try {
                if (obj && obj !== window && obj.closed) return !0;
            } catch (err) {
                return !err || "Call was rejected by callee.\r\n" !== err.message;
            }
            return !1;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isWindow = isWindow, exports.isClosedWindow = isClosedWindow;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.WeakMap = void 0;
        var _createClass = function() {
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
        }(), _util = __webpack_require__(20), _native = __webpack_require__(19), defineProperty = Object.defineProperty, counter = Date.now() % 1e9;
        exports.WeakMap = function() {
            function WeakMap() {
                if (_classCallCheck(this, WeakMap), counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
                (0, _native.hasNativeWeakMap)()) try {
                    this.weakmap = new window.WeakMap();
                } catch (err) {}
                this.keys = [], this.values = [];
            }
            return _createClass(WeakMap, [ {
                key: "_cleanupClosedWindows",
                value: function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if ((0, _util.isClosedWindow)(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                        }
                    }
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
                    if ((0, _util.isWindow)(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, values = this.values, index = keys.indexOf(key);
                        index === -1 ? (keys.push(key), values.push(value)) : values[index] = value;
                    } else {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
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
                    if ((0, _util.isWindow)(key)) {
                        var keys = this.keys, index = keys.indexOf(key);
                        if (index === -1) return;
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
                    if ((0, _util.isWindow)(key)) {
                        this._cleanupClosedWindows();
                        var keys = this.keys, index = keys.indexOf(key);
                        index !== -1 && (keys.splice(index, 1), this.values.splice(index, 1));
                    } else {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
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
                    if ((0, _util.isWindow)(key)) return this._cleanupClosedWindows(), this.keys.indexOf(key) !== -1;
                    var entry = key[this.name];
                    return !(!entry || entry[0] !== key);
                }
            } ]), WeakMap;
        }();
    }, function(module, exports) {
        function isRegex(item) {
            return "[object RegExp]" === Object.prototype.toString.call(item);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isRegex = isRegex;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function deleteTunnelWindow(id) {
            try {
                _global.global.tunnelWindows[id] && delete _global.global.tunnelWindows[id].source;
            } catch (err) {}
            delete _global.global.tunnelWindows[id];
        }
        function cleanTunnelWindows() {
            for (var tunnelWindows = _global.global.tunnelWindows, _iterator = Object.keys(tunnelWindows), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var key = _ref, tunnelWindow = tunnelWindows[key];
                try {
                    (0, _lib.noop)(tunnelWindow.source);
                } catch (err) {
                    deleteTunnelWindow(key);
                    continue;
                }
                (0, _src.isWindowClosed)(tunnelWindow.source) && deleteTunnelWindow(key);
            }
        }
        function addTunnelWindow(data) {
            return cleanTunnelWindows(), _global.global.tunnelWindowId += 1, _global.global.tunnelWindows[_global.global.tunnelWindowId] = data, 
            _global.global.tunnelWindowId;
        }
        function getTunnelWindow(id) {
            return _global.global.tunnelWindows[id];
        }
        var _conf = __webpack_require__(0), _src = __webpack_require__(1), _lib = __webpack_require__(2), _global = __webpack_require__(3), _interface = __webpack_require__(6);
        _global.global.tunnelWindows = _global.global.tunnelWindows || {}, _global.global.tunnelWindowId = 0, 
        _global.global.openTunnelToParent = function(data) {
            var parentWindow = (0, _src.getParent)(window);
            if (!parentWindow) throw new Error("No parent window found to open tunnel to");
            var id = addTunnelWindow(data);
            return (0, _interface.send)(parentWindow, _conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                name: data.name,
                sendMessage: function() {
                    var tunnelWindow = getTunnelWindow(id);
                    try {
                        (0, _lib.noop)(tunnelWindow && tunnelWindow.source);
                    } catch (err) {
                        return void deleteTunnelWindow(id);
                    }
                    if (tunnelWindow && tunnelWindow.source && !(0, _src.isWindowClosed)(tunnelWindow.source)) {
                        try {
                            tunnelWindow.canary();
                        } catch (err) {
                            return;
                        }
                        tunnelWindow.sendMessage.apply(this, arguments);
                    }
                }
            }, {
                domain: _conf.CONSTANTS.WILDCARD
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function openTunnelToOpener() {
            return _promise.SyncPromise.try(function() {
                var opener = (0, _src.getOpener)(window);
                if (opener && (0, _common.needsBridge)({
                    win: opener
                })) return (0, _common.registerRemoteWindow)(opener), awaitRemoteBridgeForWindow(opener).then(function(bridge) {
                    return bridge ? window.name ? bridge[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                        name: window.name,
                        source: window,
                        canary: function() {},
                        sendMessage: function(message) {
                            try {
                                (0, _lib.noop)(window);
                            } catch (err) {
                                return;
                            }
                            window && !window.closed && (0, _drivers.receiveMessage)({
                                data: message,
                                origin: this.origin,
                                source: this.source
                            });
                        }
                    }).then(function(_ref2) {
                        var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                        if (source !== opener) throw new Error("Source does not match opener");
                        (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
                    }).catch(function(err) {
                        throw (0, _common.rejectRemoteSendMessage)(opener, err), err;
                    }) : (0, _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: window does not have a name")) : (0, 
                    _common.rejectRemoteSendMessage)(opener, new Error("Can not register with opener: no bridge found in opener"));
                });
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.openTunnelToOpener = openTunnelToOpener;
        var _promise = __webpack_require__(8), _src = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _drivers = __webpack_require__(5), _common = __webpack_require__(9), awaitRemoteBridgeForWindow = (0, 
        _lib.weakMapMemoize)(function(win) {
            return _promise.SyncPromise.try(function() {
                for (var _iterator = (0, _src.getFrames)(win), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if (_i = _iterator.next(), _i.done) break;
                        _ref = _i.value;
                    }
                    var _frame = _ref;
                    try {
                        if (_frame && _frame !== window && (0, _src.isSameDomain)(_frame) && _frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) return _frame;
                    } catch (err) {
                        continue;
                    }
                }
                try {
                    var frame = (0, _src.getFrameByName)(win, (0, _common.getBridgeName)((0, _src.getDomain)()));
                    if (!frame) return;
                    return (0, _src.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? frame : new _promise.SyncPromise(function(resolve) {
                        var interval = void 0, timeout = void 0;
                        interval = setInterval(function() {
                            return (0, _src.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] ? (clearInterval(interval), 
                            clearTimeout(timeout), resolve(frame)) : void setTimeout(function() {
                                return clearInterval(interval), resolve();
                            }, 2e3);
                        }, 100);
                    });
                } catch (err) {
                    return;
                }
            });
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var openBridge = exports.openBridge = void 0, linkUrl = exports.linkUrl = void 0, isBridge = exports.isBridge = void 0, needsBridge = exports.needsBridge = void 0, needsBridgeForBrowser = exports.needsBridgeForBrowser = void 0, needsBridgeForWin = exports.needsBridgeForWin = void 0, needsBridgeForDomain = exports.needsBridgeForDomain = void 0, openTunnelToOpener = exports.openTunnelToOpener = void 0, destroyBridges = exports.destroyBridges = void 0, bridge = __webpack_require__(10);
        exports.openBridge = openBridge = bridge.openBridge, exports.linkUrl = linkUrl = bridge.linkUrl, 
        exports.isBridge = isBridge = bridge.isBridge, exports.needsBridge = needsBridge = bridge.needsBridge, 
        exports.needsBridgeForBrowser = needsBridgeForBrowser = bridge.needsBridgeForBrowser, 
        exports.needsBridgeForWin = needsBridgeForWin = bridge.needsBridgeForWin, exports.needsBridgeForDomain = needsBridgeForDomain = bridge.needsBridgeForDomain, 
        exports.openTunnelToOpener = openTunnelToOpener = bridge.openTunnelToOpener, exports.destroyBridges = destroyBridges = bridge.destroyBridges;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function listenForRegister(source, domain) {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                source: source,
                domain: domain
            }, function(_ref) {
                var origin = _ref.origin, data = _ref.data;
                if (origin !== domain) throw new Error("Domain " + domain + " does not match origin " + origin);
                if (!data.name) throw new Error("Register window expected to be passed window name");
                if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                if (!_global.global.popupWindowsByName[data.name]) throw new Error("Window with name " + data.name + " does not exist, or was not opened by this window");
                if (!_global.global.popupWindowsByName[data.name].domain) throw new Error("We do not have a registered domain for window " + data.name);
                if (_global.global.popupWindowsByName[data.name].domain !== origin) throw new Error("Message origin " + origin + " does not matched registered window origin " + _global.global.popupWindowsByName[data.name].domain);
                return (0, _common.registerRemoteSendMessage)(_global.global.popupWindowsByName[data.name].win, domain, data.sendMessage), 
                {
                    sendMessage: function(message) {
                        if (window && !window.closed) {
                            var winDetails = _global.global.popupWindowsByName[data.name];
                            winDetails && (0, _drivers.receiveMessage)({
                                data: message,
                                origin: winDetails.domain,
                                source: winDetails.win
                            });
                        }
                    }
                };
            });
        }
        function openBridgeFrame(name, url) {
            _lib.log.debug("Opening bridge:", name, url);
            var iframe = document.createElement("iframe");
            return iframe.setAttribute("name", name), iframe.setAttribute("id", name), iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), 
            iframe.setAttribute("frameborder", "0"), iframe.setAttribute("border", "0"), iframe.setAttribute("scrolling", "no"), 
            iframe.setAttribute("allowTransparency", "true"), iframe.setAttribute("tabindex", "-1"), 
            iframe.setAttribute("hidden", "true"), iframe.setAttribute("title", ""), iframe.setAttribute("role", "presentation"), 
            iframe.src = url, iframe;
        }
        function openBridge(url, domain) {
            return domain = domain || (0, _lib.getDomainFromUrl)(url), _global.global.bridges[domain] ? _global.global.bridges[domain] : (_global.global.bridges[domain] = _lib.promise.run(function() {
                if ((0, _src2.getDomain)() === domain) throw new Error("Can not open bridge on the same domain as current domain: " + domain);
                var name = (0, _common.getBridgeName)(domain), frame = (0, _src2.getFrameByName)(window, name);
                if (frame) throw new Error("Frame with name " + name + " already exists on page");
                var iframe = openBridgeFrame(name, url);
                return _common.documentBodyReady.then(function(body) {
                    return new _lib.promise.Promise(function(resolve, reject) {
                        setTimeout(resolve, 1);
                    }).then(function() {
                        body.appendChild(iframe);
                        var bridge = iframe.contentWindow;
                        return listenForRegister(bridge, domain), new _lib.promise.Promise(function(resolve, reject) {
                            iframe.onload = resolve, iframe.onerror = reject;
                        }).then(function() {
                            return (0, _lib.onWindowReady)(bridge, _conf.CONFIG.BRIDGE_TIMEOUT, "Bridge " + url);
                        }).then(function() {
                            return bridge;
                        });
                    });
                });
            }), _global.global.bridges[domain]);
        }
        function linkUrl(win, url) {
            var winOptions = _global.global.popupWindowsByWin.get(win);
            winOptions && (winOptions.domain = (0, _lib.getDomainFromUrl)(url), (0, _common.registerRemoteWindow)(win));
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        exports.openBridge = openBridge, exports.linkUrl = linkUrl;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _global = __webpack_require__(3), _interface = __webpack_require__(6), _drivers = __webpack_require__(5), _common = __webpack_require__(9);
        _global.global.bridges = _global.global.bridges || {}, _global.global.popupWindowsByWin = _global.global.popupWindowsByWin || new _src.WeakMap(), 
        _global.global.popupWindowsByName = _global.global.popupWindowsByName || {};
        var windowOpen = window.open;
        window.open = function(url, name, options, last) {
            var domain = url;
            if (url && 0 === url.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                var _url$split = url.split("|"), _url$split2 = _slicedToArray(_url$split, 2);
                domain = _url$split2[0], url = _url$split2[1];
            }
            domain && (domain = (0, _lib.getDomainFromUrl)(domain));
            var win = windowOpen.call(this, url, name, options, last);
            if (!win) return win;
            url && (0, _common.registerRemoteWindow)(win);
            for (var _iterator = Object.keys(_global.global.popupWindowsByName), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref2 = _i.value;
                }
                var winName = _ref2;
                (0, _src2.isWindowClosed)(_global.global.popupWindowsByName[winName].win) && delete _global.global.popupWindowsByName[winName];
            }
            if (name && win) {
                var winOptions = _global.global.popupWindowsByWin.get(win) || _global.global.popupWindowsByName[name] || {};
                winOptions.name = winOptions.name || name, winOptions.win = winOptions.win || win, 
                winOptions.domain = winOptions.domain || domain, _global.global.popupWindowsByWin.set(win, winOptions), 
                _global.global.popupWindowsByName[name] = winOptions;
            }
            return win;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function cleanUpWindow(win) {
            var requestPromises = _global.global.requestPromises.get(win);
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
            _global.global.popupWindowsByWin && _global.global.popupWindowsByWin.delete(win), 
            _global.global.remoteWindows && _global.global.remoteWindows.delete(win), _global.global.requestPromises.delete(win), 
            _global.global.methods.delete(win), _global.global.readyPromises.delete(win), _global.global.domainMatches.delete(win);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.cleanUpWindow = cleanUpWindow;
        var _global = __webpack_require__(3);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP && (0, _src.isSameTopWindow)(sourceWindow, targetWindow) === !1) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.emulateIERestrictions = emulateIERestrictions;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONFIG = void 0;
        var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__(13), CONFIG = exports.CONFIG = {
            ALLOW_POSTMESSAGE_POPUP: !0,
            LOG_LEVEL: "info",
            BRIDGE_TIMEOUT: 5e3,
            ACK_TIMEOUT: 1e3,
            RES_TIMEOUT: 1e4,
            LOG_TO_PAGE: !1,
            MOCK_MODE: !1,
            ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
            _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
            _ALLOWED_POST_MESSAGE)
        };
        0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function parseMessage(message) {
            try {
                message = (0, _lib.jsonParse)(message);
            } catch (err) {
                return;
            }
            if (message && (message = message[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], message && message.type && _types.RECEIVE_MESSAGE_TYPES[message.type])) return message;
        }
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin, data = event.data, message = parseMessage(data);
            if (message && (0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain), 
            _global.global.receivedMessages.indexOf(message.id) === -1)) {
                _global.global.receivedMessages.push(message.id);
                var level = void 0;
                if (level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info", 
                _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]), 
                (0, _src.isWindowClosed)(source)) return _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data)), 
                _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
            }
        }
        function messageListener(event) {
            try {
                event.source;
            } catch (err) {
                return;
            }
            event = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent.origin,
                data: event.data
            };
            try {
                __webpack_require__(12).emulateIERestrictions(event.source, window);
            } catch (err) {
                return;
            }
            receiveMessage(event);
        }
        function listenForMessages() {
            (0, _lib.listen)(window, "message", messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.receiveMessage = receiveMessage, exports.messageListener = messageListener, 
        exports.listenForMessages = listenForMessages;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _global = __webpack_require__(3), _types = __webpack_require__(31);
        _global.global.receivedMessages = _global.global.receivedMessages || [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.RECEIVE_MESSAGE_TYPES = void 0;
        var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _src = __webpack_require__(1), _conf = __webpack_require__(0), _lib = __webpack_require__(2), _send = __webpack_require__(15), _listeners = __webpack_require__(14);
        exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
            var options = (0, _listeners.getResponseListener)(message.hash);
            if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _src.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain);
            options.ack = !0;
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
            function respond(data) {
                return message.fireAndForget || (0, _src.isWindowClosed)(source) ? _lib.promise.Promise.resolve() : (0, 
                _send.sendMessage)(source, _extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name
                }, data), origin);
            }
            var options = (0, _listeners.getRequestListener)({
                name: message.name,
                win: source,
                domain: origin
            });
            return _lib.promise.Promise.all([ respond({
                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
            }), _lib.promise.run(function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!(0, _src.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain);
                var data = message.data;
                return options.handler({
                    source: source,
                    origin: origin,
                    data: data
                });
            }).then(function(data) {
                return respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                    data: data
                });
            }, function(err) {
                var stack = err.stack, errmessage = err.message, error = void 0;
                return error = stack ? errmessage && stack.indexOf(errmessage) === -1 ? errmessage + "\n" + stack : stack : errmessage, 
                respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                    ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                    error: error
                });
            }) ]).catch(function(err) {
                return options && options.handleError ? options.handleError(err) : void _lib.log.error(err.stack || err.toString());
            });
        }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
            var options = (0, _listeners.getResponseListener)(message.hash);
            if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
            if (!(0, _src.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + options.domain);
            if ((0, _listeners.deleteResponseListener)(message.hash), message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) return options.respond(new Error(message.error));
            if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                var data = message.data || message.response;
                return options.respond(null, {
                    source: source,
                    origin: origin,
                    data: data
                });
            }
        }), _RECEIVE_MESSAGE_TYPE);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SEND_MESSAGE_STRATEGIES = void 0;
        var _src = __webpack_require__(1), _conf = __webpack_require__(0), SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
            try {
                __webpack_require__(12).emulateIERestrictions(window, win);
            } catch (err) {
                return;
            }
            var domains = void 0;
            domains = Array.isArray(domain) ? domain : domain ? [ domain ] : [ _conf.CONSTANTS.WILDCARD ], 
            domains = domains.map(function(dom) {
                if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                    if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) return _conf.CONSTANTS.WILDCARD;
                    if (!(0, _src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                    return (0, _src.getActualDomain)(win);
                }
                return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
            }), domains.forEach(function(dom) {
                return win.postMessage(serializedMessage, dom);
            });
        };
        var sendBridgeMessage = __webpack_require__(10).sendBridgeMessage;
        SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.BRIDGE] = function(win, serializedMessage, domain) {
            if ((0, _src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
            if ((0, _src.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
            return sendBridgeMessage(win, serializedMessage, domain);
        }, SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.GLOBAL] = function(win, serializedMessage, domain) {
            if (!(0, _src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
            if ((0, _src.isSameTopWindow)(window, win) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
            var foreignGlobal = win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
            if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
            return foreignGlobal.receiveMessage({
                source: window,
                origin: (0, _src.getDomain)(),
                data: serializedMessage
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isSerialized(item, type) {
            return "object" === ("undefined" == typeof item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            var id = (0, _util.uniqueID)(), methods = _global.global.methods.get(destination);
            return methods || (methods = {}, _global.global.methods.set(destination, methods)), 
            methods[id] = {
                domain: domain,
                method: method
            }, {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name
            };
        }
        function serializeError(err) {
            return {
                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                __message__: err.stack || err.message || err.toString()
            };
        }
        function serializeMethods(destination, domain, obj) {
            return (0, _util.replaceObject)({
                obj: obj
            }, function(item, key) {
                return "function" == typeof item ? serializeMethod(destination, domain, item, key) : item instanceof Error ? serializeError(item) : void 0;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                var args = Array.prototype.slice.call(arguments);
                return _log.log.debug("Call foreign method", obj.__name__, args), (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args: args
                }, {
                    domain: origin,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    var data = _ref2.data;
                    return _log.log.debug("Got foreign method result", obj.__name__, data.result), data.result;
                }, function(err) {
                    throw _log.log.debug("Got foreign method error", err.stack || err.toString()), err;
                });
            }
            return wrapper.__name__ = obj.__name__, wrapper.__xdomain__ = !0, wrapper.source = source, 
            wrapper.origin = origin, wrapper;
        }
        function deserializeError(source, origin, obj) {
            return new Error(obj.__message__);
        }
        function deserializeMethods(source, origin, obj) {
            return (0, _util.replaceObject)({
                obj: obj
            }, function(item, key) {
                return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : void 0;
            }).obj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.listenForMethods = void 0;
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.serializeMethod = serializeMethod, exports.serializeMethods = serializeMethods, 
        exports.deserializeMethod = deserializeMethod, exports.deserializeError = deserializeError, 
        exports.deserializeMethods = deserializeMethods;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _util = __webpack_require__(7), _interface = __webpack_require__(6), _log = __webpack_require__(11), _promise = __webpack_require__(16), _global = __webpack_require__(3);
        _global.global.methods = _global.global.methods || new _src.WeakMap();
        exports.listenForMethods = (0, _util.once)(function() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                window: _conf.CONSTANTS.WILDCARD,
                origin: _conf.CONSTANTS.WILDCARD
            }, function(_ref) {
                var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = _global.global.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                var meth = methods[data.id];
                if (!meth) throw new Error("Could not find method with id: " + data.id);
                if (!(0, _src2.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                return _log.log.debug("Call local method", data.name, data.args), _promise.promise.run(function() {
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
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function initOnReady() {
            (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {
                window: _conf.CONSTANTS.WILDCARD,
                domain: _conf.CONSTANTS.WILDCARD
            }, function(event) {
                var win = event.source, promise = _global.global.readyPromises.get(win);
                promise ? promise.resolve(event) : (promise = new _promise.SyncPromise().resolve(event), 
                _global.global.readyPromises.set(win, promise));
            });
            var parent = (0, _src2.getAncestor)();
            parent && (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {}, {
                domain: _conf.CONSTANTS.WILDCARD,
                timeout: 1 / 0
            }).catch(function(err) {
                _log.log.debug(err.stack || err.toString());
            });
        }
        function onWindowReady(win) {
            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = _global.global.readyPromises.get(win);
            return promise ? promise : (promise = new _promise.SyncPromise(), _global.global.readyPromises.set(win, promise), 
            setTimeout(function() {
                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
            }, timeout), promise);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.initOnReady = initOnReady, exports.onWindowReady = onWindowReady;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _interface = __webpack_require__(6), _log = __webpack_require__(11), _promise = __webpack_require__(8), _global = __webpack_require__(3);
        _global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function request(options) {
            var prom = _lib.promise.run(function() {
                if (!options.name) throw new Error("Expected options.name");
                if (_conf.CONFIG.MOCK_MODE) options.window = window; else if ("string" == typeof options.window) {
                    var el = document.getElementById(options.window);
                    if (!el) throw new Error("Expected options.window " + options.window + " to be a valid element id");
                    if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window = el.contentWindow;
                } else if (options.window instanceof HTMLElement) {
                    if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + options.window + " to be an iframe");
                    if (!options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window = options.window.contentWindow;
                }
                if (!options.window) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                options.domain = options.domain || _conf.CONSTANTS.WILDCARD;
                var hash = options.name + "_" + (0, _lib.uniqueID)();
                if ((0, _drivers.addResponseListener)(hash, options), (0, _src2.isWindowClosed)(options.window)) throw new Error("Target window is closed");
                var hasResult = !1, requestPromises = _global.global.requestPromises.get(options.window);
                requestPromises || (requestPromises = [], _global.global.requestPromises.set(options.window, requestPromises));
                var requestPromise = _lib.promise.run(function() {
                    if ((0, _src2.isAncestor)(window, options.window)) return (0, _lib.onWindowReady)(options.window);
                }).then(function() {
                    return new _lib.promise.Promise(function(resolve, reject) {
                        if (options.respond = function(err, result) {
                            return err || (hasResult = !0, requestPromises.splice(requestPromises.indexOf(requestPromise, 1))), 
                            err ? reject(err) : resolve(result);
                        }, (0, _drivers.sendMessage)(options.window, {
                            hash: hash,
                            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                            name: options.name,
                            data: options.data,
                            fireAndForget: options.fireAndForget
                        }, options.domain).catch(reject), options.fireAndForget) return resolve();
                        var ackTimeout = _conf.CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT, interval = (0, 
                        _lib.safeInterval)(function() {
                            return options.ack && hasResult ? interval.cancel() : (0, _src2.isWindowClosed)(options.window) ? (interval.cancel(), 
                            reject(options.ack ? new Error("Window closed for " + options.name + " before response") : new Error("Window closed for " + options.name + " before ack"))) : (ackTimeout -= 100, 
                            resTimeout -= 100, ackTimeout <= 0 && !options.ack ? (interval.cancel(), reject(new Error("No ack for postMessage " + options.name + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"))) : resTimeout <= 0 && !hasResult ? (interval.cancel(), 
                            reject(new Error("No response for postMessage " + options.name + " in " + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + "ms"))) : void 0);
                        }, 100);
                    });
                });
                return requestPromise.catch(function() {
                    (0, _drivers.deleteResponseListener)(hash);
                }), requestPromises.push(requestPromise), requestPromise;
            });
            return prom;
        }
        function _send(window, name, data, options) {
            return options = options || {}, options.window = window, options.name = name, options.data = data, 
            request(options);
        }
        function sendToParent(name, data, options) {
            var win = (0, _src2.getAncestor)();
            return win ? _send(win, name, data, options) : new _lib.promise.Promise(function(resolve, reject) {
                return reject(new Error("Window does not have a parent"));
            });
        }
        function client() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            return {
                send: function(name, data) {
                    return _send(options.window, name, data, options);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.send = void 0, exports.request = request, exports.sendToParent = sendToParent, 
        exports.client = client;
        var _src = __webpack_require__(4), _src2 = __webpack_require__(1), _conf = __webpack_require__(0), _drivers = __webpack_require__(5), _lib = __webpack_require__(2), _global = __webpack_require__(3);
        _global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap(), 
        exports.send = _send;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function enableMockMode() {
            _conf.CONFIG.MOCK_MODE = !0;
        }
        function disableMockMode() {
            _conf.CONFIG.MOCK_MODE = !1;
        }
        function disable() {
            delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT], window.removeEventListener("message", _drivers.messageListener);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.CONSTANTS = exports.CONFIG = void 0, exports.enableMockMode = enableMockMode, 
        exports.disableMockMode = disableMockMode;
        var _conf = __webpack_require__(0);
        Object.defineProperty(exports, "CONFIG", {
            enumerable: !0,
            get: function() {
                return _conf.CONFIG;
            }
        }), Object.defineProperty(exports, "CONSTANTS", {
            enumerable: !0,
            get: function() {
                return _conf.CONSTANTS;
            }
        }), exports.disable = disable;
        var _drivers = __webpack_require__(5);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.util = exports.bridge = exports.parent = void 0;
        var _client = __webpack_require__(35);
        Object.keys(_client).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _client[key];
                }
            });
        });
        var _server = __webpack_require__(38);
        Object.keys(_server).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _server[key];
                }
            });
        });
        var _config = __webpack_require__(36);
        Object.keys(_config).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _config[key];
                }
            });
        });
        var _util = __webpack_require__(7);
        Object.defineProperty(exports, "util", {
            enumerable: !0,
            get: function() {
                return _util.util;
            }
        });
        var _src = __webpack_require__(1), bridge = (exports.parent = (0, _src.getAncestor)(), 
        exports.bridge = void 0);
        exports.bridge = bridge = __webpack_require__(25);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            options.handler = options.handler || _lib.noop, options.errorHandler = options.errorHandler || function(err) {
                throw err;
            }, options.source && (options.window = options.source), options.domain = options.domain || _conf.CONSTANTS.WILDCARD;
            var requestListener = (0, _drivers.addRequestListener)({
                name: options.name,
                win: options.window,
                domain: options.domain
            }, options);
            if (options.once) {
                var handler = options.handler;
                options.handler = (0, _lib.once)(function() {
                    return requestListener.cancel(), handler.apply(this, arguments);
                });
            }
            if (options.handleError = function(err) {
                options.errorHandler(err);
            }, options.window && options.errorOnClose) var interval = (0, _lib.safeInterval)(function() {
                (0, _src.isWindowClosed)(options.window) && (interval.cancel(), options.handleError(new Error("Post message target window is closed")));
            }, 50);
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function _on(name, options, handler, errorHandler) {
            return "function" == typeof options && (errorHandler = handler, handler = options, 
            options = {}), options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, listen(options);
        }
        function once(name, options, handler, errorHandler) {
            "function" == typeof options && (errorHandler = handler, handler = options, options = {}), 
            options = options || {}, options.name = name, options.handler = handler || options.handler, 
            options.errorHandler = errorHandler || options.errorHandler, options.once = !0;
            var prom = new _lib.promise.Promise(function(resolve, reject) {
                options.handler = options.handler || function(event) {
                    return resolve(event);
                }, options.errorHandler = options.errorHandler || reject;
            }), myListener = listen(options);
            return (0, _lib.extend)(prom, myListener), prom;
        }
        function listener() {
            var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on: function(name, handler, errorHandler) {
                    return _on(name, options, handler, errorHandler);
                }
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.on = void 0, exports.listen = listen, exports.once = once, exports.listener = listener;
        var _src = __webpack_require__(1), _lib = __webpack_require__(2), _drivers = __webpack_require__(5), _conf = __webpack_require__(0);
        exports.on = _on;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) return obj;
            var newObj = {};
            if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
            return newObj.default = obj, newObj;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _interface = __webpack_require__(6);
        Object.keys(_interface).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _interface[key];
                }
            });
        });
        var INTERFACE = _interopRequireWildcard(_interface);
        exports.default = INTERFACE;
    } ]);
});
//# sourceMappingURL=post-robot.ie.js.map