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
        "./node_modules/cross-domain-safe-weakmap/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _interface = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./node_modules/cross-domain-safe-weakmap/src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _weakmap = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/weakmap.js");
            Object.defineProperty(exports, "WeakMap", {
                enumerable: !0,
                get: function() {
                    return _weakmap.CrossDomainSafeWeakMap;
                }
            });
        },
        "./node_modules/cross-domain-safe-weakmap/src/native.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.hasNativeWeakMap = function() {
                if (!window.WeakMap) return !1;
                if (!window.Object.freeze) return !1;
                try {
                    var testWeakMap = new window.WeakMap(), testKey = {};
                    window.Object.freeze(testKey);
                    testWeakMap.set(testKey, "__testvalue__");
                    return "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            };
        },
        "./node_modules/cross-domain-safe-weakmap/src/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.safeIndexOf = function(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            };
            exports.noop = function() {};
        },
        "./node_modules/cross-domain-safe-weakmap/src/weakmap.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.CrossDomainSafeWeakMap = void 0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _native = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/native.js"), _util = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/util.js");
            var defineProperty = Object.defineProperty, counter = Date.now() % 1e9;
            exports.CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, CrossDomainSafeWeakMap);
                    counter += 1;
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                    if ((0, _native.hasNativeWeakMap)()) try {
                        this.weakmap = new window.WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                _createClass(CrossDomainSafeWeakMap, [ {
                    key: "_cleanupClosedWindows",
                    value: function() {
                        for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                            var value = keys[i];
                            if ((0, _src.isWindow)(value) && (0, _src.isWindowClosed)(value)) {
                                if (weakmap) try {
                                    weakmap.delete(value);
                                } catch (err) {}
                                keys.splice(i, 1);
                                this.values.splice(i, 1);
                                i -= 1;
                            }
                        }
                    }
                }, {
                    key: "isSafeToReadWrite",
                    value: function(key) {
                        if ((0, _src.isWindow)(key)) return !1;
                        try {
                            (0, _util.noop)(key && key.self);
                            (0, _util.noop)(key && key[this.name]);
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
                            var keys = this.keys, values = this.values, index = (0, _util.safeIndexOf)(keys, key);
                            if (-1 === index) {
                                keys.push(key);
                                values.push(value);
                            } else values[index] = value;
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
                            var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
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
                            var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
                            if (-1 !== index) {
                                keys.splice(index, 1);
                                this.values.splice(index, 1);
                            }
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
                        this._cleanupClosedWindows();
                        return -1 !== (0, _util.safeIndexOf)(this.keys, key);
                    }
                } ]);
                return CrossDomainSafeWeakMap;
            }();
        },
        "./node_modules/cross-domain-utils/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _utils = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
            Object.keys(_utils).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _utils[key];
                    }
                });
            });
            var _types = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
            Object.keys(_types).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _types[key];
                    }
                });
            });
        },
        "./node_modules/cross-domain-utils/src/types.js": function(module, exports, __webpack_require__) {
            "use strict";
        },
        "./node_modules/cross-domain-utils/src/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.isRegex = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            exports.noop = function() {};
        },
        "./node_modules/cross-domain-utils/src/utils.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.isFileProtocol = function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.FILE_PROTOCOL;
            };
            exports.isAboutProtocol = isAboutProtocol;
            exports.getParent = getParent;
            exports.getOpener = getOpener;
            exports.canReadFromWindow = canReadFromWindow;
            exports.getActualDomain = getActualDomain;
            exports.getDomain = getDomain;
            exports.isBlankDomain = function(win) {
                try {
                    if (!win.location.href) return !0;
                    if ("about:blank" === win.location.href) return !0;
                } catch (err) {}
                return !1;
            };
            exports.isActuallySameDomain = isActuallySameDomain;
            exports.isSameDomain = isSameDomain;
            exports.getParents = getParents;
            exports.isAncestorParent = isAncestorParent;
            exports.getFrames = getFrames;
            exports.getAllChildFrames = getAllChildFrames;
            exports.getTop = getTop;
            exports.getAllFramesInWindow = getAllFramesInWindow;
            exports.isTop = function(win) {
                return win === getTop(win);
            };
            exports.isFrameWindowClosed = isFrameWindowClosed;
            exports.isWindowClosed = isWindowClosed;
            exports.linkFrameWindow = function(frame) {
                !function() {
                    for (var i = 0; i < iframeFrames.length; i++) if (isFrameWindowClosed(iframeFrames[i])) {
                        iframeFrames.splice(i, 1);
                        iframeWindows.splice(i, 1);
                    }
                    for (var _i5 = 0; _i5 < iframeWindows.length; _i5++) if (isWindowClosed(iframeWindows[_i5])) {
                        iframeFrames.splice(_i5, 1);
                        iframeWindows.splice(_i5, 1);
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            };
            exports.getUserAgent = function(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            };
            exports.getFrameByName = getFrameByName;
            exports.findChildFrameByName = findChildFrameByName;
            exports.findFrameByName = function(win, name) {
                var frame = void 0;
                if (frame = getFrameByName(win, name)) return frame;
                return findChildFrameByName(getTop(win) || win, name);
            };
            exports.isParent = function(win, frame) {
                var frameParent = getParent(frame);
                if (frameParent) return frameParent === win;
                for (var _iterator6 = getFrames(win), _isArray6 = Array.isArray(_iterator6), _i8 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator](); ;) {
                    var _ref6;
                    if (_isArray6) {
                        if (_i8 >= _iterator6.length) break;
                        _ref6 = _iterator6[_i8++];
                    } else {
                        if ((_i8 = _iterator6.next()).done) break;
                        _ref6 = _i8.value;
                    }
                    var childFrame = _ref6;
                    if (childFrame === frame) return !0;
                }
                return !1;
            };
            exports.isOpener = function(parent, child) {
                return parent === getOpener(child);
            };
            exports.getAncestor = getAncestor;
            exports.getAncestors = function(win) {
                var results = [], ancestor = win;
                for (;ancestor; ) (ancestor = getAncestor(ancestor)) && results.push(ancestor);
                return results;
            };
            exports.isAncestor = function(parent, child) {
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
                        if ((_i9 = _iterator7.next()).done) break;
                        _ref7 = _i9.value;
                    }
                    var frame = _ref7;
                    if (frame === child) return !0;
                }
                return !1;
            };
            exports.isPopup = isPopup;
            exports.isIframe = isIframe;
            exports.isFullpage = function() {
                return Boolean(!isIframe() && !isPopup());
            };
            exports.getDistanceFromTop = getDistanceFromTop;
            exports.getNthParent = getNthParent;
            exports.getNthParentFromTop = function(win) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return getNthParent(win, getDistanceFromTop(win) - n);
            };
            exports.isSameTopWindow = function(win1, win2) {
                var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1), opener2 = getOpener(top2);
                if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) return !1;
                if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) return !1;
                return !1;
            };
            exports.matchDomain = function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === CONSTANTS.WILDCARD || origin === pattern;
                    if ((0, _util.isRegex)(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                if ((0, _util.isRegex)(pattern)) return (0, _util.isRegex)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern));
                if (Array.isArray(pattern)) return Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !(0, 
                _util.isRegex)(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                });
                return !1;
            };
            exports.stringifyDomainPattern = function(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : (0, _util.isRegex)(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
            };
            exports.getDomainFromUrl = function(url) {
                var domain = void 0;
                if (!url.match(/^(https?|mock|file):\/\//)) return getDomain();
                domain = url;
                return domain = domain.split("/").slice(0, 3).join("/");
            };
            exports.onCloseWindow = function(win, callback) {
                var delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, maxtime = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0, timeout = void 0;
                !function check() {
                    if (isWindowClosed(win)) {
                        timeout && clearTimeout(timeout);
                        return callback();
                    }
                    if (maxtime <= 0) clearTimeout(timeout); else {
                        maxtime -= delay;
                        timeout = setTimeout(check, delay);
                    }
                }();
                return {
                    cancel: function() {
                        timeout && clearTimeout(timeout);
                    }
                };
            };
            exports.isWindow = function(obj) {
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
                    (0, _util.noop)(obj == obj);
                } catch (err) {
                    return !0;
                }
                try {
                    (0, _util.noop)(obj && obj.__cross_domain_utils_window_check__);
                } catch (err) {
                    return !0;
                }
                return !1;
            };
            var _util = __webpack_require__("./node_modules/cross-domain-utils/src/util.js"), CONSTANTS = {
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                ABOUT_PROTOCOL: "about:",
                WILDCARD: "*"
            }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.ABOUT_PROTOCOL;
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
                    (0, _util.noop)(win && win.location && win.location.href);
                    return !0;
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
                var domain = getActualDomain(win = win || window);
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
                    for (;win.parent !== win; ) {
                        result.push(win.parent);
                        win = win.parent;
                    }
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
                var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0;
                for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i2 >= _iterator.length) break;
                        _ref = _iterator[_i2++];
                    } else {
                        if ((_i2 = _iterator.next()).done) break;
                        _ref = _i2.value;
                    }
                    var frame = _ref;
                    result.push(frame);
                    var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0;
                    for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref2;
                        if (_isArray2) {
                            if (_i3 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i3++];
                        } else {
                            if ((_i3 = _iterator2.next()).done) break;
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
                    var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0;
                    for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                        var _ref3;
                        if (_isArray3) {
                            if (_i4 >= _iterator3.length) break;
                            _ref3 = _iterator3[_i4++];
                        } else {
                            if ((_i4 = _iterator3.next()).done) break;
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
            function getAllFramesInWindow(win) {
                var top = getTop(win);
                return getAllChildFrames(top).concat(top);
            }
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.body || doc.body.contains(frame));
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
                try {
                    (0, _util.noop)(win == win);
                } catch (err) {
                    return !0;
                }
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
            function getFrameByName(win, name) {
                var winFrames = getFrames(win), _iterator4 = winFrames, _isArray4 = Array.isArray(_iterator4), _i6 = 0;
                for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i6 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i6++];
                    } else {
                        if ((_i6 = _iterator4.next()).done) break;
                        _ref4 = _i6.value;
                    }
                    var childFrame = _ref4;
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
            function findChildFrameByName(win, name) {
                var frame = getFrameByName(win, name);
                if (frame) return frame;
                var _iterator5 = getFrames(win), _isArray5 = Array.isArray(_iterator5), _i7 = 0;
                for (_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ;) {
                    var _ref5;
                    if (_isArray5) {
                        if (_i7 >= _iterator5.length) break;
                        _ref5 = _iterator5[_i7++];
                    } else {
                        if ((_i7 = _iterator5.next()).done) break;
                        _ref5 = _i7.value;
                    }
                    var namedFrame = findChildFrameByName(_ref5, name);
                    if (namedFrame) return namedFrame;
                }
            }
            function getAncestor(win) {
                var opener = getOpener(win = win || window);
                if (opener) return opener;
                var parent = getParent(win);
                return parent || void 0;
            }
            function isPopup() {
                return Boolean(getOpener(window));
            }
            function isIframe() {
                return Boolean(getParent(window));
            }
            function anyMatch(collection1, collection2) {
                var _iterator8 = collection1, _isArray8 = Array.isArray(_iterator8), _i10 = 0;
                for (_iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator](); ;) {
                    var _ref8;
                    if (_isArray8) {
                        if (_i10 >= _iterator8.length) break;
                        _ref8 = _iterator8[_i10++];
                    } else {
                        if ((_i10 = _iterator8.next()).done) break;
                        _ref8 = _i10.value;
                    }
                    var item1 = _ref8, _iterator9 = collection2, _isArray9 = Array.isArray(_iterator9), _i11 = 0;
                    for (_iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator](); ;) {
                        var _ref9;
                        if (_isArray9) {
                            if (_i11 >= _iterator9.length) break;
                            _ref9 = _iterator9[_i11++];
                        } else {
                            if ((_i11 = _iterator9.next()).done) break;
                            _ref9 = _i11.value;
                        }
                        if (item1 === _ref9) return !0;
                    }
                }
                return !1;
            }
            function getDistanceFromTop() {
                for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent; ) (parent = getParent(parent)) && (distance += 1);
                return distance;
            }
            function getNthParent(win) {
                for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                    if (!parent) return;
                    parent = getParent(parent);
                }
                return parent;
            }
        },
        "./node_modules/webpack/buildin/global.js": function(module, exports, __webpack_require__) {
            "use strict";
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
        },
        "./node_modules/zalgo-promise/src/exceptions.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.dispatchPossiblyUnhandledError = function(err) {
                if (-1 !== (0, _global.getGlobal)().dispatchedErrors.indexOf(err)) return;
                (0, _global.getGlobal)().dispatchedErrors.push(err);
                setTimeout(function() {
                    throw err;
                }, 1);
                for (var j = 0; j < (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.length; j++) (0, 
                _global.getGlobal)().possiblyUnhandledPromiseHandlers[j](err);
            };
            exports.onPossiblyUnhandledException = function(handler) {
                (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.push(handler);
                return {
                    cancel: function() {
                        (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.splice((0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            };
            var _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
        },
        "./node_modules/zalgo-promise/src/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            (function(global) {
                Object.defineProperty(exports, "__esModule", {
                    value: !0
                });
                exports.getGlobal = function() {
                    var glob = void 0;
                    if ("undefined" != typeof window) glob = window; else {
                        if (void 0 === global) throw new TypeError("Can not find global");
                        glob = global;
                    }
                    var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                    zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                    zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                    zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                    zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                    return zalgoGlobal;
                };
            }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
        },
        "./node_modules/zalgo-promise/src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _promise = __webpack_require__("./node_modules/zalgo-promise/src/promise.js");
            Object.defineProperty(exports, "ZalgoPromise", {
                enumerable: !0,
                get: function() {
                    return _promise.ZalgoPromise;
                }
            });
        },
        "./node_modules/zalgo-promise/src/promise.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.ZalgoPromise = void 0;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }(), _utils = __webpack_require__("./node_modules/zalgo-promise/src/utils.js"), _exceptions = __webpack_require__("./node_modules/zalgo-promise/src/exceptions.js"), _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
            var ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, ZalgoPromise);
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
                _createClass(ZalgoPromise, [ {
                    key: "resolve",
                    value: function(result) {
                        if (this.resolved || this.rejected) return this;
                        if ((0, _utils.isPromise)(result)) throw new Error("Can not resolve promise with another promise");
                        this.resolved = !0;
                        this.value = result;
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "reject",
                    value: function(error) {
                        var _this2 = this;
                        if (this.resolved || this.rejected) return this;
                        if ((0, _utils.isPromise)(error)) throw new Error("Can not reject promise with another promise");
                        if (!error) {
                            var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                            error = new Error("Expected reject to be called with Error, got " + _err);
                        }
                        this.rejected = !0;
                        this.error = error;
                        this.errorHandled || setTimeout(function() {
                            _this2.errorHandled || (0, _exceptions.dispatchPossiblyUnhandledError)(error);
                        }, 1);
                        this.dispatch();
                        return this;
                    }
                }, {
                    key: "asyncReject",
                    value: function(error) {
                        this.errorHandled = !0;
                        this.reject(error);
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                        if (!dispatching && (resolved || rejected)) {
                            this.dispatching = !0;
                            (0, _global.getGlobal)().activeCount += 1;
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
                                } else (0, _utils.isPromise)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                                    promise.resolve(res);
                                }, function(err) {
                                    promise.reject(err);
                                }) : promise.resolve(result);
                            }, i = 0; i < handlers.length; i++) _loop(i);
                            handlers.length = 0;
                            this.dispatching = !1;
                            (0, _global.getGlobal)().activeCount -= 1;
                            0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
                        }
                    }
                }, {
                    key: "then",
                    value: function(onSuccess, onError) {
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
                            clearTimeout(timeout);
                            return result;
                        });
                    }
                }, {
                    key: "toPromise",
                    value: function() {
                        if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                        return Promise.resolve(this);
                    }
                } ], [ {
                    key: "resolve",
                    value: function(value) {
                        return value instanceof ZalgoPromise ? value : (0, _utils.isPromise)(value) ? new ZalgoPromise(function(resolve, reject) {
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
                            } else if (!(0, _utils.isPromise)(prom)) {
                                results[i] = prom;
                                count -= 1;
                                return "continue";
                            }
                            ZalgoPromise.resolve(prom).then(function(result) {
                                results[i] = result;
                                0 === (count -= 1) && promise.resolve(results);
                            }, function(err) {
                                promise.reject(err);
                            });
                        }, i = 0; i < promises.length; i++) _loop2(i);
                        0 === count && promise.resolve(results);
                        return promise;
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
                        return (0, _exceptions.onPossiblyUnhandledException)(handler);
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
                        return !!(value && value instanceof ZalgoPromise) || (0, _utils.isPromise)(value);
                    }
                }, {
                    key: "flush",
                    value: function() {
                        var promise = new ZalgoPromise();
                        (0, _global.getGlobal)().flushPromises.push(promise);
                        0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
                        return promise;
                    }
                }, {
                    key: "flushQueue",
                    value: function() {
                        var promisesToFlush = (0, _global.getGlobal)().flushPromises;
                        (0, _global.getGlobal)().flushPromises = [];
                        var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref = _i.value;
                            }
                            _ref.resolve();
                        }
                    }
                } ]);
                return ZalgoPromise;
            }();
            exports.ZalgoPromise = ZalgoPromise;
        },
        "./node_modules/zalgo-promise/src/utils.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.isPromise = function(item) {
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
            };
        },
        "./src/clean.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.cleanUpWindow = function(win) {
                var requestPromises = _global.global.requestPromises.get(win);
                if (requestPromises) for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                    var _ref;
                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        if ((_i = _iterator.next()).done) break;
                        _ref = _i.value;
                    }
                    var promise = _ref;
                    promise.reject(new Error("No response from window - cleaned up"));
                }
                _global.global.popupWindowsByWin && _global.global.popupWindowsByWin.delete(win);
                _global.global.remoteWindows && _global.global.remoteWindows.delete(win);
                _global.global.requestPromises.delete(win);
                _global.global.methods.delete(win);
                _global.global.readyPromises.delete(win);
            };
            __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            var _global = __webpack_require__("./src/global.js");
        },
        "./src/conf/config.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.CONFIG = void 0;
            var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__("./src/conf/constants.js");
            function _defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            var CONFIG = exports.CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                LOG_LEVEL: "info",
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
                RES_TIMEOUT: 1 / 0,
                LOG_TO_PAGE: !1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.BRIDGE, !0), 
                _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL, !0), 
                _ALLOWED_POST_MESSAGE),
                ALLOW_SAME_ORIGIN: !1
            };
            0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
        },
        "./src/conf/constants.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.CONSTANTS = {
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
                    HELLO: "postrobot_ready",
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
            };
            var POST_MESSAGE_NAMES = exports.POST_MESSAGE_NAMES = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            };
            exports.POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(function(key) {
                return POST_MESSAGE_NAMES[key];
            });
        },
        "./src/conf/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _config = __webpack_require__("./src/conf/config.js");
            Object.keys(_config).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            });
            var _constants = __webpack_require__("./src/conf/constants.js");
            Object.keys(_constants).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _constants[key];
                    }
                });
            });
        },
        "./src/drivers/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _receive = __webpack_require__("./src/drivers/receive/index.js");
            Object.keys(_receive).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _receive[key];
                    }
                });
            });
            var _send = __webpack_require__("./src/drivers/send/index.js");
            Object.keys(_send).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _send[key];
                    }
                });
            });
            var _listeners = __webpack_require__("./src/drivers/listeners.js");
            Object.keys(_listeners).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _listeners[key];
                    }
                });
            });
        },
        "./src/drivers/listeners.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.resetListeners = function() {
                _global.global.responseListeners = {};
                _global.global.requestListeners = {};
            };
            exports.addResponseListener = function(hash, listener) {
                _global.global.responseListeners[hash] = listener;
            };
            exports.getResponseListener = function(hash) {
                return _global.global.responseListeners[hash];
            };
            exports.deleteResponseListener = function(hash) {
                delete _global.global.responseListeners[hash];
            };
            exports.markResponseListenerErrored = function(hash) {
                _global.global.erroredResponseListeners[hash] = !0;
            };
            exports.isResponseListenerErrored = function(hash) {
                return Boolean(_global.global.erroredResponseListeners[hash]);
            };
            exports.getRequestListener = getRequestListener;
            exports.addRequestListener = function addRequestListener(_ref5, listener) {
                var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (Array.isArray(win)) {
                    for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                        var _ref6;
                        if (_isArray2) {
                            if (_i3 >= _iterator2.length) break;
                            _ref6 = _iterator2[_i3++];
                        } else {
                            if ((_i3 = _iterator2.next()).done) break;
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
                                    if ((_i4 = _iterator3.next()).done) break;
                                    _ref7 = _i4.value;
                                }
                                var cancelListener = _ref7;
                                cancelListener.cancel();
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
                            if ((_i5 = _iterator4.next()).done) break;
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
                                    if ((_i6 = _iterator5.next()).done) break;
                                    _ref9 = _i6.value;
                                }
                                var cancelListener = _ref9;
                                cancelListener.cancel();
                            }
                        }
                    };
                }
                var existingListener = getRequestListener({
                    name: name,
                    win: win,
                    domain: domain
                });
                win && win !== _conf.CONSTANTS.WILDCARD || (win = _global.global.WINDOW_WILDCARD);
                domain = domain || _conf.CONSTANTS.WILDCARD;
                if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
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
                    regexListener = {
                        regex: domain,
                        listener: listener
                    };
                    regexListeners.push(regexListener);
                } else winListeners[strDomain] = listener;
                return {
                    cancel: function() {
                        if (winListeners) {
                            delete winListeners[strDomain];
                            win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                            regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                        }
                    }
                };
            };
            __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _global = __webpack_require__("./src/global.js"), _lib = __webpack_require__("./src/lib/index.js"), _conf = __webpack_require__("./src/conf/index.js");
            _global.global.responseListeners = _global.global.responseListeners || {};
            _global.global.requestListeners = _global.global.requestListeners || {};
            _global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function() {}();
            _global.global.erroredResponseListeners = _global.global.erroredResponseListeners || {};
            var __DOMAIN_REGEX__ = "__domain_regex__";
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === _conf.CONSTANTS.WILDCARD && (win = null);
                domain === _conf.CONSTANTS.WILDCARD && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                var nameListeners = _global.global.requestListeners[name];
                if (nameListeners) for (var _arr = [ win, _global.global.WINDOW_WILDCARD ], _i = 0; _i < _arr.length; _i++) {
                    var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        if (domain && "string" == typeof domain) {
                            if (winListeners[domain]) return winListeners[domain];
                            if (winListeners[__DOMAIN_REGEX__]) {
                                var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0;
                                for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                                    var _ref3;
                                    if (_isArray) {
                                        if (_i2 >= _iterator.length) break;
                                        _ref3 = _iterator[_i2++];
                                    } else {
                                        if ((_i2 = _iterator.next()).done) break;
                                        _ref3 = _i2.value;
                                    }
                                    var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                                    if ((0, _src2.matchDomain)(regex, domain)) return listener;
                                }
                            }
                        }
                        if (winListeners[_conf.CONSTANTS.WILDCARD]) return winListeners[_conf.CONSTANTS.WILDCARD];
                    }
                }
            }
        },
        "./src/drivers/receive/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.receiveMessage = receiveMessage;
            exports.messageListener = messageListener;
            exports.listenForMessages = function() {
                (0, _lib.addEventListener)(window, "message", messageListener);
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _global = __webpack_require__("./src/global.js"), _types = __webpack_require__("./src/drivers/receive/types.js");
            _global.global.receivedMessages = _global.global.receivedMessages || [];
            function receiveMessage(event) {
                if (!window || window.closed) throw new Error("Message recieved in closed window");
                try {
                    if (!event.source) return;
                } catch (err) {
                    return;
                }
                var source = event.source, origin = event.origin, message = function(message) {
                    var parsedMessage = void 0;
                    try {
                        parsedMessage = (0, _lib.jsonParse)(message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && _types.RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data);
                if (message) {
                    if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                    0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain);
                    if (-1 === _global.global.receivedMessages.indexOf(message.id)) {
                        _global.global.receivedMessages.push(message.id);
                        var level = void 0;
                        level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                        _lib.log.logLevel(level, [ "\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message ]);
                        if (!(0, _src.isWindowClosed)(source) || message.fireAndForget) {
                            message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data));
                            _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                        } else _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                    }
                }
            }
            function messageListener(event) {
                try {
                    (0, _lib.noop)(event.source);
                } catch (err) {
                    return;
                }
                var messageEvent = {
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                };
                0;
                receiveMessage(messageEvent);
            }
            _global.global.receiveMessage = receiveMessage;
        },
        "./src/drivers/receive/types.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.RECEIVE_MESSAGE_TYPES = void 0;
            var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _send = __webpack_require__("./src/drivers/send/index.js"), _listeners = __webpack_require__("./src/drivers/listeners.js");
            function _defineProperty(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value;
                return obj;
            }
            exports.RECEIVE_MESSAGE_TYPES = (_defineProperty(_RECEIVE_MESSAGE_TYPE = {}, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function(source, origin, message) {
                if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                    var options = (0, _listeners.getResponseListener)(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function(source, origin, message) {
                var options = (0, _listeners.getRequestListener)({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function respond(data) {
                    return message.fireAndForget || (0, _src2.isWindowClosed)(source) ? _src.ZalgoPromise.resolve() : (0, 
                    _send.sendMessage)(source, _extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                return _src.ZalgoPromise.all([ respond({
                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
                }), _src.ZalgoPromise.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
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
                    var error = (0, _lib.stringifyError)(err).replace(/^Error: /, ""), code = err.code;
                    return respond({
                        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                        error: error,
                        code: code
                    });
                }) ]).then(_lib.noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    _lib.log.error((0, _lib.stringifyError)(err));
                });
            }), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function(source, origin, message) {
                if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                    var options = (0, _listeners.getResponseListener)(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!(0, _src2.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (0, 
                    _src2.stringifyDomainPattern)(options.domain));
                    (0, _listeners.deleteResponseListener)(message.hash);
                    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
                        var err = new Error(message.error);
                        message.code && (err.code = message.code);
                        return options.respond(err, null);
                    }
                    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                        var data = message.data || message.response;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }), _RECEIVE_MESSAGE_TYPE);
        },
        "./src/drivers/send/index.js": function(module, exports, __webpack_require__) {
            "use strict";
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
            exports.sendMessage = function(win, message, domain) {
                return _src2.ZalgoPromise.try(function() {
                    message = function(win, message) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = (0, 
                        _lib.uniqueID)(), type = (0, _lib.getWindowType)(), sourceDomain = (0, _src.getDomain)(window);
                        return _extends({}, message, options, {
                            sourceDomain: sourceDomain,
                            id: message.id || id,
                            windowType: type
                        });
                    }(win, message, {
                        data: (0, _lib.serializeMethods)(win, domain, message.data),
                        domain: domain
                    });
                    var level = void 0;
                    level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                    _lib.log.logLevel(level, [ "\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message ]);
                    if (win === window && !_conf.CONFIG.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                    if ((0, _src.isWindowClosed)(win)) throw new Error("Window is closed");
                    _lib.log.debug("Running send message strategies", message);
                    var messages = [], serializedMessage = (0, _lib.jsonStringify)(function(obj, key, value) {
                        key in obj ? Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : obj[key] = value;
                        return obj;
                    }({}, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT, message), null, 2);
                    return _src2.ZalgoPromise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return _src2.ZalgoPromise.try(function() {
                            if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + (0, _lib.stringifyError)(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        _lib.log.debug(status);
                        if (!success) throw new Error(status);
                    });
                });
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _strategies = __webpack_require__("./src/drivers/send/strategies.js");
        },
        "./src/drivers/send/strategies.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.SEND_MESSAGE_STRATEGIES = void 0;
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
                0;
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ _conf.CONSTANTS.WILDCARD ]).map(function(dom) {
                    if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                        if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL) return _conf.CONSTANTS.WILDCARD;
                        if (!(0, _src.isActuallySameDomain)(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return (0, _src.getActualDomain)(win);
                    }
                    return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
        },
        "./src/global.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.global = void 0;
            var _conf = __webpack_require__("./src/conf/index.js");
            (exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {}).registerSelf = function() {};
        },
        "./src/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _interface = __webpack_require__("./src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        },
        "./src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.bridge = exports.Promise = exports.cleanUpWindow = void 0;
            var _public = __webpack_require__("./src/public/index.js");
            Object.keys(_public).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _public[key];
                    }
                });
            });
            var _clean = __webpack_require__("./src/clean.js");
            Object.defineProperty(exports, "cleanUpWindow", {
                enumerable: !0,
                get: function() {
                    return _clean.cleanUpWindow;
                }
            });
            var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
            Object.defineProperty(exports, "Promise", {
                enumerable: !0,
                get: function() {
                    return _src.ZalgoPromise;
                }
            });
            exports.init = init;
            var _lib = __webpack_require__("./src/lib/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _global = __webpack_require__("./src/global.js");
            exports.bridge = null;
            function init() {
                if (!_global.global.initialized) {
                    (0, _drivers.listenForMessages)();
                    0;
                    (0, _lib.initOnReady)();
                    (0, _lib.listenForMethods)({
                        on: _public.on,
                        send: _public.send
                    });
                }
                _global.global.initialized = !0;
            }
            init();
        },
        "./src/lib/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _util = __webpack_require__("./src/lib/util.js");
            Object.keys(_util).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _util[key];
                    }
                });
            });
            var _log = __webpack_require__("./src/lib/log.js");
            Object.keys(_log).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _log[key];
                    }
                });
            });
            var _serialize = __webpack_require__("./src/lib/serialize.js");
            Object.keys(_serialize).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _serialize[key];
                    }
                });
            });
            var _ready = __webpack_require__("./src/lib/ready.js");
            Object.keys(_ready).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _ready[key];
                    }
                });
            });
        },
        "./src/lib/log.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.log = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _conf = __webpack_require__("./src/conf/index.js"), _util = __webpack_require__("./src/lib/util.js"), LOG_LEVELS = [ "debug", "info", "warn", "error" ];
            Function.prototype.bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach(function(method) {
                console[method] = this.bind(console[method], console);
            }, Function.prototype.call);
            var log = exports.log = {
                clearLogs: function() {
                    window.console && window.console.clear && window.console.clear();
                    if (_conf.CONFIG.LOG_TO_PAGE) {
                        var container = document.getElementById("postRobotLogs");
                        container && container.parentNode && container.parentNode.removeChild(container);
                    }
                },
                writeToPage: function(level, args) {
                    setTimeout(function() {
                        var container = document.getElementById("postRobotLogs");
                        if (!container) {
                            (container = document.createElement("div")).id = "postRobotLogs";
                            container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                            document.body && document.body.appendChild(container);
                        }
                        var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function(item) {
                            if ("string" == typeof item) return item;
                            if (!item) return Object.prototype.toString.call(item);
                            var json = void 0;
                            try {
                                json = (0, _util.jsonStringify)(item, null, 2);
                            } catch (err) {
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
                        el.style.cssText = "margin-top: 10px; color: " + color + ";";
                        container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                    });
                },
                logLevel: function(level, args) {
                    setTimeout(function() {
                        try {
                            var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;
                            if ("disabled" === logLevel || LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) return;
                            (args = Array.prototype.slice.call(args)).unshift("" + window.location.host + window.location.pathname);
                            args.unshift("::");
                            args.unshift("" + (0, _util.getWindowType)().toLowerCase());
                            args.unshift("[post-robot]");
                            _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args);
                            if (!window.console) return;
                            window.console[level] || (level = "log");
                            if (!window.console[level]) return;
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
        },
        "./src/lib/ready.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.onHello = onHello;
            exports.sayHello = sayHello;
            exports.initOnReady = function() {
                onHello(function(_ref3) {
                    var source = _ref3.source, origin = _ref3.origin, promise = _global.global.readyPromises.get(source) || new _src3.ZalgoPromise();
                    promise.resolve({
                        origin: origin
                    });
                    _global.global.readyPromises.set(source, promise);
                });
                var parent = (0, _src2.getAncestor)();
                parent && sayHello(parent).catch(function(err) {
                    _log.log.debug((0, _util.stringifyError)(err));
                });
            };
            exports.onChildWindowReady = function(win) {
                var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = _global.global.readyPromises.get(win);
                if (promise) return promise;
                promise = new _src3.ZalgoPromise();
                _global.global.readyPromises.set(win, promise);
                -1 !== timeout && setTimeout(function() {
                    return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                }, timeout);
                return promise;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js"), _log = __webpack_require__("./src/lib/log.js"), _util = __webpack_require__("./src/lib/util.js");
            _global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();
            function onHello(handler) {
                _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {
                    domain: _conf.CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin;
                    return handler({
                        source: source,
                        origin: origin
                    });
                });
            }
            function sayHello(win) {
                return _global.global.send(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, {
                    domain: _conf.CONSTANTS.WILDCARD,
                    timeout: 1 / 0
                }).then(function(_ref2) {
                    return {
                        origin: _ref2.origin
                    };
                });
            }
        },
        "./src/lib/serialize.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.listenForMethods = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.serializeMethod = serializeMethod;
            exports.serializeMethods = function(destination, domain, obj) {
                return (0, _util.replaceObject)({
                    obj: obj
                }, function(item, key) {
                    return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item, 
                    {
                        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                        __message__: (0, _util.stringifyError)(err),
                        __code__: err.code
                    }) : window.Promise && item instanceof window.Promise ? function(destination, domain, promise, name) {
                        return {
                            __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : _src3.ZalgoPromise.isPromise(item) ? function(destination, domain, promise, name) {
                        return {
                            __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
                            __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                return promise.then(resolve, reject);
                            }, name + ".then")
                        };
                    }(destination, domain, item, key.toString()) : (0, _util.isRegex)(item) ? (regex = item, 
                    {
                        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX,
                        __source__: regex.source
                    }) : void 0;
                    var err, regex;
                }).obj;
            };
            exports.deserializeMethod = deserializeMethod;
            exports.deserializeError = deserializeError;
            exports.deserializeZalgoPromise = deserializeZalgoPromise;
            exports.deserializePromise = deserializePromise;
            exports.deserializeRegex = deserializeRegex;
            exports.deserializeMethods = function(source, origin, obj) {
                return (0, _util.replaceObject)({
                    obj: obj
                }, function(item) {
                    if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item) return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
                }).obj;
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js"), _util = __webpack_require__("./src/lib/util.js"), _log = __webpack_require__("./src/lib/log.js");
            _global.global.methods = _global.global.methods || new _src.WeakMap();
            exports.listenForMethods = (0, _util.once)(function() {
                _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    origin: _conf.CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = _global.global.methods.get(source);
                    if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                    var meth = methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (!(0, _src2.matchDomain)(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    _log.log.debug("Call local method", data.name, data.args);
                    return _src3.ZalgoPromise.try(function() {
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
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = (0, _util.uniqueID)(), methods = _global.global.methods.get(destination);
                if (!methods) {
                    methods = {};
                    _global.global.methods.set(destination, methods);
                }
                methods[id] = {
                    domain: domain,
                    method: method
                };
                return {
                    __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    _log.log.debug("Call foreign method", obj.__name__, args);
                    return _global.global.send(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin,
                        timeout: 1 / 0
                    }).then(function(_ref2) {
                        var data = _ref2.data;
                        _log.log.debug("Got foreign method result", obj.__name__, data.result);
                        return data.result;
                    }, function(err) {
                        _log.log.debug("Got foreign method error", (0, _util.stringifyError)(err));
                        throw err;
                    });
                }
                wrapper.__name__ = obj.__name__;
                wrapper.__xdomain__ = !0;
                wrapper.source = source;
                wrapper.origin = origin;
                return wrapper;
            }
            function deserializeError(source, origin, obj) {
                var err = new Error(obj.__message__);
                obj.__code__ && (err.code = obj.__code__);
                return err;
            }
            function deserializeZalgoPromise(source, origin, prom) {
                return new _src3.ZalgoPromise(function(resolve, reject) {
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
        },
        "./src/lib/util.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.weakMapMemoize = exports.once = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.stringifyError = function stringifyError(err) {
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
            exports.noop = function() {};
            exports.addEventListener = function(obj, event, handler) {
                obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                    }
                };
            };
            exports.uniqueID = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            };
            exports.eachArray = eachArray;
            exports.eachObject = eachObject;
            exports.each = each;
            exports.replaceObject = function replaceObject(item, callback) {
                var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                var newobj = void 0;
                if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                    if (!Array.isArray(item)) throw new TypeError("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                    newobj = [];
                } else newobj = {};
                each(item, function(childItem, key) {
                    var result = callback(childItem, key);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                });
                return newobj;
            };
            exports.safeInterval = function(method, time) {
                var timeout = void 0;
                timeout = setTimeout(function runInterval() {
                    timeout = setTimeout(runInterval, time);
                    method.call();
                }, time);
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            exports.isRegex = function(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            };
            exports.getWindowType = function() {
                if ((0, _src2.isPopup)()) return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
                if ((0, _src2.isIframe)()) return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
            };
            exports.jsonStringify = function(obj, replacer, indent) {
                var objectToJSON = void 0, arrayToJSON = void 0;
                try {
                    if ("{}" !== JSON.stringify({})) {
                        objectToJSON = Object.prototype.toJSON;
                        delete Object.prototype.toJSON;
                    }
                    if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                    if ("[]" !== JSON.stringify([])) {
                        arrayToJSON = Array.prototype.toJSON;
                        delete Array.prototype.toJSON;
                    }
                    if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                var result = JSON.stringify.call(this, obj, replacer, indent);
                try {
                    objectToJSON && (Object.prototype.toJSON = objectToJSON);
                    arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                } catch (err) {
                    throw new Error("Can not repair JSON.stringify: " + err.message);
                }
                return result;
            };
            exports.jsonParse = function(item) {
                return JSON.parse(item);
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js");
            exports.once = function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            function eachArray(item, callback) {
                for (var i = 0; i < item.length; i++) callback(item[i], i);
            }
            function eachObject(item, callback) {
                for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
            }
            function each(item, callback) {
                Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
            }
            exports.weakMapMemoize = function(method) {
                var weakmap = new _src.WeakMap();
                return function(arg) {
                    var result = weakmap.get(arg);
                    if (void 0 !== result) return result;
                    void 0 !== (result = method.call(this, arg)) && weakmap.set(arg, result);
                    return result;
                };
            };
        },
        "./src/public/client.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.send = void 0;
            exports.request = request;
            exports.sendToParent = function(name, data, options) {
                var win = (0, _src3.getAncestor)();
                if (!win) return new _src2.ZalgoPromise(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
                return _send(win, name, data, options);
            };
            exports.client = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            };
            var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _global = __webpack_require__("./src/global.js");
            _global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap();
            function request(options) {
                return _src2.ZalgoPromise.try(function() {
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
                    domain = options.domain || _conf.CONSTANTS.WILDCARD;
                    var hash = options.name + "_" + (0, _lib.uniqueID)();
                    if ((0, _src3.isWindowClosed)(win)) throw new Error("Target window is closed");
                    var hasResult = !1, requestPromises = _global.global.requestPromises.get(win);
                    if (!requestPromises) {
                        requestPromises = [];
                        _global.global.requestPromises.set(win, requestPromises);
                    }
                    var requestPromise = _src2.ZalgoPromise.try(function() {
                        if ((0, _src3.isAncestor)(window, win)) return (0, _lib.onChildWindowReady)(win, options.timeout || _conf.CONFIG.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if ((0, _lib.isRegex)(domain) && !origin) return (0, _lib.sayHello)(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if ((0, _lib.isRegex)(domain)) {
                            if (!(0, _src3.matchDomain)(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new _src2.ZalgoPromise(function(resolve, reject) {
                            var responseListener = void 0;
                            if (!options.fireAndForget) {
                                responseListener = {
                                    name: name,
                                    window: win,
                                    domain: actualDomain,
                                    respond: function(err, result) {
                                        if (!err) {
                                            hasResult = !0;
                                            requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                        }
                                        err ? reject(err) : resolve(result);
                                    }
                                };
                                (0, _drivers.addResponseListener)(hash, responseListener);
                            }
                            (0, _drivers.sendMessage)(win, {
                                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: options.fireAndForget
                            }, actualDomain).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var ackTimeout = _conf.CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if ((0, _src3.isWindowClosed)(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout -= cycleTime;
                                    resTimeout -= cycleTime;
                                    if (responseListener.ack) {
                                        if (resTimeout === 1 / 0) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (ackTimeout <= 0) return reject(new Error("No ack for postMessage " + name + " in " + (0, 
                                        _src3.getDomain)() + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                                        if (resTimeout <= 0) return reject(new Error("No response for postMessage " + name + " in " + (0, 
                                        _src3.getDomain)() + " in " + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        (0, _drivers.markResponseListenerErrored)(hash);
                        (0, _drivers.deleteResponseListener)(hash);
                    });
                    requestPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            exports.send = _send;
            _global.global.send = _send;
        },
        "./src/public/config.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.CONSTANTS = exports.CONFIG = void 0;
            var _conf = __webpack_require__("./src/conf/index.js");
            Object.defineProperty(exports, "CONFIG", {
                enumerable: !0,
                get: function() {
                    return _conf.CONFIG;
                }
            });
            Object.defineProperty(exports, "CONSTANTS", {
                enumerable: !0,
                get: function() {
                    return _conf.CONSTANTS;
                }
            });
            exports.disable = function() {
                delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
                window.removeEventListener("message", _drivers.messageListener);
            };
            var _drivers = __webpack_require__("./src/drivers/index.js");
        },
        "./src/public/index.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.parent = void 0;
            var _client = __webpack_require__("./src/public/client.js");
            Object.keys(_client).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _client[key];
                    }
                });
            });
            var _server = __webpack_require__("./src/public/server.js");
            Object.keys(_server).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _server[key];
                    }
                });
            });
            var _config = __webpack_require__("./src/public/config.js");
            Object.keys(_config).forEach(function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            });
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
            exports.parent = (0, _src.getAncestor)();
        },
        "./src/public/server.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.on = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.listen = listen;
            exports.once = function(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new _src2.ZalgoPromise(function(resolve, reject) {
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
            };
            exports.listener = function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            };
            var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js");
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || _conf.CONSTANTS.WILDCARD,
                    name: name
                }, requestListener = (0, _drivers.addRequestListener)({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = (0, _lib.once)(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = (0, _lib.safeInterval)(function() {
                    if (win && "object" === (void 0 === win ? "undefined" : _typeof(win)) && (0, _src.isWindowClosed)(win)) {
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
            exports.on = _on;
            _global.global.on = _on;
        }
    });
});
//# sourceMappingURL=post-robot.js.map
//# sourceMappingURL=post-robot.js.map