
import { CONSTANTS, CONFIG } from '../conf';
import { promise } from './promise';

export let util = {

    isPopup() {
        return Boolean(window.opener);
    },

    isIframe() {
        return Boolean(window.parent && window !== window.parent);
    },

    isFullpage() {
        return Boolean(!util.isIframe() && !util.isPopup());
    },


    windowReady: new promise.Promise((resolve, reject) => {
        if (document.readyState === 'complete') {
            return resolve();
        }

        window.addEventListener('load', resolve);
    }),

    getType() {
        if (util.isPopup()) {
            return CONSTANTS.WINDOW_TYPES.POPUP;
        }
        if (util.isIframe()) {
            return CONSTANTS.WINDOW_TYPES.IFRAME;
        }
        return CONSTANTS.WINDOW_TYPES.FULLPAGE;
    },

    once(method) {
        if (!method) {
            return method;
        }
        let called = false;
        return function onceWrapper() {
            if (!called) {
                called = true;
                return method.apply(this, arguments);
            }
        };
    },

    getParent() {
        if (util.isPopup()) {
            return window.opener;
        }
        if (util.isIframe()) {
            return window.parent;
        }
    },

    eachParent(method, includeSelf) {

        let win = window;

        if (includeSelf) {
            method(window);
        }

        while (true) {
            let parent = win.opener || win.parent;

            if (win === parent) {
                return;
            }

            win = parent;

            method(win);
        }
    },

    eachFrame(win, method) {
        for (let i = 0; i < win.frames.length; i++) {
            let frame;
            
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

    noop() {}, // eslint-disable-line no-empty-function

    getDomain() {
        return window.location.host;
    },

    clearLogs() {

        if (window.console && window.console.clear) {
            window.console.clear();
        }

        if (CONFIG.LOG_TO_PAGE) {
            let container = document.getElementById('postRobotLogs');

            if (container) {
                container.parentNode.removeChild(container);
            }
        }
    },

    writeToPage(level, args) {
        setTimeout(() => {
            let container = document.getElementById('postRobotLogs');

            if (!container) {
                container = document.createElement('div');
                container.id = 'postRobotLogs';
                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
                document.body.appendChild(container);
            }

            let el = document.createElement('div');

            let date = (new Date()).toString().split(' ')[4];

            let payload = util.map(args, item => {
                if (typeof item === 'string') {
                    return item;
                }
                if (!item) {
                    return toString.call(item);
                }
                let json;
                try {
                    json = JSON.stringify(item, 0, 2);
                } catch (e) {
                    json = '[object]';
                }

                return `\n\n${json}\n\n`;
            }).join(' ');


            let msg = `${date} ${level} ${payload}`;
            el.innerHTML = msg;

            let color = {
                log: '#ddd',
                warn: 'orange',
                error: 'red',
                info: 'blue',
                debug: '#aaa'
            }[level];

            el.style.cssText = `margin-top: 10px; color: ${color};`;

            if (!container.childNodes.length) {
                container.appendChild(el);
            } else {
                container.insertBefore(el, container.childNodes[0]);
            }

        });
    },

    logLevel(level, args) {

        args = Array.prototype.slice.call(args);

        args.unshift(util.getDomain());
        args.unshift(util.getType().toLowerCase());
        args.unshift('[post-robot]');

        if (CONFIG.LOG_TO_PAGE) {
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

    log() {
        util.logLevel('info', arguments);
    },

    debug() {
        if (CONFIG.DEBUG) {
            util.logLevel('debug', arguments);
        }
    },

    debugError() {
        if (CONFIG.DEBUG) {
            util.logLevel('error', arguments);
        }
    },

    safeHasProp(obj, name) {
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

    warn() {
        util.logLevel('warn', arguments);
    },

    error() {
        util.logLevel('error', arguments);
    },

    listen(win, event, handler) {
        if (win.addEventListener) {
            win.addEventListener(event, handler);
        } else {
            win.attachEvent(`on${event}`, handler);
        }

        return {
            cancel() {
                if (win.removeEventListener) {
                    win.removeEventListener(event, handler);
                } else {
                    win.detachEvent(`on${event}`, handler);
                }
            }
        };
    },

    apply(method, context, args) {
        if (method.apply instanceof Function) {
            return method.apply(context, args);
        }
        return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
    },

    find(collection, method, def) {
        if (!collection) {
            return def;
        }
        for (let i = 0; i < collection.length; i++) {
            if (method(collection[i])) {
                return collection[i];
            }
        }
        return def;
    },

    map(collection, method) {
        let results = [];
        for (let i = 0; i < collection.length; i++) {
            results.push(method(collection[i]));
        }
        return results;
    },

    some(collection, method) {
        method = method || Boolean;
        for (let i = 0; i < collection.length; i++) {
            if (method(collection[i])) {
                return true;
            }
        }
        return false;
    },

    keys(mapping) {
        let result = [];
        for (let key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    },

    values(mapping) {
        let result = [];
        for (let key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                result.push(mapping[key]);
            }
        }
        return result;
    },

    getByValue(mapping, value) {
        for (let key in mapping) {
            if (mapping.hasOwnProperty(key) && mapping[key] === value) {
                return key;
            }
        }
    },

    uniqueID() {

        let chars = '0123456789abcdef';

        return 'xxxxxxxxxx'.replace(/./g, () => {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        });
    },

    isFrameOwnedBy(win, frame) {

        try {
            if (frame.parent === win) {
                return true;
            } else {
                return false;
            }
        } catch (err) {

            try {
                for (let i = 0; i < win.frames.length; i++) {
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

    memoize(method) {

        let results = {};

        return function memoized() {
            let args = JSON.stringify(Array.prototype.slice.call(arguments));
            if (!results.hasOwnProperty(args)) {
                results[args] = method.apply(this, arguments);
            }
            return results[args];
        };
    },

    extend(obj, source) {
        if (!source) {
            return obj;
        }

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                obj[key] = source[key];
            }
        }

        return obj;
    },

    each(obj, callback) {
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
                callback(obj[i], i);
            }
        } else if (obj instanceof Object && !(obj instanceof Function)) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    callback(obj[key], key);
                }
            }
        }
    },

    replaceObject(obj, callback) {

        let newobj = obj instanceof Array ? [] : {};

        util.each(obj, (item, key) => {

            let result = callback(item);

            if (result !== undefined) {
                newobj[key] = result;
            } else if (typeof item === 'object' && item !== null) {
                newobj[key] = util.replaceObject(item, callback);
            } else {
                newobj[key] = item;
            }
        });

        return newobj;
    }
};