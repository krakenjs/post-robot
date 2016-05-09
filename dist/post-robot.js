(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("postRobot", [], factory);
	else if(typeof exports === 'object')
		exports["postRobot"] = factory();
	else
		root["postRobot"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _interface = __webpack_require__(1);

	Object.keys(_interface).forEach(function (key) {
	    if (key === "default") return;
	    Object.defineProperty(exports, key, {
	        enumerable: true,
	        get: function get() {
	            return _interface[key];
	        }
	    });
	});

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _drivers = __webpack_require__(11);

	var _compat = __webpack_require__(15);

	function init() {

	    (0, _compat.registerGlobals)();

	    // Log the window id
	    _lib.util.debug('ID', (0, _conf.getWindowID)());

	    // Listen for all incoming post-messages
	    _lib.util.listen(window, 'message', _drivers.messageListener);

	    // Register the current window
	    _lib.childWindows.register((0, _conf.getWindowID)(), window, _lib.util.getType());

	    // Message up to all other parent windows with our id
	    (0, _lib.propagate)((0, _conf.getWindowID)());
	}

	init();

	exports['default'] = module.exports;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.util = exports.openBridge = exports.reset = exports.parent = undefined;

	var _client = __webpack_require__(2);

	Object.keys(_client).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _client[key];
	    }
	  });
	});

	var _server = __webpack_require__(23);

	Object.keys(_server).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _server[key];
	    }
	  });
	});

	var _proxy = __webpack_require__(24);

	Object.keys(_proxy).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _proxy[key];
	    }
	  });
	});

	var _config = __webpack_require__(25);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _drivers = __webpack_require__(11);

	Object.defineProperty(exports, 'reset', {
	  enumerable: true,
	  get: function get() {
	    return _drivers.resetListeners;
	  }
	});

	var _bridge = __webpack_require__(16);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});

	var _util = __webpack_require__(7);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});
	var parent = exports.parent = _util.util.getParent();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.request = request;
	exports.send = send;
	exports.sendToParent = sendToParent;

	var _conf = __webpack_require__(3);

	var _drivers = __webpack_require__(11);

	var _lib = __webpack_require__(13);

	function request(options) {

	    return _lib.promise.nodeify(new _lib.promise.Promise(function (resolve, reject) {

	        if (!options.name) {
	            throw new Error('Expected options.name');
	        }

	        if (!options.window) {
	            throw new Error('Expected options.window');
	        }

	        if (_conf.CONFIG.MOCK_MODE) {
	            options.window = window;
	        } else if (typeof options.window === 'string') {
	            var el = document.getElementById(options.window);

	            if (!el) {
	                throw new Error('Expected options.window ' + options.window + ' to be a valid element id');
	            }

	            if (el.tagName.toLowerCase() !== 'iframe') {
	                throw new Error('Expected options.window ' + options.window + ' to be an iframe');
	            }

	            options.window = el.contentWindow;

	            if (!options.window) {
	                throw new Error('Expected options.window');
	            }
	        }

	        var hash = options.name + '_' + _lib.util.uniqueID();
	        _drivers.listeners.response[hash] = options;

	        if (options.window.closed) {
	            throw new Error('Target window is closed');
	        }

	        if (options.timeout) {
	            setTimeout(function () {
	                return reject(new Error('Post message response timed out after ' + options.timeout + ' ms'));
	            }, options.timeout);
	        }

	        options.respond = function (err, result) {
	            return err ? reject(err) : resolve(result);
	        };

	        (0, _drivers.sendMessage)(options.window, {
	            hash: hash,
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
	            name: options.name,
	            data: options.data || {}
	        })['catch'](reject);

	        setTimeout(function () {
	            if (!options.ack) {
	                return reject(new Error('No ack for postMessage ' + options.name));
	            }
	        }, _conf.CONFIG.ACK_TIMEOUT);
	    }), options.callback);
	}

	function send(window, name, data, callback) {

	    if (!callback && data instanceof Function) {
	        callback = data;
	        data = {};
	    }

	    return request({ window: window, name: name, data: data, callback: callback });
	}

	function sendToParent(name, data, callback) {
	    if (!_lib.util.getParent()) {
	        throw new Error('Window does not have a parent');
	    }

	    return send(_lib.util.getParent(), name, data, callback);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(4);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _constants = __webpack_require__(5);

	Object.keys(_constants).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _constants[key];
	    }
	  });
	});

	var _id = __webpack_require__(6);

	Object.keys(_id).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _id[key];
	    }
	  });
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP: true,

	    DEBUG: false,

	    ACK_TIMEOUT: 3000,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONSTANTS = exports.CONSTANTS = {

	    POST_MESSAGE_TYPE: {
	        REQUEST: 'postrobot_message_request',
	        RESPONSE: 'postrobot_message_response',
	        ACK: 'postrobot_message_ack'
	    },

	    POST_MESSAGE_ACK: {
	        SUCCESS: 'success',
	        ERROR: 'error'
	    },

	    POST_MESSAGE_NAMES: {
	        IDENTIFY: 'identify'
	    },

	    WINDOW_TYPES: {
	        FULLPAGE: 'fullpage',
	        POPUP: 'popup',
	        IFRAME: 'iframe'
	    },

	    WINDOW_PROPS: {
	        POSTROBOT: '__postRobot__'
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getWindowID = undefined;

	var _util = __webpack_require__(7);

	var getWindowID = exports.getWindowID = _util.util.memoize(function () {
	    return window.name || _util.util.uniqueID();
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.util = undefined;

	var _conf = __webpack_require__(3);

	var _promise = __webpack_require__(8);

	var util = exports.util = {
	    isPopup: function isPopup() {
	        return Boolean(window.opener);
	    },
	    isIframe: function isIframe() {
	        return Boolean(window.parent && window !== window.parent);
	    },
	    isFullpage: function isFullpage() {
	        return Boolean(!util.isIframe() && !util.isPopup());
	    },


	    windowReady: new _promise.promise.Promise(function (resolve, reject) {
	        if (document.readyState === 'complete') {
	            return resolve();
	        }

	        window.addEventListener('load', resolve);
	    }),

	    getType: function getType() {
	        if (util.isPopup()) {
	            return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	        }
	        if (util.isIframe()) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }
	        return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
	    },
	    once: function once(method) {
	        if (!method) {
	            return method;
	        }
	        var called = false;
	        return function onceWrapper() {
	            if (!called) {
	                called = true;
	                return method.apply(this, arguments);
	            }
	        };
	    },
	    getParent: function getParent() {
	        if (util.isPopup()) {
	            return window.opener;
	        }
	        if (util.isIframe()) {
	            return window.parent;
	        }
	    },
	    eachParent: function eachParent(method, includeSelf) {

	        var win = window;

	        if (includeSelf) {
	            method(window);
	        }

	        while (true) {
	            var parent = win.opener || win.parent;

	            if (win === parent) {
	                return;
	            }

	            win = parent;

	            method(win);
	        }
	    },
	    eachFrame: function eachFrame(win, method) {
	        for (var i = 0; i < win.frames.length; i++) {
	            var frame = void 0;

	            try {
	                frame = win.frames[i];
	            } catch (err) {
	                continue;
	            }

	            method(frame);
	        }
	    },
	    noop: function noop() {},
	    // eslint-disable-line no-empty-function

	    getDomain: function getDomain() {
	        return window.location.host;
	    },
	    clearLogs: function clearLogs() {

	        if (window.console && window.console.clear) {
	            window.console.clear();
	        }

	        if (_conf.CONFIG.LOG_TO_PAGE) {
	            var container = document.getElementById('postRobotLogs');

	            if (container) {
	                container.parentNode.removeChild(container);
	            }
	        }
	    },
	    writeToPage: function writeToPage(level, args) {
	        setTimeout(function () {
	            var container = document.getElementById('postRobotLogs');

	            if (!container) {
	                container = document.createElement('div');
	                container.id = 'postRobotLogs';
	                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
	                document.body.appendChild(container);
	            }

	            var el = document.createElement('div');

	            var date = new Date().toString().split(' ')[4];

	            var payload = util.map(args, function (item) {
	                if (typeof item === 'string') {
	                    return item;
	                }
	                if (!item) {
	                    return toString.call(item);
	                }
	                var json = void 0;
	                try {
	                    json = JSON.stringify(item, 0, 2);
	                } catch (e) {
	                    json = '[object]';
	                }

	                return '\n\n' + json + '\n\n';
	            }).join(' ');

	            var msg = date + ' ' + level + ' ' + payload;
	            el.innerHTML = msg;

	            var color = {
	                log: '#ddd',
	                warn: 'orange',
	                error: 'red',
	                info: 'blue',
	                debug: '#aaa'
	            }[level];

	            el.style.cssText = 'margin-top: 10px; color: ' + color + ';';

	            if (!container.childNodes.length) {
	                container.appendChild(el);
	            } else {
	                container.insertBefore(el, container.childNodes[0]);
	            }
	        });
	    },
	    logLevel: function logLevel(level, args) {

	        args = Array.prototype.slice.call(args);

	        args.unshift(util.getDomain());
	        args.unshift(util.getType().toLowerCase());
	        args.unshift('[post-robot]');

	        if (_conf.CONFIG.LOG_TO_PAGE) {
	            util.writeToPage(level, args);
	        }

	        if (!window.console) {
	            return;
	        }

	        if (!window.console[level]) {
	            level = 'log';
	        }

	        if (!window.console[level]) {
	            return;
	        }

	        window.console[level].apply(window.console, args);
	    },
	    log: function log() {
	        util.logLevel('info', arguments);
	    },
	    debug: function debug() {
	        if (_conf.CONFIG.DEBUG) {
	            util.logLevel('debug', arguments);
	        }
	    },
	    debugError: function debugError() {
	        if (_conf.CONFIG.DEBUG) {
	            util.logLevel('error', arguments);
	        }
	    },
	    safeHasProp: function safeHasProp(obj, name) {
	        try {
	            if (obj[name]) {
	                return true;
	            } else {
	                return false;
	            }
	        } catch (err) {
	            return false;
	        }
	    },
	    warn: function warn() {
	        util.logLevel('warn', arguments);
	    },
	    error: function error() {
	        util.logLevel('error', arguments);
	    },
	    listen: function listen(win, event, handler) {
	        if (win.addEventListener) {
	            win.addEventListener(event, handler);
	        } else {
	            win.attachEvent('on' + event, handler);
	        }

	        return {
	            cancel: function cancel() {
	                if (win.removeEventListener) {
	                    win.removeEventListener(event, handler);
	                } else {
	                    win.detachEvent('on' + event, handler);
	                }
	            }
	        };
	    },
	    apply: function apply(method, context, args) {
	        if (method.apply instanceof Function) {
	            return method.apply(context, args);
	        }
	        return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
	    },
	    find: function find(collection, method, def) {
	        if (!collection) {
	            return def;
	        }
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return collection[i];
	            }
	        }
	        return def;
	    },
	    map: function map(collection, method) {
	        var results = [];
	        for (var i = 0; i < collection.length; i++) {
	            results.push(method(collection[i]));
	        }
	        return results;
	    },
	    some: function some(collection, method) {
	        method = method || Boolean;
	        for (var i = 0; i < collection.length; i++) {
	            if (method(collection[i])) {
	                return true;
	            }
	        }
	        return false;
	    },
	    keys: function keys(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(key);
	            };
	        }
	        return result;
	    },
	    values: function values(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(mapping[key]);
	            };
	        }
	        return result;
	    },
	    getByValue: function getByValue(mapping, value) {
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key) && mapping[key] === value) {
	                return key;
	            }
	        }
	    },
	    uniqueID: function uniqueID() {

	        var chars = '0123456789abcdef';

	        return 'xxxxxxxxxx'.replace(/./g, function () {
	            return chars.charAt(Math.floor(Math.random() * chars.length));
	        });
	    },
	    isFrameOwnedBy: function isFrameOwnedBy(win, frame) {

	        try {
	            if (frame.parent === win) {
	                return true;
	            } else {
	                return false;
	            }
	        } catch (err) {

	            try {
	                for (var i = 0; i < win.frames.length; i++) {
	                    if (win.frames[i] === frame) {
	                        return true;
	                    }
	                }
	            } catch (err2) {
	                return false;
	            }
	        }

	        return false;
	    },
	    memoize: function memoize(method) {

	        var results = {};

	        return function memoized() {
	            var args = JSON.stringify(Array.prototype.slice.call(arguments));
	            if (!results.hasOwnProperty(args)) {
	                results[args] = method.apply(this, arguments);
	            }
	            return results[args];
	        };
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = undefined;

	var _es6PromiseMin = __webpack_require__(9);

	var promise = exports.promise = {

	    get Promise() {
	        return window.Promise ? window.Promise : _es6PromiseMin.Promise;
	    },

	    asyncPromise: function asyncPromise(method) {
	        return new promise.Promise(function (resolve, reject) {
	            setTimeout(function () {
	                try {
	                    return method(resolve, reject);
	                } catch (err) {
	                    return reject(err);
	                }
	            });
	        });
	    },
	    run: function run(method) {
	        return promise.Promise.resolve().then(method);
	    },
	    method: function method(_method) {
	        return function promiseWrapper() {
	            var _this = this,
	                _arguments = arguments;

	            return promise.Promise.resolve().then(function () {
	                return _method.apply(_this, _arguments);
	            });
	        };
	    },
	    nodeify: function nodeify(prom, callback) {
	        if (!callback) {
	            return prom;
	        }
	        prom.then(function (result) {
	            callback(null, result);
	        }, function (err) {
	            callback(err);
	        });
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */

	(function(){function r(a,b){n[l]=a;n[l+1]=b;l+=2;2===l&&A()}function s(a){return"function"===typeof a}function F(){return function(){process.nextTick(t)}}function G(){var a=0,b=new B(t),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}function H(){var a=new MessageChannel;a.port1.onmessage=t;return function(){a.port2.postMessage(0)}}function I(){return function(){setTimeout(t,1)}}function t(){for(var a=0;a<l;a+=2)(0,n[a])(n[a+1]),n[a]=void 0,n[a+1]=void 0;
	l=0}function p(){}function J(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function K(a,b,c){r(function(a){var e=!1,f=J(c,b,function(c){e||(e=!0,b!==c?q(a,c):m(a,c))},function(b){e||(e=!0,g(a,b))});!e&&f&&(e=!0,g(a,f))},a)}function L(a,b){1===b.a?m(a,b.b):2===a.a?g(a,b.b):u(b,void 0,function(b){q(a,b)},function(b){g(a,b)})}function q(a,b){if(a===b)g(a,new TypeError("You cannot resolve a promise with itself"));else if("function"===typeof b||"object"===typeof b&&null!==b)if(b.constructor===a.constructor)L(a,
	b);else{var c;try{c=b.then}catch(d){v.error=d,c=v}c===v?g(a,v.error):void 0===c?m(a,b):s(c)?K(a,b,c):m(a,b)}else m(a,b)}function M(a){a.f&&a.f(a.b);x(a)}function m(a,b){void 0===a.a&&(a.b=b,a.a=1,0!==a.e.length&&r(x,a))}function g(a,b){void 0===a.a&&(a.a=2,a.b=b,r(M,a))}function u(a,b,c,d){var e=a.e,f=e.length;a.f=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.a&&r(x,a)}function x(a){var b=a.e,c=a.a;if(0!==b.length){for(var d,e,f=a.b,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?C(c,d,e,f):e(f);a.e.length=0}}function D(){this.error=
	null}function C(a,b,c,d){var e=s(c),f,k,h,l;if(e){try{f=c(d)}catch(n){y.error=n,f=y}f===y?(l=!0,k=f.error,f=null):h=!0;if(b===f){g(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=d,h=!0;void 0===b.a&&(e&&h?q(b,f):l?g(b,k):1===a?m(b,f):2===a&&g(b,f))}function N(a,b){try{b(function(b){q(a,b)},function(b){g(a,b)})}catch(c){g(a,c)}}function k(a,b,c,d){this.n=a;this.c=new a(p,d);this.i=c;this.o(b)?(this.m=b,this.d=this.length=b.length,this.l(),0===this.length?m(this.c,
	this.b):(this.length=this.length||0,this.k(),0===this.d&&m(this.c,this.b))):g(this.c,this.p())}function h(a){O++;this.b=this.a=void 0;this.e=[];if(p!==a){if(!s(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof h))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");N(this,a)}}var E=Array.isArray?Array.isArray:function(a){return"[object Array]"===
	Object.prototype.toString.call(a)},l=0,w="undefined"!==typeof window?window:{},B=w.MutationObserver||w.WebKitMutationObserver,w="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,n=Array(1E3),A;A="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)?F():B?G():w?H():I();var v=new D,y=new D;k.prototype.o=function(a){return E(a)};k.prototype.p=function(){return Error("Array Methods must be provided an Array")};k.prototype.l=
	function(){this.b=Array(this.length)};k.prototype.k=function(){for(var a=this.length,b=this.c,c=this.m,d=0;void 0===b.a&&d<a;d++)this.j(c[d],d)};k.prototype.j=function(a,b){var c=this.n;"object"===typeof a&&null!==a?a.constructor===c&&void 0!==a.a?(a.f=null,this.g(a.a,b,a.b)):this.q(c.resolve(a),b):(this.d--,this.b[b]=this.h(a))};k.prototype.g=function(a,b,c){var d=this.c;void 0===d.a&&(this.d--,this.i&&2===a?g(d,c):this.b[b]=this.h(c));0===this.d&&m(d,this.b)};k.prototype.h=function(a){return a};
	k.prototype.q=function(a,b){var c=this;u(a,void 0,function(a){c.g(1,b,a)},function(a){c.g(2,b,a)})};var O=0;h.all=function(a,b){return(new k(this,a,!0,b)).c};h.race=function(a,b){function c(a){q(e,a)}function d(a){g(e,a)}var e=new this(p,b);if(!E(a))return (g(e,new TypeError("You must pass an array to race.")), e);for(var f=a.length,h=0;void 0===e.a&&h<f;h++)u(this.resolve(a[h]),void 0,c,d);return e};h.resolve=function(a,b){if(a&&"object"===typeof a&&a.constructor===this)return a;var c=new this(p,b);
	q(c,a);return c};h.reject=function(a,b){var c=new this(p,b);g(c,a);return c};h.prototype={constructor:h,then:function(a,b){var c=this.a;if(1===c&&!a||2===c&&!b)return this;var d=new this.constructor(p),e=this.b;if(c){var f=arguments[c-1];r(function(){C(c,d,f,e)})}else u(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}};var z={Promise:h,polyfill:function(){var a;a="undefined"!==typeof global?global:"undefined"!==typeof window&&window.document?window:self;"Promise"in a&&"resolve"in
	a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;new a.Promise(function(a){b=a});return s(b)}()||(a.Promise=h)}}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return z}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof module&&module.exports?module.exports=z:"undefined"!==typeof this&&(this.ES6Promise=z)}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(12);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(19);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(21);

	Object.keys(_listeners).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _listeners[key];
	    }
	  });
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.receiveMessage = receiveMessage;
	exports.messageListener = messageListener;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _compat = __webpack_require__(15);

	var _send = __webpack_require__(19);

	var _listeners = __webpack_require__(21);

	var _types = __webpack_require__(22);

	var receivedMessages = [];

	function parseMessage(message) {

	    try {
	        message = JSON.parse(message);
	    } catch (err) {
	        return;
	    }

	    if (!message.type) {
	        return;
	    }

	    if (!_types.RECEIVE_MESSAGE_TYPES[message.type]) {
	        return;
	    }

	    return message;
	}

	function getProxy(source, message) {

	    if (_conf.CONFIG.MOCK_MODE) {
	        return;
	    }

	    if (!message) {
	        return;
	    }

	    if (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && _listeners.listeners.request[message.name] && _listeners.listeners.request[message.name].proxy === false) {
	        return;
	    }

	    var isResponseOrAck = (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK) && _listeners.listeners.response[message.hash];

	    if (!isResponseOrAck) {
	        for (var i = 0; i < _listeners.listeners.proxies.length; i++) {
	            var proxy = _listeners.listeners.proxies[i];

	            if (source === proxy.from) {
	                return proxy.to;
	            }
	        }
	    }

	    if (message.target === 'parent.opener') {

	        var win = void 0;

	        try {
	            win = window.parent.opener;
	        } catch (err) {
	            throw new Error('Can not get window.parent.opener to proxy to');
	        }

	        if (!win) {
	            throw new Error('Can not get window.parent.opener to proxy to');
	        }

	        return win;
	    }

	    if (message.target && message.target !== (0, _conf.getWindowID)()) {

	        var _win = _lib.childWindows.getWindowById(message.target);

	        if (!_win) {
	            throw new Error('Unable to find window to proxy message to: ' + message.target);
	        }

	        return _win;
	    }
	}

	function receiveMessage(source, data) {

	    var message = parseMessage(data);

	    if (!message) {
	        return;
	    }

	    if (receivedMessages.indexOf(message.id) === -1) {
	        receivedMessages.push(message.id);
	    } else {
	        return;
	    }

	    _lib.childWindows.register(message.source, source, message.windowType);

	    var proxyWindow = getProxy(source, message);

	    if (proxyWindow) {
	        delete message.target;
	        return (0, _send.sendMessage)(proxyWindow, message, true);
	    }

	    _lib.util.log('#receive', message.type, message.name, message);

	    if (_conf.CONFIG.MOCK_MODE) {
	        return _types.RECEIVE_MESSAGE_TYPES[message.type](source, message);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, message);
	}

	function messageListener(event) {

	    var source = event.source || event.sourceElement;
	    var data = event.data;

	    (0, _compat.emulateIERestrictions)(source, window);

	    receiveMessage(source, data);
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(8);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(7);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _windows = __webpack_require__(14);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.childWindows = undefined;
	exports.propagate = propagate;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _interface = __webpack_require__(1);

	var windows = [];

	function getMap(key, value) {
	    return _lib.util.find(windows, function (map) {
	        return map[key] === value;
	    }, {});
	};

	var childWindows = exports.childWindows = {
	    getWindowId: function getWindowId(win) {
	        return getMap('win', win).id;
	    },
	    getWindowById: function getWindowById(id) {
	        return getMap('id', id).win;
	    },
	    getWindowType: function getWindowType(win) {
	        var map = getMap('win', win);

	        if (map && map.type) {
	            return map.type;
	        }

	        if (_lib.util.safeHasProp(win, 'parent') && win.parent !== win) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }

	        if (_lib.util.safeHasProp(win, 'opener')) {
	            return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	        }

	        var isFrame = _lib.util.some(windows, function (childWin) {
	            return _lib.util.isFrameOwnedBy(childWin.win, win);
	        });

	        if (isFrame) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }

	        return;
	    },
	    register: function register(id, win, type) {

	        var existing = _lib.util.find(windows, function (map) {
	            return map.id === id && map.win === win;
	        });

	        if (existing) {
	            return;
	        }

	        _lib.util.debug('Registering window:', type, id, win);

	        windows.push({
	            id: id,
	            win: win,
	            type: type
	        });
	    }
	};

	var openWindow = window.open;

	window.open = function (url, name, x, y) {

	    if (!name) {
	        name = _lib.util.uniqueID();
	        arguments[1] = name;
	    }

	    var win = _lib.util.apply(openWindow, this, arguments);

	    childWindows.register(name, win, _conf.CONSTANTS.WINDOW_TYPES.POPUP);
	    return win;
	};

	function propagate(id) {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, function (err, data, callback) {
	        if (!err) {
	            return {
	                id: id
	            };
	        }
	    });

	    var registered = [];

	    function register(win, identifier) {

	        if (!win || win === window || registered.indexOf(win) !== -1) {
	            return;
	        }

	        _lib.util.debug('propagating to', identifier, win);

	        registered.push(win);

	        if (_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	            win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, _lib.util.getType());
	        } else {
	            (0, _interface.send)(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
	                id: id,
	                type: _lib.util.getType()
	            }).then(function (data) {
	                childWindows.register(data.id, win, data.type);
	            }, function (err) {
	                _lib.util.debugError('Error sending identify:', err.stack || err.toString());
	            });
	        }
	    }

	    _lib.util.eachParent(function (parent) {

	        register(parent, 'parent');

	        _lib.util.eachFrame(parent, function (frame) {
	            register(frame, 'frame');
	        });
	    }, true);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bridge = __webpack_require__(16);

	Object.keys(_bridge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bridge[key];
	    }
	  });
	});

	var _global = __webpack_require__(17);

	Object.keys(_global).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _global[key];
	    }
	  });
	});

	var _ie = __webpack_require__(18);

	Object.keys(_ie).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ie[key];
	    }
	  });
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.openBridge = undefined;
	exports.getBridge = getBridge;
	exports.getBridgeFor = getBridgeFor;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var bridge = void 0;

	var openBridge = exports.openBridge = _lib.util.memoize(function (url) {

	    if (bridge) {
	        throw new Error('Only one bridge supported');
	    }

	    bridge = new _lib.promise.Promise(function (resolve, reject) {

	        _lib.util.debug('Opening bridge:', url);

	        var iframe = document.createElement('iframe');

	        iframe.setAttribute('id', 'postRobotBridge');

	        iframe.setAttribute('style', 'margin: 0; padding: 0; border: 0px none; overflow: hidden;');
	        iframe.setAttribute('frameborder', '0');
	        iframe.setAttribute('border', '0');
	        iframe.setAttribute('scrolling', 'no');
	        iframe.setAttribute('allowTransparency', 'true');

	        iframe.setAttribute('tabindex', '-1');
	        iframe.setAttribute('hidden', 'true');
	        iframe.setAttribute('title', '');
	        iframe.setAttribute('role', 'presentation');

	        iframe.onload = function () {
	            return resolve(iframe);
	        };

	        iframe.onerror = reject;

	        iframe.src = url;
	        document.body.appendChild(iframe);
	    });

	    return bridge;
	});

	function getBridge() {
	    return bridge;
	}

	function getBridgeFor(win) {

	    try {
	        if (!win || !win.frames || !win.frames.length) {
	            return;
	        }

	        for (var i = 0; i < win.frames.length; i++) {
	            try {
	                var frame = win.frames[i];

	                if (frame && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	                    return frame;
	                }
	            } catch (err) {
	                continue;
	            }
	        }
	    } catch (err) {
	        return;
	    }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registerGlobals = registerGlobals;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _drivers = __webpack_require__(11);

	function registerGlobals() {

	    // Only allow ourselves to be loaded once
	    if (window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	        throw new Error('Attempting to load postRobot twice on the same window');
	    }

	    window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
	        registerSelf: function registerSelf(id, win, type) {
	            _lib.childWindows.register(id, win, type);
	        },


	        postMessage: _lib.promise.method(function (source, data) {
	            (0, _drivers.receiveMessage)(source, data);
	        }),

	        postMessageParent: _lib.promise.method(function (source, message) {
	            window.parent.postMessage(message, '*');
	        })
	    };
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        var isIframeMessagingParent = _lib.childWindows.getWindowType(sourceWindow) === _conf.CONSTANTS.WINDOW_TYPES.IFRAME && _lib.util.isFrameOwnedBy(targetWindow, sourceWindow);
	        var isParentMessagingIframe = _lib.childWindows.getWindowType(targetWindow) === _conf.CONSTANTS.WINDOW_TYPES.IFRAME && _lib.util.isFrameOwnedBy(sourceWindow, targetWindow);

	        if (!isIframeMessagingParent && !isParentMessagingIframe) {
	            if (sourceWindow === window) {
	                throw new Error('Can not send post messages to another window (disabled by config to emulate IE)');
	            } else {
	                throw new Error('Can not receive post messages sent from another window (disabled by config to emulate IE)');
	            }
	        }
	    }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sendMessage = undefined;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _strategies = __webpack_require__(20);

	var sendMessage = exports.sendMessage = _lib.promise.method(function (win, message, isProxy) {

	    message.id = message.id || _lib.util.uniqueID();
	    message.source = (0, _conf.getWindowID)();
	    message.originalSource = message.originalSource || (0, _conf.getWindowID)();
	    message.windowType = _lib.util.getType();
	    message.originalWindowType = message.originalWindowType || _lib.util.getType();

	    if (!message.target) {
	        message.target = _lib.childWindows.getWindowId(win);
	    }

	    _lib.util.log(isProxy ? '#proxy' : '#send', message.type, message.name, message);

	    if (_conf.CONFIG.MOCK_MODE) {
	        delete message.target;
	        return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage(window, JSON.stringify(message));
	    }

	    if (win === window) {
	        throw new Error('Attemping to send message to self');
	    }

	    _lib.util.debug('Waiting for window to be ready');

	    return _lib.util.windowReady.then(function () {

	        _lib.util.debug('Running send message strategies', message);

	        return _lib.promise.Promise.all(_lib.util.map(_lib.util.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, message).then(function () {
	                _lib.util.debug(strategyName, 'success');
	                return true;
	            }, function (err) {
	                _lib.util.debugError(strategyName, 'error\n\n', err.stack || err.toString());
	                return false;
	            });
	        })).then(function (results) {

	            if (!_lib.util.some(results)) {
	                throw new Error('No post-message strategy succeeded');
	            }
	        });
	    });
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SEND_MESSAGE_STRATEGIES = undefined;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _compat = __webpack_require__(15);

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = {

	    POST_MESSAGE: _lib.promise.method(function (win, message) {

	        (0, _compat.emulateIERestrictions)(window, win);

	        return win.postMessage(JSON.stringify(message, 0, 2), '*');
	    }),

	    POST_MESSAGE_GLOBAL_METHOD: _lib.promise.method(function (win, message) {

	        if (!_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	            throw new Error('postRobot not found on window');
	        }

	        return win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage(window, JSON.stringify(message, 0, 2));
	    }),

	    POST_MESSAGE_UP_THROUGH_BRIDGE: _lib.promise.method(function (win, message) {

	        var frame = (0, _compat.getBridgeFor)(win);

	        if (!frame) {
	            throw new Error('No bridge available in window');
	        }

	        if (!_lib.util.safeHasProp(frame, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	            throw new Error('postRobot not installed in bridge');
	        }

	        return frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2));
	    }),

	    POST_MESSAGE_DOWN_THROUGH_BRIDGE: _lib.promise.method(function (win, message) {

	        var bridge = (0, _compat.getBridge)();

	        if (!bridge) {
	            throw new Error('Bridge not initialized');
	        }

	        if (win === bridge.contentWindow) {
	            throw new Error('Message target is bridge');
	        }

	        if (!message.target) {

	            if (win === window.opener) {
	                message.target = 'parent.opener';
	            } else {
	                throw new Error('Can not post message down through bridge without target');
	            }
	        }

	        return bridge.then(function (iframe) {
	            iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), '*');
	        });
	    })
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.resetListeners = resetListeners;
	var listeners = exports.listeners = void 0;

	function resetListeners() {
	    exports.listeners = listeners = {
	        request: {},
	        response: {},
	        proxies: []
	    };
	}

	resetListeners();

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RECEIVE_MESSAGE_TYPES = undefined;

	var _RECEIVE_MESSAGE_TYPE;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _send = __webpack_require__(19);

	var _listeners = __webpack_require__(21);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function (source, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message ack for message: ' + message.name + ' in ' + window.location.href);
	    }

	    options.ack = true;
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function (source, message) {

	    var options = _listeners.listeners.request[message.name];

	    function respond(data) {
	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource ? message.originalSource : _lib.childWindows.getWindowId(source),
	            hash: message.hash,
	            name: message.name
	        }, data))['catch'](function (error) {
	            if (options) {
	                return options.handleError(error);
	            } else {
	                throw error;
	            }
	        });
	    }

	    var successResponse = _lib.util.once(function (data) {
	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
	            response: data || {}
	        });
	    });

	    var errorResponse = _lib.util.once(function (err) {
	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
	            error: err.stack || err.toString()
	        });
	    });

	    if (!options) {
	        return errorResponse(new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href));
	    }

	    if (options.window && source && options.window !== source) {
	        return;
	    }

	    respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
	    });

	    var result = void 0;

	    try {

	        result = options.handler(null, message.data, function (err, response) {
	            return err ? errorResponse(err) : successResponse(response);
	        });
	    } catch (err) {
	        return errorResponse(err);
	    }

	    if (result && result.then instanceof Function) {
	        return result.then(successResponse, errorResponse);
	    } else if (options.handler.length <= 2) {
	        return successResponse(result);
	    }
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function (source, message) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No response handler found for post message response ' + message.name + ' in ' + window.location.href);
	    }

	    delete _listeners.listeners.response[message.hash];

	    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
	        return options.respond(message.error);
	    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
	        return options.respond(null, message.response);
	    }
	}), _RECEIVE_MESSAGE_TYPE);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listen = listen;
	exports.on = on;
	exports.once = once;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(13);

	var _drivers = __webpack_require__(11);

	function listen(options) {

	    if (!options.name) {
	        throw new Error('Expected options.name');
	    }

	    if (_drivers.listeners.request[options.name] && !options.override && !_conf.CONFIG.MOCK_MODE) {
	        throw new Error('Post message response handler already registered: ' + options.name);
	    }

	    if (!options.handler) {
	        throw new Error('Expected options.handler');
	    }

	    options.errorHandler = options.errorHandler || _lib.util.noop;

	    if (options.once) {
	        options.handler = _lib.util.once(options.handler);
	    }

	    _drivers.listeners.request[options.name] = options;

	    options.handleError = function (err) {
	        delete _drivers.listeners.request[options.name];
	        options.errorHandler(err);
	    };

	    if (options.window && options.errorOnClose) {
	        (function () {
	            var interval = setInterval(function () {
	                if (options.window.closed) {
	                    clearInterval(interval);
	                    options.handleError(new Error('Post message target window is closed'));
	                }
	            }, 50);
	        })();
	    }

	    return {
	        cancel: function cancel() {
	            delete _drivers.listeners.request[options.name];
	        }
	    };
	}

	function on(name, options, handler, errorHandler) {

	    if (options instanceof Function) {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;

	    return listen(options);
	}

	function once(name, options, handler, errorHandler) {

	    if (options instanceof Function) {
	        errorHandler = handler;
	        handler = options;
	        options = {};
	    }

	    options.name = name;
	    options.handler = handler || options.handler;
	    options.errorHandler = errorHandler || options.errorHandler;
	    options.once = true;

	    return listen(options);
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.proxy = proxy;
	exports.unproxy = unproxy;

	var _drivers = __webpack_require__(11);

	function proxy(window1, window2) {

	    _drivers.listeners.proxies.push({
	        from: window1,
	        to: window2
	    });

	    _drivers.listeners.proxies.push({
	        from: window2,
	        to: window1
	    });
	}

	function unproxy(window1, window2) {

	    var toRemove = [];

	    for (var i = 0; i < _drivers.listeners.proxies.length; i++) {
	        var prox = _drivers.listeners.proxies[i];
	        if (prox.to === window1 && prox.from === window2 || prox.to === window2 && prox.from === window1) {
	            toRemove.push(prox);
	        }
	    }

	    for (var _i = 0; _i < toRemove.length; _i++) {
	        _drivers.listeners.proxies.splice(_drivers.listeners.proxies.indexOf(toRemove[_i]), 1);
	    }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.enableMockMode = enableMockMode;
	exports.disableMockMode = disableMockMode;

	var _conf = __webpack_require__(3);

	function enableMockMode() {
	    _conf.CONFIG.MOCK_MODE = true;
	}

	function disableMockMode() {
	    _conf.CONFIG.MOCK_MODE = false;
	}

/***/ }
/******/ ])
});
;