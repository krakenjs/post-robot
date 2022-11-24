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
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                enumerable: !0,
                get: getter
            });
        };
        __webpack_require__.r = function(exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        };
        __webpack_require__.t = function(value, mode) {
            1 & mode && (value = __webpack_require__(value));
            if (8 & mode) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            });
            if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            return ns;
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
            return {}.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 6);
    }([ function(module, exports, __webpack_require__) {
        "undefined" != typeof self && self, module.exports = function(modules) {
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
                    enumerable: !0,
                    get: getter
                });
            };
            __webpack_require__.r = function(exports) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
                Object.defineProperty(exports, "__esModule", {
                    value: !0
                });
            };
            __webpack_require__.t = function(value, mode) {
                1 & mode && (value = __webpack_require__(value));
                if (8 & mode) return value;
                if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
                var ns = Object.create(null);
                __webpack_require__.r(ns);
                Object.defineProperty(ns, "default", {
                    enumerable: !0,
                    value: value
                });
                if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                    return value[key];
                }.bind(null, key));
                return ns;
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
                return {}.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 1);
        }([ , function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "getActualProtocol", (function() {
                return getActualProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "getProtocol", (function() {
                return getProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "isFileProtocol", (function() {
                return isFileProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "isAboutProtocol", (function() {
                return isAboutProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "isMockProtocol", (function() {
                return isMockProtocol;
            }));
            __webpack_require__.d(__webpack_exports__, "getParent", (function() {
                return getParent;
            }));
            __webpack_require__.d(__webpack_exports__, "getOpener", (function() {
                return getOpener;
            }));
            __webpack_require__.d(__webpack_exports__, "canReadFromWindow", (function() {
                return canReadFromWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "getActualDomain", (function() {
                return getActualDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "getDomain", (function() {
                return getDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "isBlankDomain", (function() {
                return isBlankDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "isActuallySameDomain", (function() {
                return isActuallySameDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "isSameDomain", (function() {
                return isSameDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "assertSameDomain", (function() {
                return assertSameDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "getParents", (function() {
                return getParents;
            }));
            __webpack_require__.d(__webpack_exports__, "isAncestorParent", (function() {
                return isAncestorParent;
            }));
            __webpack_require__.d(__webpack_exports__, "getFrames", (function() {
                return getFrames;
            }));
            __webpack_require__.d(__webpack_exports__, "getAllChildFrames", (function() {
                return getAllChildFrames;
            }));
            __webpack_require__.d(__webpack_exports__, "getTop", (function() {
                return getTop;
            }));
            __webpack_require__.d(__webpack_exports__, "getNextOpener", (function() {
                return getNextOpener;
            }));
            __webpack_require__.d(__webpack_exports__, "getUltimateTop", (function() {
                return getUltimateTop;
            }));
            __webpack_require__.d(__webpack_exports__, "getAllFramesInWindow", (function() {
                return getAllFramesInWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "getAllWindows", (function() {
                return getAllWindows;
            }));
            __webpack_require__.d(__webpack_exports__, "isTop", (function() {
                return isTop;
            }));
            __webpack_require__.d(__webpack_exports__, "isFrameWindowClosed", (function() {
                return isFrameWindowClosed;
            }));
            __webpack_require__.d(__webpack_exports__, "isWindowClosed", (function() {
                return isWindowClosed;
            }));
            __webpack_require__.d(__webpack_exports__, "linkFrameWindow", (function() {
                return linkFrameWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "getUserAgent", (function() {
                return getUserAgent;
            }));
            __webpack_require__.d(__webpack_exports__, "getFrameByName", (function() {
                return getFrameByName;
            }));
            __webpack_require__.d(__webpack_exports__, "findChildFrameByName", (function() {
                return findChildFrameByName;
            }));
            __webpack_require__.d(__webpack_exports__, "findFrameByName", (function() {
                return findFrameByName;
            }));
            __webpack_require__.d(__webpack_exports__, "isParent", (function() {
                return isParent;
            }));
            __webpack_require__.d(__webpack_exports__, "isOpener", (function() {
                return isOpener;
            }));
            __webpack_require__.d(__webpack_exports__, "getAncestor", (function() {
                return getAncestor;
            }));
            __webpack_require__.d(__webpack_exports__, "getAncestors", (function() {
                return getAncestors;
            }));
            __webpack_require__.d(__webpack_exports__, "isAncestor", (function() {
                return isAncestor;
            }));
            __webpack_require__.d(__webpack_exports__, "isPopup", (function() {
                return isPopup;
            }));
            __webpack_require__.d(__webpack_exports__, "isIframe", (function() {
                return isIframe;
            }));
            __webpack_require__.d(__webpack_exports__, "isFullpage", (function() {
                return isFullpage;
            }));
            __webpack_require__.d(__webpack_exports__, "getDistanceFromTop", (function() {
                return getDistanceFromTop;
            }));
            __webpack_require__.d(__webpack_exports__, "getNthParent", (function() {
                return getNthParent;
            }));
            __webpack_require__.d(__webpack_exports__, "getNthParentFromTop", (function() {
                return getNthParentFromTop;
            }));
            __webpack_require__.d(__webpack_exports__, "isSameTopWindow", (function() {
                return isSameTopWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "matchDomain", (function() {
                return matchDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "stringifyDomainPattern", (function() {
                return stringifyDomainPattern;
            }));
            __webpack_require__.d(__webpack_exports__, "getDomainFromUrl", (function() {
                return getDomainFromUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "onCloseWindow", (function() {
                return onCloseWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "isWindow", (function() {
                return isWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "isBrowser", (function() {
                return isBrowser;
            }));
            __webpack_require__.d(__webpack_exports__, "isCurrentDomain", (function() {
                return isCurrentDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "isMockDomain", (function() {
                return isMockDomain;
            }));
            __webpack_require__.d(__webpack_exports__, "normalizeMockUrl", (function() {
                return normalizeMockUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "getFrameForWindow", (function() {
                return getFrameForWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "closeWindow", (function() {
                return closeWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "PROTOCOL", (function() {
                return PROTOCOL;
            }));
            __webpack_require__.d(__webpack_exports__, "WILDCARD", (function() {
                return WILDCARD;
            }));
            __webpack_require__.d(__webpack_exports__, "WINDOW_TYPE", (function() {
                return WINDOW_TYPE;
            }));
            function isRegex(item) {
                return "[object RegExp]" === {}.toString.call(item);
            }
            var PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:",
                ABOUT: "about:"
            };
            var WILDCARD = "*";
            var WINDOW_TYPE = {
                IFRAME: "iframe",
                POPUP: "popup"
            };
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function getActualProtocol(win) {
                void 0 === win && (win = window);
                return win.location.protocol;
            }
            function getProtocol(win) {
                void 0 === win && (win = window);
                if (win.mockDomain) {
                    var protocol = win.mockDomain.split("//")[0];
                    if (protocol) return protocol;
                }
                return getActualProtocol(win);
            }
            function isFileProtocol(win) {
                void 0 === win && (win = window);
                return getProtocol(win) === PROTOCOL.FILE;
            }
            function isAboutProtocol(win) {
                void 0 === win && (win = window);
                return getProtocol(win) === PROTOCOL.ABOUT;
            }
            function isMockProtocol(win) {
                void 0 === win && (win = window);
                return getProtocol(win) === PROTOCOL.MOCK;
            }
            function getParent(win) {
                void 0 === win && (win = window);
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
            function getOpener(win) {
                void 0 === win && (win = window);
                if (win && !getParent(win)) try {
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
                var protocol = getActualProtocol(win);
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
                return domain && win.mockDomain && win.mockDomain.startsWith(PROTOCOL.MOCK) ? win.mockDomain : domain;
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
                    if (isMockProtocol(win) && canReadFromWindow()) return !0;
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
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                    if (getDomain(window) === getDomain(win)) return !0;
                } catch (err) {}
                return !1;
            }
            function assertSameDomain(win) {
                if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                return win;
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
                return childParent ? childParent === parent : !!getParents(child).includes(parent);
            }
            function getFrames(win) {
                var result = [];
                var frames;
                try {
                    frames = win.frames;
                } catch (err) {
                    frames = win;
                }
                var len;
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
                var result = [];
                for (var _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
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
            function getNextOpener(win) {
                void 0 === win && (win = window);
                return getOpener(getTop(win) || win);
            }
            function getUltimateTop(win) {
                void 0 === win && (win = window);
                var opener = getNextOpener(win);
                return opener ? getUltimateTop(opener) : top;
            }
            function getAllFramesInWindow(win) {
                var top = getTop(win);
                if (!top) throw new Error("Can not determine top window");
                var result = [].concat(getAllChildFrames(top), [ top ]);
                result.includes(win) || (result = [].concat(result, [ win ], getAllChildFrames(win)));
                return result;
            }
            function getAllWindows(win) {
                void 0 === win && (win = window);
                var frames = getAllFramesInWindow(win);
                var opener = getNextOpener(win);
                return opener ? [].concat(getAllWindows(opener), frames) : frames;
            }
            function isTop(win) {
                return win === getTop(win);
            }
            function isFrameWindowClosed(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                    var parent = frame;
                    for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                    if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                }
                return !1;
            }
            var iframeWindows = [];
            var iframeFrames = [];
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
                    if (frame && isFrameWindowClosed(frame)) return !0;
                }
                return !1;
            }
            function linkFrameWindow(frame) {
                !function() {
                    for (var i = 0; i < iframeWindows.length; i++) {
                        var closed = !1;
                        try {
                            closed = iframeWindows[i].closed;
                        } catch (err) {}
                        if (closed) {
                            iframeFrames.splice(i, 1);
                            iframeWindows.splice(i, 1);
                        }
                    }
                }();
                if (frame && frame.contentWindow) try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            }
            function getUserAgent(win) {
                return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
            }
            function getFrameByName(win, name) {
                var winFrames = getFrames(win);
                for (var _i9 = 0; _i9 < winFrames.length; _i9++) {
                    var childFrame = winFrames[_i9];
                    try {
                        if (isSameDomain(childFrame) && childFrame.name === name && winFrames.includes(childFrame)) return childFrame;
                    } catch (err) {}
                }
                try {
                    if (winFrames.includes(win.frames[name])) return win.frames[name];
                } catch (err) {}
                try {
                    if (winFrames.includes(win[name])) return win[name];
                } catch (err) {}
            }
            function findChildFrameByName(win, name) {
                var frame = getFrameByName(win, name);
                if (frame) return frame;
                for (var _i11 = 0, _getFrames4 = getFrames(win); _i11 < _getFrames4.length; _i11++) {
                    var namedFrame = findChildFrameByName(_getFrames4[_i11], name);
                    if (namedFrame) return namedFrame;
                }
            }
            function findFrameByName(win, name) {
                return getFrameByName(win, name) || findChildFrameByName(getTop(win) || win, name);
            }
            function isParent(win, frame) {
                var frameParent = getParent(frame);
                if (frameParent) return frameParent === win;
                for (var _i13 = 0, _getFrames6 = getFrames(win); _i13 < _getFrames6.length; _i13++) if (_getFrames6[_i13] === frame) return !0;
                return !1;
            }
            function isOpener(parent, child) {
                return parent === getOpener(child);
            }
            function getAncestor(win) {
                void 0 === win && (win = window);
                return getOpener(win = win || window) || getParent(win) || void 0;
            }
            function getAncestors(win) {
                var results = [];
                var ancestor = win;
                for (;ancestor; ) (ancestor = getAncestor(ancestor)) && results.push(ancestor);
                return results;
            }
            function isAncestor(parent, child) {
                var actualParent = getAncestor(child);
                if (actualParent) return actualParent === parent;
                if (child === parent) return !1;
                if (getTop(child) === child) return !1;
                for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) if (_getFrames8[_i15] === child) return !0;
                return !1;
            }
            function isPopup(win) {
                void 0 === win && (win = window);
                return Boolean(getOpener(win));
            }
            function isIframe(win) {
                void 0 === win && (win = window);
                return Boolean(getParent(win));
            }
            function isFullpage(win) {
                void 0 === win && (win = window);
                return Boolean(!isIframe(win) && !isPopup(win));
            }
            function anyMatch(collection1, collection2) {
                for (var _i17 = 0; _i17 < collection1.length; _i17++) {
                    var item1 = collection1[_i17];
                    for (var _i19 = 0; _i19 < collection2.length; _i19++) if (item1 === collection2[_i19]) return !0;
                }
                return !1;
            }
            function getDistanceFromTop(win) {
                void 0 === win && (win = window);
                var distance = 0;
                var parent = win;
                for (;parent; ) (parent = getParent(parent)) && (distance += 1);
                return distance;
            }
            function getNthParent(win, n) {
                void 0 === n && (n = 1);
                var parent = win;
                for (var i = 0; i < n; i++) {
                    if (!parent) return;
                    parent = getParent(parent);
                }
                return parent;
            }
            function getNthParentFromTop(win, n) {
                void 0 === n && (n = 1);
                return getNthParent(win, getDistanceFromTop(win) - n);
            }
            function isSameTopWindow(win1, win2) {
                var top1 = getTop(win1) || win1;
                var top2 = getTop(win2) || win2;
                try {
                    if (top1 && top2) return top1 === top2;
                } catch (err) {}
                var allFrames1 = getAllFramesInWindow(win1);
                var allFrames2 = getAllFramesInWindow(win2);
                if (anyMatch(allFrames1, allFrames2)) return !0;
                var opener1 = getOpener(top1);
                var opener2 = getOpener(top2);
                return opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1), 
                !1;
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
            function stringifyDomainPattern(pattern) {
                return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() + ")" : pattern.toString();
            }
            function getDomainFromUrl(url) {
                return /^(https?|mock|file):\/\//.exec(url) ? url.split("/").slice(0, 3).join("/") : getDomain();
            }
            function onCloseWindow(win, callback, delay, maxtime) {
                void 0 === delay && (delay = 1e3);
                void 0 === maxtime && (maxtime = 1 / 0);
                var timeout;
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
                try {
                    if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
                } catch (err) {}
                return !1;
            }
            function isBrowser() {
                return "undefined" != typeof window && void 0 !== window.location;
            }
            function isCurrentDomain(domain) {
                return !!isBrowser() && getDomain() === domain;
            }
            function isMockDomain(domain) {
                return domain.startsWith(PROTOCOL.MOCK);
            }
            function normalizeMockUrl(url) {
                if (!isMockDomain(getDomainFromUrl(url))) return url;
                throw new Error("Mock urls not supported out of test mode");
            }
            function getFrameForWindow(win) {
                if (isSameDomain(win)) return assertSameDomain(win).frameElement;
                for (var _i21 = 0, _document$querySelect2 = document.querySelectorAll("iframe"); _i21 < _document$querySelect2.length; _i21++) {
                    var frame = _document$querySelect2[_i21];
                    if (frame && frame.contentWindow && frame.contentWindow === win) return frame;
                }
            }
            function closeWindow(win) {
                if (isIframe(win)) {
                    var frame = getFrameForWindow(win);
                    if (frame && frame.parentElement) {
                        frame.parentElement.removeChild(frame);
                        return;
                    }
                }
                try {
                    win.close();
                } catch (err) {}
            }
        } ]);
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(5);
    }, , function(module, exports, __webpack_require__) {
        "undefined" != typeof self && self, module.exports = function(e) {
            var t = {};
            function r(n) {
                if (t[n]) return t[n].exports;
                var i = t[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
            }
            return r.m = e, r.c = t, r.d = function(e, t, n) {
                r.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: n
                });
            }, r.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }, r.t = function(e, t) {
                if (1 & t && (e = r(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var i in e) r.d(n, i, function(t) {
                    return e[t];
                }.bind(null, i));
                return n;
            }, r.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return r.d(t, "a", t), t;
            }, r.o = function(e, t) {
                return {}.hasOwnProperty.call(e, t);
            }, r.p = "", r(r.s = 0);
        }([ function(e, t, r) {
            "use strict";
            r.r(t), r.d(t, "WeakMap", (function() {
                return p;
            }));
            var n = "Call was rejected by callee.\r\n";
            function i(e) {
                return void 0 === e && (e = window), e.location.protocol;
            }
            function o(e) {
                if (void 0 === e && (e = window), e.mockDomain) {
                    var t = e.mockDomain.split("//")[0];
                    if (t) return t;
                }
                return i(e);
            }
            function a(e) {
                return void 0 === e && (e = window), "about:" === o(e);
            }
            function c(e) {
                try {
                    return !0;
                } catch (e) {}
                return !1;
            }
            function u(e) {
                void 0 === e && (e = window);
                var t = e.location;
                if (!t) throw new Error("Can not read window location");
                var r = i(e);
                if (!r) throw new Error("Can not read window protocol");
                if ("file:" === r) return "file://";
                if ("about:" === r) {
                    var n = function(e) {
                        if (void 0 === e && (e = window), e) try {
                            if (e.parent && e.parent !== e) return e.parent;
                        } catch (e) {}
                    }(e);
                    return n && c() ? u(n) : "about://";
                }
                var o = t.host;
                if (!o) throw new Error("Can not read window host");
                return r + "//" + o;
            }
            function f(e) {
                void 0 === e && (e = window);
                var t = u(e);
                return t && e.mockDomain && 0 === e.mockDomain.indexOf("mock:") ? e.mockDomain : t;
            }
            var s = [], d = [];
            function h(e, t) {
                void 0 === t && (t = !0);
                try {
                    if (e === window) return !1;
                } catch (e) {
                    return !0;
                }
                try {
                    if (!e) return !0;
                } catch (e) {
                    return !0;
                }
                try {
                    if (e.closed) return !0;
                } catch (e) {
                    return !e || e.message !== n;
                }
                if (t && function(e) {
                    if (!function(e) {
                        try {
                            if (e === window) return !0;
                        } catch (e) {}
                        try {
                            var t = Object.getOwnPropertyDescriptor(e, "location");
                            if (t && !1 === t.enumerable) return !1;
                        } catch (e) {}
                        try {
                            if (a(e) && c()) return !0;
                        } catch (e) {}
                        try {
                            if (function(e) {
                                return void 0 === e && (e = window), "mock:" === o(e);
                            }(e) && c()) return !0;
                        } catch (e) {}
                        try {
                            if (u(e) === u(window)) return !0;
                        } catch (e) {}
                        return !1;
                    }(e)) return !1;
                    try {
                        if (e === window) return !0;
                        if (a(e) && c()) return !0;
                        if (f(window) === f(e)) return !0;
                    } catch (e) {}
                    return !1;
                }(e)) try {
                    if (e.mockclosed) return !0;
                } catch (e) {}
                try {
                    if (!e.parent || !e.top) return !0;
                } catch (e) {}
                var r = function(e, t) {
                    for (var r = 0; r < e.length; r++) try {
                        if (e[r] === t) return r;
                    } catch (e) {}
                    return -1;
                }(s, e);
                if (-1 !== r) {
                    var i = d[r];
                    if (i && function(e) {
                        if (!e.contentWindow) return !0;
                        if (!e.parentNode) return !0;
                        var t = e.ownerDocument;
                        if (t && t.documentElement && !t.documentElement.contains(e)) {
                            for (var r = e; r.parentNode && r.parentNode !== r; ) r = r.parentNode;
                            if (!r.host || !t.documentElement.contains(r.host)) return !0;
                        }
                        return !1;
                    }(i)) return !0;
                }
                return !1;
            }
            function l(e) {
                try {
                    if (e === window) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if ("[object Window]" === {}.toString.call(e)) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if (window.Window && e instanceof window.Window) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if (e && e.self === e) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if (e && e.parent === e) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if (e && e.top === e) return !0;
                } catch (e) {
                    if (e && e.message === n) return !0;
                }
                try {
                    if (e && "__unlikely_value__" === e.__cross_domain_utils_window_check__) return !1;
                } catch (e) {
                    return !0;
                }
                try {
                    if ("postMessage" in e && "self" in e && "location" in e) return !0;
                } catch (e) {}
                return !1;
            }
            function w(e, t) {
                for (var r = 0; r < e.length; r++) try {
                    if (e[r] === t) return r;
                } catch (e) {}
                return -1;
            }
            var p = function() {
                function e() {
                    if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var e = new WeakMap, t = {};
                            return Object.freeze(t), e.set(t, "__testvalue__"), "__testvalue__" === e.get(t);
                        } catch (e) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap;
                    } catch (e) {}
                    this.keys = [], this.values = [];
                }
                var t = e.prototype;
                return t._cleanupClosedWindows = function() {
                    for (var e = this.weakmap, t = this.keys, r = 0; r < t.length; r++) {
                        var n = t[r];
                        if (l(n) && h(n)) {
                            if (e) try {
                                e.delete(n);
                            } catch (e) {}
                            t.splice(r, 1), this.values.splice(r, 1), r -= 1;
                        }
                    }
                }, t.isSafeToReadWrite = function(e) {
                    return !l(e);
                }, t.set = function(e, t) {
                    if (!e) throw new Error("WeakMap expected key");
                    var r = this.weakmap;
                    if (r) try {
                        r.set(e, t);
                    } catch (e) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var n = this.name, i = e[n];
                        return void (i && i[0] === e ? i[1] = t : Object.defineProperty(e, n, {
                            value: [ e, t ],
                            writable: !0
                        }));
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var o = this.keys, a = this.values, c = w(o, e);
                    -1 === c ? (o.push(e), a.push(t)) : a[c] = t;
                }, t.get = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        if (t.has(e)) return t.get(e);
                    } catch (e) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var r = e[this.name];
                        return r && r[0] === e ? r[1] : void 0;
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var n = w(this.keys, e);
                    if (-1 !== n) return this.values[n];
                }, t.delete = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        t.delete(e);
                    } catch (e) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var r = e[this.name];
                        r && r[0] === e && (r[0] = r[1] = void 0);
                    } catch (e) {}
                    this._cleanupClosedWindows();
                    var n = this.keys, i = w(n, e);
                    -1 !== i && (n.splice(i, 1), this.values.splice(i, 1));
                }, t.has = function(e) {
                    if (!e) throw new Error("WeakMap expected key");
                    var t = this.weakmap;
                    if (t) try {
                        if (t.has(e)) return !0;
                    } catch (e) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(e)) try {
                        var r = e[this.name];
                        return !(!r || r[0] !== e);
                    } catch (e) {}
                    return this._cleanupClosedWindows(), -1 !== w(this.keys, e);
                }, t.getOrSet = function(e, t) {
                    if (this.has(e)) return this.get(e);
                    var r = t();
                    return this.set(e, r), r;
                }, e;
            }();
        } ]);
    }, , function(module, exports, __webpack_require__) {
        "undefined" != typeof self && self, module.exports = function(e) {
            var t = {};
            function r(n) {
                if (t[n]) return t[n].exports;
                var o = t[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
            }
            return r.m = e, r.c = t, r.d = function(e, t, n) {
                r.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: n
                });
            }, r.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }, r.t = function(e, t) {
                if (1 & t && (e = r(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function(t) {
                    return e[t];
                }.bind(null, o));
                return n;
            }, r.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return r.d(t, "a", t), t;
            }, r.o = function(e, t) {
                return {}.hasOwnProperty.call(e, t);
            }, r.p = "", r(r.s = 0);
        }([ function(e, t, r) {
            "use strict";
            function n(e) {
                try {
                    if (!e) return !1;
                    if ("undefined" != typeof Promise && e instanceof Promise) return !0;
                    if ("undefined" != typeof window && "function" == typeof window.Window && e instanceof window.Window) return !1;
                    if ("undefined" != typeof window && "function" == typeof window.constructor && e instanceof window.constructor) return !1;
                    var t = {}.toString;
                    if (t) {
                        var r = t.call(e);
                        if ("[object Window]" === r || "[object global]" === r || "[object DOMWindow]" === r) return !1;
                    }
                    if ("function" == typeof e.then) return !0;
                } catch (e) {
                    return !1;
                }
                return !1;
            }
            r.r(t), r.d(t, "ZalgoPromise", (function() {
                return a;
            }));
            var o, i = [], c = [], u = 0;
            function s() {
                if (!u && o) {
                    var e = o;
                    o = null, e.resolve();
                }
            }
            function f() {
                u += 1;
            }
            function l() {
                u -= 1, s();
            }
            var a = function() {
                function e(e) {
                    var t = this;
                    if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
                    this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
                    this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
                    this.handlers = [], e) {
                        var r, n, o = !1, i = !1, c = !1;
                        f();
                        try {
                            e((function(e) {
                                c ? t.resolve(e) : (o = !0, r = e);
                            }), (function(e) {
                                c ? t.reject(e) : (i = !0, n = e);
                            }));
                        } catch (e) {
                            return l(), void this.reject(e);
                        }
                        l(), c = !0, o ? this.resolve(r) : i && this.reject(n);
                    }
                }
                var t = e.prototype;
                return t.resolve = function(e) {
                    if (this.resolved || this.rejected) return this;
                    if (n(e)) throw new Error("Can not resolve promise with another promise");
                    return this.resolved = !0, this.value = e, this.dispatch(), this;
                }, t.reject = function(e) {
                    var t = this;
                    if (this.resolved || this.rejected) return this;
                    if (n(e)) throw new Error("Can not reject promise with another promise");
                    if (!e) {
                        var r = e && "function" == typeof e.toString ? e.toString() : {}.toString.call(e);
                        e = new Error("Expected reject to be called with Error, got " + r);
                    }
                    return this.rejected = !0, this.error = e, this.errorHandled || setTimeout((function() {
                        t.errorHandled || function(e, t) {
                            if (-1 === i.indexOf(e)) {
                                i.push(e), setTimeout((function() {
                                    throw e;
                                }), 1);
                                for (var r = 0; r < c.length; r++) c[r](e, t);
                            }
                        }(e, t);
                    }), 1), this.dispatch(), this;
                }, t.asyncReject = function(e) {
                    return this.errorHandled = !0, this.reject(e), this;
                }, t.dispatch = function() {
                    var t = this.resolved, r = this.rejected, o = this.handlers;
                    if (!this.dispatching && (t || r)) {
                        this.dispatching = !0, f();
                        for (var i = function(e, t) {
                            return e.then((function(e) {
                                t.resolve(e);
                            }), (function(e) {
                                t.reject(e);
                            }));
                        }, c = 0; c < o.length; c++) {
                            var u = o[c], s = u.onSuccess, a = u.onError, h = u.promise, d = void 0;
                            if (t) try {
                                d = s ? s(this.value) : this.value;
                            } catch (e) {
                                h.reject(e);
                                continue;
                            } else if (r) {
                                if (!a) {
                                    h.reject(this.error);
                                    continue;
                                }
                                try {
                                    d = a(this.error);
                                } catch (e) {
                                    h.reject(e);
                                    continue;
                                }
                            }
                            if (d instanceof e && (d.resolved || d.rejected)) {
                                var v = d;
                                v.resolved ? h.resolve(v.value) : h.reject(v.error), v.errorHandled = !0;
                            } else n(d) ? d instanceof e && (d.resolved || d.rejected) ? d.resolved ? h.resolve(d.value) : h.reject(d.error) : i(d, h) : h.resolve(d);
                        }
                        o.length = 0, this.dispatching = !1, l();
                    }
                }, t.then = function(t, r) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.then expected a function for success handler");
                    if (r && "function" != typeof r && !r.call) throw new Error("Promise.then expected a function for error handler");
                    var n = new e;
                    return this.handlers.push({
                        promise: n,
                        onSuccess: t,
                        onError: r
                    }), this.errorHandled = !0, this.dispatch(), n;
                }, t.catch = function(e) {
                    return this.then(void 0, e);
                }, t.finally = function(t) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.finally expected a function");
                    return this.then((function(r) {
                        return e.try(t).then((function() {
                            return r;
                        }));
                    }), (function(r) {
                        return e.try(t).then((function() {
                            throw r;
                        }));
                    }));
                }, t.timeout = function(e, t) {
                    var r = this;
                    if (this.resolved || this.rejected) return this;
                    var n = setTimeout((function() {
                        r.resolved || r.rejected || r.reject(t || new Error("Promise timed out after " + e + "ms"));
                    }), e);
                    return this.then((function(e) {
                        return clearTimeout(n), e;
                    }));
                }, t.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                }, t.lazy = function() {
                    return this.errorHandled = !0, this;
                }, e.resolve = function(t) {
                    return t instanceof e ? t : n(t) ? new e((function(e, r) {
                        return t.then(e, r);
                    })) : (new e).resolve(t);
                }, e.reject = function(t) {
                    return (new e).reject(t);
                }, e.asyncReject = function(t) {
                    return (new e).asyncReject(t);
                }, e.all = function(t) {
                    var r = new e, o = t.length, i = [].slice();
                    if (!o) return r.resolve(i), r;
                    for (var c = function(e, t, n) {
                        return t.then((function(t) {
                            i[e] = t, 0 == (o -= 1) && r.resolve(i);
                        }), (function(e) {
                            n.reject(e);
                        }));
                    }, u = 0; u < t.length; u++) {
                        var s = t[u];
                        if (s instanceof e) {
                            if (s.resolved) {
                                i[u] = s.value, o -= 1;
                                continue;
                            }
                        } else if (!n(s)) {
                            i[u] = s, o -= 1;
                            continue;
                        }
                        c(u, e.resolve(s), r);
                    }
                    return 0 === o && r.resolve(i), r;
                }, e.hash = function(t) {
                    var r = {}, o = [], i = function(e) {
                        if (t.hasOwnProperty(e)) {
                            var i = t[e];
                            n(i) ? o.push(i.then((function(t) {
                                r[e] = t;
                            }))) : r[e] = i;
                        }
                    };
                    for (var c in t) i(c);
                    return e.all(o).then((function() {
                        return r;
                    }));
                }, e.map = function(t, r) {
                    return e.all(t.map(r));
                }, e.onPossiblyUnhandledException = function(e) {
                    return function(e) {
                        return c.push(e), {
                            cancel: function() {
                                c.splice(c.indexOf(e), 1);
                            }
                        };
                    }(e);
                }, e.try = function(t, r, n) {
                    if (t && "function" != typeof t && !t.call) throw new Error("Promise.try expected a function");
                    var o;
                    f();
                    try {
                        o = t.apply(r, n || []);
                    } catch (t) {
                        return l(), e.reject(t);
                    }
                    return l(), e.resolve(o);
                }, e.delay = function(t) {
                    return new e((function(e) {
                        setTimeout(e, t);
                    }));
                }, e.isPromise = function(t) {
                    return !!(t && t instanceof e) || n(t);
                }, e.flush = function() {
                    return t = o = o || new e, s(), t;
                    var t;
                }, e;
            }();
        } ]);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "Promise", (function() {
            return zalgo_promise.ZalgoPromise;
        }));
        __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return types_TYPES;
        }));
        __webpack_require__.d(__webpack_exports__, "ProxyWindow", (function() {
            return window_ProxyWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "setup", (function() {
            return setup;
        }));
        __webpack_require__.d(__webpack_exports__, "destroy", (function() {
            return destroy;
        }));
        __webpack_require__.d(__webpack_exports__, "serializeMessage", (function() {
            return setup_serializeMessage;
        }));
        __webpack_require__.d(__webpack_exports__, "deserializeMessage", (function() {
            return setup_deserializeMessage;
        }));
        __webpack_require__.d(__webpack_exports__, "createProxyWindow", (function() {
            return createProxyWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "toProxyWindow", (function() {
            return setup_toProxyWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "on", (function() {
            return on_on;
        }));
        __webpack_require__.d(__webpack_exports__, "once", (function() {
            return on_once;
        }));
        __webpack_require__.d(__webpack_exports__, "send", (function() {
            return send_send;
        }));
        __webpack_require__.d(__webpack_exports__, "markWindowKnown", (function() {
            return markWindowKnown;
        }));
        __webpack_require__.d(__webpack_exports__, "cleanUpWindow", (function() {
            return cleanUpWindow;
        }));
        __webpack_require__.d(__webpack_exports__, "bridge", (function() {}));
        var cross_domain_utils = __webpack_require__(0);
        var zalgo_promise = __webpack_require__(1);
        var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function getActualProtocol(win) {
            void 0 === win && (win = window);
            return win.location.protocol;
        }
        function getProtocol(win) {
            void 0 === win && (win = window);
            if (win.mockDomain) {
                var protocol = win.mockDomain.split("//")[0];
                if (protocol) return protocol;
            }
            return getActualProtocol(win);
        }
        function isAboutProtocol(win) {
            void 0 === win && (win = window);
            return "about:" === getProtocol(win);
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
            var protocol = getActualProtocol(win);
            if (!protocol) throw new Error("Can not read window protocol");
            if ("file:" === protocol) return "file://";
            if ("about:" === protocol) {
                var parent = function(win) {
                    void 0 === win && (win = window);
                    if (win) try {
                        if (win.parent && win.parent !== win) return win.parent;
                    } catch (err) {}
                }(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            void 0 === win && (win = window);
            var domain = getActualDomain(win);
            return domain && win.mockDomain && win.mockDomain.startsWith("mock:") ? win.mockDomain : domain;
        }
        var iframeWindows = [];
        var iframeFrames = [];
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
            if (allowMock && function(win) {
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
                        if (function(win) {
                            void 0 === win && (win = window);
                            return "mock:" === getProtocol(win);
                        }(win) && canReadFromWindow()) return !0;
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
            }(win)) try {
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
                    if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                        var parent = frame;
                        for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                        if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                    }
                    return !1;
                }(frame)) return !0;
            }
            return !1;
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
            try {
                if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
            } catch (err) {}
            return !1;
        }
        function util_safeIndexOf(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }
        var weakmap_CrossDomainSafeWeakMap = function() {
            function CrossDomainSafeWeakMap() {
                this.name = void 0;
                this.weakmap = void 0;
                this.keys = void 0;
                this.values = void 0;
                this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
                if (function() {
                    if ("undefined" == typeof WeakMap) return !1;
                    if (void 0 === Object.freeze) return !1;
                    try {
                        var testWeakMap = new WeakMap;
                        var testKey = {};
                        Object.freeze(testKey);
                        testWeakMap.set(testKey, "__testvalue__");
                        return "__testvalue__" === testWeakMap.get(testKey);
                    } catch (err) {
                        return !1;
                    }
                }()) try {
                    this.weakmap = new WeakMap;
                } catch (err) {}
                this.keys = [];
                this.values = [];
            }
            var _proto = CrossDomainSafeWeakMap.prototype;
            _proto._cleanupClosedWindows = function() {
                var weakmap = this.weakmap;
                var keys = this.keys;
                for (var i = 0; i < keys.length; i++) {
                    var value = keys[i];
                    if (isWindow(value) && isWindowClosed(value)) {
                        if (weakmap) try {
                            weakmap.delete(value);
                        } catch (err) {}
                        keys.splice(i, 1);
                        this.values.splice(i, 1);
                        i -= 1;
                    }
                }
            };
            _proto.isSafeToReadWrite = function(key) {
                return !isWindow(key);
            };
            _proto.set = function(key, value) {
                if (!key) throw new Error("WeakMap expected key");
                var weakmap = this.weakmap;
                if (weakmap) try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
                if (this.isSafeToReadWrite(key)) try {
                    var name = this.name;
                    var entry = key[name];
                    entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                        value: [ key, value ],
                        writable: !0
                    });
                    return;
                } catch (err) {}
                this._cleanupClosedWindows();
                var keys = this.keys;
                var values = this.values;
                var index = util_safeIndexOf(keys, key);
                if (-1 === index) {
                    keys.push(key);
                    values.push(value);
                } else values[index] = value;
            };
            _proto.get = function(key) {
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
            };
            _proto.delete = function(key) {
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
                var keys = this.keys;
                var index = util_safeIndexOf(keys, key);
                if (-1 !== index) {
                    keys.splice(index, 1);
                    this.values.splice(index, 1);
                }
            };
            _proto.has = function(key) {
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
                this._cleanupClosedWindows();
                return -1 !== util_safeIndexOf(this.keys, key);
            };
            _proto.getOrSet = function(key, getter) {
                if (this.has(key)) return this.get(key);
                var value = getter();
                this.set(key, value);
                return value;
            };
            return CrossDomainSafeWeakMap;
        }();
        function getEmptyObject() {
            return {};
        }
        function getFunctionName(fn) {
            return fn.name || fn.__name__ || fn.displayName || "anonymous";
        }
        function setFunctionName(fn, name) {
            try {
                delete fn.name;
                fn.name = name;
            } catch (err) {}
            fn.__name__ = fn.displayName = name;
            return fn;
        }
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            })) + "_" + function(str) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(_m, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }))).replace(/[=]/g, "");
                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
                throw new Error("Can not find window.btoa or Buffer");
            }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        var objectIDs;
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), (function(_subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                        if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        if (!uid) {
                            uid = typeof obj + ":" + uniqueID();
                            objectIDs.set(obj, uid);
                        }
                        return uid;
                    }(val) + "]" : function(element) {
                        var passed = !1;
                        try {
                            (element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument) && (passed = !0);
                        } catch (_) {}
                        return passed;
                    }(val) ? {} : val;
                }));
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        var memoizeGlobalIndex = 0;
        var memoizeGlobalIndexValidFrom = 0;
        function memoize(method, options) {
            void 0 === options && (options = {});
            var _options$thisNamespac = options.thisNamespace, thisNamespace = void 0 !== _options$thisNamespac && _options$thisNamespac, cacheTime = options.time;
            var simpleCache;
            var thisCache;
            var memoizeIndex = memoizeGlobalIndex;
            memoizeGlobalIndex += 1;
            var memoizedFunction = function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (memoizeIndex < memoizeGlobalIndexValidFrom) {
                    simpleCache = null;
                    thisCache = null;
                    memoizeIndex = memoizeGlobalIndex;
                    memoizeGlobalIndex += 1;
                }
                var cache;
                cache = thisNamespace ? (thisCache = thisCache || new weakmap_CrossDomainSafeWeakMap).getOrSet(this, getEmptyObject) : simpleCache = simpleCache || {};
                var cacheKey;
                try {
                    cacheKey = serializeArgs(args);
                } catch (_unused) {
                    return method.apply(this, arguments);
                }
                var cacheResult = cache[cacheKey];
                if (cacheResult && cacheTime && Date.now() - cacheResult.time < cacheTime) {
                    delete cache[cacheKey];
                    cacheResult = null;
                }
                if (cacheResult) return cacheResult.value;
                var time = Date.now();
                var value = method.apply(this, arguments);
                cache[cacheKey] = {
                    time: time,
                    value: value
                };
                return value;
            };
            memoizedFunction.reset = function() {
                simpleCache = null;
                thisCache = null;
            };
            return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
        }
        memoize.clear = function() {
            memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
        };
        function memoizePromise(method) {
            var cache = {};
            function memoizedPromiseFunction() {
                var _arguments = arguments, _this = this;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                var key = serializeArgs(args);
                if (cache.hasOwnProperty(key)) return cache[key];
                cache[key] = zalgo_promise.ZalgoPromise.try((function() {
                    return method.apply(_this, _arguments);
                })).finally((function() {
                    delete cache[key];
                }));
                return cache[key];
            }
            memoizedPromiseFunction.reset = function() {
                cache = {};
            };
            return setFunctionName(memoizedPromiseFunction, getFunctionName(method) + "::promiseMemoized");
        }
        function esm_util_noop() {}
        function stringifyError(err, level) {
            void 0 === level && (level = 1);
            if (level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                if ("string" == typeof err) return err;
                if (err instanceof Error) {
                    var stack = err && err.stack;
                    var message = err && err.message;
                    if (stack && message) return stack.includes(message) ? stack : message + "\n" + stack;
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
        memoize((function(obj) {
            if (Object.values) return Object.values(obj);
            var result = [];
            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
            return result;
        }));
        function util_isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        function util_getOrSet(obj, key, getter) {
            if (obj.hasOwnProperty(key)) return obj[key];
            var val = getter();
            obj[key] = val;
            return val;
        }
        Error;
        var cross_domain_safe_weakmap = __webpack_require__(3);
        function global_getGlobal(win) {
            void 0 === win && (win = window);
            var globalKey = "__post_robot_11_0_1__";
            return win !== window ? win[globalKey] : win[globalKey] = win[globalKey] || {};
        }
        var getObj = function() {
            return {};
        };
        function globalStore(key, defStore) {
            void 0 === key && (key = "store");
            void 0 === defStore && (defStore = getObj);
            return util_getOrSet(global_getGlobal(), key, (function() {
                var store = defStore();
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
            global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard;
            return global.WINDOW_WILDCARD;
        }
        function windowStore(key, defStore) {
            void 0 === key && (key = "store");
            void 0 === defStore && (defStore = getObj);
            return globalStore("windowStore").getOrSet(key, (function() {
                var winStore = new cross_domain_safe_weakmap.WeakMap;
                var getStore = function(win) {
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
                        getStore(win)[key] = val;
                        return val;
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
            var domain = _ref.domain;
            var helloPromises = windowStore("helloPromises");
            var existingPromise = helloPromises.get(win);
            existingPromise && existingPromise.resolve({
                domain: domain
            });
            var newPromise = zalgo_promise.ZalgoPromise.resolve({
                domain: domain
            });
            helloPromises.set(win, newPromise);
            return newPromise;
        }
        function sayHello(win, _ref4) {
            return (0, _ref4.send)(win, "postrobot_hello", {
                instanceID: getInstanceID()
            }, {
                domain: "*",
                timeout: -1
            }).then((function(_ref5) {
                var origin = _ref5.origin, instanceID = _ref5.data.instanceID;
                resolveHelloPromise(win, {
                    domain: origin
                });
                return {
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
        function markWindowKnown(win) {
            windowStore("knownWindows").set(win, !0);
        }
        function getBody() {
            var body = document.body;
            if (!body) throw new Error("Body element not found");
            return body;
        }
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function isDocumentInteractive() {
            return Boolean(document.body) && "interactive" === document.readyState;
        }
        memoize((function() {
            return new zalgo_promise.ZalgoPromise((function(resolve) {
                if (isDocumentReady() || isDocumentInteractive()) resolve(); else var interval = setInterval((function() {
                    if (isDocumentReady() || isDocumentInteractive()) {
                        clearInterval(interval);
                        resolve();
                    }
                }), 10);
            }));
        }));
        var currentScript = "undefined" != typeof document ? document.currentScript : null;
        var getCurrentScript = memoize((function() {
            if (currentScript) return currentScript;
            if (currentScript = function() {
                try {
                    var stack = function() {
                        try {
                            throw new Error("_");
                        } catch (err) {
                            return err.stack || "";
                        }
                    }();
                    var stackDetails = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(stack);
                    var scriptLocation = stackDetails && stackDetails[1];
                    if (!scriptLocation) return;
                    for (var _i22 = 0, _Array$prototype$slic2 = [].slice.call(document.getElementsByTagName("script")).reverse(); _i22 < _Array$prototype$slic2.length; _i22++) {
                        var script = _Array$prototype$slic2[_i22];
                        if (script.src && script.src === scriptLocation) return script;
                    }
                } catch (err) {}
            }()) return currentScript;
            throw new Error("Can not determine current script");
        }));
        var currentUID = uniqueID();
        memoize((function() {
            var script;
            try {
                script = getCurrentScript();
            } catch (err) {
                return currentUID;
            }
            var uid = script.getAttribute("data-uid");
            if (uid && "string" == typeof uid) return uid;
            if ((uid = script.getAttribute("data-uid-auto")) && "string" == typeof uid) return uid;
            if (script.src) {
                var hashedString = function(str) {
                    var hash = "";
                    for (var i = 0; i < str.length; i++) {
                        var total = str[i].charCodeAt(0) * i;
                        str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                        hash += String.fromCharCode(97 + Math.abs(total) % 26);
                    }
                    return hash;
                }(JSON.stringify({
                    src: script.src,
                    dataset: script.dataset
                }));
                uid = "uid_" + hashedString.slice(hashedString.length - 30);
            } else uid = uniqueID();
            script.setAttribute("data-uid-auto", uid);
            return uid;
        }));
        function isSerializedType(item) {
            return "object" == typeof item && null !== item && "string" == typeof item.__type__;
        }
        function determineType(val) {
            return void 0 === val ? "undefined" : null === val ? "null" : Array.isArray(val) ? "array" : "function" == typeof val ? "function" : "object" == typeof val ? val instanceof Error ? "error" : "function" == typeof val.then ? "promise" : "[object RegExp]" === {}.toString.call(val) ? "regex" : "[object Date]" === {}.toString.call(val) ? "date" : "object" : "string" == typeof val ? "string" : "number" == typeof val ? "number" : "boolean" == typeof val ? "boolean" : void 0;
        }
        function serializeType(type, val) {
            return {
                __type__: type,
                __val__: val
            };
        }
        var _SERIALIZER;
        var SERIALIZER = ((_SERIALIZER = {}).function = function() {}, _SERIALIZER.error = function(_ref) {
            return serializeType("error", {
                message: _ref.message,
                stack: _ref.stack,
                code: _ref.code,
                data: _ref.data
            });
        }, _SERIALIZER.promise = function() {}, _SERIALIZER.regex = function(val) {
            return serializeType("regex", val.source);
        }, _SERIALIZER.date = function(val) {
            return serializeType("date", val.toJSON());
        }, _SERIALIZER.array = function(val) {
            return val;
        }, _SERIALIZER.object = function(val) {
            return val;
        }, _SERIALIZER.string = function(val) {
            return val;
        }, _SERIALIZER.number = function(val) {
            return val;
        }, _SERIALIZER.boolean = function(val) {
            return val;
        }, _SERIALIZER.null = function(val) {
            return val;
        }, _SERIALIZER[void 0] = function(val) {
            return serializeType("undefined", val);
        }, _SERIALIZER);
        var defaultSerializers = {};
        var _DESERIALIZER;
        var DESERIALIZER = ((_DESERIALIZER = {}).function = function() {
            throw new Error("Function serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER.error = function(_ref2) {
            var stack = _ref2.stack, code = _ref2.code, data = _ref2.data;
            var error = new Error(_ref2.message);
            error.code = code;
            data && (error.data = data);
            error.stack = stack + "\n\n" + error.stack;
            return error;
        }, _DESERIALIZER.promise = function() {
            throw new Error("Promise serialization is not implemented; nothing to deserialize");
        }, _DESERIALIZER.regex = function(val) {
            return new RegExp(val);
        }, _DESERIALIZER.date = function(val) {
            return new Date(val);
        }, _DESERIALIZER.array = function(val) {
            return val;
        }, _DESERIALIZER.object = function(val) {
            return val;
        }, _DESERIALIZER.string = function(val) {
            return val;
        }, _DESERIALIZER.number = function(val) {
            return val;
        }, _DESERIALIZER.boolean = function(val) {
            return val;
        }, _DESERIALIZER.null = function(val) {
            return val;
        }, _DESERIALIZER[void 0] = function() {}, _DESERIALIZER);
        var defaultDeserializers = {};
        new zalgo_promise.ZalgoPromise((function(resolve) {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval((function() {
                if (window.document && window.document.body) {
                    clearInterval(interval);
                    return resolve(window.document.body);
                }
            }), 10);
        }));
        function cleanupProxyWindows() {
            var idToProxyWindow = globalStore("idToProxyWindow");
            for (var _i2 = 0, _idToProxyWindow$keys2 = idToProxyWindow.keys(); _i2 < _idToProxyWindow$keys2.length; _i2++) {
                var id = _idToProxyWindow$keys2[_i2];
                idToProxyWindow.get(id).shouldClean() && idToProxyWindow.del(id);
            }
        }
        function getSerializedWindow(winPromise, _ref) {
            var send = _ref.send, _ref$id = _ref.id, id = void 0 === _ref$id ? uniqueID() : _ref$id;
            var windowNamePromise = winPromise.then((function(win) {
                if (Object(cross_domain_utils.isSameDomain)(win)) return Object(cross_domain_utils.assertSameDomain)(win).name;
            }));
            var windowTypePromise = winPromise.then((function(window) {
                if (Object(cross_domain_utils.isWindowClosed)(window)) throw new Error("Window is closed, can not determine type");
                return Object(cross_domain_utils.getOpener)(window) ? cross_domain_utils.WINDOW_TYPE.POPUP : cross_domain_utils.WINDOW_TYPE.IFRAME;
            }));
            windowNamePromise.catch(esm_util_noop);
            windowTypePromise.catch(esm_util_noop);
            var getName = function() {
                return winPromise.then((function(win) {
                    if (!Object(cross_domain_utils.isWindowClosed)(win)) return Object(cross_domain_utils.isSameDomain)(win) ? Object(cross_domain_utils.assertSameDomain)(win).name : windowNamePromise;
                }));
            };
            return {
                id: id,
                getType: function() {
                    return windowTypePromise;
                },
                getInstanceID: memoizePromise((function() {
                    return winPromise.then((function(win) {
                        return getWindowInstanceID(win, {
                            send: send
                        });
                    }));
                })),
                close: function() {
                    return winPromise.then(cross_domain_utils.closeWindow);
                },
                getName: getName,
                focus: function() {
                    return winPromise.then((function(win) {
                        win.focus();
                    }));
                },
                isClosed: function() {
                    return winPromise.then((function(win) {
                        return Object(cross_domain_utils.isWindowClosed)(win);
                    }));
                },
                setLocation: function(href, opts) {
                    void 0 === opts && (opts = {});
                    return winPromise.then((function(win) {
                        var domain = window.location.protocol + "//" + window.location.host;
                        var _opts$method = opts.method, method = void 0 === _opts$method ? "get" : _opts$method, body = opts.body;
                        if (href.startsWith("/")) href = "" + domain + href; else if (!/^https?:\/\//.exec(href) && !href.startsWith(domain)) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(href));
                        if ("post" === method) return getName().then((function(name) {
                            if (!name) throw new Error("Can not post to window without target name");
                            !function(_ref3) {
                                var url = _ref3.url, target = _ref3.target, body = _ref3.body, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "post" : _ref3$method;
                                var form = document.createElement("form");
                                form.setAttribute("target", target);
                                form.setAttribute("method", method);
                                form.setAttribute("action", url);
                                form.style.display = "none";
                                if (body) for (var _i24 = 0, _Object$keys4 = Object.keys(body); _i24 < _Object$keys4.length; _i24++) {
                                    var _body$key;
                                    var key = _Object$keys4[_i24];
                                    var input = document.createElement("input");
                                    input.setAttribute("name", key);
                                    input.setAttribute("value", null == (_body$key = body[key]) ? void 0 : _body$key.toString());
                                    form.appendChild(input);
                                }
                                getBody().appendChild(form);
                                form.submit();
                                getBody().removeChild(form);
                            }({
                                url: href,
                                target: name,
                                method: method,
                                body: body
                            });
                        }));
                        if ("get" !== method) throw new Error("Unsupported method: " + method);
                        if (Object(cross_domain_utils.isSameDomain)(win)) try {
                            if (win.location && "function" == typeof win.location.replace) {
                                win.location.replace(href);
                                return;
                            }
                        } catch (err) {}
                        win.location = href;
                    }));
                },
                setName: function(name) {
                    return winPromise.then((function(win) {
                        var sameDomain = Object(cross_domain_utils.isSameDomain)(win);
                        var frame = Object(cross_domain_utils.getFrameForWindow)(win);
                        if (!sameDomain) throw new Error("Can not set name for cross-domain window: " + name);
                        Object(cross_domain_utils.assertSameDomain)(win).name = name;
                        frame && frame.setAttribute("name", name);
                        windowNamePromise = zalgo_promise.ZalgoPromise.resolve(name);
                    }));
                }
            };
        }
        var window_ProxyWindow = function() {
            function ProxyWindow(_ref2) {
                var send = _ref2.send, win = _ref2.win, serializedWindow = _ref2.serializedWindow;
                this.id = void 0;
                this.isProxyWindow = !0;
                this.serializedWindow = void 0;
                this.actualWindow = void 0;
                this.actualWindowPromise = void 0;
                this.send = void 0;
                this.name = void 0;
                this.actualWindowPromise = new zalgo_promise.ZalgoPromise;
                this.serializedWindow = serializedWindow || getSerializedWindow(this.actualWindowPromise, {
                    send: send
                });
                globalStore("idToProxyWindow").set(this.getID(), this);
                win && this.setWindow(win, {
                    send: send
                });
            }
            var _proto = ProxyWindow.prototype;
            _proto.getID = function() {
                return this.serializedWindow.id;
            };
            _proto.getType = function() {
                return this.serializedWindow.getType();
            };
            _proto.isPopup = function() {
                return this.getType().then((function(type) {
                    return type === cross_domain_utils.WINDOW_TYPE.POPUP;
                }));
            };
            _proto.setLocation = function(href, opts) {
                var _this = this;
                return this.serializedWindow.setLocation(href, opts).then((function() {
                    return _this;
                }));
            };
            _proto.getName = function() {
                return this.serializedWindow.getName();
            };
            _proto.setName = function(name) {
                var _this2 = this;
                return this.serializedWindow.setName(name).then((function() {
                    return _this2;
                }));
            };
            _proto.close = function() {
                var _this3 = this;
                return this.serializedWindow.close().then((function() {
                    return _this3;
                }));
            };
            _proto.focus = function() {
                var _this4 = this;
                var isPopupPromise = this.isPopup();
                var getNamePromise = this.getName();
                var reopenPromise = zalgo_promise.ZalgoPromise.hash({
                    isPopup: isPopupPromise,
                    name: getNamePromise
                }).then((function(_ref3) {
                    var name = _ref3.name;
                    _ref3.isPopup && name && window.open("", name, "noopener");
                }));
                var focusPromise = this.serializedWindow.focus();
                return zalgo_promise.ZalgoPromise.all([ reopenPromise, focusPromise ]).then((function() {
                    return _this4;
                }));
            };
            _proto.isClosed = function() {
                return this.serializedWindow.isClosed();
            };
            _proto.getWindow = function() {
                return this.actualWindow;
            };
            _proto.setWindow = function(win, _ref4) {
                var send = _ref4.send;
                this.actualWindow = win;
                this.actualWindowPromise.resolve(this.actualWindow);
                this.serializedWindow = getSerializedWindow(this.actualWindowPromise, {
                    send: send,
                    id: this.getID()
                });
                windowStore("winToProxyWindow").set(win, this);
            };
            _proto.awaitWindow = function() {
                return this.actualWindowPromise;
            };
            _proto.matchWindow = function(win, _ref5) {
                var _this5 = this;
                var send = _ref5.send;
                return zalgo_promise.ZalgoPromise.try((function() {
                    return _this5.actualWindow ? win === _this5.actualWindow : zalgo_promise.ZalgoPromise.hash({
                        proxyInstanceID: _this5.getInstanceID(),
                        knownWindowInstanceID: getWindowInstanceID(win, {
                            send: send
                        })
                    }).then((function(_ref6) {
                        var match = _ref6.proxyInstanceID === _ref6.knownWindowInstanceID;
                        match && _this5.setWindow(win, {
                            send: send
                        });
                        return match;
                    }));
                }));
            };
            _proto.unwrap = function() {
                return this.actualWindow || this;
            };
            _proto.getInstanceID = function() {
                return this.serializedWindow.getInstanceID();
            };
            _proto.shouldClean = function() {
                return Boolean(this.actualWindow && Object(cross_domain_utils.isWindowClosed)(this.actualWindow));
            };
            _proto.serialize = function() {
                return this.serializedWindow;
            };
            ProxyWindow.unwrap = function(win) {
                return ProxyWindow.isProxyWindow(win) ? win.unwrap() : win;
            };
            ProxyWindow.serialize = function(win, _ref7) {
                var send = _ref7.send;
                cleanupProxyWindows();
                return ProxyWindow.toProxyWindow(win, {
                    send: send
                }).serialize();
            };
            ProxyWindow.deserialize = function(serializedWindow, _ref8) {
                var send = _ref8.send;
                cleanupProxyWindows();
                return globalStore("idToProxyWindow").get(serializedWindow.id) || new ProxyWindow({
                    serializedWindow: serializedWindow,
                    send: send
                });
            };
            ProxyWindow.isProxyWindow = function(obj) {
                return Boolean(obj && !Object(cross_domain_utils.isWindow)(obj) && obj.isProxyWindow);
            };
            ProxyWindow.toProxyWindow = function(win, _ref9) {
                var send = _ref9.send;
                cleanupProxyWindows();
                if (ProxyWindow.isProxyWindow(win)) return win;
                var actualWindow = win;
                return windowStore("winToProxyWindow").get(actualWindow) || new ProxyWindow({
                    win: actualWindow,
                    send: send
                });
            };
            return ProxyWindow;
        }();
        function addMethod(id, val, name, source, domain) {
            var methodStore = windowStore("methodStore");
            var proxyWindowMethods = globalStore("proxyWindowMethods");
            if (window_ProxyWindow.isProxyWindow(source)) proxyWindowMethods.set(id, {
                val: val,
                name: name,
                domain: domain,
                source: source
            }); else {
                proxyWindowMethods.del(id);
                methodStore.getOrSet(source, (function() {
                    return {};
                }))[id] = {
                    domain: domain,
                    name: name,
                    val: val,
                    source: source
                };
            }
        }
        function lookupMethod(source, id) {
            var methodStore = windowStore("methodStore");
            var proxyWindowMethods = globalStore("proxyWindowMethods");
            return methodStore.getOrSet(source, (function() {
                return {};
            }))[id] || proxyWindowMethods.get(id);
        }
        function function_serializeFunction(destination, domain, val, key, _ref3) {
            on = (_ref = {
                on: _ref3.on,
                send: _ref3.send
            }).on, send = _ref.send, globalStore("builtinListeners").getOrSet("functionCalls", (function() {
                return on("postrobot_method", {
                    domain: "*"
                }, (function(_ref2) {
                    var source = _ref2.source, origin = _ref2.origin, data = _ref2.data;
                    var id = data.id, name = data.name;
                    var meth = lookupMethod(source, id);
                    if (!meth) throw new Error("Could not find method '" + name + "' with id: " + data.id + " in " + Object(cross_domain_utils.getDomain)(window));
                    var methodSource = meth.source, domain = meth.domain, val = meth.val;
                    return zalgo_promise.ZalgoPromise.try((function() {
                        if (!Object(cross_domain_utils.matchDomain)(domain, origin)) throw new Error("Method '" + data.name + "' domain " + JSON.stringify(util_isRegex(meth.domain) ? meth.domain.source : meth.domain) + " does not match origin " + origin + " in " + Object(cross_domain_utils.getDomain)(window));
                        if (window_ProxyWindow.isProxyWindow(methodSource)) return methodSource.matchWindow(source, {
                            send: send
                        }).then((function(match) {
                            if (!match) throw new Error("Method call '" + data.name + "' failed - proxy window does not match source in " + Object(cross_domain_utils.getDomain)(window));
                        }));
                    })).then((function() {
                        return val.apply({
                            source: source,
                            origin: origin
                        }, data.args);
                    }), (function(err) {
                        return zalgo_promise.ZalgoPromise.try((function() {
                            if (val.onError) return val.onError(err);
                        })).then((function() {
                            err.stack && (err.stack = "Remote call to " + name + "(" + function(args) {
                                void 0 === args && (args = []);
                                return (item = args, [].slice.call(item)).map((function(arg) {
                                    return "string" == typeof arg ? "'" + arg + "'" : void 0 === arg ? "undefined" : null === arg ? "null" : "boolean" == typeof arg ? arg.toString() : Array.isArray(arg) ? "[ ... ]" : "object" == typeof arg ? "{ ... }" : "function" == typeof arg ? "() => { ... }" : "<" + typeof arg + ">";
                                })).join(", ");
                                var item;
                            }(data.args) + ") failed\n\n" + err.stack);
                            throw err;
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
            var _ref, on, send;
            var id = val.__id__ || uniqueID();
            destination = window_ProxyWindow.unwrap(destination);
            var name = val.__name__ || val.name || key;
            "string" == typeof name && "function" == typeof name.indexOf && name.startsWith("anonymous::") && (name = name.replace("anonymous::", key + "::"));
            if (window_ProxyWindow.isProxyWindow(destination)) {
                addMethod(id, val, name, destination, domain);
                destination.awaitWindow().then((function(win) {
                    addMethod(id, val, name, win, domain);
                }));
            } else addMethod(id, val, name, destination, domain);
            return serializeType("cross_domain_function", {
                id: id,
                name: name
            });
        }
        function serializeMessage(destination, domain, obj, _ref) {
            var _serialize;
            var on = _ref.on, send = _ref.send;
            return function(obj, serializers) {
                void 0 === serializers && (serializers = defaultSerializers);
                var result = JSON.stringify(obj, (function(key) {
                    var _serializers$type;
                    var val = this[key];
                    if (isSerializedType(this)) return val;
                    var type = determineType(val);
                    if (!type) return val;
                    var serializer = null != (_serializers$type = serializers[type]) ? _serializers$type : SERIALIZER[type];
                    return serializer ? serializer(val, key) : val;
                }));
                return void 0 === result ? "undefined" : result;
            }(obj, ((_serialize = {}).promise = function(val, key) {
                return function(destination, domain, val, key, _ref) {
                    return serializeType("cross_domain_zalgo_promise", {
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
            }, _serialize.function = function(val, key) {
                return function_serializeFunction(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize.object = function(val) {
                return Object(cross_domain_utils.isWindow)(val) || window_ProxyWindow.isProxyWindow(val) ? serializeType("cross_domain_window", window_ProxyWindow.serialize(val, {
                    send: send
                })) : val;
            }, _serialize));
        }
        function deserializeMessage(source, origin, message, _ref2) {
            var _deserialize;
            var send = _ref2.send;
            return function(str, deserializers) {
                void 0 === deserializers && (deserializers = defaultDeserializers);
                if ("undefined" !== str) return JSON.parse(str, (function(key, val) {
                    var _deserializers$type;
                    if (isSerializedType(this)) return val;
                    var type;
                    var value;
                    if (isSerializedType(val)) {
                        type = val.__type__;
                        value = val.__val__;
                    } else {
                        type = determineType(val);
                        value = val;
                    }
                    if (!type) return value;
                    var deserializer = null != (_deserializers$type = deserializers[type]) ? _deserializers$type : DESERIALIZER[type];
                    return deserializer ? deserializer(value, key) : value;
                }));
            }(message, ((_deserialize = {}).cross_domain_zalgo_promise = function(serializedPromise) {
                return function(source, origin, _ref2) {
                    return new zalgo_promise.ZalgoPromise(_ref2.then);
                }(0, 0, serializedPromise);
            }, _deserialize.cross_domain_function = function(serializedFunction) {
                return function(source, origin, _ref4, _ref5) {
                    var id = _ref4.id, name = _ref4.name;
                    var send = _ref5.send;
                    var getDeserializedFunction = function(opts) {
                        void 0 === opts && (opts = {});
                        function crossDomainFunctionWrapper() {
                            var _arguments = arguments;
                            return window_ProxyWindow.toProxyWindow(source, {
                                send: send
                            }).awaitWindow().then((function(win) {
                                var meth = lookupMethod(win, id);
                                if (meth && meth.val !== crossDomainFunctionWrapper) return meth.val.apply({
                                    source: window,
                                    origin: Object(cross_domain_utils.getDomain)()
                                }, _arguments);
                                var args = [].slice.call(_arguments);
                                return opts.fireAndForget ? send(win, "postrobot_method", {
                                    id: id,
                                    name: name,
                                    args: args
                                }, {
                                    domain: origin,
                                    fireAndForget: !0
                                }) : send(win, "postrobot_method", {
                                    id: id,
                                    name: name,
                                    args: args
                                }, {
                                    domain: origin,
                                    fireAndForget: !1
                                }).then((function(res) {
                                    return res.data.result;
                                }));
                            })).catch((function(err) {
                                throw err;
                            }));
                        }
                        crossDomainFunctionWrapper.__name__ = name;
                        crossDomainFunctionWrapper.__origin__ = origin;
                        crossDomainFunctionWrapper.__source__ = source;
                        crossDomainFunctionWrapper.__id__ = id;
                        crossDomainFunctionWrapper.origin = origin;
                        return crossDomainFunctionWrapper;
                    };
                    var crossDomainFunctionWrapper = getDeserializedFunction();
                    crossDomainFunctionWrapper.fireAndForget = getDeserializedFunction({
                        fireAndForget: !0
                    });
                    return crossDomainFunctionWrapper;
                }(source, origin, serializedFunction, {
                    send: send
                });
            }, _deserialize.cross_domain_window = function(serializedWindow) {
                return window_ProxyWindow.deserialize(serializedWindow, {
                    send: send
                });
            }, _deserialize));
        }
        var SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES.postrobot_post_message = function(win, serializedMessage, domain) {
            domain.startsWith(cross_domain_utils.PROTOCOL.FILE) && (domain = "*");
            win.postMessage(serializedMessage, domain);
        };
        function send_sendMessage(win, domain, message, _ref2) {
            var on = _ref2.on, send = _ref2.send;
            return zalgo_promise.ZalgoPromise.try((function() {
                var domainBuffer = windowStore().getOrSet(win, (function() {
                    return {};
                }));
                domainBuffer.buffer = domainBuffer.buffer || [];
                domainBuffer.buffer.push(message);
                domainBuffer.flush = domainBuffer.flush || zalgo_promise.ZalgoPromise.flush().then((function() {
                    if (Object(cross_domain_utils.isWindowClosed)(win)) throw new Error("Window is closed");
                    var serializedMessage = serializeMessage(win, domain, ((_ref = {}).__post_robot_11_0_1__ = domainBuffer.buffer || [], 
                    _ref), {
                        on: on,
                        send: send
                    });
                    var _ref;
                    delete domainBuffer.buffer;
                    var strategies = Object.keys(SEND_MESSAGE_STRATEGIES);
                    var errors = [];
                    for (var _i2 = 0; _i2 < strategies.length; _i2++) {
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
                }));
                return domainBuffer.flush.then((function() {
                    delete domainBuffer.flush;
                }));
            })).then(esm_util_noop);
        }
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
            var name = _ref.name, win = _ref.win, domain = _ref.domain;
            var requestListeners = windowStore("requestListeners");
            "*" === win && (win = null);
            "*" === domain && (domain = null);
            if (!name) throw new Error("Name required to get request listener");
            for (var _i4 = 0, _ref3 = [ win, getWildcard() ]; _i4 < _ref3.length; _i4++) {
                var winQualifier = _ref3[_i4];
                if (winQualifier) {
                    var nameListeners = requestListeners.get(winQualifier);
                    if (nameListeners) {
                        var domainListeners = nameListeners[name];
                        if (domainListeners) {
                            if (domain && "string" == typeof domain) {
                                if (domainListeners[domain]) return domainListeners[domain];
                                if (domainListeners.__domain_regex__) for (var _i6 = 0, _domainListeners$__DO2 = domainListeners.__domain_regex__; _i6 < _domainListeners$__DO2.length; _i6++) {
                                    var _domainListeners$__DO3 = _domainListeners$__DO2[_i6], regex = _domainListeners$__DO3.regex, listener = _domainListeners$__DO3.listener;
                                    if (Object(cross_domain_utils.matchDomain)(regex, domain)) return listener;
                                }
                            }
                            if (domainListeners["*"]) return domainListeners["*"];
                        }
                    }
                }
            }
        }
        function handleRequest(source, origin, message, _ref) {
            var on = _ref.on, send = _ref.send;
            var options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin
            });
            var logName = "postrobot_method" === message.name && message.data && "string" == typeof message.data.name ? message.data.name + "()" : message.name;
            function sendResponse(ack, data, error) {
                return zalgo_promise.ZalgoPromise.flush().then((function() {
                    if (!message.fireAndForget && !Object(cross_domain_utils.isWindowClosed)(source)) try {
                        return send_sendMessage(source, origin, {
                            id: uniqueID(),
                            origin: Object(cross_domain_utils.getDomain)(window),
                            type: "postrobot_message_response",
                            hash: message.hash,
                            name: message.name,
                            ack: ack,
                            data: data,
                            error: error
                        }, {
                            on: on,
                            send: send
                        });
                    } catch (err) {
                        throw new Error("Send response message failed for " + logName + " in " + Object(cross_domain_utils.getDomain)() + "\n\n" + stringifyError(err));
                    }
                }));
            }
            return zalgo_promise.ZalgoPromise.all([ zalgo_promise.ZalgoPromise.flush().then((function() {
                if (!message.fireAndForget && !Object(cross_domain_utils.isWindowClosed)(source)) try {
                    return send_sendMessage(source, origin, {
                        id: uniqueID(),
                        origin: Object(cross_domain_utils.getDomain)(window),
                        type: "postrobot_message_ack",
                        hash: message.hash,
                        name: message.name
                    }, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    throw new Error("Send ack message failed for " + logName + " in " + Object(cross_domain_utils.getDomain)() + "\n\n" + stringifyError(err));
                }
            })), zalgo_promise.ZalgoPromise.try((function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                return options.handler({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            })).then((function(data) {
                return sendResponse("success", data);
            }), (function(error) {
                return sendResponse("error", null, error);
            })) ]).then(esm_util_noop).catch((function(err) {
                if (!options || !options.handleError) throw err;
                options.handleError(err);
            }));
        }
        function handleAck(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                try {
                    if (!Object(cross_domain_utils.matchDomain)(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    if (source !== options.win) throw new Error("Ack source does not match registered window");
                } catch (err) {
                    options.promise.reject(err);
                }
                options.ack = !0;
            }
        }
        function handleResponse(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!Object(cross_domain_utils.matchDomain)(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + Object(cross_domain_utils.stringifyDomainPattern)(options.domain));
                if (source !== options.win) throw new Error("Response source does not match registered window");
                deleteResponseListener(message.hash);
                "error" === message.ack ? options.promise.reject(message.error) : "success" === message.ack && options.promise.resolve({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            }
        }
        function receive_receiveMessage(event, _ref2) {
            var on = _ref2.on, send = _ref2.send;
            var receivedMessages = globalStore("receivedMessages");
            try {
                if (!window || window.closed || !event.source) return;
            } catch (err) {
                return;
            }
            var source = event.source, origin = event.origin;
            var messages = function(message, source, origin, _ref) {
                var on = _ref.on, send = _ref.send;
                var parsedMessage;
                try {
                    parsedMessage = deserializeMessage(source, origin, message, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    return;
                }
                if (parsedMessage && "object" == typeof parsedMessage && null !== parsedMessage) {
                    var parseMessages = parsedMessage.__post_robot_11_0_1__;
                    if (Array.isArray(parseMessages)) return parseMessages;
                }
            }(event.data, source, origin, {
                on: on,
                send: send
            });
            if (messages) {
                markWindowKnown(source);
                for (var _i2 = 0; _i2 < messages.length; _i2++) {
                    var message = messages[_i2];
                    if (receivedMessages.has(message.id)) return;
                    receivedMessages.set(message.id, !0);
                    if (Object(cross_domain_utils.isWindowClosed)(source) && !message.fireAndForget) return;
                    message.origin.startsWith(cross_domain_utils.PROTOCOL.FILE) && (origin = cross_domain_utils.PROTOCOL.FILE + "//");
                    try {
                        "postrobot_message_request" === message.type ? handleRequest(source, origin, message, {
                            on: on,
                            send: send
                        }) : "postrobot_message_response" === message.type ? handleResponse(source, origin, message) : "postrobot_message_ack" === message.type && handleAck(source, origin, message);
                    } catch (err) {
                        setTimeout((function() {
                            throw err;
                        }), 0);
                    }
                }
            }
        }
        function on_on(name, options, handler) {
            if (!name) throw new Error("Expected name");
            if ("function" == typeof (options = options || {})) {
                handler = options;
                options = {};
            }
            if (!handler) throw new Error("Expected handler");
            var requestListener = function addRequestListener(_ref4, listener) {
                var name = _ref4.name, winCandidate = _ref4.win, domain = _ref4.domain;
                var requestListeners = windowStore("requestListeners");
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                if (winCandidate && "*" !== winCandidate && window_ProxyWindow.isProxyWindow(winCandidate)) {
                    var requestListenerPromise = winCandidate.awaitWindow().then((function(actualWin) {
                        return addRequestListener({
                            name: name,
                            win: actualWin,
                            domain: domain
                        }, listener);
                    }));
                    return {
                        cancel: function() {
                            requestListenerPromise.then((function(requestListener) {
                                return requestListener.cancel();
                            }), esm_util_noop);
                        }
                    };
                }
                var win = winCandidate;
                if (Array.isArray(win)) {
                    var listenersCollection = [];
                    for (var _i8 = 0, _win2 = win; _i8 < _win2.length; _i8++) listenersCollection.push(addRequestListener({
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
                    var _listenersCollection = [];
                    for (var _i12 = 0, _domain2 = domain; _i12 < _domain2.length; _i12++) _listenersCollection.push(addRequestListener({
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
                win && "*" !== win || (win = getWildcard());
                var strDomain = (domain = domain || "*").toString();
                if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var winNameListeners = requestListeners.getOrSet(win, (function() {
                    return {};
                }));
                var winNameDomainListeners = util_getOrSet(winNameListeners, name, (function() {
                    return {};
                }));
                var winNameDomainRegexListeners;
                var winNameDomainRegexListener;
                util_isRegex(domain) ? (winNameDomainRegexListeners = util_getOrSet(winNameDomainListeners, "__domain_regex__", (function() {
                    return [];
                }))).push(winNameDomainRegexListener = {
                    regex: domain,
                    listener: listener
                }) : winNameDomainListeners[strDomain] = listener;
                return {
                    cancel: function() {
                        delete winNameDomainListeners[strDomain];
                        if (winNameDomainRegexListener) {
                            winNameDomainRegexListeners.splice(winNameDomainRegexListeners.indexOf(winNameDomainRegexListener, 1));
                            winNameDomainRegexListeners.length || delete winNameDomainListeners.__domain_regex__;
                        }
                        Object.keys(winNameDomainListeners).length || delete winNameListeners[name];
                        win && !Object.keys(winNameListeners).length && requestListeners.del(win);
                    }
                };
            }({
                name: name,
                win: options.window,
                domain: options.domain || "*"
            }, {
                handler: handler || options.handler,
                handleError: options.errorHandler || function(err) {
                    throw err;
                }
            });
            return {
                cancel: function() {
                    requestListener.cancel();
                }
            };
        }
        function on_once(name, options, handler) {
            if ("function" == typeof (options = options || {})) {
                handler = options;
                options = {};
            }
            var promise = new zalgo_promise.ZalgoPromise;
            var listener;
            options.errorHandler = function(err) {
                listener.cancel();
                promise.reject(err);
            };
            listener = on_on(name, options, (function(event) {
                listener.cancel();
                promise.resolve(event);
                if (handler) return handler(event);
            }));
            promise.cancel = listener.cancel;
            return promise;
        }
        var send_send = function send(winOrProxyWin, name, data, options) {
            var domainMatcher = (options = options || {}).domain || "*";
            var responseTimeout = options.timeout || -1;
            var childTimeout = options.timeout || 5e3;
            var fireAndForget = options.fireAndForget || !1;
            return window_ProxyWindow.toProxyWindow(winOrProxyWin, {
                send: send
            }).awaitWindow().then((function(win) {
                return zalgo_promise.ZalgoPromise.try((function() {
                    !function(name, win, domain) {
                        if (!name) throw new Error("Expected name");
                        if (domain && "string" != typeof domain && !Array.isArray(domain) && !util_isRegex(domain)) throw new TypeError("Can not send " + name + ". Expected domain " + JSON.stringify(domain) + " to be a string, array, or regex");
                        if (Object(cross_domain_utils.isWindowClosed)(win)) throw new Error("Can not send " + name + ". Target window is closed");
                    }(name, win, domainMatcher);
                    if (Object(cross_domain_utils.isAncestor)(window, win)) return function(win, timeout, name) {
                        void 0 === timeout && (timeout = 5e3);
                        void 0 === name && (name = "Window");
                        var promise = function(win) {
                            return windowStore("helloPromises").getOrSet(win, (function() {
                                return new zalgo_promise.ZalgoPromise;
                            }));
                        }(win);
                        -1 !== timeout && (promise = promise.timeout(timeout, new Error(name + " did not load after " + timeout + "ms")));
                        return promise;
                    }(win, childTimeout);
                })).then((function(_temp) {
                    return function(win, targetDomain, actualDomain, _ref) {
                        var send = _ref.send;
                        return zalgo_promise.ZalgoPromise.try((function() {
                            return "string" == typeof targetDomain ? targetDomain : zalgo_promise.ZalgoPromise.try((function() {
                                return actualDomain || sayHello(win, {
                                    send: send
                                }).then((function(_ref2) {
                                    return _ref2.domain;
                                }));
                            })).then((function(normalizedDomain) {
                                if (!Object(cross_domain_utils.matchDomain)(targetDomain, targetDomain)) throw new Error("Domain " + stringify(targetDomain) + " does not match " + stringify(targetDomain));
                                return normalizedDomain;
                            }));
                        }));
                    }(win, domainMatcher, (void 0 === _temp ? {} : _temp).domain, {
                        send: send
                    });
                })).then((function(targetDomain) {
                    var domain = targetDomain;
                    var logName = "postrobot_method" === name && data && "string" == typeof data.name ? data.name + "()" : name;
                    var promise = new zalgo_promise.ZalgoPromise;
                    var hash = name + "_" + uniqueID();
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
                        reqPromises.push(promise);
                        promise.catch((function() {
                            !function(hash) {
                                globalStore("erroredResponseListeners").set(hash, !0);
                            }(hash);
                            deleteResponseListener(hash);
                        }));
                        var totalAckTimeout = function(win) {
                            return windowStore("knownWindows").get(win, !1);
                        }(win) ? 1e4 : 2e3;
                        var totalResTimeout = responseTimeout;
                        var ackTimeout = totalAckTimeout;
                        var resTimeout = totalResTimeout;
                        var interval = function(method, time) {
                            var timeout;
                            !function loop() {
                                timeout = setTimeout((function() {
                                    !function() {
                                        if (Object(cross_domain_utils.isWindowClosed)(win)) return promise.reject(new Error("Window closed for " + name + " before " + (responseListener.ack ? "response" : "ack")));
                                        if (responseListener.cancelled) return promise.reject(new Error("Response listener was cancelled for " + name));
                                        ackTimeout = Math.max(ackTimeout - 500, 0);
                                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - 500, 0));
                                        responseListener.ack || 0 !== ackTimeout ? 0 === resTimeout && promise.reject(new Error("No response for postMessage " + logName + " in " + Object(cross_domain_utils.getDomain)() + " in " + totalResTimeout + "ms")) : promise.reject(new Error("No ack for postMessage " + logName + " in " + Object(cross_domain_utils.getDomain)() + " in " + totalAckTimeout + "ms"));
                                    }();
                                    loop();
                                }), 500);
                            }();
                            return {
                                cancel: function() {
                                    clearTimeout(timeout);
                                }
                            };
                        }();
                        promise.finally((function() {
                            interval.cancel();
                            reqPromises.splice(reqPromises.indexOf(promise, 1));
                        })).catch(esm_util_noop);
                    }
                    return send_sendMessage(win, domain, {
                        id: uniqueID(),
                        origin: Object(cross_domain_utils.getDomain)(window),
                        type: "postrobot_message_request",
                        hash: hash,
                        name: name,
                        data: data,
                        fireAndForget: fireAndForget
                    }, {
                        on: on_on,
                        send: send
                    }).then((function() {
                        return fireAndForget ? promise.resolve() : promise;
                    }), (function(err) {
                        throw new Error("Send request message failed for " + logName + " in " + Object(cross_domain_utils.getDomain)() + "\n\n" + stringifyError(err));
                    }));
                }));
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
            if (!global_getGlobal().initialized) {
                global_getGlobal().initialized = !0;
                on = (_ref3 = {
                    on: on_on,
                    send: send_send
                }).on, send = _ref3.send, (global = global_getGlobal()).receiveMessage = global.receiveMessage || function(message) {
                    receive_receiveMessage(message, {
                        on: on,
                        send: send
                    });
                };
                !function(_ref5) {
                    var on = _ref5.on, send = _ref5.send;
                    globalStore().getOrSet("postMessageListener", (function() {
                        return function(obj, event, handler) {
                            obj.addEventListener("message", handler);
                            return {
                                cancel: function() {
                                    obj.removeEventListener("message", handler);
                                }
                            };
                        }(window, 0, (function(event) {
                            !function(event, _ref4) {
                                var on = _ref4.on, send = _ref4.send;
                                zalgo_promise.ZalgoPromise.try((function() {
                                    var source = event.source || event.sourceElement;
                                    var origin = event.origin || event.originalEvent && event.originalEvent.origin;
                                    var data = event.data;
                                    "null" === origin && (origin = cross_domain_utils.PROTOCOL.FILE + "//");
                                    if (source) {
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
                                }));
                            }(event, {
                                on: on,
                                send: send
                            });
                        }));
                    }));
                }({
                    on: on_on,
                    send: send_send
                });
                !function(_ref8) {
                    var on = _ref8.on, send = _ref8.send;
                    globalStore("builtinListeners").getOrSet("helloListener", (function() {
                        var listener = on("postrobot_hello", {
                            domain: "*"
                        }, (function(_ref3) {
                            resolveHelloPromise(_ref3.source, {
                                domain: _ref3.origin
                            });
                            return {
                                instanceID: getInstanceID()
                            };
                        }));
                        var parent = Object(cross_domain_utils.getAncestor)();
                        parent && sayHello(parent, {
                            send: send
                        }).catch((function(err) {}));
                        return listener;
                    }));
                }({
                    on: on_on,
                    send: send_send
                });
            }
            var _ref3, on, send, global;
        }
        function destroy() {
            !function() {
                var responseListeners = globalStore("responseListeners");
                for (var _i2 = 0, _responseListeners$ke2 = responseListeners.keys(); _i2 < _responseListeners$ke2.length; _i2++) {
                    var hash = _responseListeners$ke2[_i2];
                    var listener = responseListeners.get(hash);
                    listener && (listener.cancelled = !0);
                    responseListeners.del(hash);
                }
            }();
            (listener = globalStore().get("postMessageListener")) && listener.cancel();
            var listener;
            delete window.__post_robot_11_0_1__;
        }
        var types_TYPES = !0;
        function cleanUpWindow(win) {
            for (var _i2 = 0, _requestPromises$get2 = windowStore("requestPromises").get(win, []); _i2 < _requestPromises$get2.length; _i2++) _requestPromises$get2[_i2].reject(new Error("Window " + (Object(cross_domain_utils.isWindowClosed)(win) ? "closed" : "cleaned up") + " before response")).catch(esm_util_noop);
        }
        setup();
    } ]);
}));