
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { CONSTANTS } from '../conf';

export function once(method) {
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
}

export function noop() {
    // pass
}

export function safeHasProp(obj, name) {
    try {
        if (obj[name]) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export function safeGetProp(obj, name) {
    try {
        return obj[name];
    } catch (err) {
        return;
    }
}

export function listen(win, event, handler) {
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
}

export function apply(method, context, args) {
    if (typeof method.apply === 'function') {
        return method.apply(context, args);
    }
    return method(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
}

export function find(collection, method, def) {
    if (!collection) {
        return def;
    }
    for (let i = 0; i < collection.length; i++) {
        if (method(collection[i])) {
            return collection[i];
        }
    }
    return def;
}

export function map(collection, method) {
    let results = [];
    for (let i = 0; i < collection.length; i++) {
        results.push(method(collection[i]));
    }
    return results;
}

export function some(collection, method) {
    method = method || Boolean;
    for (let i = 0; i < collection.length; i++) {
        if (method(collection[i])) {
            return true;
        }
    }
    return false;
}

export function keys(mapping) {
    let result = [];
    for (let key in mapping) {
        if (mapping.hasOwnProperty(key)) {
            result.push(key);
        }
    }
    return result;
}

export function values(mapping) {
    let result = [];
    for (let key in mapping) {
        if (mapping.hasOwnProperty(key)) {
            result.push(mapping[key]);
        }
    }
    return result;
}

export function getByValue(mapping, value) {
    for (let key in mapping) {
        if (mapping.hasOwnProperty(key) && mapping[key] === value) {
            return key;
        }
    }
}

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

export function memoize(method) {

    let results = {};

    return function memoized() {
        let args = JSON.stringify(Array.prototype.slice.call(arguments));
        if (!results.hasOwnProperty(args)) {
            results[args] = method.apply(this, arguments);
        }
        return results[args];
    };
}

export function extend(obj, source) {
    if (!source) {
        return obj;
    }

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            obj[key] = source[key];
        }
    }

    return obj;
}

export function each(obj, callback) {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            callback(obj[i], i);
        }
    } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                callback(obj[key], key);
            }
        }
    }
}

export function replaceObject(obj, callback, depth = 1) {

    if (depth >= 100) {
        throw new Error(`Self-referential object passed, or object contained too many layers`);
    }

    let newobj = Array.isArray(obj) ? [] : {};

    each(obj, (item, key) => {

        let result = callback(item, key);

        if (result !== undefined) {
            newobj[key] = result;
        } else if (typeof item === 'object' && item !== null) {
            newobj[key] = replaceObject(item, callback, depth + 1);
        } else {
            newobj[key] = item;
        }
    });

    return newobj;
}

export function safeInterval(method, time) {
    let timeout;

    function runInterval() {
        timeout = setTimeout(runInterval, time);
        method.call();
    }

    timeout = setTimeout(runInterval, time);

    return {
        cancel() {
            clearTimeout(timeout);
        }
    };
}

export function intervalTimeout(time, interval, method) {

    let _safeInterval = safeInterval(() => {
        time -= interval;

        time = time <= 0 ? 0 : time;

        if (time === 0) {
            _safeInterval.cancel();
        }

        method(time);
    }, interval);

    return safeInterval;
}

export function getActualDomain(win) {
    return `${win.location.protocol}//${win.location.host}`;
}

export function getDomain(win) {

    win = win || window;

    if (win.mockDomain && win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0) {
        return win.mockDomain;
    }

    if (!win.location.protocol) {
        throw new Error(`Can not read window protocol`);
    }

    if (win.location.protocol === CONSTANTS.FILE_PROTOCOL) {
        return getActualDomain(win);
    }

    if (!win.location.host) {
        throw new Error(`Can not read window host`);
    }

    return getActualDomain(win);
}

export function getDomainFromUrl(url) {

    let domain;

    if (url.match(/^(https?|mock|file):\/\//)) {
        domain = url;
    } else {
        return getDomain();
    }

    domain = domain.split('/').slice(0, 3).join('/');

    return domain;
}

export function safeGet(obj, prop) {

    let result;

    try {
        result = obj[prop];
    } catch (err) {
        // pass
    }

    return result;
}

export function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}

export function weakMapMemoize(method) {

    let weakmap = new WeakMap();

    return function(arg) {
        let result = weakmap.get(arg);

        if (typeof result !== 'undefined') {
            return result;
        }

        result = method.call(this, arg);

        if (typeof result !== 'undefined') {
            weakmap.set(arg, result);
        }

        return result;
    };
}
