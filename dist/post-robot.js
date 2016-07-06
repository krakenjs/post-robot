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

	var _lib = __webpack_require__(8);

	Object.defineProperty(exports, 'Promise', {
	    enumerable: true,
	    get: function get() {
	        return _lib.Promise;
	    }
	});

	var _drivers = __webpack_require__(6);

	var _compat = __webpack_require__(17);

	function init() {

	    (0, _compat.registerGlobals)();

	    // Listen for all incoming post-messages
	    _lib.util.listen(window, 'message', _drivers.messageListener);

	    (0, _lib.initOnReady)();
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

	var _server = __webpack_require__(25);

	Object.keys(_server).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _server[key];
	    }
	  });
	});

	var _proxy = __webpack_require__(26);

	Object.keys(_proxy).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _proxy[key];
	    }
	  });
	});

	var _config = __webpack_require__(27);

	Object.keys(_config).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _config[key];
	    }
	  });
	});

	var _drivers = __webpack_require__(6);

	Object.defineProperty(exports, 'reset', {
	  enumerable: true,
	  get: function get() {
	    return _drivers.resetListeners;
	  }
	});

	var _bridge = __webpack_require__(18);

	Object.defineProperty(exports, 'openBridge', {
	  enumerable: true,
	  get: function get() {
	    return _bridge.openBridge;
	  }
	});

	var _util = __webpack_require__(12);

	Object.defineProperty(exports, 'util', {
	  enumerable: true,
	  get: function get() {
	    return _util.util;
	  }
	});

	var _windows = __webpack_require__(14);

	var parent = exports.parent = (0, _windows.getParentWindow)();

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

	var _drivers = __webpack_require__(6);

	var _lib = __webpack_require__(8);

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

	        if ((0, _lib.isWindowClosed)(options.window)) {
	            throw new Error('Target window is closed');
	        }

	        var hasResult = false;

	        options.respond = function (err, result) {
	            if (!err) {
	                hasResult = true;
	            }

	            return err ? reject(err) : resolve(result);
	        };

	        return _lib.promise.run(function () {

	            if ((0, _lib.getParentWindow)(options.window) === window) {
	                return (0, _lib.onWindowReady)(options.window);
	            }
	        }).then(function () {

	            if (options.timeout) {
	                (function () {
	                    var timeout = _lib.util.intervalTimeout(options.timeout, 100, function (remaining) {

	                        if (hasResult) {
	                            return timeout.cancel();
	                        }

	                        if (!remaining) {
	                            return reject(new Error('Post message response timed out after ' + options.timeout + ' ms'));
	                        }
	                    }, options.timeout);
	                })();
	            }

	            (0, _drivers.sendMessage)(options.window, {
	                hash: hash,
	                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
	                name: options.name,
	                data: options.data
	            }, options.domain || '*')['catch'](reject);

	            var ackTimeout = _lib.util.intervalTimeout(_conf.CONFIG.ACK_TIMEOUT, 100, function (remaining) {

	                if (options.ack) {
	                    return ackTimeout.cancel();
	                }

	                if (!remaining) {
	                    return reject(new Error('No ack for postMessage ' + options.name + ' in ' + _conf.CONFIG.ACK_TIMEOUT + 'ms'));
	                }
	            });
	        })['catch'](reject);
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

	    var win = (0, _lib.getParentWindow)();

	    if (!window) {
	        throw new Error('Window does not have a parent');
	    }

	    return send(win, name, data, options, callback);
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

	    ALLOW_POSTMESSAGE_POPUP: false,

	    LOG_LEVEL: 'info',

	    ACK_TIMEOUT: 500,

	    LOG_TO_PAGE: false,

	    MOCK_MODE: false,

	    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.FOREIGN_BRIDGE, true), _defineProperty(_ALLOWED_POST_MESSAGE, _constants.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, true), _ALLOWED_POST_MESSAGE)
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
	        METHOD: 'postrobot_method',
	        READY: 'postrobot_ready'
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
	        GLOBAL_METHOD: 'postrobot_global_method',
	        FOREIGN_BRIDGE: 'postrobot_foreign_bridge',
	        LOCAL_BRIDGE: 'postrobot_local_bridge'
	    }
	};

	var POST_MESSAGE_NAMES_LIST = exports.POST_MESSAGE_NAMES_LIST = Object.keys(CONSTANTS.POST_MESSAGE_NAMES).map(function (key) {
	    return CONSTANTS.POST_MESSAGE_NAMES[key];
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _receive = __webpack_require__(7);

	Object.keys(_receive).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _receive[key];
	    }
	  });
	});

	var _send = __webpack_require__(21);

	Object.keys(_send).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _send[key];
	    }
	  });
	});

	var _listeners = __webpack_require__(23);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.receiveMessage = receiveMessage;
	exports.messageListener = messageListener;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _compat = __webpack_require__(17);

	var _send = __webpack_require__(21);

	var _listeners = __webpack_require__(23);

	var _types = __webpack_require__(24);

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

	function getWindow(hint, windowID) {

	    var windowTargets = {
	        'window.parent': function windowParent(id) {
	            return window.parent;
	        },
	        'window.opener': function windowOpener(id) {
	            return (0, _lib.getOpener)(window);
	        },
	        'window.parent.opener': function windowParentOpener(id) {
	            return (0, _lib.getOpener)(window.parent);
	        }
	    };

	    var win = void 0;

	    try {
	        win = windowTargets[hint](windowID);
	    } catch (err) {
	        throw new Error('Can not get ' + hint + ': ' + err.message);
	    }

	    if (!win) {
	        throw new Error('Can not get ' + hint + ': not available');
	    }

	    return win;
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

	    if (message.targetHint) {
	        var win = getWindow(message.targetHint, message.target);
	        delete message.targetHint;
	        return win;
	    }

	    if (message.target && message.target !== (0, _lib.getWindowId)(window)) {

	        var _win = (0, _lib.getWindowById)(message.target);

	        if (!_win) {
	            throw new Error('Unable to find window to proxy message to: ' + message.target);
	        }

	        return _win;
	    }
	}

	function receiveMessage(event) {

	    try {
	        event.source; // eslint-disable-line
	    } catch (err) {
	        return;
	    }

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

	    (0, _lib.registerWindow)(message.source, source);

	    var proxyWindow = void 0;

	    try {
	        proxyWindow = getProxy(source, message);
	    } catch (err) {
	        return _lib.log.debug(err.message);
	    }

	    var level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 ? 'debug' : 'info';
	    _lib.log.logLevel(level, [proxyWindow ? '#receiveproxy' : '#receive', message.type, message.name, message]);

	    if (proxyWindow) {

	        if ((0, _lib.isWindowClosed)(proxyWindow)) {
	            return _lib.log.debug('Target window is closed: ' + message.target + ' - can not proxy ' + message.type + ' ' + message.name);
	        }

	        delete message.target;
	        return (0, _send.sendMessage)(proxyWindow, message, message.domain || '*', true);
	    }

	    if (message.originalSource !== message.source) {

	        if (message.sourceHint) {
	            source = getWindow(message.sourceHint, message.originalSource);
	            delete message.sourceHint;
	        } else {
	            var originalSource = (0, _lib.getWindowById)(message.originalSource);
	            if (originalSource) {
	                source = originalSource;
	            } else {
	                throw new Error('Can not find original message source: ' + message.originalSource);
	            }
	        }

	        (0, _lib.registerWindow)(message.originalSource, source);
	    }

	    if ((0, _lib.isWindowClosed)(source)) {
	        return _lib.log.debug('Source window is closed: ' + message.originalSource + ' - can not send ' + message.type + ' ' + message.name);
	    }

	    if (_conf.CONFIG.MOCK_MODE) {
	        return _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
	    }

	    if (message.data) {
	        message.data = (0, _lib.deserializeMethods)(source, message.data);
	    }

	    _types.RECEIVE_MESSAGE_TYPES[message.type](source, message, origin);
	}

	function messageListener(event) {

	    try {
	        event.source; // eslint-disable-line
	    } catch (err) {
	        return;
	    }

	    event = {
	        source: event.source || event.sourceElement,
	        origin: event.origin || event.originalEvent.origin,
	        data: event.data
	    };

	    try {
	        (0, _compat.emulateIERestrictions)(event.source, window);
	    } catch (err) {
	        return;
	    }

	    receiveMessage(event);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(9);

	Object.keys(_promise).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _promise[key];
	    }
	  });
	});

	var _util = __webpack_require__(12);

	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});

	var _log = __webpack_require__(13);

	Object.keys(_log).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _log[key];
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

	var _methods = __webpack_require__(15);

	Object.keys(_methods).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _methods[key];
	    }
	  });
	});

	var _tick = __webpack_require__(11);

	Object.keys(_tick).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tick[key];
	    }
	  });
	});

	var _ready = __webpack_require__(16);

	Object.keys(_ready).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _ready[key];
	    }
	  });
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.promise = exports.Promise = undefined;

	var _promise = __webpack_require__(10);

	var _tick = __webpack_require__(11);

	var Promise = exports.Promise = _promise.SyncPromise;

	var promise = exports.promise = {

	    Promise: Promise,

	    run: function run(method) {
	        return Promise.resolve().then(method);
	    },
	    nextTick: function nextTick(method) {
	        return new Promise(function (resolve, reject) {
	            (0, _tick.nextTick)(function () {
	                return promise.run(method).then(resolve, reject);
	            });
	        });
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nextTick = nextTick;

	var _util = __webpack_require__(12);

	var tickMessageName = '__nextTick__postRobot__' + _util.util.uniqueID();
	var queue = [];

	window.addEventListener('message', function (event) {
	    if (event.data === tickMessageName) {
	        var method = queue.shift();
	        method.call();
	    }
	});

	function nextTick(method) {

	    if (window.setImmediate) {
	        return window.setImmediate.call(window, method);
	    }

	    if (window.nextTick) {
	        return window.nextTick.call(window, method);
	    }

	    queue.push(method);
	    window.postMessage(tickMessageName, '*');
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.util = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _conf = __webpack_require__(3);

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
	    noop: function noop() {},
	    // eslint-disable-line no-empty-function

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
	    safeGetProp: function safeGetProp(obj, name) {
	        try {
	            return obj[name];
	        } catch (err) {
	            return;
	        }
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
	    },
	    safeInterval: function safeInterval(method, time) {
	        var timeout = void 0;

	        function runInterval() {
	            timeout = setTimeout(runInterval, time);
	            method.call();
	        }

	        timeout = setTimeout(runInterval, time);

	        return {
	            cancel: function cancel() {
	                clearTimeout(timeout);
	            }
	        };
	    },
	    intervalTimeout: function intervalTimeout(time, interval, method) {

	        var safeInterval = util.safeInterval(function () {
	            time -= interval;

	            time = time <= 0 ? 0 : time;

	            if (time === 0) {
	                safeInterval.cancel();
	            }

	            method(time);
	        }, interval);

	        return safeInterval;
	    },
	    getDomain: function getDomain(win) {
	        return win.mockDomain || win.location.protocol + '//' + win.location.host;
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.log = undefined;

	var _util = __webpack_require__(12);

	var _conf = __webpack_require__(3);

	var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

	var log = exports.log = {
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

	            var payload = _util.util.map(args, function (item) {
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

	        if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(_conf.CONFIG.LOG_LEVEL)) {
	            return;
	        }

	        args = Array.prototype.slice.call(args);

	        args.unshift(window.location.host);
	        args.unshift(_util.util.getType().toLowerCase());
	        args.unshift('[post-robot]');

	        if (_conf.CONFIG.LOG_TO_PAGE) {
	            log.writeToPage(level, args);
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
	    debug: function debug() {
	        log.logLevel('debug', arguments);
	    },
	    info: function info() {
	        log.logLevel('info', arguments);
	    },
	    warn: function warn() {
	        log.logLevel('warn', arguments);
	    },
	    error: function error() {
	        log.logLevel('error', arguments);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isSameDomain = isSameDomain;
	exports.getOpener = getOpener;
	exports.getParentWindow = getParentWindow;
	exports.getWindowId = getWindowId;
	exports.getWindowById = getWindowById;
	exports.registerWindow = registerWindow;
	exports.isWindowEqual = isWindowEqual;
	exports.isSameTopWindow = isSameTopWindow;
	exports.isWindowClosed = isWindowClosed;

	var _util = __webpack_require__(12);

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

	            if (!_match.match) {
	                return false;
	            }

	            _match.match = false;

	            try {
	                _match.match = _util.util.getDomain(window) === _util.util.getDomain(win);
	            } catch (err) {
	                return;
	            }

	            return _match.match;
	        }
	    }

	    var match = false;

	    try {
	        if (_util.util.getDomain(window) === _util.util.getDomain(win)) {
	            match = true;
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

	var openers = [];

	function getOpener(win) {

	    if (!win) {
	        return;
	    }

	    for (var _iterator2 = openers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	        var _ref2;

	        if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	        } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	        }

	        var _match2 = _ref2;

	        if (_match2.win === win) {
	            return _match2.match;
	        }
	    }

	    var match = win.opener;

	    openers.push({
	        win: win,
	        match: match
	    });

	    return match;
	}

	getOpener(window);
	getOpener(window.parent);
	getOpener(window.opener);

	function getParentWindow(win) {
	    win = win || window;

	    var opener = getOpener(win);

	    if (opener) {
	        return opener;
	    }

	    if (win.parent !== win) {
	        return win.parent;
	    }
	}

	var windows = [];
	var windowId = window.name || _util.util.getType() + '_' + _util.util.uniqueID();

	function getWindowId(win) {

	    if (win === window) {
	        return windowId;
	    }

	    for (var i = windows.length - 1; i >= 0; i--) {
	        var map = windows[i];

	        try {
	            if (map.win === win) {
	                return map.id;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function getWindowById(id) {

	    if (id === window.name || id === windowId) {
	        return window;
	    }

	    if (window.frames && window.frames[id]) {
	        return window.frames[id];
	    }

	    for (var i = windows.length - 1; i >= 0; i--) {
	        var map = windows[i];

	        try {
	            if (map.id === id) {
	                return map.win;
	            }
	        } catch (err) {
	            continue;
	        }
	    }
	}

	function registerWindow(id, win) {

	    for (var _iterator3 = windows, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	        var _ref3;

	        if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	        } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	        }

	        var map = _ref3;

	        try {
	            if (map.id === id && map.win === win) {
	                return;
	            }
	        } catch (err) {
	            continue;
	        }

	        if (map.id === id && map.win !== win) {
	            throw new Error('Can not register a duplicate window with name ' + id);
	        }
	    }

	    windows.push({
	        id: id,
	        win: win
	    });
	}

	function isWindowEqual(win1, win2) {

	    if (win1 === win2) {
	        return true;
	    }

	    var id1 = getWindowId(win1);
	    var id2 = getWindowId(win2);

	    if (id1 && id2 && id1 === id2) {
	        return true;
	    }

	    return false;
	}

	function isSameTopWindow(win1, win2) {
	    try {
	        return win1.top === win2.top;
	    } catch (err) {
	        return false;
	    }
	}

	var openWindow = window.open;

	window.open = function (url, name, x, y) {

	    if (!name) {
	        name = _util.util.uniqueID();
	        arguments[1] = name;
	    }

	    var win = _util.util.apply(openWindow, this, arguments);

	    registerWindow(name, win);

	    getOpener(win);

	    return win;
	};

	function safeGet(obj, prop) {

	    var result = void 0;

	    try {
	        result = obj[prop];
	    } catch (err) {
	        // pass
	    }

	    return result;
	}

	function isWindowClosed(win) {
	    try {
	        return !win || win.closed || typeof win.closed === 'undefined' || isSameDomain(win) && safeGet(win, 'mockclosed');
	    } catch (err) {
	        return true;
	    }
	}

/***/ },
/* 15 */
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

	var _util = __webpack_require__(12);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initOnReady = initOnReady;
	exports.onWindowReady = onWindowReady;

	var _conf = __webpack_require__(3);

	var _windows = __webpack_require__(14);

	var _interface = __webpack_require__(1);

	var _log = __webpack_require__(13);

	var _promise = __webpack_require__(9);

	var readyWindows = [];
	var readyPromises = [];

	function initOnReady() {

	    (0, _interface.on)(_conf.CONSTANTS.POST_MESSAGE_NAMES.READY, function (source, data) {
	        readyWindows.push(source);

	        for (var _iterator = readyPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var item = _ref;

	            if (item.win === source) {
	                item.resolve(item.win);
	            }
	        }
	    });

	    var parent = (0, _windows.getParentWindow)();

	    if (parent) {
	        (0, _interface.send)(parent, _conf.CONSTANTS.POST_MESSAGE_NAMES.READY, {})['catch'](function (err) {
	            _log.log.debug(err.stack || err.toString());
	        });
	    }
	}

	function onWindowReady(win) {
	    return new _promise.promise.Promise(function (resolve) {
	        if (readyWindows.indexOf(win) !== -1) {
	            return resolve(win);
	        } else {
	            readyPromises.push({
	                win: win,
	                resolve: resolve
	            });
	        }
	    });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bridge = __webpack_require__(18);

	Object.keys(_bridge).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _bridge[key];
	    }
	  });
	});

	var _global = __webpack_require__(19);

	Object.keys(_global).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _global[key];
	    }
	  });
	});

	var _ie = __webpack_require__(20);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.openBridge = undefined;
	exports.getBridge = getBridge;
	exports.getBridgeFor = getBridgeFor;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var BRIDGE_NAME_PREFIX = 'postrobot_bridge';

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

	        _lib.log.debug('Opening bridge:', url);

	        var id = BRIDGE_NAME_PREFIX + '_' + _lib.util.uniqueID();

	        var iframe = document.createElement('iframe');

	        iframe.setAttribute('name', id);
	        iframe.setAttribute('id', id);

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

	            iframe.onload = resolve;
	            iframe.onerror = reject;
	        }).then(function () {

	            return (0, _lib.onWindowReady)(iframe.contentWindow);
	        });
	    });

	    return bridge;
	});

	function getBridge() {
	    return _lib.promise.Promise.resolve().then(function () {
	        return bridge;
	    });
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.registerGlobals = registerGlobals;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _drivers = __webpack_require__(6);

	function registerGlobals() {

	    // Only allow ourselves to be loaded once

	    if (window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) {
	        throw new Error('Attempting to load postRobot twice on the same window');
	    }

	    window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = {
	        postMessage: function postMessage(event) {
	            (0, _lib.nextTick)(function () {
	                return (0, _drivers.receiveMessage)(event);
	            });
	        }
	    };
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emulateIERestrictions = emulateIERestrictions;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	function emulateIERestrictions(sourceWindow, targetWindow) {
	    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP) {

	        if (!(0, _lib.isSameTopWindow)(sourceWindow, targetWindow)) {
	            throw new Error('Can not send and receive post messages between two different windows (disabled to emulate IE)');
	        }
	    }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.buildMessage = buildMessage;
	exports.sendMessage = sendMessage;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _strategies = __webpack_require__(22);

	function buildMessage(win, message) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


	    var id = _lib.util.uniqueID();
	    var source = (0, _lib.getWindowId)(window);
	    var type = _lib.util.getType();
	    var target = (0, _lib.getWindowId)(win);

	    return _extends({}, message, options, {
	        id: message.id || id,
	        source: source,
	        originalSource: message.originalSource || source,
	        windowType: type,
	        originalWindowType: message.originalWindowType || type,
	        target: message.target || target
	    });
	}

	function sendMessage(win, message, domain, isProxy) {
	    return _lib.promise.run(function () {

	        message = buildMessage(win, message, {
	            data: (0, _lib.serializeMethods)(win, message.data),
	            domain: domain
	        });

	        var level = _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) !== -1 ? 'debug' : 'info';
	        _lib.log.logLevel(level, [isProxy ? '#sendproxy' : '#send', message.type, message.name, message]);

	        if (_conf.CONFIG.MOCK_MODE) {
	            delete message.target;
	            return window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	                origin: _lib.util.getDomain(window),
	                source: window,
	                data: JSON.stringify(message)
	            });
	        }

	        if (win === window) {
	            throw new Error('Attemping to send message to self');
	        }

	        if ((0, _lib.isWindowClosed)(win)) {
	            throw new Error('Window is closed');
	        }

	        _lib.log.debug('Running send message strategies', message);

	        var messages = [];

	        return _lib.promise.map(_lib.util.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {

	            return _lib.promise.run(function () {

	                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) {
	                    throw new Error('Strategy disallowed: ' + strategyName);
	                }

	                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, message, domain);
	            }).then(function () {
	                messages.push(strategyName + ': success');
	                return true;
	            }, function (err) {
	                messages.push(strategyName + ': ' + err.message);
	                return false;
	            });
	        }).then(function (results) {

	            var success = _lib.util.some(results);
	            var status = message.type + ' ' + message.name + ' ' + (success ? 'success' : 'error') + ':\n  - ' + messages.join('\n  - ') + '\n';

	            _lib.log.debug(status);

	            if (!success) {
	                throw new Error(status);
	            }
	        });
	    });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SEND_MESSAGE_STRATEGIES = undefined;

	var _SEND_MESSAGE_STRATEG;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _compat = __webpack_require__(17);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SEND_MESSAGE_STRATEGIES = exports.SEND_MESSAGE_STRATEGIES = (_SEND_MESSAGE_STRATEG = {}, _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE, function (win, message, domain) {

	    (0, _compat.emulateIERestrictions)(window, win);

	    return win.postMessage(JSON.stringify(message, 0, 2), domain);
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.GLOBAL_METHOD, function (win, message, domain) {

	    if (!(0, _lib.isSameDomain)(win)) {
	        throw new Error('Window is not on the same domain');
	    }

	    var sourceDomain = _lib.util.getDomain(window);
	    var targetDomain = void 0;

	    try {
	        targetDomain = _lib.util.getDomain(win);
	    } catch (err) {
	        throw new Error('Can not read target window domain: ' + err.message);
	    }

	    if (sourceDomain !== targetDomain) {
	        throw new Error('Can not send global message - source ' + sourceDomain + ' does not match target ' + targetDomain);
	    }

	    if (domain !== '*' && targetDomain !== domain) {
	        throw new Error('Can post post through global method - specified domain ' + domain + ' does not match target domain ' + targetDomain);
	    }

	    if (!_lib.util.safeHasProp(win, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('post-robot not available on target window at ' + targetDomain);
	    }

	    win[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	        origin: _lib.util.getDomain(window),
	        source: window,
	        data: JSON.stringify(message, 0, 2)
	    });
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.FOREIGN_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    var frame = (0, _compat.getBridgeFor)(win);

	    if (!frame) {
	        throw new Error('No bridge available in window');
	    }

	    if (!(0, _lib.isSameDomain)(frame)) {
	        throw new Error('Bridge is not on the same domain');
	    }

	    var sourceDomain = _lib.util.getDomain(window);
	    var targetDomain = void 0;

	    try {
	        targetDomain = _lib.util.getDomain(frame);
	    } catch (err) {
	        throw new Error('Can not read bridge window domain: ' + err.message);
	    }

	    if (sourceDomain !== targetDomain) {
	        throw new Error('Can not accept global message through bridge - source ' + sourceDomain + ' does not match bridge ' + targetDomain);
	    }

	    if (!_lib.util.safeHasProp(frame, _conf.CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
	        throw new Error('post-robot not available on bridge at ' + targetDomain);
	    }

	    message.targetHint = 'window.parent';

	    // If we're messaging our child

	    if (window === (0, _lib.getOpener)(win)) {
	        message.sourceHint = 'window.opener';
	    }

	    frame[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT].postMessage({
	        origin: _lib.util.getDomain(window),
	        source: window,
	        data: JSON.stringify(message, 0, 2)
	    });
	}), _defineProperty(_SEND_MESSAGE_STRATEG, _conf.CONSTANTS.SEND_STRATEGIES.LOCAL_BRIDGE, function (win, message, domain) {

	    if ((0, _lib.isSameTopWindow)(window, win)) {
	        throw new Error('Can only use bridge to communicate between two different windows, not between frames');
	    }

	    if (!message.target) {
	        throw new Error('Can not post message down through bridge without target');
	    }

	    // If we're messaging our parent

	    if (win === (0, _lib.getOpener)(window)) {
	        message.targetHint = 'window.parent.opener';
	    }

	    // If we're messaging our child

	    if (window === (0, _lib.getOpener)(win)) {
	        message.sourceHint = 'window.opener';
	    }

	    return (0, _compat.getBridge)().then(function (bridge) {

	        if (!bridge) {
	            throw new Error('Bridge not initialized');
	        }

	        if (win === bridge) {
	            throw new Error('Message target is bridge');
	        }

	        bridge.postMessage(JSON.stringify(message, 0, 2), domain);
	    });
	}), _SEND_MESSAGE_STRATEG);

/***/ },
/* 23 */
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

	var _lib = __webpack_require__(8);

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

	        if (win && (0, _lib.isWindowEqual)(win, requestListener.win)) {
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RECEIVE_MESSAGE_TYPES = undefined;

	var _RECEIVE_MESSAGE_TYPE;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _send = __webpack_require__(21);

	var _listeners = __webpack_require__(23);

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

	        if ((0, _lib.isWindowClosed)(source)) {
	            return;
	        }

	        return (0, _send.sendMessage)(source, _extends({
	            target: message.originalSource,
	            hash: message.hash,
	            name: message.name
	        }, data), '*');
	    }

	    return respond({
	        type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK

	    }).then(function () {

	        return _lib.promise.run(function () {

	            if (!options) {
	                throw new Error('No postmessage request handler for ' + message.name + ' in ' + window.location.href);
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
	    })['catch'](function (err) {

	        if (options && options.handleError) {
	            return options.handleError(err);
	        } else {
	            _lib.log.error(err.stack || err.toString());
	        }
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.listen = listen;
	exports.on = on;
	exports.once = once;

	var _conf = __webpack_require__(3);

	var _lib = __webpack_require__(8);

	var _drivers = __webpack_require__(6);

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
	            var interval = _lib.util.safeInterval(function () {
	                if ((0, _lib.isWindowClosed)(options.window)) {
	                    interval.cancel();
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.proxy = proxy;
	exports.unproxy = unproxy;

	var _drivers = __webpack_require__(6);

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
/* 27 */
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