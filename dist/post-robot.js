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
        return __webpack_require__(__webpack_require__.s = 8);
    }([ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(4);
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(5);
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(7);
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(6);
    }, function(module, exports, __webpack_require__) {
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
                return l;
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
            function a() {
                u -= 1, s();
            }
            var l = function() {
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
                            return a(), void this.reject(e);
                        }
                        a(), c = !0, o ? this.resolve(r) : i && this.reject(n);
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
                            var u = o[c], s = u.onSuccess, l = u.onError, h = u.promise, d = void 0;
                            if (t) try {
                                d = s ? s(this.value) : this.value;
                            } catch (e) {
                                h.reject(e);
                                continue;
                            } else if (r) {
                                if (!l) {
                                    h.reject(this.error);
                                    continue;
                                }
                                try {
                                    d = l(this.error);
                                } catch (e) {
                                    h.reject(e);
                                    continue;
                                }
                            }
                            d instanceof e && (d.resolved || d.rejected) ? (d.resolved ? h.resolve(d.value) : h.reject(d.error), 
                            d.errorHandled = !0) : n(d) ? d instanceof e && (d.resolved || d.rejected) ? d.resolved ? h.resolve(d.value) : h.reject(d.error) : i(d, h) : h.resolve(d);
                        }
                        o.length = 0, this.dispatching = !1, a();
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
                }, e.resolve = function(t) {
                    return t instanceof e ? t : n(t) ? new e((function(e, r) {
                        return t.then(e, r);
                    })) : (new e).resolve(t);
                }, e.reject = function(t) {
                    return (new e).reject(t);
                }, e.asyncReject = function(t) {
                    return (new e).asyncReject(t);
                }, e.all = function(t) {
                    var r = new e, o = t.length, i = [];
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
                        return a(), e.reject(t);
                    }
                    return a(), e.resolve(o);
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
    }, function(module, exports, __webpack_require__) {
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
            return __webpack_require__(__webpack_require__.s = 4);
        }([ function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(2);
        }, function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(3);
        }, function(module, exports, __webpack_require__) {
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
                    return l;
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
                function a() {
                    u -= 1, s();
                }
                var l = function() {
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
                                return a(), void this.reject(e);
                            }
                            a(), c = !0, o ? this.resolve(r) : i && this.reject(n);
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
                                var u = o[c], s = u.onSuccess, l = u.onError, h = u.promise, d = void 0;
                                if (t) try {
                                    d = s ? s(this.value) : this.value;
                                } catch (e) {
                                    h.reject(e);
                                    continue;
                                } else if (r) {
                                    if (!l) {
                                        h.reject(this.error);
                                        continue;
                                    }
                                    try {
                                        d = l(this.error);
                                    } catch (e) {
                                        h.reject(e);
                                        continue;
                                    }
                                }
                                d instanceof e && (d.resolved || d.rejected) ? (d.resolved ? h.resolve(d.value) : h.reject(d.error), 
                                d.errorHandled = !0) : n(d) ? d instanceof e && (d.resolved || d.rejected) ? d.resolved ? h.resolve(d.value) : h.reject(d.error) : i(d, h) : h.resolve(d);
                            }
                            o.length = 0, this.dispatching = !1, a();
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
                    }, e.resolve = function(t) {
                        return t instanceof e ? t : n(t) ? new e((function(e, r) {
                            return t.then(e, r);
                        })) : (new e).resolve(t);
                    }, e.reject = function(t) {
                        return (new e).reject(t);
                    }, e.asyncReject = function(t) {
                        return (new e).asyncReject(t);
                    }, e.all = function(t) {
                        var r = new e, o = t.length, i = [];
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
                            return a(), e.reject(t);
                        }
                        return a(), e.resolve(o);
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
        }, function(module, exports, __webpack_require__) {
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
                    return l;
                }));
                var n = "Call was rejected by callee.\r\n";
                function i(e) {
                    return void 0 === e && (e = window), "about:" === e.location.protocol;
                }
                function a(e) {
                    try {
                        return !0;
                    } catch (e) {}
                    return !1;
                }
                function o(e) {
                    void 0 === e && (e = window);
                    var t = e.location;
                    if (!t) throw new Error("Can not read window location");
                    var r = t.protocol;
                    if (!r) throw new Error("Can not read window protocol");
                    if ("file:" === r) return "file://";
                    if ("about:" === r) {
                        var n = function(e) {
                            if (void 0 === e && (e = window), e) try {
                                if (e.parent && e.parent !== e) return e.parent;
                            } catch (e) {}
                        }(e);
                        return n && a() ? o(n) : "about://";
                    }
                    var i = t.host;
                    if (!i) throw new Error("Can not read window host");
                    return r + "//" + i;
                }
                function c(e) {
                    void 0 === e && (e = window);
                    var t = o(e);
                    return t && e.mockDomain && 0 === e.mockDomain.indexOf("mock:") ? e.mockDomain : t;
                }
                var u = [], f = [];
                function s(e, t) {
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
                                if (i(e) && a()) return !0;
                            } catch (e) {}
                            try {
                                if (o(e) === o(window)) return !0;
                            } catch (e) {}
                            return !1;
                        }(e)) return !1;
                        try {
                            if (e === window) return !0;
                            if (i(e) && a()) return !0;
                            if (c(window) === c(e)) return !0;
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
                    }(u, e);
                    if (-1 !== r) {
                        var s = f[r];
                        if (s && function(e) {
                            if (!e.contentWindow) return !0;
                            if (!e.parentNode) return !0;
                            var t = e.ownerDocument;
                            if (t && t.documentElement && !t.documentElement.contains(e)) {
                                for (var r = e; r.parentNode && r.parentNode !== r; ) r = r.parentNode;
                                if (!r.host || !t.documentElement.contains(r.host)) return !0;
                            }
                            return !1;
                        }(s)) return !0;
                    }
                    return !1;
                }
                function d(e) {
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
                function h(e, t) {
                    for (var r = 0; r < e.length; r++) try {
                        if (e[r] === t) return r;
                    } catch (e) {}
                    return -1;
                }
                var l = function() {
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
                            if (d(n) && s(n)) {
                                if (e) try {
                                    e.delete(n);
                                } catch (e) {}
                                t.splice(r, 1), this.values.splice(r, 1), r -= 1;
                            }
                        }
                    }, t.isSafeToReadWrite = function(e) {
                        return !d(e);
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
                        var a = this.keys, o = this.values, c = h(a, e);
                        -1 === c ? (a.push(e), o.push(t)) : o[c] = t;
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
                        var n = h(this.keys, e);
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
                        var n = this.keys, i = h(n, e);
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
                        return this._cleanupClosedWindows(), -1 !== h(this.keys, e);
                    }, t.getOrSet = function(e, t) {
                        if (this.has(e)) return this.get(e);
                        var r = t();
                        return this.set(e, r), r;
                    }, e;
                }();
            } ]);
        }, function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "getUserAgent", (function() {
                return getUserAgent;
            }));
            __webpack_require__.d(__webpack_exports__, "isDevice", (function() {
                return isDevice;
            }));
            __webpack_require__.d(__webpack_exports__, "isWebView", (function() {
                return isWebView;
            }));
            __webpack_require__.d(__webpack_exports__, "isStandAlone", (function() {
                return isStandAlone;
            }));
            __webpack_require__.d(__webpack_exports__, "isFacebookWebView", (function() {
                return isFacebookWebView;
            }));
            __webpack_require__.d(__webpack_exports__, "isFirefox", (function() {
                return isFirefox;
            }));
            __webpack_require__.d(__webpack_exports__, "isFirefoxIOS", (function() {
                return isFirefoxIOS;
            }));
            __webpack_require__.d(__webpack_exports__, "isEdgeIOS", (function() {
                return isEdgeIOS;
            }));
            __webpack_require__.d(__webpack_exports__, "isOperaMini", (function() {
                return isOperaMini;
            }));
            __webpack_require__.d(__webpack_exports__, "isAndroid", (function() {
                return isAndroid;
            }));
            __webpack_require__.d(__webpack_exports__, "isIos", (function() {
                return isIos;
            }));
            __webpack_require__.d(__webpack_exports__, "isGoogleSearchApp", (function() {
                return isGoogleSearchApp;
            }));
            __webpack_require__.d(__webpack_exports__, "isQQBrowser", (function() {
                return isQQBrowser;
            }));
            __webpack_require__.d(__webpack_exports__, "isIosWebview", (function() {
                return isIosWebview;
            }));
            __webpack_require__.d(__webpack_exports__, "isSFVC", (function() {
                return isSFVC;
            }));
            __webpack_require__.d(__webpack_exports__, "isSFVCorSafari", (function() {
                return isSFVCorSafari;
            }));
            __webpack_require__.d(__webpack_exports__, "isAndroidWebview", (function() {
                return isAndroidWebview;
            }));
            __webpack_require__.d(__webpack_exports__, "isIE", (function() {
                return device_isIE;
            }));
            __webpack_require__.d(__webpack_exports__, "isIECompHeader", (function() {
                return isIECompHeader;
            }));
            __webpack_require__.d(__webpack_exports__, "isElectron", (function() {
                return isElectron;
            }));
            __webpack_require__.d(__webpack_exports__, "isIEIntranet", (function() {
                return isIEIntranet;
            }));
            __webpack_require__.d(__webpack_exports__, "isMacOsCna", (function() {
                return isMacOsCna;
            }));
            __webpack_require__.d(__webpack_exports__, "supportsPopups", (function() {
                return supportsPopups;
            }));
            __webpack_require__.d(__webpack_exports__, "isChrome", (function() {
                return isChrome;
            }));
            __webpack_require__.d(__webpack_exports__, "isSafari", (function() {
                return isSafari;
            }));
            __webpack_require__.d(__webpack_exports__, "isApplePaySupported", (function() {
                return isApplePaySupported;
            }));
            __webpack_require__.d(__webpack_exports__, "getBody", (function() {
                return getBody;
            }));
            __webpack_require__.d(__webpack_exports__, "isDocumentReady", (function() {
                return isDocumentReady;
            }));
            __webpack_require__.d(__webpack_exports__, "isDocumentInteractive", (function() {
                return isDocumentInteractive;
            }));
            __webpack_require__.d(__webpack_exports__, "urlEncode", (function() {
                return urlEncode;
            }));
            __webpack_require__.d(__webpack_exports__, "waitForWindowReady", (function() {
                return waitForWindowReady;
            }));
            __webpack_require__.d(__webpack_exports__, "waitForDocumentReady", (function() {
                return waitForDocumentReady;
            }));
            __webpack_require__.d(__webpack_exports__, "waitForDocumentBody", (function() {
                return waitForDocumentBody;
            }));
            __webpack_require__.d(__webpack_exports__, "parseQuery", (function() {
                return parseQuery;
            }));
            __webpack_require__.d(__webpack_exports__, "getQueryParam", (function() {
                return getQueryParam;
            }));
            __webpack_require__.d(__webpack_exports__, "urlWillRedirectPage", (function() {
                return urlWillRedirectPage;
            }));
            __webpack_require__.d(__webpack_exports__, "formatQuery", (function() {
                return formatQuery;
            }));
            __webpack_require__.d(__webpack_exports__, "extendQuery", (function() {
                return extendQuery;
            }));
            __webpack_require__.d(__webpack_exports__, "extendUrl", (function() {
                return extendUrl;
            }));
            __webpack_require__.d(__webpack_exports__, "redirect", (function() {
                return redirect;
            }));
            __webpack_require__.d(__webpack_exports__, "hasMetaViewPort", (function() {
                return hasMetaViewPort;
            }));
            __webpack_require__.d(__webpack_exports__, "isElementVisible", (function() {
                return isElementVisible;
            }));
            __webpack_require__.d(__webpack_exports__, "getPerformance", (function() {
                return getPerformance;
            }));
            __webpack_require__.d(__webpack_exports__, "enablePerformance", (function() {
                return enablePerformance;
            }));
            __webpack_require__.d(__webpack_exports__, "getPageRenderTime", (function() {
                return getPageRenderTime;
            }));
            __webpack_require__.d(__webpack_exports__, "htmlEncode", (function() {
                return htmlEncode;
            }));
            __webpack_require__.d(__webpack_exports__, "isBrowser", (function() {
                return dom_isBrowser;
            }));
            __webpack_require__.d(__webpack_exports__, "querySelectorAll", (function() {
                return querySelectorAll;
            }));
            __webpack_require__.d(__webpack_exports__, "onClick", (function() {
                return onClick;
            }));
            __webpack_require__.d(__webpack_exports__, "getScript", (function() {
                return getScript;
            }));
            __webpack_require__.d(__webpack_exports__, "isLocalStorageEnabled", (function() {
                return isLocalStorageEnabled;
            }));
            __webpack_require__.d(__webpack_exports__, "getBrowserLocales", (function() {
                return getBrowserLocales;
            }));
            __webpack_require__.d(__webpack_exports__, "appendChild", (function() {
                return appendChild;
            }));
            __webpack_require__.d(__webpack_exports__, "isElement", (function() {
                return isElement;
            }));
            __webpack_require__.d(__webpack_exports__, "getElementSafe", (function() {
                return getElementSafe;
            }));
            __webpack_require__.d(__webpack_exports__, "getElement", (function() {
                return getElement;
            }));
            __webpack_require__.d(__webpack_exports__, "elementReady", (function() {
                return elementReady;
            }));
            __webpack_require__.d(__webpack_exports__, "PopupOpenError", (function() {
                return dom_PopupOpenError;
            }));
            __webpack_require__.d(__webpack_exports__, "popup", (function() {
                return popup;
            }));
            __webpack_require__.d(__webpack_exports__, "writeToWindow", (function() {
                return writeToWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "writeElementToWindow", (function() {
                return writeElementToWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "setStyle", (function() {
                return setStyle;
            }));
            __webpack_require__.d(__webpack_exports__, "awaitFrameLoad", (function() {
                return awaitFrameLoad;
            }));
            __webpack_require__.d(__webpack_exports__, "awaitFrameWindow", (function() {
                return awaitFrameWindow;
            }));
            __webpack_require__.d(__webpack_exports__, "createElement", (function() {
                return createElement;
            }));
            __webpack_require__.d(__webpack_exports__, "iframe", (function() {
                return iframe;
            }));
            __webpack_require__.d(__webpack_exports__, "addEventListener", (function() {
                return addEventListener;
            }));
            __webpack_require__.d(__webpack_exports__, "bindEvents", (function() {
                return bindEvents;
            }));
            __webpack_require__.d(__webpack_exports__, "setVendorCSS", (function() {
                return setVendorCSS;
            }));
            __webpack_require__.d(__webpack_exports__, "animate", (function() {
                return animate;
            }));
            __webpack_require__.d(__webpack_exports__, "makeElementVisible", (function() {
                return makeElementVisible;
            }));
            __webpack_require__.d(__webpack_exports__, "makeElementInvisible", (function() {
                return makeElementInvisible;
            }));
            __webpack_require__.d(__webpack_exports__, "showElement", (function() {
                return showElement;
            }));
            __webpack_require__.d(__webpack_exports__, "hideElement", (function() {
                return hideElement;
            }));
            __webpack_require__.d(__webpack_exports__, "destroyElement", (function() {
                return destroyElement;
            }));
            __webpack_require__.d(__webpack_exports__, "showAndAnimate", (function() {
                return showAndAnimate;
            }));
            __webpack_require__.d(__webpack_exports__, "animateAndHide", (function() {
                return animateAndHide;
            }));
            __webpack_require__.d(__webpack_exports__, "addClass", (function() {
                return addClass;
            }));
            __webpack_require__.d(__webpack_exports__, "removeClass", (function() {
                return removeClass;
            }));
            __webpack_require__.d(__webpack_exports__, "isElementClosed", (function() {
                return isElementClosed;
            }));
            __webpack_require__.d(__webpack_exports__, "watchElementForClose", (function() {
                return watchElementForClose;
            }));
            __webpack_require__.d(__webpack_exports__, "fixScripts", (function() {
                return fixScripts;
            }));
            __webpack_require__.d(__webpack_exports__, "onResize", (function() {
                return onResize;
            }));
            __webpack_require__.d(__webpack_exports__, "getResourceLoadTime", (function() {
                return getResourceLoadTime;
            }));
            __webpack_require__.d(__webpack_exports__, "isShadowElement", (function() {
                return isShadowElement;
            }));
            __webpack_require__.d(__webpack_exports__, "getShadowRoot", (function() {
                return getShadowRoot;
            }));
            __webpack_require__.d(__webpack_exports__, "getShadowHost", (function() {
                return getShadowHost;
            }));
            __webpack_require__.d(__webpack_exports__, "insertShadowSlot", (function() {
                return insertShadowSlot;
            }));
            __webpack_require__.d(__webpack_exports__, "preventClickFocus", (function() {
                return preventClickFocus;
            }));
            __webpack_require__.d(__webpack_exports__, "getStackTrace", (function() {
                return getStackTrace;
            }));
            __webpack_require__.d(__webpack_exports__, "getCurrentScript", (function() {
                return getCurrentScript;
            }));
            __webpack_require__.d(__webpack_exports__, "getCurrentScriptUID", (function() {
                return getCurrentScriptUID;
            }));
            __webpack_require__.d(__webpack_exports__, "submitForm", (function() {
                return submitForm;
            }));
            __webpack_require__.d(__webpack_exports__, "experiment", (function() {
                return experiment;
            }));
            __webpack_require__.d(__webpack_exports__, "getGlobalNameSpace", (function() {
                return getGlobalNameSpace;
            }));
            __webpack_require__.d(__webpack_exports__, "getStorage", (function() {
                return getStorage;
            }));
            __webpack_require__.d(__webpack_exports__, "getFunctionName", (function() {
                return getFunctionName;
            }));
            __webpack_require__.d(__webpack_exports__, "setFunctionName", (function() {
                return setFunctionName;
            }));
            __webpack_require__.d(__webpack_exports__, "base64encode", (function() {
                return base64encode;
            }));
            __webpack_require__.d(__webpack_exports__, "base64decode", (function() {
                return base64decode;
            }));
            __webpack_require__.d(__webpack_exports__, "uniqueID", (function() {
                return uniqueID;
            }));
            __webpack_require__.d(__webpack_exports__, "getGlobal", (function() {
                return getGlobal;
            }));
            __webpack_require__.d(__webpack_exports__, "getObjectID", (function() {
                return getObjectID;
            }));
            __webpack_require__.d(__webpack_exports__, "getEmptyObject", (function() {
                return getEmptyObject;
            }));
            __webpack_require__.d(__webpack_exports__, "memoize", (function() {
                return memoize;
            }));
            __webpack_require__.d(__webpack_exports__, "promiseIdentity", (function() {
                return promiseIdentity;
            }));
            __webpack_require__.d(__webpack_exports__, "memoizePromise", (function() {
                return memoizePromise;
            }));
            __webpack_require__.d(__webpack_exports__, "promisify", (function() {
                return promisify;
            }));
            __webpack_require__.d(__webpack_exports__, "inlineMemoize", (function() {
                return inlineMemoize;
            }));
            __webpack_require__.d(__webpack_exports__, "noop", (function() {
                return src_util_noop;
            }));
            __webpack_require__.d(__webpack_exports__, "once", (function() {
                return once;
            }));
            __webpack_require__.d(__webpack_exports__, "hashStr", (function() {
                return hashStr;
            }));
            __webpack_require__.d(__webpack_exports__, "strHashStr", (function() {
                return strHashStr;
            }));
            __webpack_require__.d(__webpack_exports__, "match", (function() {
                return match;
            }));
            __webpack_require__.d(__webpack_exports__, "awaitKey", (function() {
                return awaitKey;
            }));
            __webpack_require__.d(__webpack_exports__, "stringifyError", (function() {
                return stringifyError;
            }));
            __webpack_require__.d(__webpack_exports__, "stringifyErrorMessage", (function() {
                return stringifyErrorMessage;
            }));
            __webpack_require__.d(__webpack_exports__, "stringify", (function() {
                return stringify;
            }));
            __webpack_require__.d(__webpack_exports__, "domainMatches", (function() {
                return domainMatches;
            }));
            __webpack_require__.d(__webpack_exports__, "patchMethod", (function() {
                return patchMethod;
            }));
            __webpack_require__.d(__webpack_exports__, "extend", (function() {
                return extend;
            }));
            __webpack_require__.d(__webpack_exports__, "values", (function() {
                return util_values;
            }));
            __webpack_require__.d(__webpack_exports__, "memoizedValues", (function() {
                return memoizedValues;
            }));
            __webpack_require__.d(__webpack_exports__, "perc", (function() {
                return perc;
            }));
            __webpack_require__.d(__webpack_exports__, "min", (function() {
                return min;
            }));
            __webpack_require__.d(__webpack_exports__, "max", (function() {
                return max;
            }));
            __webpack_require__.d(__webpack_exports__, "roundUp", (function() {
                return roundUp;
            }));
            __webpack_require__.d(__webpack_exports__, "regexMap", (function() {
                return regexMap;
            }));
            __webpack_require__.d(__webpack_exports__, "svgToBase64", (function() {
                return svgToBase64;
            }));
            __webpack_require__.d(__webpack_exports__, "objFilter", (function() {
                return objFilter;
            }));
            __webpack_require__.d(__webpack_exports__, "identity", (function() {
                return identity;
            }));
            __webpack_require__.d(__webpack_exports__, "regexTokenize", (function() {
                return regexTokenize;
            }));
            __webpack_require__.d(__webpack_exports__, "promiseDebounce", (function() {
                return promiseDebounce;
            }));
            __webpack_require__.d(__webpack_exports__, "safeInterval", (function() {
                return safeInterval;
            }));
            __webpack_require__.d(__webpack_exports__, "isInteger", (function() {
                return isInteger;
            }));
            __webpack_require__.d(__webpack_exports__, "isFloat", (function() {
                return isFloat;
            }));
            __webpack_require__.d(__webpack_exports__, "serializePrimitive", (function() {
                return serializePrimitive;
            }));
            __webpack_require__.d(__webpack_exports__, "deserializePrimitive", (function() {
                return deserializePrimitive;
            }));
            __webpack_require__.d(__webpack_exports__, "dotify", (function() {
                return dotify;
            }));
            __webpack_require__.d(__webpack_exports__, "undotify", (function() {
                return undotify;
            }));
            __webpack_require__.d(__webpack_exports__, "eventEmitter", (function() {
                return eventEmitter;
            }));
            __webpack_require__.d(__webpack_exports__, "camelToDasherize", (function() {
                return camelToDasherize;
            }));
            __webpack_require__.d(__webpack_exports__, "dasherizeToCamel", (function() {
                return dasherizeToCamel;
            }));
            __webpack_require__.d(__webpack_exports__, "capitalizeFirstLetter", (function() {
                return capitalizeFirstLetter;
            }));
            __webpack_require__.d(__webpack_exports__, "get", (function() {
                return util_get;
            }));
            __webpack_require__.d(__webpack_exports__, "safeTimeout", (function() {
                return safeTimeout;
            }));
            __webpack_require__.d(__webpack_exports__, "defineLazyProp", (function() {
                return defineLazyProp;
            }));
            __webpack_require__.d(__webpack_exports__, "arrayFrom", (function() {
                return arrayFrom;
            }));
            __webpack_require__.d(__webpack_exports__, "isObject", (function() {
                return isObject;
            }));
            __webpack_require__.d(__webpack_exports__, "isObjectObject", (function() {
                return isObjectObject;
            }));
            __webpack_require__.d(__webpack_exports__, "isPlainObject", (function() {
                return isPlainObject;
            }));
            __webpack_require__.d(__webpack_exports__, "replaceObject", (function() {
                return replaceObject;
            }));
            __webpack_require__.d(__webpack_exports__, "copyProp", (function() {
                return copyProp;
            }));
            __webpack_require__.d(__webpack_exports__, "regex", (function() {
                return regex;
            }));
            __webpack_require__.d(__webpack_exports__, "regexAll", (function() {
                return regexAll;
            }));
            __webpack_require__.d(__webpack_exports__, "isDefined", (function() {
                return isDefined;
            }));
            __webpack_require__.d(__webpack_exports__, "cycle", (function() {
                return cycle;
            }));
            __webpack_require__.d(__webpack_exports__, "debounce", (function() {
                return debounce;
            }));
            __webpack_require__.d(__webpack_exports__, "isRegex", (function() {
                return util_isRegex;
            }));
            __webpack_require__.d(__webpack_exports__, "weakMapMemoize", (function() {
                return util_weakMapMemoize;
            }));
            __webpack_require__.d(__webpack_exports__, "weakMapMemoizePromise", (function() {
                return util_weakMapMemoizePromise;
            }));
            __webpack_require__.d(__webpack_exports__, "getOrSet", (function() {
                return getOrSet;
            }));
            __webpack_require__.d(__webpack_exports__, "cleanup", (function() {
                return cleanup;
            }));
            __webpack_require__.d(__webpack_exports__, "tryCatch", (function() {
                return tryCatch;
            }));
            __webpack_require__.d(__webpack_exports__, "removeFromArray", (function() {
                return removeFromArray;
            }));
            __webpack_require__.d(__webpack_exports__, "assertExists", (function() {
                return assertExists;
            }));
            __webpack_require__.d(__webpack_exports__, "unique", (function() {
                return unique;
            }));
            __webpack_require__.d(__webpack_exports__, "constHas", (function() {
                return constHas;
            }));
            __webpack_require__.d(__webpack_exports__, "dedupeErrors", (function() {
                return dedupeErrors;
            }));
            __webpack_require__.d(__webpack_exports__, "ExtendableError", (function() {
                return util_ExtendableError;
            }));
            __webpack_require__.d(__webpack_exports__, "request", (function() {
                return request;
            }));
            __webpack_require__.d(__webpack_exports__, "addHeaderBuilder", (function() {
                return addHeaderBuilder;
            }));
            __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
                return types_TYPES;
            }));
            __webpack_require__.d(__webpack_exports__, "memoized", (function() {
                return memoized;
            }));
            __webpack_require__.d(__webpack_exports__, "promise", (function() {
                return decorators_promise;
            }));
            __webpack_require__.d(__webpack_exports__, "isPerc", (function() {
                return isPerc;
            }));
            __webpack_require__.d(__webpack_exports__, "isPx", (function() {
                return isPx;
            }));
            __webpack_require__.d(__webpack_exports__, "toNum", (function() {
                return toNum;
            }));
            __webpack_require__.d(__webpack_exports__, "toPx", (function() {
                return toPx;
            }));
            __webpack_require__.d(__webpack_exports__, "toCSS", (function() {
                return toCSS;
            }));
            __webpack_require__.d(__webpack_exports__, "percOf", (function() {
                return percOf;
            }));
            __webpack_require__.d(__webpack_exports__, "normalizeDimension", (function() {
                return normalizeDimension;
            }));
            __webpack_require__.d(__webpack_exports__, "wrapPromise", (function() {
                return wrapPromise;
            }));
            __webpack_require__.d(__webpack_exports__, "KEY_CODES", (function() {
                return KEY_CODES;
            }));
            __webpack_require__.d(__webpack_exports__, "ATTRIBUTES", (function() {
                return ATTRIBUTES;
            }));
            __webpack_require__.d(__webpack_exports__, "UID_HASH_LENGTH", (function() {
                return UID_HASH_LENGTH;
            }));
            __webpack_require__.d(__webpack_exports__, "iPhoneScreenHeightMatrix", (function() {
                return iPhoneScreenHeightMatrix;
            }));
            var iPhoneScreenHeightMatrix = {
                926: {
                    device: "iPhone 12 Pro Max",
                    textSizeHeights: [ 752, 748, 744, 738 ],
                    zoomHeight: {
                        1.15: [ 752, 747, 744, 738 ],
                        1.25: [ 753, 748, 744, 738 ],
                        1.5: [ 752, 749, 744, 738 ],
                        1.75: [ 753, 747, 744, 739 ],
                        2: [ 752, 748, 744 ],
                        2.5: [ 753, 748 ],
                        3: [ 753, 744 ]
                    },
                    maybeSafari: {
                        2: [ 738 ],
                        2.5: [ 745, 738 ],
                        3: [ 747, 738 ]
                    }
                },
                896: {
                    device: "iPhone XS Max, iPhone 11 Pro Max, iPhone XR, iPhone 11",
                    textSizeHeights: [ 721, 717, 713, 707 ],
                    zoomHeight: {
                        1.15: [ 721, 716, 713, 707 ],
                        1.25: [ 721, 718, 713, 708 ],
                        1.5: [ 722, 717, 713 ],
                        1.75: [ 721, 718, 712, 707 ],
                        2: [ 722, 718, 714, 708 ],
                        2.5: [ 720, 718, 713, 708 ],
                        3: [ 720, 717, 708 ]
                    },
                    maybeSafari: {
                        1.5: [ 707 ],
                        3: [ 714 ]
                    }
                },
                844: {
                    device: "iPhone 12, iPhone 12 Pro",
                    textSizeHeights: [ 670, 666, 662, 656 ],
                    zoomHeight: {
                        1.15: [ 670, 666, 662 ],
                        1.25: [ 670, 666, 663, 656 ],
                        1.5: [ 671, 666, 662 ],
                        1.75: [ 670, 667, 662, 656 ],
                        2: [ 670, 666, 662 ],
                        2.5: [ 670, 663 ],
                        3: [ 669, 666, 663, 657 ]
                    },
                    maybeSafari: {
                        1.15: [ 656 ],
                        1.5: [ 656 ],
                        2: [ 656 ],
                        2.5: [ 665, 655 ],
                        3: [ 663 ]
                    }
                },
                812: {
                    device: "iPhone X, iPhone XS, iPhone 11 Pro, iPhone 12 Mini",
                    textSizeHeights: [ 641, 637, 633, 627 ],
                    zoomHeight: {
                        1.15: [ 641, 637, 633, 627 ],
                        1.25: [ 641, 638, 633, 628 ],
                        1.5: [ 641, 638, 633, 627 ],
                        1.75: [ 641, 637, 634 ],
                        2: [ 642, 638, 634, 628 ],
                        2.5: [ 640, 638, 633, 628 ],
                        3: [ 642, 633 ]
                    },
                    maybeSafari: {
                        1.75: [ 627 ],
                        3: [ 636, 627 ]
                    }
                },
                736: {
                    device: "iPhone 6 Plus, iPhone 6S Plus, iPhone 7 Plus, iPhone 8 Plus",
                    textSizeHeights: [ 628, 624, 620, 614 ],
                    zoomHeight: {
                        1.15: [ 628, 624, 620, 614 ],
                        1.25: [ 628, 624, 620, 614 ],
                        1.5: [ 629, 624, 620 ],
                        1.75: [ 628, 625, 620, 614 ],
                        2: [ 628, 624, 620 ],
                        2.5: [ 628, 625, 620, 615 ],
                        3: [ 627, 624, 615 ]
                    },
                    maybeSafari: {
                        1.5: [ 614 ],
                        2: [ 614 ],
                        3: [ 621 ]
                    }
                },
                667: {
                    device: "iPhone 6, iPhone 6S, iPhone 7, iPhone 8,  iPhone SE2",
                    textSizeHeights: [ 559, 555, 551, 545 ],
                    zoomHeight: {
                        1.15: [ 559, 555, 551, 545 ],
                        1.25: [ 559, 555, 551, 545 ],
                        1.5: [ 560, 555, 551 ],
                        1.75: [ 558, 555, 551 ],
                        2: [ 560, 556, 552, 546 ],
                        2.5: [ 560, 555, 550 ],
                        3: [ 558, 555, 546 ]
                    },
                    maybeSafari: {
                        1.5: [ 545 ],
                        1.75: [ 544 ],
                        2.5: [ 545 ],
                        3: [ 552 ]
                    }
                }
            };
            function getUserAgent() {
                return window.navigator.mockUserAgent || window.navigator.userAgent;
            }
            function isDevice(userAgent) {
                void 0 === userAgent && (userAgent = getUserAgent());
                return !!userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
            }
            function isWebView() {
                var userAgent = getUserAgent();
                return /(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)|.*WKWebView/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
            }
            function isStandAlone() {
                return !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
            }
            function isFacebookWebView(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /FBAN/.test(ua) || /FBAV/.test(ua);
            }
            function isFirefox(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Firefox/i.test(ua);
            }
            function isFirefoxIOS(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /FxiOS/i.test(ua);
            }
            function isEdgeIOS(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /EdgiOS/i.test(ua);
            }
            function isOperaMini(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Opera Mini/i.test(ua);
            }
            function isAndroid(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Android/.test(ua);
            }
            function isIos(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /iPhone|iPod|iPad/.test(ua);
            }
            function isGoogleSearchApp(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /\bGSA\b/.test(ua);
            }
            function isQQBrowser(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /QQBrowser/.test(ua);
            }
            function isIosWebview(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isIos(ua) && (!!isGoogleSearchApp(ua) || /.+AppleWebKit(?!.*Safari)|.*WKWebView/.test(ua));
            }
            function isSFVC(ua) {
                void 0 === ua && (ua = getUserAgent());
                if (isIos(ua)) {
                    var device = iPhoneScreenHeightMatrix[window.outerHeight];
                    if (!device) return !1;
                    var height = window.innerHeight;
                    var scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
                    var computedHeight = Math.round(height * scale);
                    return scale > 1 && device.zoomHeight[scale] ? -1 !== device.zoomHeight[scale].indexOf(computedHeight) : -1 !== device.textSizeHeights.indexOf(computedHeight);
                }
                return !1;
            }
            function isSFVCorSafari(ua) {
                void 0 === ua && (ua = getUserAgent());
                if (isIos(ua)) {
                    var sfvc = isSFVC(ua);
                    var device = iPhoneScreenHeightMatrix[window.outerHeight];
                    if (!device) return !1;
                    var height = window.innerHeight;
                    var scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
                    var computedHeight = Math.round(height * scale);
                    var possibleSafariSizes = device.maybeSafari;
                    var maybeSafari = !1;
                    scale > 1 && possibleSafariSizes[scale] && -1 !== possibleSafariSizes[scale].indexOf(computedHeight) && (maybeSafari = !0);
                    return sfvc || maybeSafari;
                }
                return !1;
            }
            function isAndroidWebview(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
            }
            function device_isIE() {
                return !!window.document.documentMode || Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE|rv:11/i.test(window.navigator.userAgent));
            }
            function isIECompHeader() {
                var mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]');
                var mContent = window.document.querySelector('meta[content="IE=edge"]');
                return !(!mHttp || !mContent);
            }
            function isElectron() {
                return !("undefined" == typeof process || !process.versions || !process.versions.electron);
            }
            function isIEIntranet() {
                if (window.document.documentMode) try {
                    var status = window.status;
                    window.status = "testIntranetMode";
                    if ("testIntranetMode" === window.status) {
                        window.status = status;
                        return !0;
                    }
                    return !1;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            function isMacOsCna() {
                var userAgent = getUserAgent();
                return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
            }
            function supportsPopups(ua) {
                void 0 === ua && (ua = getUserAgent());
                return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
            }
            function isChrome(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Chrome|Chromium|CriOS/.test(ua);
            }
            function isSafari(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /Safari/.test(ua) && !isChrome(ua);
            }
            function isApplePaySupported() {
                try {
                    if (window.ApplePaySession && window.ApplePaySession.supportsVersion(3) && window.ApplePaySession.canMakePayments()) return !0;
                } catch (e) {
                    return !1;
                }
                return !1;
            }
            function _setPrototypeOf(o, p) {
                return (_setPrototypeOf = Object.setPrototypeOf || function(o, p) {
                    o.__proto__ = p;
                    return o;
                })(o, p);
            }
            function _inheritsLoose(subClass, superClass) {
                subClass.prototype = Object.create(superClass.prototype);
                subClass.prototype.constructor = subClass;
                _setPrototypeOf(subClass, superClass);
            }
            function _extends() {
                return (_extends = Object.assign || function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
                    }
                    return target;
                }).apply(this, arguments);
            }
            var zalgo_promise = __webpack_require__(0);
            var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol(win) {
                void 0 === win && (win = window);
                return "about:" === win.location.protocol;
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
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
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
            var cross_domain_safe_weakmap = __webpack_require__(1);
            function _getPrototypeOf(o) {
                return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
                    return o.__proto__ || Object.getPrototypeOf(o);
                })(o);
            }
            function _isNativeReflectConstruct() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
                    return !0;
                } catch (e) {
                    return !1;
                }
            }
            function construct_construct(Parent, args, Class) {
                return (construct_construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
                    var a = [ null ];
                    a.push.apply(a, args);
                    var instance = new (Function.bind.apply(Parent, a));
                    Class && _setPrototypeOf(instance, Class.prototype);
                    return instance;
                }).apply(null, arguments);
            }
            function wrapNativeSuper_wrapNativeSuper(Class) {
                var _cache = "function" == typeof Map ? new Map : void 0;
                return (wrapNativeSuper_wrapNativeSuper = function(Class) {
                    if (null === Class || !(fn = Class, -1 !== Function.toString.call(fn).indexOf("[native code]"))) return Class;
                    var fn;
                    if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== _cache) {
                        if (_cache.has(Class)) return _cache.get(Class);
                        _cache.set(Class, Wrapper);
                    }
                    function Wrapper() {
                        return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
                    }
                    Wrapper.prototype = Object.create(Class.prototype, {
                        constructor: {
                            value: Wrapper,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    });
                    return _setPrototypeOf(Wrapper, Class);
                })(Class);
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
            function base64encode(str) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }))).replace(/[=]/g, "");
                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
                throw new Error("Can not find window.btoa or Buffer");
            }
            function base64decode(str) {
                if ("function" == typeof atob) return decodeURIComponent([].map.call(atob(str), (function(c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })).join(""));
                if ("undefined" != typeof Buffer) return Buffer.from(str, "base64").toString("utf8");
                throw new Error("Can not find window.atob or Buffer");
            }
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            }
            function getGlobal() {
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                if ("undefined" != typeof window) return window;
                throw new Error("No global found");
            }
            var objectIDs;
            function getObjectID(obj) {
                objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                var uid = objectIDs.get(obj);
                if (!uid) {
                    uid = typeof obj + ":" + uniqueID();
                    objectIDs.set(obj, uid);
                }
                return uid;
            }
            function serializeArgs(args) {
                try {
                    return JSON.stringify([].slice.call(args), (function(subkey, val) {
                        return "function" == typeof val ? "memoize[" + getObjectID(val) + "]" : val;
                    }));
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
            }
            function getEmptyObject() {
                return {};
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
                    var cacheKey = serializeArgs(args);
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
            function promiseIdentity(item) {
                return zalgo_promise.ZalgoPromise.resolve(item);
            }
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
            function promisify(method, options) {
                void 0 === options && (options = {});
                function promisifiedFunction() {
                    return zalgo_promise.ZalgoPromise.try(method, this, arguments);
                }
                options.name && (promisifiedFunction.displayName = options.name + ":promisified");
                return setFunctionName(promisifiedFunction, getFunctionName(method) + "::promisified");
            }
            function inlineMemoize(method, logic, args) {
                void 0 === args && (args = []);
                var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
                var key = serializeArgs(args);
                return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
            }
            function src_util_noop() {}
            function once(method) {
                var called = !1;
                return setFunctionName((function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                }), getFunctionName(method) + "::once");
            }
            function hashStr(str) {
                var hash = 0;
                for (var i = 0; i < str.length; i++) hash += str[i].charCodeAt(0) * Math.pow(i % 10 + 1, 5);
                return Math.floor(Math.pow(Math.sqrt(hash), 5));
            }
            function strHashStr(str) {
                var hash = "";
                for (var i = 0; i < str.length; i++) {
                    var total = str[i].charCodeAt(0) * i;
                    str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                    hash += String.fromCharCode(97 + Math.abs(total) % 26);
                }
                return hash;
            }
            function match(str, pattern) {
                var regmatch = str.match(pattern);
                if (regmatch) return regmatch[1];
            }
            function awaitKey(obj, key) {
                return new zalgo_promise.ZalgoPromise((function(resolve) {
                    var value = obj[key];
                    if (value) return resolve(value);
                    delete obj[key];
                    Object.defineProperty(obj, key, {
                        configurable: !0,
                        set: function(item) {
                            (value = item) && resolve(value);
                        },
                        get: function() {
                            return value;
                        }
                    });
                }));
            }
            function stringifyError(err, level) {
                void 0 === level && (level = 1);
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack;
                        var message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            }
            function stringifyErrorMessage(err) {
                var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
                return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
            }
            function stringify(item) {
                return "string" == typeof item ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item);
            }
            function domainMatches(hostname, domain) {
                var index = (hostname = hostname.split("://")[1]).indexOf(domain);
                return -1 !== index && hostname.slice(index) === domain;
            }
            function patchMethod(obj, name, handler) {
                var original = obj[name];
                obj[name] = function() {
                    var _arguments2 = arguments, _this2 = this;
                    return handler({
                        context: this,
                        args: [].slice.call(arguments),
                        original: original,
                        callOriginal: function() {
                            return original.apply(_this2, _arguments2);
                        }
                    });
                };
            }
            function extend(obj, source) {
                if (!source) return obj;
                if (Object.assign) return Object.assign(obj, source);
                for (var key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
                return obj;
            }
            function util_values(obj) {
                if (Object.values) return Object.values(obj);
                var result = [];
                for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
                return result;
            }
            var memoizedValues = memoize(util_values);
            function perc(pixels, percentage) {
                return Math.round(pixels * percentage / 100);
            }
            function min() {
                return Math.min.apply(Math, arguments);
            }
            function max() {
                return Math.max.apply(Math, arguments);
            }
            function roundUp(num, nearest) {
                var remainder = num % nearest;
                return remainder ? num - remainder + nearest : num;
            }
            function regexMap(str, regexp, handler) {
                var results = [];
                str.replace(regexp, (function(item) {
                    results.push(handler ? handler.apply(null, arguments) : item);
                }));
                return results;
            }
            function svgToBase64(svg) {
                return "data:image/svg+xml;base64," + base64encode(svg);
            }
            function objFilter(obj, filter) {
                void 0 === filter && (filter = Boolean);
                var result = {};
                for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
                return result;
            }
            function identity(item) {
                return item;
            }
            function regexTokenize(text, regexp) {
                var result = [];
                text.replace(regexp, (function(token) {
                    result.push(token);
                    return "";
                }));
                return result;
            }
            function promiseDebounce(method, delay) {
                void 0 === delay && (delay = 50);
                var promise;
                var timeout;
                return setFunctionName((function() {
                    timeout && clearTimeout(timeout);
                    var localPromise = promise = promise || new zalgo_promise.ZalgoPromise;
                    timeout = setTimeout((function() {
                        promise = null;
                        timeout = null;
                        zalgo_promise.ZalgoPromise.try(method).then((function(result) {
                            localPromise.resolve(result);
                        }), (function(err) {
                            localPromise.reject(err);
                        }));
                    }), delay);
                    return localPromise;
                }), getFunctionName(method) + "::promiseDebounced");
            }
            function safeInterval(method, time) {
                var timeout;
                !function loop() {
                    timeout = setTimeout((function() {
                        method();
                        loop();
                    }), time);
                }();
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            }
            function isInteger(str) {
                return Boolean(str.match(/^[0-9]+$/));
            }
            function isFloat(str) {
                return Boolean(str.match(/^[0-9]+\.[0-9]+$/));
            }
            function serializePrimitive(value) {
                return value.toString();
            }
            function deserializePrimitive(value) {
                return "true" === value || "false" !== value && (isInteger(value) ? parseInt(value, 10) : isFloat(value) ? parseFloat(value) : value);
            }
            function dotify(obj, prefix, newobj) {
                void 0 === prefix && (prefix = "");
                void 0 === newobj && (newobj = {});
                prefix = prefix ? prefix + "." : prefix;
                for (var key in obj) obj.hasOwnProperty(key) && null != obj[key] && "function" != typeof obj[key] && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every((function(val) {
                    return "object" != typeof val;
                })) ? newobj["" + prefix + key + "[]"] = obj[key].join(",") : obj[key] && "object" == typeof obj[key] ? newobj = dotify(obj[key], "" + prefix + key, newobj) : newobj["" + prefix + key] = serializePrimitive(obj[key]));
                return newobj;
            }
            function undotify(obj) {
                var result = {};
                for (var key in obj) if (obj.hasOwnProperty(key) && "string" == typeof obj[key]) {
                    var value = obj[key];
                    if (key.match(/^.+\[\]$/)) {
                        key = key.slice(0, -2);
                        value = value.split(",").map(deserializePrimitive);
                    } else value = deserializePrimitive(value);
                    var keyResult = result;
                    var parts = key.split(".");
                    for (var i = 0; i < parts.length; i++) {
                        var part = parts[i];
                        var isLast = i + 1 === parts.length;
                        var isIndex = !isLast && isInteger(parts[i + 1]);
                        if ("constructor" === part || "prototype" === part || "__proto__" === part) throw new Error("Disallowed key: " + part);
                        isLast ? keyResult[part] = value : keyResult = keyResult[part] = keyResult[part] || (isIndex ? [] : {});
                    }
                }
                return result;
            }
            function eventEmitter() {
                var triggered = {};
                var handlers = {};
                var emitter = {
                    on: function(eventName, handler) {
                        var handlerList = handlers[eventName] = handlers[eventName] || [];
                        handlerList.push(handler);
                        var cancelled = !1;
                        return {
                            cancel: function() {
                                if (!cancelled) {
                                    cancelled = !0;
                                    handlerList.splice(handlerList.indexOf(handler), 1);
                                }
                            }
                        };
                    },
                    once: function(eventName, handler) {
                        var listener = emitter.on(eventName, (function() {
                            listener.cancel();
                            handler();
                        }));
                        return listener;
                    },
                    trigger: function(eventName) {
                        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
                        var handlerList = handlers[eventName];
                        var promises = [];
                        if (handlerList) {
                            var _loop = function(_i2) {
                                var handler = handlerList[_i2];
                                promises.push(zalgo_promise.ZalgoPromise.try((function() {
                                    return handler.apply(void 0, args);
                                })));
                            };
                            for (var _i2 = 0; _i2 < handlerList.length; _i2++) _loop(_i2);
                        }
                        return zalgo_promise.ZalgoPromise.all(promises).then(src_util_noop);
                    },
                    triggerOnce: function(eventName) {
                        if (triggered[eventName]) return zalgo_promise.ZalgoPromise.resolve();
                        triggered[eventName] = !0;
                        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
                        return emitter.trigger.apply(emitter, [ eventName ].concat(args));
                    },
                    reset: function() {
                        handlers = {};
                    }
                };
                return emitter;
            }
            function camelToDasherize(string) {
                return string.replace(/([A-Z])/g, (function(g) {
                    return "-" + g.toLowerCase();
                }));
            }
            function dasherizeToCamel(string) {
                return string.replace(/-([a-z])/g, (function(g) {
                    return g[1].toUpperCase();
                }));
            }
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }
            function util_get(item, path, def) {
                if (!path) return def;
                var pathParts = path.split(".");
                for (var i = 0; i < pathParts.length; i++) {
                    if ("object" != typeof item || null === item) return def;
                    item = item[pathParts[i]];
                }
                return void 0 === item ? def : item;
            }
            function safeTimeout(method, time) {
                var interval = safeInterval((function() {
                    if ((time -= 100) <= 0) {
                        interval.cancel();
                        method();
                    }
                }), 100);
            }
            function defineLazyProp(obj, key, getter) {
                if (Array.isArray(obj)) {
                    if ("number" != typeof key) throw new TypeError("Array key must be number");
                } else if ("object" == typeof obj && null !== obj && "string" != typeof key) throw new TypeError("Object key must be string");
                Object.defineProperty(obj, key, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        delete obj[key];
                        var value = getter();
                        obj[key] = value;
                        return value;
                    },
                    set: function(value) {
                        delete obj[key];
                        obj[key] = value;
                    }
                });
            }
            function arrayFrom(item) {
                return [].slice.call(item);
            }
            function isObject(item) {
                return "object" == typeof item && null !== item;
            }
            function isObjectObject(obj) {
                return isObject(obj) && "[object Object]" === {}.toString.call(obj);
            }
            function isPlainObject(obj) {
                if (!isObjectObject(obj)) return !1;
                var constructor = obj.constructor;
                if ("function" != typeof constructor) return !1;
                var prototype = constructor.prototype;
                return !!isObjectObject(prototype) && !!prototype.hasOwnProperty("isPrototypeOf");
            }
            function replaceObject(item, replacer, fullKey) {
                void 0 === fullKey && (fullKey = "");
                if (Array.isArray(item)) {
                    var length = item.length;
                    var result = [];
                    var _loop2 = function(i) {
                        defineLazyProp(result, i, (function() {
                            var itemKey = fullKey ? fullKey + "." + i : "" + i;
                            var child = replacer(item[i], i, itemKey);
                            (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                            return child;
                        }));
                    };
                    for (var i = 0; i < length; i++) _loop2(i);
                    return result;
                }
                if (isPlainObject(item)) {
                    var _result = {};
                    var _loop3 = function(key) {
                        if (!item.hasOwnProperty(key)) return "continue";
                        defineLazyProp(_result, key, (function() {
                            var itemKey = fullKey ? fullKey + "." + key : "" + key;
                            var child = replacer(item[key], key, itemKey);
                            (isPlainObject(child) || Array.isArray(child)) && (child = replaceObject(child, replacer, itemKey));
                            return child;
                        }));
                    };
                    for (var key in item) _loop3(key);
                    return _result;
                }
                throw new Error("Pass an object or array");
            }
            function copyProp(source, target, name, def) {
                if (source.hasOwnProperty(name)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, name);
                    Object.defineProperty(target, name, descriptor);
                } else target[name] = def;
            }
            function regex(pattern, string, start) {
                void 0 === start && (start = 0);
                "string" == typeof pattern && (pattern = new RegExp(pattern));
                var result = string.slice(start).match(pattern);
                if (result) {
                    var index = result.index;
                    var regmatch = result[0];
                    return {
                        text: regmatch,
                        groups: result.slice(1),
                        start: start + index,
                        end: start + index + regmatch.length,
                        length: regmatch.length,
                        replace: function(text) {
                            return regmatch ? "" + regmatch.slice(0, start + index) + text + regmatch.slice(index + regmatch.length) : "";
                        }
                    };
                }
            }
            function regexAll(pattern, string) {
                var matches = [];
                var start = 0;
                for (;;) {
                    var regmatch = regex(pattern, string, start);
                    if (!regmatch) break;
                    matches.push(regmatch);
                    start = match.end;
                }
                return matches;
            }
            function isDefined(value) {
                return null != value;
            }
            function cycle(method) {
                return zalgo_promise.ZalgoPromise.try(method).then((function() {
                    return cycle(method);
                }));
            }
            function debounce(method, time) {
                void 0 === time && (time = 100);
                var timeout;
                return setFunctionName((function() {
                    var _arguments3 = arguments, _this3 = this;
                    clearTimeout(timeout);
                    timeout = setTimeout((function() {
                        return method.apply(_this3, _arguments3);
                    }), time);
                }), getFunctionName(method) + "::debounced");
            }
            function util_isRegex(item) {
                return "[object RegExp]" === {}.toString.call(item);
            }
            var util_weakMapMemoize = function(method) {
                var weakmap = new weakmap_CrossDomainSafeWeakMap;
                return function(arg) {
                    var _this4 = this;
                    return weakmap.getOrSet(arg, (function() {
                        return method.call(_this4, arg);
                    }));
                };
            };
            var util_weakMapMemoizePromise = function(method) {
                var weakmap = new weakmap_CrossDomainSafeWeakMap;
                return function(arg) {
                    var _this5 = this;
                    return weakmap.getOrSet(arg, (function() {
                        return method.call(_this5, arg).finally((function() {
                            weakmap.delete(arg);
                        }));
                    }));
                };
            };
            function getOrSet(obj, key, getter) {
                if (obj.hasOwnProperty(key)) return obj[key];
                var val = getter();
                obj[key] = val;
                return val;
            }
            function cleanup(obj) {
                var tasks = [];
                var cleaned = !1;
                var cleanErr;
                var cleaner = {
                    set: function(name, item) {
                        if (!cleaned) {
                            obj[name] = item;
                            cleaner.register((function() {
                                delete obj[name];
                            }));
                        }
                        return item;
                    },
                    register: function(method) {
                        cleaned ? method(cleanErr) : tasks.push(once((function() {
                            return method(cleanErr);
                        })));
                    },
                    all: function(err) {
                        cleanErr = err;
                        var results = [];
                        cleaned = !0;
                        for (;tasks.length; ) {
                            var task = tasks.shift();
                            results.push(task());
                        }
                        return zalgo_promise.ZalgoPromise.all(results).then(src_util_noop);
                    }
                };
                return cleaner;
            }
            function tryCatch(fn) {
                var result;
                var error;
                try {
                    result = fn();
                } catch (err) {
                    error = err;
                }
                return {
                    result: result,
                    error: error
                };
            }
            function removeFromArray(arr, item) {
                var index = arr.indexOf(item);
                -1 !== index && arr.splice(index, 1);
            }
            function assertExists(name, thing) {
                if (null == thing) throw new Error("Expected " + name + " to be present");
                return thing;
            }
            function unique(arr) {
                var result = {};
                for (var _i4 = 0; _i4 < arr.length; _i4++) result[arr[_i4]] = !0;
                return Object.keys(result);
            }
            var constHas = function(constant, value) {
                return -1 !== memoizedValues(constant).indexOf(value);
            };
            function dedupeErrors(handler) {
                var seenErrors = [];
                var seenStringifiedErrors = {};
                return function(err) {
                    if (-1 === seenErrors.indexOf(err)) {
                        seenErrors.push(err);
                        var stringifiedError = stringifyError(err);
                        if (!seenStringifiedErrors[stringifiedError]) {
                            seenStringifiedErrors[stringifiedError] = !0;
                            return handler(err);
                        }
                    }
                };
            }
            var util_ExtendableError = function(_Error) {
                _inheritsLoose(ExtendableError, _Error);
                function ExtendableError(message) {
                    var _this6;
                    (_this6 = _Error.call(this, message) || this).name = _this6.constructor.name;
                    "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(self) {
                        if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return self;
                    }(_this6), _this6.constructor) : _this6.stack = new Error(message).stack;
                    return _this6;
                }
                return ExtendableError;
            }(wrapNativeSuper_wrapNativeSuper(Error));
            var KEY_CODES = {
                ENTER: 13,
                SPACE: 32
            };
            var ATTRIBUTES = {
                UID: "data-uid"
            };
            var UID_HASH_LENGTH = 30;
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
            function urlEncode(str) {
                return encodeURIComponent(str);
            }
            function waitForWindowReady() {
                return inlineMemoize(waitForWindowReady, (function() {
                    return new zalgo_promise.ZalgoPromise((function(resolve) {
                        isDocumentReady() && resolve();
                        window.addEventListener("load", (function() {
                            return resolve();
                        }));
                    }));
                }));
            }
            var waitForDocumentReady = memoize((function() {
                return new zalgo_promise.ZalgoPromise((function(resolve) {
                    if (isDocumentReady() || isDocumentInteractive()) return resolve();
                    var interval = setInterval((function() {
                        if (isDocumentReady() || isDocumentInteractive()) {
                            clearInterval(interval);
                            return resolve();
                        }
                    }), 10);
                }));
            }));
            function waitForDocumentBody() {
                return zalgo_promise.ZalgoPromise.try((function() {
                    return document.body ? document.body : waitForDocumentReady().then((function() {
                        if (document.body) return document.body;
                        throw new Error("Document ready but document.body not present");
                    }));
                }));
            }
            function parseQuery(queryString) {
                return inlineMemoize(parseQuery, (function() {
                    var params = {};
                    if (!queryString) return params;
                    if (-1 === queryString.indexOf("=")) return params;
                    for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                        var pair = _queryString$split2[_i2];
                        (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
                    }
                    return params;
                }), [ queryString ]);
            }
            function getQueryParam(name) {
                return parseQuery(window.location.search.slice(1))[name];
            }
            function urlWillRedirectPage(url) {
                return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
            }
            function formatQuery(obj) {
                void 0 === obj && (obj = {});
                return Object.keys(obj).filter((function(key) {
                    return "string" == typeof obj[key] || "boolean" == typeof obj[key];
                })).map((function(key) {
                    var val = obj[key];
                    if ("string" != typeof val && "boolean" != typeof val) throw new TypeError("Invalid type for query");
                    return urlEncode(key) + "=" + urlEncode(val.toString());
                })).join("&");
            }
            function extendQuery(originalQuery, props) {
                void 0 === props && (props = {});
                return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
            }
            function extendUrl(url, options) {
                var query = options.query || {};
                var hash = options.hash || {};
                var originalUrl;
                var originalHash;
                var _url$split = url.split("#");
                originalHash = _url$split[1];
                var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
                originalUrl = _originalUrl$split[0];
                var queryString = extendQuery(_originalUrl$split[1], query);
                var hashString = extendQuery(originalHash, hash);
                queryString && (originalUrl = originalUrl + "?" + queryString);
                hashString && (originalUrl = originalUrl + "#" + hashString);
                return originalUrl;
            }
            function redirect(url, win) {
                void 0 === win && (win = window);
                return new zalgo_promise.ZalgoPromise((function(resolve) {
                    win.location = url;
                    urlWillRedirectPage(url) || resolve();
                }));
            }
            function hasMetaViewPort() {
                var meta = document.querySelector("meta[name=viewport]");
                return !(isDevice() && window.screen.width < 660 && !meta);
            }
            function isElementVisible(el) {
                return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
            }
            function getPerformance() {
                return inlineMemoize(getPerformance, (function() {
                    var performance = window.performance;
                    if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
                }));
            }
            function enablePerformance() {
                return Boolean(getPerformance());
            }
            function getPageRenderTime() {
                return waitForDocumentReady().then((function() {
                    var performance = getPerformance();
                    if (performance) {
                        var timing = performance.timing;
                        return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                    }
                }));
            }
            function htmlEncode(html) {
                void 0 === html && (html = "");
                return html.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
            }
            function dom_isBrowser() {
                return "undefined" != typeof window && void 0 !== window.location;
            }
            function querySelectorAll(selector, doc) {
                void 0 === doc && (doc = window.document);
                return [].slice.call(doc.querySelectorAll(selector));
            }
            function onClick(element, handler) {
                element.addEventListener("touchstart", src_util_noop);
                element.addEventListener("click", handler);
                element.addEventListener("keypress", (function(event) {
                    if (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACE) return handler(event);
                }));
            }
            function getScript(_ref) {
                var _ref$host = _ref.host, host = void 0 === _ref$host ? window.location.host : _ref$host, path = _ref.path, _ref$reverse = _ref.reverse, reverse = void 0 !== _ref$reverse && _ref$reverse;
                return inlineMemoize(getScript, (function() {
                    var url = "" + host + path;
                    var scripts = [].slice.call(document.getElementsByTagName("script"));
                    reverse && scripts.reverse();
                    for (var _i4 = 0; _i4 < scripts.length; _i4++) {
                        var script = scripts[_i4];
                        if (script.src && script.src.replace(/^https?:\/\//, "").split("?")[0] === url) return script;
                    }
                }), [ path ]);
            }
            function isLocalStorageEnabled() {
                return inlineMemoize(isLocalStorageEnabled, (function() {
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
                }));
            }
            function getBrowserLocales() {
                var nav = window.navigator;
                var locales = nav.languages ? [].concat(nav.languages) : [];
                nav.language && locales.push(nav.language);
                nav.userLanguage && locales.push(nav.userLanguage);
                return locales.map((function(locale) {
                    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
                        var _locale$split = locale.split(/[-_]/);
                        return {
                            country: _locale$split[1],
                            lang: _locale$split[0]
                        };
                    }
                    return locale && locale.match(/^[a-z]{2}$/) ? {
                        lang: locale
                    } : null;
                })).filter(Boolean);
            }
            function appendChild(container, child) {
                container.appendChild(child);
            }
            function isElement(element) {
                return element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument;
            }
            function getElementSafe(id, doc) {
                void 0 === doc && (doc = document);
                return isElement(id) ? id : "string" == typeof id ? doc.querySelector(id) : void 0;
            }
            function getElement(id, doc) {
                void 0 === doc && (doc = document);
                var element = getElementSafe(id, doc);
                if (element) return element;
                throw new Error("Can not find element: " + stringify(id));
            }
            function elementReady(id) {
                return new zalgo_promise.ZalgoPromise((function(resolve, reject) {
                    var name = stringify(id);
                    var el = getElementSafe(id);
                    if (el) return resolve(el);
                    if (isDocumentReady()) return reject(new Error("Document is ready and element " + name + " does not exist"));
                    var interval = setInterval((function() {
                        if (el = getElementSafe(id)) {
                            resolve(el);
                            clearInterval(interval);
                        } else if (isDocumentReady()) {
                            clearInterval(interval);
                            return reject(new Error("Document is ready and element " + name + " does not exist"));
                        }
                    }), 10);
                }));
            }
            var dom_PopupOpenError = function(_ExtendableError) {
                _inheritsLoose(PopupOpenError, _ExtendableError);
                function PopupOpenError() {
                    return _ExtendableError.apply(this, arguments) || this;
                }
                return PopupOpenError;
            }(util_ExtendableError);
            function popup(url, options) {
                var width = (options = options || {}).width, height = options.height;
                var top = 0;
                var left = 0;
                width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                width && height && (options = _extends({
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    status: 1,
                    toolbar: 0,
                    menubar: 0,
                    resizable: 1,
                    scrollbars: 1
                }, options));
                var name = options.name || "";
                delete options.name;
                var params = Object.keys(options).map((function(key) {
                    if (null != options[key]) return key + "=" + stringify(options[key]);
                })).filter(Boolean).join(",");
                var win;
                try {
                    win = window.open(url, name, params);
                } catch (err) {
                    throw new dom_PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                }
                if (isWindowClosed(win)) {
                    var err;
                    throw new dom_PopupOpenError("Can not open popup window - blocked");
                }
                window.addEventListener("unload", (function() {
                    var _win;
                    return null == (_win = win) ? void 0 : _win.close();
                }));
                return win;
            }
            function writeToWindow(win, html) {
                try {
                    win.document.open();
                    win.document.write(html);
                    win.document.close();
                } catch (err) {
                    try {
                        win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
                    } catch (err2) {}
                }
            }
            function writeElementToWindow(win, el) {
                var tag = el.tagName.toLowerCase();
                if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                var documentElement = win.document.documentElement;
                for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) documentElement.removeChild(_arrayFrom2[_i6]);
                for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) documentElement.appendChild(_arrayFrom4[_i8]);
            }
            function setStyle(el, styleText, doc) {
                void 0 === doc && (doc = window.document);
                el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
            }
            var awaitFrameLoadPromises;
            function awaitFrameLoad(frame) {
                if ((awaitFrameLoadPromises = awaitFrameLoadPromises || new cross_domain_safe_weakmap.WeakMap).has(frame)) {
                    var _promise = awaitFrameLoadPromises.get(frame);
                    if (_promise) return _promise;
                }
                var promise = new zalgo_promise.ZalgoPromise((function(resolve, reject) {
                    frame.addEventListener("load", (function() {
                        !function(frame) {
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
                        }(frame);
                        resolve(frame);
                    }));
                    frame.addEventListener("error", (function(err) {
                        frame.contentWindow ? resolve(frame) : reject(err);
                    }));
                }));
                awaitFrameLoadPromises.set(frame, promise);
                return promise;
            }
            function awaitFrameWindow(frame) {
                return awaitFrameLoad(frame).then((function(loadedFrame) {
                    if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                    return loadedFrame.contentWindow;
                }));
            }
            function createElement(tag, options, container) {
                void 0 === tag && (tag = "div");
                void 0 === options && (options = {});
                tag = tag.toLowerCase();
                var element = document.createElement(tag);
                options.style && extend(element.style, options.style);
                options.class && (element.className = options.class.join(" "));
                options.id && element.setAttribute("id", options.id);
                if (options.attributes) for (var _i10 = 0, _Object$keys2 = Object.keys(options.attributes); _i10 < _Object$keys2.length; _i10++) {
                    var key = _Object$keys2[_i10];
                    element.setAttribute(key, options.attributes[key]);
                }
                options.styleSheet && setStyle(element, options.styleSheet);
                container && appendChild(container, element);
                if (options.html) if ("iframe" === tag) {
                    if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    writeToWindow(element.contentWindow, options.html);
                } else element.innerHTML = options.html;
                return element;
            }
            function iframe(options, container) {
                void 0 === options && (options = {});
                var style = options.style || {};
                var frame = createElement("iframe", {
                    attributes: _extends({
                        allowTransparency: "true"
                    }, options.attributes || {}),
                    style: _extends({
                        backgroundColor: "transparent",
                        border: "none"
                    }, style),
                    html: options.html,
                    class: options.class
                });
                var isIE = window.navigator.userAgent.match(/MSIE|Edge/i);
                frame.hasAttribute("id") || frame.setAttribute("id", uniqueID());
                awaitFrameLoad(frame);
                container && getElement(container).appendChild(frame);
                (options.url || isIE) && frame.setAttribute("src", options.url || "about:blank");
                return frame;
            }
            function addEventListener(obj, event, handler) {
                obj.addEventListener(event, handler);
                return {
                    cancel: function() {
                        obj.removeEventListener(event, handler);
                    }
                };
            }
            function bindEvents(element, eventNames, handler) {
                handler = once(handler);
                for (var _i12 = 0; _i12 < eventNames.length; _i12++) element.addEventListener(eventNames[_i12], handler);
                return {
                    cancel: once((function() {
                        for (var _i14 = 0; _i14 < eventNames.length; _i14++) element.removeEventListener(eventNames[_i14], handler);
                    }))
                };
            }
            var VENDOR_PREFIXES = [ "webkit", "moz", "ms", "o" ];
            function setVendorCSS(element, name, value) {
                element.style[name] = value;
                var capitalizedName = capitalizeFirstLetter(name);
                for (var _i16 = 0; _i16 < VENDOR_PREFIXES.length; _i16++) element.style["" + VENDOR_PREFIXES[_i16] + capitalizedName] = value;
            }
            var ANIMATION_START_EVENTS = [ "animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart" ];
            var ANIMATION_END_EVENTS = [ "animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd" ];
            function animate(element, name, clean, timeout) {
                void 0 === timeout && (timeout = 1e3);
                return new zalgo_promise.ZalgoPromise((function(resolve, reject) {
                    var el = getElement(element);
                    if (!el) return resolve();
                    var hasStarted = !1;
                    var startTimeout;
                    var endTimeout;
                    var startEvent;
                    var endEvent;
                    function cleanUp() {
                        clearTimeout(startTimeout);
                        clearTimeout(endTimeout);
                        startEvent.cancel();
                        endEvent.cancel();
                    }
                    startEvent = bindEvents(el, ANIMATION_START_EVENTS, (function(event) {
                        if (event.target === el && event.animationName === name) {
                            clearTimeout(startTimeout);
                            event.stopPropagation();
                            startEvent.cancel();
                            hasStarted = !0;
                            endTimeout = setTimeout((function() {
                                cleanUp();
                                resolve();
                            }), timeout);
                        }
                    }));
                    endEvent = bindEvents(el, ANIMATION_END_EVENTS, (function(event) {
                        if (event.target === el && event.animationName === name) {
                            cleanUp();
                            return "string" == typeof event.animationName && event.animationName !== name ? reject("Expected animation name to be " + name + ", found " + event.animationName) : resolve();
                        }
                    }));
                    setVendorCSS(el, "animationName", name);
                    startTimeout = setTimeout((function() {
                        if (!hasStarted) {
                            cleanUp();
                            return resolve();
                        }
                    }), 200);
                    clean && clean(cleanUp);
                }));
            }
            function makeElementVisible(element) {
                element.style.setProperty("visibility", "");
            }
            function makeElementInvisible(element) {
                element.style.setProperty("visibility", "hidden", "important");
            }
            function showElement(element) {
                element.style.setProperty("display", "");
            }
            function hideElement(element) {
                element.style.setProperty("display", "none", "important");
            }
            function destroyElement(element) {
                element && element.parentNode && element.parentNode.removeChild(element);
            }
            function showAndAnimate(element, name, clean) {
                var animation = animate(element, name, clean);
                showElement(element);
                return animation;
            }
            function animateAndHide(element, name, clean) {
                return animate(element, name, clean).then((function() {
                    hideElement(element);
                }));
            }
            function addClass(element, name) {
                element.classList.add(name);
            }
            function removeClass(element, name) {
                element.classList.remove(name);
            }
            function isElementClosed(el) {
                return !(el && el.parentNode && el.ownerDocument && el.ownerDocument.documentElement && el.ownerDocument.documentElement.contains(el));
            }
            function watchElementForClose(element, handler) {
                handler = once(handler);
                var cancelled = !1;
                var mutationObservers = [];
                var interval;
                var sacrificialFrame;
                var sacrificialFrameWin;
                var cancel = function() {
                    cancelled = !0;
                    for (var _i18 = 0; _i18 < mutationObservers.length; _i18++) mutationObservers[_i18].disconnect();
                    interval && interval.cancel();
                    sacrificialFrameWin && sacrificialFrameWin.removeEventListener("unload", elementClosed);
                    sacrificialFrame && destroyElement(sacrificialFrame);
                };
                var elementClosed = function() {
                    if (!cancelled) {
                        handler();
                        cancel();
                    }
                };
                if (isElementClosed(element)) {
                    elementClosed();
                    return {
                        cancel: cancel
                    };
                }
                if (window.MutationObserver) {
                    var mutationElement = element.parentElement;
                    for (;mutationElement; ) {
                        var mutationObserver = new window.MutationObserver((function() {
                            isElementClosed(element) && elementClosed();
                        }));
                        mutationObserver.observe(mutationElement, {
                            childList: !0
                        });
                        mutationObservers.push(mutationObserver);
                        mutationElement = mutationElement.parentElement;
                    }
                }
                (sacrificialFrame = document.createElement("iframe")).setAttribute("name", "__detect_close_" + uniqueID() + "__");
                sacrificialFrame.style.display = "none";
                awaitFrameWindow(sacrificialFrame).then((function(frameWin) {
                    (sacrificialFrameWin = function(win) {
                        if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
                        return win;
                    }(frameWin)).addEventListener("unload", elementClosed);
                }));
                element.appendChild(sacrificialFrame);
                interval = safeInterval((function() {
                    isElementClosed(element) && elementClosed();
                }), 1e3);
                return {
                    cancel: cancel
                };
            }
            function fixScripts(el, doc) {
                void 0 === doc && (doc = window.document);
                for (var _i20 = 0, _querySelectorAll2 = querySelectorAll("script", el); _i20 < _querySelectorAll2.length; _i20++) {
                    var script = _querySelectorAll2[_i20];
                    var parentNode = script.parentNode;
                    if (parentNode) {
                        var newScript = doc.createElement("script");
                        newScript.text = script.textContent;
                        parentNode.replaceChild(newScript, script);
                    }
                }
            }
            function onResize(el, handler, _temp) {
                var _ref2 = void 0 === _temp ? {} : _temp, _ref2$width = _ref2.width, width = void 0 === _ref2$width || _ref2$width, _ref2$height = _ref2.height, height = void 0 === _ref2$height || _ref2$height, _ref2$interval = _ref2.interval, interval = void 0 === _ref2$interval ? 100 : _ref2$interval, _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win;
                var currentWidth = el.offsetWidth;
                var currentHeight = el.offsetHeight;
                var canceled = !1;
                handler({
                    width: currentWidth,
                    height: currentHeight
                });
                var check = function() {
                    if (!canceled && isElementVisible(el)) {
                        var newWidth = el.offsetWidth;
                        var newHeight = el.offsetHeight;
                        (width && newWidth !== currentWidth || height && newHeight !== currentHeight) && handler({
                            width: newWidth,
                            height: newHeight
                        });
                        currentWidth = newWidth;
                        currentHeight = newHeight;
                    }
                };
                var observer;
                var timeout;
                win.addEventListener("resize", check);
                if (void 0 !== win.ResizeObserver) {
                    (observer = new win.ResizeObserver(check)).observe(el);
                    timeout = safeInterval(check, 10 * interval);
                } else if (void 0 !== win.MutationObserver) {
                    (observer = new win.MutationObserver(check)).observe(el, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0,
                        characterData: !1
                    });
                    timeout = safeInterval(check, 10 * interval);
                } else timeout = safeInterval(check, interval);
                return {
                    cancel: function() {
                        canceled = !0;
                        observer.disconnect();
                        window.removeEventListener("resize", check);
                        timeout.cancel();
                    }
                };
            }
            function getResourceLoadTime(url) {
                var performance = getPerformance();
                if (performance && "function" == typeof performance.getEntries) {
                    var entries = performance.getEntries();
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        if (entry && entry.name && 0 === entry.name.indexOf(url) && "number" == typeof entry.duration) return Math.floor(entry.duration);
                    }
                }
            }
            function isShadowElement(element) {
                for (;element.parentNode; ) element = element.parentNode;
                return "[object ShadowRoot]" === element.toString();
            }
            function getShadowRoot(element) {
                for (;element.parentNode; ) element = element.parentNode;
                if (isShadowElement(element)) return element;
            }
            function getShadowHost(element) {
                var shadowRoot = getShadowRoot(element);
                if (shadowRoot && shadowRoot.host) return shadowRoot.host;
            }
            function insertShadowSlot(element) {
                var shadowHost = getShadowHost(element);
                if (!shadowHost) throw new Error("Element is not in shadow dom");
                var slotName = "shadow-slot-" + uniqueID();
                var slot = document.createElement("slot");
                slot.setAttribute("name", slotName);
                element.appendChild(slot);
                var slotProvider = document.createElement("div");
                slotProvider.setAttribute("slot", slotName);
                shadowHost.appendChild(slotProvider);
                return isShadowElement(shadowHost) ? insertShadowSlot(slotProvider) : slotProvider;
            }
            function preventClickFocus(el) {
                var onFocus = function onFocus(event) {
                    el.removeEventListener("focus", onFocus);
                    event.preventDefault();
                    el.blur();
                    return !1;
                };
                el.addEventListener("mousedown", (function() {
                    el.addEventListener("focus", onFocus);
                    setTimeout((function() {
                        el.removeEventListener("focus", onFocus);
                    }), 1);
                }));
            }
            function getStackTrace() {
                try {
                    throw new Error("_");
                } catch (err) {
                    return err.stack || "";
                }
            }
            var currentScript = "undefined" != typeof document ? document.currentScript : null;
            var getCurrentScript = memoize((function() {
                if (currentScript) return currentScript;
                if (currentScript = function() {
                    try {
                        var stack = getStackTrace();
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
            var getCurrentScriptUID = memoize((function() {
                var script;
                try {
                    script = getCurrentScript();
                } catch (err) {
                    return currentUID;
                }
                var uid = script.getAttribute(ATTRIBUTES.UID);
                if (uid && "string" == typeof uid) return uid;
                if ((uid = script.getAttribute(ATTRIBUTES.UID + "-auto")) && "string" == typeof uid) return uid;
                if (script.src) {
                    var hashedString = strHashStr(JSON.stringify({
                        src: script.src,
                        dataset: script.dataset
                    }));
                    uid = "uid_" + hashedString.slice(hashedString.length - UID_HASH_LENGTH);
                } else uid = uniqueID();
                script.setAttribute(ATTRIBUTES.UID + "-auto", uid);
                return uid;
            }));
            function submitForm(_ref3) {
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
            }
            function getStorage(_ref) {
                var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
                return inlineMemoize(getStorage, (function() {
                    var STORAGE_KEY = "__" + name + "_storage__";
                    var newStateID = uniqueID();
                    var accessedStorage;
                    function getState(handler) {
                        var localStorageEnabled = isLocalStorageEnabled();
                        var storage;
                        accessedStorage && (storage = accessedStorage);
                        if (!storage && localStorageEnabled) {
                            var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                            rawStorage && (storage = JSON.parse(rawStorage));
                        }
                        storage || (storage = getGlobal()[STORAGE_KEY]);
                        storage || (storage = {
                            id: newStateID
                        });
                        storage.id || (storage.id = newStateID);
                        accessedStorage = storage;
                        var result = handler(storage);
                        localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                        accessedStorage = null;
                        return result;
                    }
                    function getID() {
                        return getState((function(storage) {
                            return storage.id;
                        }));
                    }
                    function getSession(handler) {
                        return getState((function(storage) {
                            var session = storage.__session__;
                            var now = Date.now();
                            session && now - session.created > lifetime && (session = null);
                            session || (session = {
                                guid: uniqueID(),
                                created: now
                            });
                            storage.__session__ = session;
                            return handler(session);
                        }));
                    }
                    return {
                        getState: getState,
                        getID: getID,
                        isStateFresh: function() {
                            return getID() === newStateID;
                        },
                        getSessionState: function(handler) {
                            return getSession((function(session) {
                                session.state = session.state || {};
                                return handler(session.state);
                            }));
                        },
                        getSessionID: function() {
                            return getSession((function(session) {
                                return session.guid;
                            }));
                        }
                    };
                }), [ {
                    name: name,
                    lifetime: lifetime
                } ]);
            }
            function getBelterExperimentStorage() {
                return getStorage({
                    name: "belter_experiment"
                });
            }
            function isEventUnique(name) {
                return getBelterExperimentStorage().getSessionState((function(state) {
                    state.loggedBeacons = state.loggedBeacons || [];
                    if (-1 === state.loggedBeacons.indexOf(name)) {
                        state.loggedBeacons.push(name);
                        return !0;
                    }
                    return !1;
                }));
            }
            function getRandomInteger(range) {
                return Math.floor(Math.random() * range);
            }
            function experiment(_ref) {
                var name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? src_util_noop : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? src_util_noop : _ref$logCheckpoint, _ref$sticky = _ref.sticky;
                var throttle = void 0 === _ref$sticky || _ref$sticky ? function(name) {
                    return getBelterExperimentStorage().getState((function(state) {
                        state.throttlePercentiles = state.throttlePercentiles || {};
                        state.throttlePercentiles[name] = state.throttlePercentiles[name] || getRandomInteger(100);
                        return state.throttlePercentiles[name];
                    }));
                }(name) : getRandomInteger(100);
                var group;
                var treatment = name + "_" + (group = throttle < sample ? "test" : sample >= 50 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle");
                var started = !1;
                var forced = !1;
                try {
                    window.localStorage && window.localStorage.getItem(name) && (forced = !0);
                } catch (err) {}
                var exp = {
                    isEnabled: function() {
                        return "test" === group || forced;
                    },
                    isDisabled: function() {
                        return "test" !== group && !forced;
                    },
                    getTreatment: function() {
                        return treatment;
                    },
                    log: function(checkpoint, payload) {
                        void 0 === payload && (payload = {});
                        if (!started) return exp;
                        isEventUnique(treatment + "_" + JSON.stringify(payload)) && logTreatment({
                            name: name,
                            treatment: treatment,
                            payload: payload,
                            throttle: throttle
                        });
                        isEventUnique(treatment + "_" + checkpoint + "_" + JSON.stringify(payload)) && logCheckpoint({
                            name: name,
                            treatment: treatment,
                            checkpoint: checkpoint,
                            payload: payload,
                            throttle: throttle
                        });
                        return exp;
                    },
                    logStart: function(payload) {
                        void 0 === payload && (payload = {});
                        started = !0;
                        return exp.log("start", payload);
                    },
                    logComplete: function(payload) {
                        void 0 === payload && (payload = {});
                        return exp.log("complete", payload);
                    }
                };
                return exp;
            }
            function getGlobalNameSpace(_ref) {
                var name = _ref.name, _ref$version = _ref.version, version = void 0 === _ref$version ? "latest" : _ref$version;
                var global = getGlobal();
                var globalKey = "__" + name + "__" + version + "_global__";
                var namespace = global[globalKey] = global[globalKey] || {};
                return {
                    get: function(key, defValue) {
                        defValue = defValue || {};
                        return namespace[key] = namespace[key] || defValue;
                    }
                };
            }
            var headerBuilders = [];
            function request(_ref) {
                var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
                return new zalgo_promise.ZalgoPromise((function(resolve, reject) {
                    if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
                    var normalizedHeaders = {};
                    for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                        var key = _Object$keys2[_i4];
                        normalizedHeaders[key.toLowerCase()] = headers[key];
                    }
                    json ? normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/json" : (data || body) && (normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/x-www-form-urlencoded; charset=utf-8");
                    normalizedHeaders.accept = normalizedHeaders.accept || "application/json";
                    for (var _i6 = 0; _i6 < headerBuilders.length; _i6++) {
                        var builtHeaders = (0, headerBuilders[_i6])();
                        for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                            var _key = _Object$keys4[_i8];
                            normalizedHeaders[_key.toLowerCase()] = builtHeaders[_key];
                        }
                    }
                    var xhr = new win.XMLHttpRequest;
                    xhr.addEventListener("load", (function() {
                        var responseHeaders = function(rawHeaders) {
                            void 0 === rawHeaders && (rawHeaders = "");
                            var result = {};
                            for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                                var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), key = _line$split[0], values = _line$split.slice(1);
                                result[key.toLowerCase()] = values.join(":").trim();
                            }
                            return result;
                        }(this.getAllResponseHeaders());
                        if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                        var contentType = responseHeaders["content-type"];
                        var isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json"));
                        var responseBody = this.responseText;
                        try {
                            responseBody = JSON.parse(responseBody);
                        } catch (err) {
                            if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                        }
                        return resolve({
                            status: this.status,
                            headers: responseHeaders,
                            body: responseBody
                        });
                    }), !1);
                    xhr.addEventListener("error", (function(evt) {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
                    }), !1);
                    xhr.open(method, url, !0);
                    for (var _key2 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key2) && xhr.setRequestHeader(_key2, normalizedHeaders[_key2]);
                    json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
                    })).join("&"));
                    xhr.timeout = timeout;
                    xhr.ontimeout = function() {
                        reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
                    };
                    xhr.send(body);
                }));
            }
            function addHeaderBuilder(method) {
                headerBuilders.push(method);
            }
            var types_TYPES = !0;
            function memoized(target, name, descriptor) {
                descriptor.value = memoize(descriptor.value, {
                    name: name,
                    thisNamespace: !0
                });
            }
            function decorators_promise(target, name, descriptor) {
                descriptor.value = promisify(descriptor.value, {
                    name: name
                });
            }
            function isPerc(str) {
                return "string" == typeof str && /^[0-9]+%$/.test(str);
            }
            function isPx(str) {
                return "string" == typeof str && /^[0-9]+px$/.test(str);
            }
            function toNum(val) {
                if ("number" == typeof val) return val;
                var match = val.match(/^([0-9]+)(px|%)$/);
                if (!match) throw new Error("Could not match css value from " + val);
                return parseInt(match[1], 10);
            }
            function toPx(val) {
                return toNum(val) + "px";
            }
            function toCSS(val) {
                return "number" == typeof val ? toPx(val) : isPerc(val) ? val : toPx(val);
            }
            function percOf(num, perc) {
                return parseInt(num * toNum(perc) / 100, 10);
            }
            function normalizeDimension(dim, max) {
                if ("number" == typeof dim) return dim;
                if (isPerc(dim)) return percOf(max, dim);
                if (isPx(dim)) return toNum(dim);
                throw new Error("Can not normalize dimension: " + dim);
            }
            function wrapPromise(method, _temp) {
                var _ref$timeout = (void 0 === _temp ? {} : _temp).timeout, timeout = void 0 === _ref$timeout ? 5e3 : _ref$timeout;
                var expected = [];
                var promises = [];
                return new zalgo_promise.ZalgoPromise((function(resolve, reject) {
                    var timer = setTimeout((function() {
                        expected.length && reject(new Error("Expected " + expected[0].name + " to be called in " + timeout + "ms"));
                        promises.length && reject(new Error("Expected " + promises[0].name + " promise to complete in " + timeout + "ms"));
                    }), timeout);
                    var expect = function(name, handler) {
                        void 0 === handler && (handler = src_util_noop);
                        var exp = {
                            name: name,
                            handler: handler
                        };
                        expected.push(exp);
                        return function() {
                            var _this = this;
                            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                            removeFromArray(expected, exp);
                            var _tryCatch = tryCatch((function() {
                                var _handler;
                                return (_handler = handler).call.apply(_handler, [ _this ].concat(args));
                            })), result = _tryCatch.result, error = _tryCatch.error;
                            if (error) {
                                promises.push({
                                    name: name,
                                    promise: zalgo_promise.ZalgoPromise.asyncReject(error)
                                });
                                throw error;
                            }
                            promises.push({
                                name: name,
                                promise: zalgo_promise.ZalgoPromise.resolve(result)
                            });
                            return result;
                        };
                    };
                    var avoid = function(name, fn) {
                        void 0 === fn && (fn = src_util_noop);
                        return function() {
                            var _fn;
                            promises.push({
                                name: name,
                                promise: zalgo_promise.ZalgoPromise.asyncReject(new Error("Expected " + name + " to not be called"))
                            });
                            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                            return (_fn = fn).call.apply(_fn, [ this ].concat(args));
                        };
                    };
                    var expectError = function(name, handler) {
                        void 0 === handler && (handler = src_util_noop);
                        var exp = {
                            name: name,
                            handler: handler
                        };
                        expected.push(exp);
                        return function() {
                            var _this2 = this;
                            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
                            removeFromArray(expected, exp);
                            var _tryCatch2 = tryCatch((function() {
                                var _handler2;
                                return (_handler2 = handler).call.apply(_handler2, [ _this2 ].concat(args));
                            })), result = _tryCatch2.result, error = _tryCatch2.error;
                            if (error) throw error;
                            promises.push({
                                name: name,
                                promise: zalgo_promise.ZalgoPromise.resolve(result).then((function() {
                                    throw new Error("Expected " + name + " to throw an error");
                                }), src_util_noop)
                            });
                            return result;
                        };
                    };
                    promises.push({
                        name: "wrapPromise handler",
                        promise: zalgo_promise.ZalgoPromise.try((function() {
                            return method({
                                expect: expect,
                                avoid: avoid,
                                expectError: expectError,
                                error: avoid,
                                wait: function() {
                                    return zalgo_promise.ZalgoPromise.resolve();
                                }
                            });
                        }))
                    });
                    (function wait() {
                        return zalgo_promise.ZalgoPromise.try((function() {
                            if (promises.length) {
                                var prom = promises[0];
                                return prom.promise.finally((function() {
                                    removeFromArray(promises, prom);
                                })).then(wait);
                            }
                        })).then((function() {
                            if (expected.length) return zalgo_promise.ZalgoPromise.delay(10).then(wait);
                        }));
                    })().finally((function() {
                        clearTimeout(timer);
                    })).then(resolve, reject);
                }));
            }
        } ]);
    }, function(module, exports, __webpack_require__) {
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
                return l;
            }));
            var n = "Call was rejected by callee.\r\n";
            function i(e) {
                return void 0 === e && (e = window), "about:" === e.location.protocol;
            }
            function a(e) {
                try {
                    return !0;
                } catch (e) {}
                return !1;
            }
            function o(e) {
                void 0 === e && (e = window);
                var t = e.location;
                if (!t) throw new Error("Can not read window location");
                var r = t.protocol;
                if (!r) throw new Error("Can not read window protocol");
                if ("file:" === r) return "file://";
                if ("about:" === r) {
                    var n = function(e) {
                        if (void 0 === e && (e = window), e) try {
                            if (e.parent && e.parent !== e) return e.parent;
                        } catch (e) {}
                    }(e);
                    return n && a() ? o(n) : "about://";
                }
                var i = t.host;
                if (!i) throw new Error("Can not read window host");
                return r + "//" + i;
            }
            function c(e) {
                void 0 === e && (e = window);
                var t = o(e);
                return t && e.mockDomain && 0 === e.mockDomain.indexOf("mock:") ? e.mockDomain : t;
            }
            var u = [], f = [];
            function s(e, t) {
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
                            if (i(e) && a()) return !0;
                        } catch (e) {}
                        try {
                            if (o(e) === o(window)) return !0;
                        } catch (e) {}
                        return !1;
                    }(e)) return !1;
                    try {
                        if (e === window) return !0;
                        if (i(e) && a()) return !0;
                        if (c(window) === c(e)) return !0;
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
                }(u, e);
                if (-1 !== r) {
                    var s = f[r];
                    if (s && function(e) {
                        if (!e.contentWindow) return !0;
                        if (!e.parentNode) return !0;
                        var t = e.ownerDocument;
                        if (t && t.documentElement && !t.documentElement.contains(e)) {
                            for (var r = e; r.parentNode && r.parentNode !== r; ) r = r.parentNode;
                            if (!r.host || !t.documentElement.contains(r.host)) return !0;
                        }
                        return !1;
                    }(s)) return !0;
                }
                return !1;
            }
            function d(e) {
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
            function h(e, t) {
                for (var r = 0; r < e.length; r++) try {
                    if (e[r] === t) return r;
                } catch (e) {}
                return -1;
            }
            var l = function() {
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
                        if (d(n) && s(n)) {
                            if (e) try {
                                e.delete(n);
                            } catch (e) {}
                            t.splice(r, 1), this.values.splice(r, 1), r -= 1;
                        }
                    }
                }, t.isSafeToReadWrite = function(e) {
                    return !d(e);
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
                    var a = this.keys, o = this.values, c = h(a, e);
                    -1 === c ? (a.push(e), o.push(t)) : o[c] = t;
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
                    var n = h(this.keys, e);
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
                    var n = this.keys, i = h(n, e);
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
                    return this._cleanupClosedWindows(), -1 !== h(this.keys, e);
                }, t.getOrSet = function(e, t) {
                    if (this.has(e)) return this.get(e);
                    var r = t();
                    return this.set(e, r), r;
                }, e;
            }();
        } ]);
    }, function(module, exports, __webpack_require__) {
        "undefined" != typeof self && self, module.exports = function(e) {
            var n = {};
            function r(t) {
                if (n[t]) return n[t].exports;
                var i = n[t] = {
                    i: t,
                    l: !1,
                    exports: {}
                };
                return e[t].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
            }
            return r.m = e, r.c = n, r.d = function(e, n, t) {
                r.o(e, n) || Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t
                });
            }, r.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }, r.t = function(e, n) {
                if (1 & n && (e = r(e)), 8 & n) return e;
                if (4 & n && "object" == typeof e && e && e.__esModule) return e;
                var t = Object.create(null);
                if (r.r(t), Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & n && "string" != typeof e) for (var i in e) r.d(t, i, function(n) {
                    return e[n];
                }.bind(null, i));
                return t;
            }, r.n = function(e) {
                var n = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return r.d(n, "a", n), n;
            }, r.o = function(e, n) {
                return {}.hasOwnProperty.call(e, n);
            }, r.p = "", r(r.s = 0);
        }([ function(e, n, r) {
            "use strict";
            r.r(n), r.d(n, "serialize", (function() {
                return P;
            })), r.d(n, "deserialize", (function() {
                return h;
            })), r.d(n, "serializeArray", (function() {
                return c;
            })), r.d(n, "deserializeArray", (function() {
                return a;
            })), r.d(n, "serializeBoolean", (function() {
                return d;
            })), r.d(n, "deserializeBoolean", (function() {
                return l;
            })), r.d(n, "serializeDate", (function() {
                return s;
            })), r.d(n, "deserializeDate", (function() {
                return E;
            })), r.d(n, "serializeError", (function() {
                return p;
            })), r.d(n, "deserializeError", (function() {
                return y;
            })), r.d(n, "serializeFunction", (function() {
                return O;
            })), r.d(n, "deserializeFunction", (function() {
                return z;
            })), r.d(n, "serializeNumber", (function() {
                return v;
            })), r.d(n, "deserializeNumber", (function() {
                return b;
            })), r.d(n, "serializeObject", (function() {
                return N;
            })), r.d(n, "deserializeObject", (function() {
                return R;
            })), r.d(n, "serializePromise", (function() {
                return _;
            })), r.d(n, "deserializePromise", (function() {
                return m;
            })), r.d(n, "serializeRegex", (function() {
                return g;
            })), r.d(n, "deserializeRegex", (function() {
                return T;
            })), r.d(n, "serializeString", (function() {
                return D;
            })), r.d(n, "deserializeString", (function() {
                return S;
            })), r.d(n, "serializeNull", (function() {
                return A;
            })), r.d(n, "deserializeNull", (function() {
                return U;
            })), r.d(n, "serializeUndefined", (function() {
                return I;
            })), r.d(n, "deserializeUndefined", (function() {
                return j;
            })), r.d(n, "TYPE", (function() {
                return i;
            })), r.d(n, "isSerializedType", (function() {
                return u;
            })), r.d(n, "determineType", (function() {
                return o;
            })), r.d(n, "serializeType", (function() {
                return f;
            })), r.d(n, "TYPES", (function() {
                return G;
            }));
            var t, i = {
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
            function u(e) {
                return "object" == typeof e && null !== e && "string" == typeof e.__type__;
            }
            function o(e) {
                return void 0 === e ? i.UNDEFINED : null === e ? i.NULL : Array.isArray(e) ? i.ARRAY : "function" == typeof e ? i.FUNCTION : "object" == typeof e ? e instanceof Error ? i.ERROR : "function" == typeof e.then ? i.PROMISE : "[object RegExp]" === {}.toString.call(e) ? i.REGEX : "[object Date]" === {}.toString.call(e) ? i.DATE : i.OBJECT : "string" == typeof e ? i.STRING : "number" == typeof e ? i.NUMBER : "boolean" == typeof e ? i.BOOLEAN : void 0;
            }
            function f(e, n) {
                return {
                    __type__: e,
                    __val__: n
                };
            }
            function c(e) {
                return e;
            }
            function a(e) {
                return e;
            }
            function d(e) {
                return e;
            }
            function l(e) {
                return e;
            }
            function s(e) {
                return f(i.DATE, e.toJSON());
            }
            function E(e) {
                return new Date(e);
            }
            function N(e) {
                return e;
            }
            function R(e) {
                return e;
            }
            function p(e) {
                return f(i.ERROR, {
                    message: e.message,
                    stack: e.stack,
                    code: e.code,
                    data: e.data
                });
            }
            function y(e) {
                var n = e.stack, r = e.code, t = e.data, i = new Error(e.message);
                return i.code = r, t && (i.data = t), i.stack = n + "\n\n" + i.stack, i;
            }
            function O() {}
            function z() {
                throw new Error("Function serialization is not implemented; nothing to deserialize");
            }
            function v(e) {
                return e;
            }
            function b(e) {
                return e;
            }
            function _() {}
            function m() {
                throw new Error("Promise serialization is not implemented; nothing to deserialize");
            }
            function g(e) {
                return f(i.REGEX, e.source);
            }
            function T(e) {
                return new RegExp(e);
            }
            function D(e) {
                return e;
            }
            function S(e) {
                return e;
            }
            function A(e) {
                return e;
            }
            function U(e) {
                return e;
            }
            function I(e) {
                return f(i.UNDEFINED, e);
            }
            function j() {}
            var x, B = ((t = {})[i.FUNCTION] = O, t[i.ERROR] = p, t[i.PROMISE] = _, t[i.REGEX] = g, 
            t[i.DATE] = s, t[i.ARRAY] = c, t[i.OBJECT] = N, t[i.STRING] = D, t[i.NUMBER] = v, 
            t[i.BOOLEAN] = d, t[i.NULL] = A, t[i.UNDEFINED] = I, t), F = {};
            function P(e, n) {
                void 0 === n && (n = F);
                var r = JSON.stringify(e, (function(e) {
                    var r = this[e];
                    if (u(this)) return r;
                    var t = o(r);
                    if (!t) return r;
                    var i = n[t] || B[t];
                    return i ? i(r, e) : r;
                }));
                return void 0 === r ? i.UNDEFINED : r;
            }
            var L = ((x = {})[i.FUNCTION] = z, x[i.ERROR] = y, x[i.PROMISE] = m, x[i.REGEX] = T, 
            x[i.DATE] = E, x[i.ARRAY] = a, x[i.OBJECT] = R, x[i.STRING] = S, x[i.NUMBER] = b, 
            x[i.BOOLEAN] = l, x[i.NULL] = U, x[i.UNDEFINED] = j, x), M = {};
            function h(e, n) {
                if (void 0 === n && (n = M), e !== i.UNDEFINED) return JSON.parse(e, (function(e, r) {
                    if (u(this)) return r;
                    var t, i;
                    if (u(r) ? (t = r.__type__, i = r.__val__) : (t = o(r), i = r), !t) return i;
                    var f = n[t] || L[t];
                    return f ? f(i, e) : i;
                }));
            }
            var G = !0;
        } ]);
    }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "Promise", (function() {
            return promise_ZalgoPromise;
        }));
        __webpack_require__.d(__webpack_exports__, "TYPES", (function() {
            return src_types_TYPES_0;
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
        function isRegex(item) {
            return "[object RegExp]" === {}.toString.call(item);
        }
        var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol(win) {
            void 0 === win && (win = window);
            return "about:" === win.location.protocol;
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
            var protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if ("file:" === protocol) return "file://";
            if ("about:" === protocol) {
                var parent = getParent(win);
                return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
            }
            var host = location.host;
            if (!host) throw new Error("Can not read window host");
            return protocol + "//" + host;
        }
        function getDomain(win) {
            void 0 === win && (win = window);
            var domain = getActualDomain(win);
            return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
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
                    for (;win.parent !== win; ) {
                        result.push(win.parent);
                        win = win.parent;
                    }
                } catch (err) {}
                return result;
            }(child).indexOf(parent);
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
        function getAncestor(win) {
            void 0 === win && (win = window);
            return getOpener(win = win || window) || getParent(win) || void 0;
        }
        function matchDomain(pattern, origin) {
            if ("string" == typeof pattern) {
                if ("string" == typeof origin) return "*" === pattern || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some((function(subpattern) {
                return matchDomain(subpattern, origin);
            })));
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
        function closeWindow(win) {
            try {
                win.close();
            } catch (err) {}
        }
        var zalgo_promise = __webpack_require__(0);
        var belter = __webpack_require__(1);
        var cross_domain_safe_weakmap = __webpack_require__(3);
        function getGlobal(win) {
            void 0 === win && (win = window);
            var globalKey = "__post_robot_10_0_45__";
            return win !== window ? win[globalKey] : win[globalKey] = win[globalKey] || {};
        }
        var getObj = function() {
            return {};
        };
        function globalStore(key, defStore) {
            void 0 === key && (key = "store");
            void 0 === defStore && (defStore = getObj);
            return Object(belter.getOrSet)(getGlobal(), key, (function() {
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
                        return Object(belter.getOrSet)(store, storeKey, getter);
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
            var global = getGlobal();
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
                        var store = getStore(win);
                        return Object(belter.getOrSet)(store, key, getter);
                    }
                };
            }));
        }
        function getInstanceID() {
            return globalStore("instance").getOrSet("instanceID", belter.uniqueID);
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
        var universal_serialize = __webpack_require__(2);
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
        var dispatchedErrors = [];
        var possiblyUnhandledPromiseHandlers = [];
        var activeCount = 0;
        var flushPromise;
        function flushActive() {
            if (!activeCount && flushPromise) {
                var promise = flushPromise;
                flushPromise = null;
                promise.resolve();
            }
        }
        function startActive() {
            activeCount += 1;
        }
        function endActive() {
            activeCount -= 1;
            flushActive();
        }
        var promise_ZalgoPromise = function() {
            function ZalgoPromise(handler) {
                var _this = this;
                this.resolved = void 0;
                this.rejected = void 0;
                this.errorHandled = void 0;
                this.value = void 0;
                this.error = void 0;
                this.handlers = void 0;
                this.dispatching = void 0;
                this.stack = void 0;
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    var _result;
                    var _error;
                    var resolved = !1;
                    var rejected = !1;
                    var isAsync = !1;
                    startActive();
                    try {
                        handler((function(res) {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }), (function(err) {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        }));
                    } catch (err) {
                        endActive();
                        this.reject(err);
                        return;
                    }
                    endActive();
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            var _proto = ZalgoPromise.prototype;
            _proto.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            _proto.reject = function(error) {
                var _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                    error = new Error("Expected reject to be called with Error, got " + _err);
                }
                this.rejected = !0;
                this.error = error;
                this.errorHandled || setTimeout((function() {
                    _this2.errorHandled || function(err, promise) {
                        if (-1 === dispatchedErrors.indexOf(err)) {
                            dispatchedErrors.push(err);
                            setTimeout((function() {
                                throw err;
                            }), 1);
                            for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2);
                }), 1);
                this.dispatch();
                return this;
            };
            _proto.asyncReject = function(error) {
                this.errorHandled = !0;
                this.reject(error);
                return this;
            };
            _proto.dispatch = function() {
                var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                if (!this.dispatching && (resolved || rejected)) {
                    this.dispatching = !0;
                    startActive();
                    var chain = function(firstPromise, secondPromise) {
                        return firstPromise.then((function(res) {
                            secondPromise.resolve(res);
                        }), (function(err) {
                            secondPromise.reject(err);
                        }));
                    };
                    for (var i = 0; i < handlers.length; i++) {
                        var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise;
                        var _result2 = void 0;
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
                        if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
                            _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error);
                            _result2.errorHandled = !0;
                        } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                    }
                    handlers.length = 0;
                    this.dispatching = !1;
                    endActive();
                }
            };
            _proto.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new ZalgoPromise;
                this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                });
                this.errorHandled = !0;
                this.dispatch();
                return promise;
            };
            _proto.catch = function(onError) {
                return this.then(void 0, onError);
            };
            _proto.finally = function(onFinally) {
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
            };
            _proto.timeout = function(time, err) {
                var _this3 = this;
                if (this.resolved || this.rejected) return this;
                var timeout = setTimeout((function() {
                    _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                }), time);
                return this.then((function(result) {
                    clearTimeout(timeout);
                    return result;
                }));
            };
            _proto.toPromise = function() {
                if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            };
            ZalgoPromise.resolve = function(value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                    return value.then(resolve, reject);
                })) : (new ZalgoPromise).resolve(value);
            };
            ZalgoPromise.reject = function(error) {
                return (new ZalgoPromise).reject(error);
            };
            ZalgoPromise.asyncReject = function(error) {
                return (new ZalgoPromise).asyncReject(error);
            };
            ZalgoPromise.all = function(promises) {
                var promise = new ZalgoPromise;
                var count = promises.length;
                var results = [];
                if (!count) {
                    promise.resolve(results);
                    return promise;
                }
                var chain = function(i, firstPromise, secondPromise) {
                    return firstPromise.then((function(res) {
                        results[i] = res;
                        0 == (count -= 1) && promise.resolve(results);
                    }), (function(err) {
                        secondPromise.reject(err);
                    }));
                };
                for (var i = 0; i < promises.length; i++) {
                    var prom = promises[i];
                    if (prom instanceof ZalgoPromise) {
                        if (prom.resolved) {
                            results[i] = prom.value;
                            count -= 1;
                            continue;
                        }
                    } else if (!utils_isPromise(prom)) {
                        results[i] = prom;
                        count -= 1;
                        continue;
                    }
                    chain(i, ZalgoPromise.resolve(prom), promise);
                }
                0 === count && promise.resolve(results);
                return promise;
            };
            ZalgoPromise.hash = function(promises) {
                var result = {};
                var awaitPromises = [];
                var _loop = function(key) {
                    if (promises.hasOwnProperty(key)) {
                        var value = promises[key];
                        utils_isPromise(value) ? awaitPromises.push(value.then((function(res) {
                            result[key] = res;
                        }))) : result[key] = value;
                    }
                };
                for (var key in promises) _loop(key);
                return ZalgoPromise.all(awaitPromises).then((function() {
                    return result;
                }));
            };
            ZalgoPromise.map = function(items, method) {
                return ZalgoPromise.all(items.map(method));
            };
            ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                return function(handler) {
                    possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function() {
                            possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                }(handler);
            };
            ZalgoPromise.try = function(method, context, args) {
                if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                var result;
                startActive();
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    endActive();
                    return ZalgoPromise.reject(err);
                }
                endActive();
                return ZalgoPromise.resolve(result);
            };
            ZalgoPromise.delay = function(_delay) {
                return new ZalgoPromise((function(resolve) {
                    setTimeout(resolve, _delay);
                }));
            };
            ZalgoPromise.isPromise = function(value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            };
            ZalgoPromise.flush = function() {
                return function(Zalgo) {
                    var promise = flushPromise = flushPromise || new Zalgo;
                    flushActive();
                    return promise;
                }(ZalgoPromise);
            };
            return ZalgoPromise;
        }();
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
        function uniqueID() {
            var chars = "0123456789abcdef";
            return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            })) + "_" + function(str) {
                if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }))).replace(/[=]/g, "");
                if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
                throw new Error("Can not find window.btoa or Buffer");
            }((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }
        var objectIDs;
        function serializeArgs(args) {
            try {
                return JSON.stringify([].slice.call(args), (function(subkey, val) {
                    return "function" == typeof val ? "memoize[" + function(obj) {
                        objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                        if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                        var uid = objectIDs.get(obj);
                        if (!uid) {
                            uid = typeof obj + ":" + uniqueID();
                            objectIDs.set(obj, uid);
                        }
                        return uid;
                    }(val) + "]" : val;
                }));
            } catch (err) {
                throw new Error("Arguments not serializable -- can not be used to memoize");
            }
        }
        function getEmptyObject() {
            return {};
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
                var cacheKey = serializeArgs(args);
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
            return function(fn, name) {
                try {
                    delete fn.name;
                    fn.name = name;
                } catch (err) {}
                fn.__name__ = fn.displayName = name;
                return fn;
            }(memoizedFunction, (options.name || (fn = method).name || fn.__name__ || fn.displayName || "anonymous") + "::memoized");
            var fn;
        }
        memoize.clear = function() {
            memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
        };
        memoize((function(obj) {
            if (Object.values) return Object.values(obj);
            var result = [];
            for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
            return result;
        }));
        Error;
        function isDocumentReady() {
            return Boolean(document.body) && "complete" === document.readyState;
        }
        function isDocumentInteractive() {
            return Boolean(document.body) && "interactive" === document.readyState;
        }
        memoize((function() {
            return new zalgo_promise.ZalgoPromise((function(resolve) {
                if (isDocumentReady() || isDocumentInteractive()) return resolve();
                var interval = setInterval((function() {
                    if (isDocumentReady() || isDocumentInteractive()) {
                        clearInterval(interval);
                        return resolve();
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
            var send = _ref.send, _ref$id = _ref.id, id = void 0 === _ref$id ? Object(belter.uniqueID)() : _ref$id;
            var windowNamePromise = winPromise.then((function(win) {
                if (isSameDomain(win)) return assertSameDomain(win).name;
            }));
            var windowTypePromise = winPromise.then((function(window) {
                if (isWindowClosed(window)) throw new Error("Window is closed, can not determine type");
                return getOpener(window) ? "popup" : "iframe";
            }));
            windowNamePromise.catch(belter.noop);
            windowTypePromise.catch(belter.noop);
            var getName = function() {
                return winPromise.then((function(win) {
                    if (!isWindowClosed(win)) return isSameDomain(win) ? assertSameDomain(win).name : windowNamePromise;
                }));
            };
            return {
                id: id,
                getType: function() {
                    return windowTypePromise;
                },
                getInstanceID: Object(belter.memoizePromise)((function() {
                    return winPromise.then((function(win) {
                        return getWindowInstanceID(win, {
                            send: send
                        });
                    }));
                })),
                close: function() {
                    return winPromise.then(closeWindow);
                },
                getName: getName,
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
                setLocation: function(href, opts) {
                    void 0 === opts && (opts = {});
                    return winPromise.then((function(win) {
                        var domain = window.location.protocol + "//" + window.location.host;
                        var _opts$method = opts.method, method = void 0 === _opts$method ? "get" : _opts$method, body = opts.body;
                        if (0 === href.indexOf("/")) href = "" + domain + href; else if (!href.match(/^https?:\/\//) && 0 !== href.indexOf(domain)) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(href));
                        if ("post" === method) return getName().then((function(name) {
                            if (!name) throw new Error("Can not post to window without target name");
                            Object(belter.submitForm)({
                                url: href,
                                target: name,
                                method: method,
                                body: body
                            });
                        }));
                        if ("get" !== method) throw new Error("Unsupported method: " + method);
                        if (isSameDomain(win)) try {
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
                        var sameDomain = isSameDomain(win);
                        var frame = function(win) {
                            if (isSameDomain(win)) return assertSameDomain(win).frameElement;
                            for (var _i21 = 0, _document$querySelect2 = document.querySelectorAll("iframe"); _i21 < _document$querySelect2.length; _i21++) {
                                var frame = _document$querySelect2[_i21];
                                if (frame && frame.contentWindow && frame.contentWindow === win) return frame;
                            }
                        }(win);
                        if (!sameDomain) throw new Error("Can not set name for cross-domain window: " + name);
                        assertSameDomain(win).name = name;
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
                    return "popup" === type;
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
                    _ref3.isPopup && name && window.open("", name);
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
                return Boolean(this.actualWindow && isWindowClosed(this.actualWindow));
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
                return Boolean(obj && !isWindow(obj) && obj.isProxyWindow);
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
        function serializeFunction(destination, domain, val, key, _ref3) {
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
                    if (!meth) throw new Error("Could not find method '" + name + "' with id: " + data.id + " in " + getDomain(window));
                    var methodSource = meth.source, domain = meth.domain, val = meth.val;
                    return zalgo_promise.ZalgoPromise.try((function() {
                        if (!matchDomain(domain, origin)) throw new Error("Method '" + data.name + "' domain " + JSON.stringify(Object(belter.isRegex)(meth.domain) ? meth.domain.source : meth.domain) + " does not match origin " + origin + " in " + getDomain(window));
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
                        return zalgo_promise.ZalgoPromise.try((function() {
                            if (val.onError) return val.onError(err);
                        })).then((function() {
                            err.stack && (err.stack = "Remote call to " + name + "(" + function(args) {
                                void 0 === args && (args = []);
                                return Object(belter.arrayFrom)(args).map((function(arg) {
                                    return "string" == typeof arg ? "'" + arg + "'" : void 0 === arg ? "undefined" : null === arg ? "null" : "boolean" == typeof arg ? arg.toString() : Array.isArray(arg) ? "[ ... ]" : "object" == typeof arg ? "{ ... }" : "function" == typeof arg ? "() => { ... }" : "<" + typeof arg + ">";
                                })).join(", ");
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
            var id = val.__id__ || Object(belter.uniqueID)();
            destination = window_ProxyWindow.unwrap(destination);
            var name = val.__name__ || val.name || key;
            "string" == typeof name && "function" == typeof name.indexOf && 0 === name.indexOf("anonymous::") && (name = name.replace("anonymous::", key + "::"));
            if (window_ProxyWindow.isProxyWindow(destination)) {
                addMethod(id, val, name, destination, domain);
                destination.awaitWindow().then((function(win) {
                    addMethod(id, val, name, win, domain);
                }));
            } else addMethod(id, val, name, destination, domain);
            return Object(universal_serialize.serializeType)("cross_domain_function", {
                id: id,
                name: name
            });
        }
        function serializeMessage(destination, domain, obj, _ref) {
            var _serialize;
            var on = _ref.on, send = _ref.send;
            return Object(universal_serialize.serialize)(obj, ((_serialize = {})[universal_serialize.TYPE.PROMISE] = function(val, key) {
                return function(destination, domain, val, key, _ref) {
                    var on = _ref.on, send = _ref.send;
                    return Object(universal_serialize.serializeType)("cross_domain_zalgo_promise", {
                        then: serializeFunction(destination, domain, (function(resolve, reject) {
                            return val.then(resolve, reject);
                        }), key, {
                            on: on,
                            send: send
                        })
                    });
                }(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[universal_serialize.TYPE.FUNCTION] = function(val, key) {
                return serializeFunction(destination, domain, val, key, {
                    on: on,
                    send: send
                });
            }, _serialize[universal_serialize.TYPE.OBJECT] = function(val) {
                return isWindow(val) || window_ProxyWindow.isProxyWindow(val) ? function(destination, domain, win, _ref10) {
                    var send = _ref10.send;
                    return Object(universal_serialize.serializeType)("cross_domain_window", window_ProxyWindow.serialize(win, {
                        send: send
                    }));
                }(0, 0, val, {
                    send: send
                }) : val;
            }, _serialize));
        }
        function deserializeMessage(source, origin, message, _ref2) {
            var _deserialize;
            var send = _ref2.send;
            return Object(universal_serialize.deserialize)(message, ((_deserialize = {}).cross_domain_zalgo_promise = function(serializedPromise) {
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
                                    origin: getDomain()
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
            0 === domain.indexOf("file:") && (domain = "*");
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
                    if (isWindowClosed(win)) throw new Error("Window is closed");
                    var serializedMessage = serializeMessage(win, domain, ((_ref = {}).__post_robot_10_0_45__ = domainBuffer.buffer || [], 
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
                        return i + ". " + Object(belter.stringifyError)(err);
                    })).join("\n\n"));
                }));
                return domainBuffer.flush.then((function() {
                    delete domainBuffer.flush;
                }));
            })).then(belter.noop);
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
                                    var _domainListeners$__DO3 = _domainListeners$__DO2[_i6], listener = _domainListeners$__DO3.listener;
                                    if (matchDomain(_domainListeners$__DO3.regex, domain)) return listener;
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
                    if (!message.fireAndForget && !isWindowClosed(source)) try {
                        return send_sendMessage(source, origin, {
                            id: Object(belter.uniqueID)(),
                            origin: getDomain(window),
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
                        throw new Error("Send response message failed for " + logName + " in " + getDomain() + "\n\n" + Object(belter.stringifyError)(err));
                    }
                }));
            }
            return zalgo_promise.ZalgoPromise.all([ zalgo_promise.ZalgoPromise.flush().then((function() {
                if (!message.fireAndForget && !isWindowClosed(source)) try {
                    return send_sendMessage(source, origin, {
                        id: Object(belter.uniqueID)(),
                        origin: getDomain(window),
                        type: "postrobot_message_ack",
                        hash: message.hash,
                        name: message.name
                    }, {
                        on: on,
                        send: send
                    });
                } catch (err) {
                    throw new Error("Send ack message failed for " + logName + " in " + getDomain() + "\n\n" + Object(belter.stringifyError)(err));
                }
            })), zalgo_promise.ZalgoPromise.try((function() {
                if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                return options.handler({
                    source: source,
                    origin: origin,
                    data: message.data
                });
            })).then((function(data) {
                return sendResponse("success", data);
            }), (function(error) {
                return sendResponse("error", null, error);
            })) ]).then(belter.noop).catch((function(err) {
                if (options && options.handleError) return options.handleError(err);
                throw err;
            }));
        }
        function handleAck(source, origin, message) {
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
        }
        function handleResponse(source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                var options = getResponseListener(message.hash);
                if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (pattern = options.domain, 
                Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() + ")" : pattern.toString()));
                var pattern;
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
                    var parseMessages = parsedMessage.__post_robot_10_0_45__;
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
                    if (isWindowClosed(source) && !message.fireAndForget) return;
                    0 === message.origin.indexOf("file:") && (origin = "file://");
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
            (options = options || {}).name = name;
            options.handler = handler || options.handler;
            var win = options.window;
            var domain = options.domain;
            var requestListener = function addRequestListener(_ref4, listener) {
                var name = _ref4.name, win = _ref4.win, domain = _ref4.domain;
                var requestListeners = windowStore("requestListeners");
                if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
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
                domain = domain || "*";
                if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === getWildcard() ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                var nameListeners = requestListeners.getOrSet(win, (function() {
                    return {};
                }));
                var domainListeners = Object(belter.getOrSet)(nameListeners, name, (function() {
                    return {};
                }));
                var strDomain = domain.toString();
                var regexListeners;
                var regexListener;
                Object(belter.isRegex)(domain) ? (regexListeners = Object(belter.getOrSet)(domainListeners, "__domain_regex__", (function() {
                    return [];
                }))).push(regexListener = {
                    regex: domain,
                    listener: listener
                }) : domainListeners[strDomain] = listener;
                return {
                    cancel: function() {
                        delete domainListeners[strDomain];
                        if (regexListener) {
                            regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                            regexListeners.length || delete domainListeners.__domain_regex__;
                        }
                        Object.keys(domainListeners).length || delete nameListeners[name];
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
                domain: domain || "*",
                name: name
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
        var send_send = function send(win, name, data, options) {
            var domainMatcher = (options = options || {}).domain || "*";
            var responseTimeout = options.timeout || -1;
            var childTimeout = options.timeout || 5e3;
            var fireAndForget = options.fireAndForget || !1;
            return zalgo_promise.ZalgoPromise.try((function() {
                !function(name, win, domain) {
                    if (!name) throw new Error("Expected name");
                    if (domain && "string" != typeof domain && !Array.isArray(domain) && !Object(belter.isRegex)(domain)) throw new TypeError("Can not send " + name + ". Expected domain " + JSON.stringify(domain) + " to be a string, array, or regex");
                    if (isWindowClosed(win)) throw new Error("Can not send " + name + ". Target window is closed");
                }(name, win, domainMatcher);
                if (function(parent, child) {
                    var actualParent = getAncestor(child);
                    if (actualParent) return actualParent === parent;
                    if (child === parent) return !1;
                    if (function(win) {
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
                        for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                            var result = [];
                            for (var _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
                                var frame = _getFrames2[_i3];
                                result.push(frame);
                                for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
                            }
                            return result;
                        }(win); _i7 < _getAllChildFrames4.length; _i7++) {
                            var frame = _getAllChildFrames4[_i7];
                            try {
                                if (frame.top) return frame.top;
                            } catch (err) {}
                            if (getParent(frame) === frame) return frame;
                        }
                    }(child) === child) return !1;
                    for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) if (_getFrames8[_i15] === child) return !0;
                    return !1;
                }(window, win)) return function(win, timeout, name) {
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
                            if (!matchDomain(targetDomain, targetDomain)) throw new Error("Domain " + Object(belter.stringify)(targetDomain) + " does not match " + Object(belter.stringify)(targetDomain));
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
                var hash = name + "_" + Object(belter.uniqueID)();
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
                    var interval = Object(belter.safeInterval)((function() {
                        if (isWindowClosed(win)) return promise.reject(new Error("Window closed for " + name + " before " + (responseListener.ack ? "response" : "ack")));
                        if (responseListener.cancelled) return promise.reject(new Error("Response listener was cancelled for " + name));
                        ackTimeout = Math.max(ackTimeout - 500, 0);
                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - 500, 0));
                        return responseListener.ack || 0 !== ackTimeout ? 0 === resTimeout ? promise.reject(new Error("No response for postMessage " + logName + " in " + getDomain() + " in " + totalResTimeout + "ms")) : void 0 : promise.reject(new Error("No ack for postMessage " + logName + " in " + getDomain() + " in " + totalAckTimeout + "ms"));
                    }), 500);
                    promise.finally((function() {
                        interval.cancel();
                        reqPromises.splice(reqPromises.indexOf(promise, 1));
                    })).catch(belter.noop);
                }
                return send_sendMessage(win, domain, {
                    id: Object(belter.uniqueID)(),
                    origin: getDomain(window),
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
                    throw new Error("Send request message failed for " + logName + " in " + getDomain() + "\n\n" + Object(belter.stringifyError)(err));
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
            if (!getGlobal().initialized) {
                getGlobal().initialized = !0;
                on = (_ref3 = {
                    on: on_on,
                    send: send_send
                }).on, send = _ref3.send, (global = getGlobal()).receiveMessage = global.receiveMessage || function(message) {
                    return receive_receiveMessage(message, {
                        on: on,
                        send: send
                    });
                };
                !function(_ref5) {
                    var on = _ref5.on, send = _ref5.send;
                    globalStore().getOrSet("postMessageListener", (function() {
                        return Object(belter.addEventListener)(window, "message", (function(event) {
                            !function(event, _ref4) {
                                var on = _ref4.on, send = _ref4.send;
                                zalgo_promise.ZalgoPromise.try((function() {
                                    try {
                                        Object(belter.noop)(event.source);
                                    } catch (err) {
                                        return;
                                    }
                                    var source = event.source || event.sourceElement;
                                    var origin = event.origin || event.originalEvent && event.originalEvent.origin;
                                    var data = event.data;
                                    "null" === origin && (origin = "file://");
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
                        var parent = getAncestor();
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
            delete window.__post_robot_10_0_45__;
        }
        var src_types_TYPES_0 = !0;
        function cleanUpWindow(win) {
            for (var _i2 = 0, _requestPromises$get2 = windowStore("requestPromises").get(win, []); _i2 < _requestPromises$get2.length; _i2++) _requestPromises$get2[_i2].reject(new Error("Window " + (isWindowClosed(win) ? "closed" : "cleaned up") + " before response")).catch(belter.noop);
        }
        setup();
    } ]);
}));