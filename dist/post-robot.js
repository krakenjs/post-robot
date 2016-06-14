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
	exports.Promise = undefined;

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

	var _lib = __webpack_require__(12);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _conf = __webpack_require__(3);

	var _drivers = __webpack_require__(10);

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

	var _drivers = __webpack_require__(10);

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

	var _drivers = __webpack_require__(10);

	var _lib = __webpack_require__(12);

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
	            data: options.data
	        }, options.domain || '*')['catch'](reject);

	        setTimeout(function () {
	            if (!options.ack) {
	                return reject(new Error('No ack for postMessage ' + options.name + ' in ' + _conf.CONFIG.ACK_TIMEOUT + 'ms'));
	            }
	        }, _conf.CONFIG.ACK_TIMEOUT);
	    }), options.callback);
	}

	function send(window, name, data, options, callback) {

	    if (!callback) {
	        if (!options && data instanceof Function) {
	            callback = data;
	            options = {};
	            data = {};
	        } else if (options instanceof Function) {
	            callback = options;
	            options = {};
	        }
	    }

	    options = options || {};
	    options.window = window;
	    options.name = name;
	    options.data = data;
	    options.callback = callback;

	    return request(options);
	}

	function sendToParent(name, data, options, callback) {

	    var window = _lib.util.getParent();

	    if (!window) {
	        throw new Error('Window does not have a parent');
	    }

	    return send(_lib.util.getParent(), name, data, options, callback);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CONFIG = undefined;

	var _ALLOWED_POST_MESSAGE;

	var _constants = __webpack_require__(5);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CONFIG = exports.CONFIG = {

	    ALLOW_POSTMESSAGE_POPUP: true,

	    DEBUG: false,

	    ACK_TIMEOUT: 1000,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_UP_THROUGH_BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_DOWN_THROUGH_BRIDGE, true), _ALLOWED_POST_MESSAGE)
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
	        IDENTIFY: 'postrobot_identify',
	        METHOD: 'postrobot_method'
	    },

	    WINDOW_TYPES: {
	        FULLPAGE: 'fullpage',
	        POPUP: 'popup',
	        IFRAME: 'iframe'
	    },

	    WINDOW_PROPS: {
	        POSTROBOT: '__postRobot__'
	    },

	    SERIALIZATION_TYPES: {
	        METHOD: 'postrobot_method'
	    },

	    SEND_STRATEGIES: {
	        POST_MESSAGE: 'postrobot_post_message',
	        POST_MESSAGE_GLOBAL_METHOD: 'postrobot_post_message_global_method',
	        POST_MESSAGE_UP_THROUGH_BRIDGE: 'postrobot_post_message_up_through_bridge',
	        POST_MESSAGE_DOWN_THROUGH_BRIDGE: 'postrobot_post_message_down_through_bridge'
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

	            if (frame !== window) {
	                method(frame);
	            }
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
	            }
	        }
	        return result;
	    },
	    values: function values(mapping) {
	        var result = [];
	        for (var key in mapping) {
	            if (mapping.hasOwnProperty(key)) {
	                result.push(mapping[key]);
	            }
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
	    },
	    extend: function extend(obj, source) {
	        if (!source) {
	            return obj;
	        }

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                obj[key] = source[key];
	            }
	        }

	        return obj;
	    },
	    each: function each(obj, callback) {
	        if (obj instanceof Array) {
	            for (var i = 0; i < obj.length; i++) {
	                callback(obj[i], i);
	            }
	        } else if (obj instanceof Object && !(obj instanceof Function)) {
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    callback(obj[key], key);
	                }
	            }
	        }
	    },
	    replaceObject: function replaceObject(obj, callback) {

	        var newobj = obj instanceof Array ? [] : {};

	        util.each(obj, function (item, key) {

	            var result = callback(item);

	            if (result !== undefined) {
	                newobj[key] = result;
	            } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item !== null) {
	                newobj[key] = util.replaceObject(item, callback);
	            } else {
	                newobj[key] = item;
	            }
	        });

	        return newobj;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(9);

	var Promise = exports.Promise = _promise.SyncPromise;

	var promise = exports.promise = {

	    Promise: Promise,

	    run: function run(method) {
	        return Promise.resolve().then(method);
	    },
	    method: function method(_method) {
	        return function promiseWrapper() {
	            var _this = this,
	                _arguments = arguments;

	            return Promise.resolve().then(function () {
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
	    },
	    deNodeify: function deNodeify(method) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        return new Promise(function (resolve, reject) {
	            try {
	                if (args.length < method.length) {
	                    return method.apply(undefined, args.concat([function (err, result) {
	                        return err ? reject(err) : resolve(result);
	                    }]));
	                }

	                return promise.run(function () {
	                    return method.apply(undefined, args);
	                }).then(resolve, reject);
	            } catch (err) {
	                return reject(err);
	            }
	        });
	    },
	    map: function map(items, method) {

	        var results = [];

	        var _loop = function _loop(i) {
	            results.push(promise.run(function () {
	                return method(items[i]);
	            }));
	        };

	        for (var i = 0; i < items.length; i++) {
	            _loop(i);
	        }
	        return Promise.all(results);
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.patchPromise = patchPromise;

	function trycatch(method, successHandler, errorHandler) {

	    var isCalled = false;
	    var isSuccess = false;
	    var isError = false;
	    var err, res;

	    function flush() {
	        if (isCalled) {
	            if (isError) {
	                return errorHandler(err);
	            } else if (isSuccess) {
	                return successHandler(res);
	            }
	        }
	    }

	    try {
	        method(function (result) {
	            res = result;
	            isSuccess = true;
	            flush();
	        }, function (error) {
	            err = error;
	            isError = true;
	            flush();
	        });
	    } catch (error) {
	        return errorHandler(error);
	    }

	    isCalled = true;
	    flush();
	}

	var SyncPromise = exports.SyncPromise = function SyncPromise(handler) {

	    this.resolved = false;
	    this.rejected = false;

	    this.handlers = [];

	    if (!handler) {
	        return;
	    }

	    var self = this;

	    trycatch(handler, function (res) {
	        return self.resolve(res);
	    }, function (err) {
	        return self.reject(err);
	    });
	};

	SyncPromise.resolve = function SyncPromiseResolve(value) {

	    if (value && value.then) {
	        return value;
	    }

	    return new SyncPromise().resolve(value);
	};

	SyncPromise.reject = function SyncPromiseResolve(error) {
	    return new SyncPromise().reject(error);
	};

	SyncPromise.prototype.resolve = function (result) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (result && result.then) {
	        throw new Error('Can not resolve promise with another promise');
	    }

	    this.resolved = true;
	    this.value = result;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.reject = function (error) {
	    if (this.resolved || this.rejected) {
	        return this;
	    }

	    if (error && error.then) {
	        throw new Error('Can not reject promise with another promise');
	    }

	    this.rejected = true;
	    this.value = error;
	    this.dispatch();

	    return this;
	};

	SyncPromise.prototype.dispatch = function () {

	    if (!this.resolved && !this.rejected) {
	        return;
	    }

	    while (this.handlers.length) {

	        var handler = this.handlers.shift();

	        var result, error;

	        try {
	            if (this.resolved) {
	                result = handler.onSuccess ? handler.onSuccess(this.value) : this.value;
	            } else {
	                if (handler.onError) {
	                    result = handler.onError(this.value);
	                } else {
	                    error = this.value;
	                }
	            }
	        } catch (err) {
	            error = err;
	        }

	        if (result === this) {
	            throw new Error('Can not return a promise from the the same promise');
	        }

	        if (error) {
	            handler.promise.reject(error);
	        } else if (result && result.then) {
	            result.then(function (res) {
	                handler.promise.resolve(res);
	            }, function (err) {
	                handler.promise.reject(err);
	            });
	        } else {
	            handler.promise.resolve(result);
	        }
	    }
	};

	SyncPromise.prototype.then = function (onSuccess, onError) {

	    var promise = new SyncPromise();

	    this.handlers.push({
	        promise: promise,
	        onSuccess: onSuccess,
	        onError: onError
	    });

	    this.dispatch();

	    return promise;
	};

	SyncPromise.prototype['catch'] = function (onError) {
	    return this.then(null, onError);
	};

	SyncPromise.prototype.done = function (successHandler, errorHandler) {
	    this.then(successHandler, errorHandler || function (err) {
	        console.error(err.stack || err.toString());
	    });
	};

	SyncPromise.all = function (promises) {

	    var promise = new SyncPromise();
	    var count = promises.length;
	    var results = [];

	    for (var i = 0; i < promises.length; i++) {
	        promises[i].then(function (result) {
	            results[i] = result;
	            count -= 1;
	            if (count === 0) {
	                promise.resolve(results);
	            }
	        }, function (err) {
	            promise.reject(err);
	        });
	    }

	    return promise;
	};

	function patchPromise() {
	    window.Promise = SyncPromise;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(11);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.receiveMessage = receiveMessage;
	exports.messageListener = messageListener;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(12);

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

	    var listener = (0, _listeners.getRequestListener)(message.name, source);

	    if (message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST && message.name && listener && listener.proxy === false) {
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

	function receiveMessage(event) {
	    var source = event.source;
	    var origin = event.origin;
	    var data = event.data;


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
	        return (0, _send.sendMessage)(proxyWindow, message, '*', true);
	    }

	    _lib.util.debug('#receive', message.type, message.name, message);

	    if (_conf.CONFIG.MOCK_MODE) {
	        return _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(source, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
	}

	function messageListener(event) {

	    event = {
	        source: event.source || event.sourceElement,
	        origin: event.origin || event.originalEvent.origin,
	        data: event.data
	    };

	    try {
	        (0, _compat.emulateIERestrictions)(event.source, window);
	    } catch (err) {
	        console.error(err.stack || err.toString());
	        return;
	    }

	    receiveMessage(event);
	}

/***/ },
/* 12 */
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

	var _windows = __webpack_require__(13);

	Object.keys(_windows).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _windows[key];
	    }
	  });
	});

	var _methods = __webpack_require__(14);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.childWindows = undefined;
	exports.isSameDomain = isSameDomain;
	exports.propagate = propagate;

	var _conf = __webpack_require__(3);

	var _util = __webpack_require__(7);

	var _interface = __webpack_require__(1);

	var domainMatches = [];

	function isSameDomain(win) {

	    for (var _iterator = domainMatches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var _match = _ref;

	        if (_match.win === win) {
	            return _match.match;
	        }
	    }

	    var windowDomain = window.location.protocol + '//' + window.location.host;
	    var match = false;

	    try {
	        if (win.location.protocol && win.location.host) {
	            var otherDomain = win.location.protocol + '//' + win.location.host;
	            if (otherDomain === windowDomain) {
	                match = true;
	            }
	        }
	    } catch (err) {
	        // pass
	    }

	    domainMatches.push({
	        win: win,
	        match: match
	    });

	    return match;
	}

	var windows = [];

	function getMap(key, value) {
	    return _util.util.find(windows, function (map) {
	        return map[key] === value;
	    }, {});
	}

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

	        if (_util.util.safeHasProp(win, 'parent') && win.parent !== win) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }

	        if (_util.util.safeHasProp(win, 'opener')) {
	            return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
	        }

	        var isFrame = _util.util.some(windows, function (childWin) {
	            return _util.util.isFrameOwnedBy(childWin.win, win);
	        });

	        if (isFrame) {
	            return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
	        }

	        return;
	    },
	    register: function register(id, win, type) {

	        var existing = _util.util.find(windows, function (map) {
	            return map.id === id && map.win === win;
	        });

	        if (existing) {
	            return;
	        }

	        _util.util.debug('Registering window:', type, id, win);

	        windows.push({
	            id: id,
	            win: win,
	            type: type
	        });
	    },
	    isEqual: function isEqual(win1, win2) {

	        if (win1 === win2) {
	            return true;
	        }

	        var id1 = this.getWindowId(win1);
	        var id2 = this.getWindowId(win2);

	        if (id1 && id2 && id1 === id2) {
	            return true;
	        }

	        return false;
	    }
	};

	var openWindow = window.open;

	window.open = function (url, name, x, y) {

	    if (!name) {
	        name = _util.util.uniqueID();
	        arguments[1] = name;
	    }

	    var win = _util.util.apply(openWindow, this, arguments);

	    childWindows.register(name, win, _conf.CONSTANTS.WINDOW_TYPES.POPUP);
	    return win;
	};

	function propagate(id) {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, function (source, data, callback) {
	        return {
	            id: id
	        };
	    });

	    var registered = [];

	    function register(win, identifier) {

	        if (!win || win === window || registered.indexOf(win) !== -1) {
	            return;
	        }

	        _util.util.debug('propagating to', identifier, win);

	        registered.push(win);

	        if (isSameDomain(win) && _util.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	            win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, _util.util.getType());
	        } else {

	            _util.util.windowReady.then(function () {
	                (0, _interface.send)(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
	                    id: id,
	                    type: _util.util.getType()
	                }).then(function (data) {
	                    childWindows.register(data.id, win, data.type);
	                }, function (err) {
	                    _util.util.debugError('Error sending identify:', err.stack || err.toString());
	                });
	            });
	        }
	    }

	    _util.util.eachParent(function (parent) {

	        register(parent, 'parent');

	        _util.util.eachFrame(parent, function (frame) {
	            register(frame, 'frame');
	        });
	    }, true);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listenForMethods = undefined;
	exports.serializeMethod = serializeMethod;
	exports.serializeMethods = serializeMethods;
	exports.deserializeMethod = deserializeMethod;
	exports.deserializeMethods = deserializeMethods;

	var _conf = __webpack_require__(3);

	var _util = __webpack_require__(7);

	var _interface = __webpack_require__(1);

	var methods = {};

	var listenForMethods = exports.listenForMethods = _util.util.once(function () {
	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, function (source, data) {

	        if (!methods[data.id]) {
	            throw new Error('Could not find method with id: ' + data.id);
	        }

	        if (methods[data.id].win !== source) {
	            throw new Error('Method window does not match');
	        }

	        return methods[data.id].method.apply(null, data.args);
	    });
	});

	function isSerializedMethod(item) {
	    return item instanceof Object && item.__type__ === _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD && item.__id__;
	}

	function serializeMethod(destination, method) {

	    var id = _util.util.uniqueID();

	    methods[id] = {
	        win: destination,
	        method: method
	    };

	    return {
	        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
	        __id__: id
	    };
	}

	function serializeMethods(destination, obj) {

	    listenForMethods();

	    return _util.util.replaceObject({ obj: obj }, function (item) {
	        if (item instanceof Function) {
	            return serializeMethod(destination, item);
	        } else if (isSerializedMethod(item)) {
	            throw new Error('Attempting to serialize already serialized method');
	        }
	    }).obj;
	}

	function deserializeMethod(source, obj) {

	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        return (0, _interface.send)(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
	            id: obj.__id__,
	            args: args
	        });
	    };
	}

	function deserializeMethods(source, obj) {

	    return _util.util.replaceObject({ obj: obj }, function (item) {
	        if (isSerializedMethod(item)) {
	            return deserializeMethod(source, item);
	        }
	    }).obj;
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

	var _lib = __webpack_require__(12);

	var bridge = void 0;

	var openBridge = exports.openBridge = _lib.util.memoize(function (url) {

	    if (bridge) {
	        throw new Error('Only one bridge supported');
	    }

	    var documentReady = new _lib.promise.Promise(function (resolve) {
	        if (window.document.body) {
	            return resolve(window.document);
	        }

	        window.document.addEventListener('DOMContentLoaded', function (event) {
	            return resolve(window.document);
	        });
	    });

	    bridge = documentReady.then(function (document) {

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

	        iframe.src = url;
	        document.body.appendChild(iframe);

	        return new _lib.promise.Promise(function (resolve, reject) {
	            iframe.onload = function () {
	                return resolve(iframe);
	            };
	            iframe.onerror = reject;
	        });
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

	                if (frame && frame !== window && (0, _lib.isSameDomain)(frame) && frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
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

	var _lib = __webpack_require__(12);

	var _drivers = __webpack_require__(10);

	function registerGlobals() {

	    // Only allow ourselves to be loaded once
	    if (window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	        throw new Error('Attempting to load postRobot twice on the same window');
	    }

	    window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
	        registerSelf: function registerSelf(id, win, type) {
	            _lib.childWindows.register(id, win, type);
	        },


	        postMessage: _lib.promise.method(function (event) {
	            (0, _drivers.receiveMessage)(event);
	        }),

	        postMessageParent: _lib.promise.method(function (source, message, domain) {
	            if (window.parent && window.parent !== window) {
	                window.parent.postMessage(message, domain);
	            } else {
	                throw new Error('Can not find parent to post message to');
	            }
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

	var _lib = __webpack_require__(12);

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

	var _lib = __webpack_require__(12);

	var _strategies = __webpack_require__(20);

	var sendMessage = exports.sendMessage = _lib.promise.method(function (win, message, domain, isProxy) {

	    message.id = message.id || _lib.util.uniqueID();
	    message.source = (0, _conf.getWindowID)();
	    message.originalSource = message.originalSource || (0, _conf.getWindowID)();
	    message.windowType = _lib.util.getType();
	    message.originalWindowType = message.originalWindowType || _lib.util.getType();

	    message.data = (0, _lib.serializeMethods)(win, message.data);

	    if (!message.target) {
	        message.target = _lib.childWindows.getWindowId(win);
	    }

	    _lib.util.debug(isProxy ? '#proxy' : '#send', message.type, message.name, message);

	    if (_conf.CONFIG.MOCK_MODE) {
	        delete message.target;
	        return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	            origin: window.location.protocol + '//' + window.location.host,
	            source: window,
	            data: JSON.stringify(message)
	        });
	    }

	    if (win === window) {
	        throw new Error('Attemping to send message to self');
	    }

	    _lib.util.debug('Running send message strategies', message);

	    return _lib.util.windowReady.then(function () {

	        return _lib.promise.map(_lib.util.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _lib.promise.run(function () {

	                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
	                    throw new Error('Strategy disallowed: ' + strategyName);
	                }

	                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);
	            }).then(function () {
	                _lib.util.debug(strategyName, 'success');
	                return true;
	            }, function (err) {
	                _lib.util.debugError(strategyName, 'error\n\n', err.stack || err.toString());
	                return false;
	            });
	        }).then(function (results) {

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

	var _SEND_MESSAGE_STRATEG;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(12);

	var _compat = __webpack_require__(15);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, _lib.promise.method(function (win, message, domain) {

	    (0, _compat.emulateIERestrictions)(window, win);

	    return win.postMessage(JSON.stringify(message, 0, 2), domain);
	})), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_GLOBAL_METHOD, _lib.promise.method(function (win, message, domain) {

	    if (domain !== '*') {

	        var winDomain = void 0;

	        try {
	            winDomain = win.location.protocol + '//' + win.location.host;
	        } catch (err) {
	            // pass
	        }

	        if (!winDomain) {
	            throw new Error('Can post post through global method - domain set to ' + domain + ', but we can not verify the domain of the target window');
	        }

	        if (winDomain !== domain) {
	            throw new Error('Can post post through global method - domain ' + domain + ' does not match target window domain ' + winDomain);
	        }
	    }

	    if (!(0, _lib.isSameDomain)(win)) {
	        throw new Error('window is a different domain');
	    }

	    if (!_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('postRobot not found on window');
	    }

	    return win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	        origin: window.location.protocol + '//' + window.location.host,
	        source: window,
	        data: JSON.stringify(message)
	    });
	})), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_UP_THROUGH_BRIDGE, _lib.promise.method(function (win, message, domain) {

	    var frame = (0, _compat.getBridgeFor)(win);

	    if (!frame) {
	        throw new Error('No bridge available in window');
	    }

	    if (!(0, _lib.isSameDomain)(frame)) {
	        throw new Error('Bridge is different domain');
	    }

	    if (!_lib.util.safeHasProp(frame, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('postRobot not installed in bridge');
	    }

	    return frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessageParent(window, JSON.stringify(message, 0, 2), domain);
	})), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE_DOWN_THROUGH_BRIDGE, _lib.promise.method(function (win, message, domain) {

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
	        iframe.contentWindow.postMessage(JSON.stringify(message, 0, 2), domain);
	    });
	})), _SEND_MESSAGE_STRATEG);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listeners = undefined;
	exports.resetListeners = resetListeners;
	exports.getRequestListener = getRequestListener;
	exports.removeRequestListener = removeRequestListener;
	exports.addRequestListener = addRequestListener;

	var _lib = __webpack_require__(12);

	var listeners = exports.listeners = void 0;

	function resetListeners() {
	    exports.listeners = listeners = {
	        request: [],
	        response: {},
	        proxies: []
	    };
	}

	function getRequestListener(name, win) {
	    for (var _iterator = listeners.request, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        var _ref;

	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	        }

	        var requestListener = _ref;


	        if (requestListener.name !== name) {
	            continue;
	        }

	        if (!requestListener.win) {
	            return requestListener.options;
	        }

	        if (win && _lib.childWindows.isEqual(win, requestListener.win)) {
	            return requestListener.options;
	        }
	    }
	}

	function removeRequestListener(options) {

	    var listener = void 0;

	    for (var _iterator2 = listeners.request, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var requestListener = _ref2;

	        if (requestListener.options === options) {
	            listener = requestListener;
	            break;
	        }
	    }

	    if (listener) {
	        listeners.request.splice(listeners.request.indexOf(listener), 1);
	    }
	}

	function addRequestListener(name, win, options, override) {

	    var listener = getRequestListener(name, win);

	    if (listener) {
	        if (override) {
	            removeRequestListener(listener);
	        } else {
	            throw new Error('Request listener already exists for ' + name);
	        }
	    }

	    listeners.request.push({ name: name, win: win, options: options });
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

	var _lib = __webpack_require__(12);

	var _send = __webpack_require__(19);

	var _listeners = __webpack_require__(21);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var RECEIVE_MESSAGE_TYPES = exports.RECEIVE_MESSAGE_TYPES = (_RECEIVE_MESSAGE_TYPE = {}, _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK, function (source, message, origin) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No handler found for post message ack for message: ' + message.name + ' in ' + window.location.href);
	    }

	    options.ack = true;
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST, function (source, message, origin) {

	    var options = (0, _listeners.getRequestListener)(message.name, source);

	    function respond(data) {

	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource ? message.originalSource : _lib.childWindows.getWindowId(source),
	            hash: message.hash,
	            name: message.name
	        }, data), '*')['catch'](function (err) {

	            if (options && options.handleError) {
	                return options.handleError(err);
	            }
	            throw err;
	        });
	    }

	    return _lib.promise.run(function () {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
	        });
	    }).then(function () {

	        if (!options) {
	            throw new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href);
	        }

	        if (options.window && source && options.window !== source) {
	            return;
	        }

	        if (options.domain) {
	            var match = typeof options.domain === 'string' && origin === options.domain || options.domain instanceof RegExp && origin.match(options.domain);

	            if (!match) {
	                throw new Error('Message origin ' + origin + ' does not match domain ' + options.domain);
	            }
	        }

	        return _lib.promise.deNodeify(options.handler, source, message.data);
	    }).then(function (data) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
	            data: data
	        });
	    }, function (err) {

	        return respond({
	            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
	            ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
	            error: err.stack ? err.message + '\n' + err.stack : err.toString()
	        });
	    });
	}), _defineProperty(_RECEIVE_MESSAGE_TYPE, _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE, function (source, message, origin) {

	    var options = _listeners.listeners.response[message.hash];

	    if (!options) {
	        throw new Error('No response handler found for post message response ' + message.name + ' in ' + window.location.href);
	    }

	    delete _listeners.listeners.response[message.hash];

	    if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
	        return options.respond(new Error(message.error));
	    } else if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
	        return options.respond(null, message.data || message.response);
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

	var _lib = __webpack_require__(12);

	var _drivers = __webpack_require__(10);

	function listen(options) {

	    if (!options.name) {
	        throw new Error('Expected options.name');
	    }

	    options.handler = options.handler || _lib.util.noop;

	    options.errorHandler = options.errorHandler || function (err) {
	        throw err;
	    };

	    if (options.once) {
	        (function () {
	            var handler = options.handler;
	            options.handler = _lib.util.once(function () {
	                (0, _drivers.removeRequestListener)(options);
	                return handler.apply(this, arguments);
	            });
	        })();
	    }

	    var override = options.override || _conf.CONFIG.MOCK_MODE;

	    (0, _drivers.addRequestListener)(options.name, options.window, options, override);

	    options.handleError = function (err) {
	        // removeRequestListener(options);
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
	            (0, _drivers.removeRequestListener)(options);
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

	    var prom = new _lib.promise.Promise(function (resolve, reject) {
	        options.handler = options.handler || resolve;
	        options.errorHandler = options.errorHandler || reject;
	    });

	    var listener = listen(options);

	    _lib.util.extend(prom, listener);

	    return prom;
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

	var _drivers = __webpack_require__(10);

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
	exports.CONSTANTS = exports.CONFIG = undefined;
	exports.enableMockMode = enableMockMode;
	exports.disableMockMode = disableMockMode;

	var _conf = __webpack_require__(3);

	Object.defineProperty(exports, 'CONFIG', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONFIG;
	    }
	});
	Object.defineProperty(exports, 'CONSTANTS', {
	    enumerable: true,
	    get: function get() {
	        return _conf.CONSTANTS;
	    }
	});
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