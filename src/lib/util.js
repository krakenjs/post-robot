
import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { isPopup, isIframe } from 'cross-domain-utils/src';
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

export function addEventListener(obj, event, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(event, handler);
    } else {
        obj.attachEvent(`on${event}`, handler);
    }

    return {
        cancel() {
            if (obj.removeEventListener) {
                obj.removeEventListener(event, handler);
            } else {
                obj.detachEvent(`on${event}`, handler);
            }
        }
    };
}

export function uniqueID() {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
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

export function getWindowType() {
    if (isPopup()) {
        return CONSTANTS.WINDOW_TYPES.POPUP;
    }
    if (isIframe()) {
        return CONSTANTS.WINDOW_TYPES.IFRAME;
    }
    return CONSTANTS.WINDOW_TYPES.FULLPAGE;
}

export function jsonStringify() {

    let objectToJSON;
    let arrayToJSON;

    try {
        if (JSON.stringify({}) !== '{}') {
            objectToJSON = Object.prototype.toJSON;
            delete Object.prototype.toJSON;
        }

        if (JSON.stringify({}) !== '{}') {
            throw new Error(`Can not correctly serialize JSON objects`);
        }

        if (JSON.stringify([]) !== '[]') {
            arrayToJSON  = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
        }

        if (JSON.stringify([]) !== '[]') {
            throw new Error(`Can not correctly serialize JSON objects`);
        }

    } catch (err) {
        throw new Error(`Can not repair JSON.stringify: ${err.message}`);
    }

    let result = JSON.stringify.apply(this, arguments);

    try {
        if (objectToJSON) {
            Object.prototype.toJSON = objectToJSON; // eslint-disable-line
        }

        if (arrayToJSON) {
            Array.prototype.toJSON = arrayToJSON; // eslint-disable-line
        }

    } catch (err) {
        throw new Error(`Can not repair JSON.stringify: ${err.message}`);
    }


    return result;
}

export function jsonParse() {
    return JSON.parse.apply(this, arguments);
}
