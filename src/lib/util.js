/* @flow */

import { WeakMap } from 'cross-domain-safe-weakmap/src';
import { isPopup, isIframe, getUserAgent } from 'cross-domain-utils/src';

import { CONFIG, CONSTANTS } from '../conf';


export function stringifyError(err : mixed, level : number = 1) : string {

    if (level >= 3) {
        return 'stringifyError stack overflow';
    }

    try {
        if (!err) {
            return `<unknown error: ${ Object.prototype.toString.call(err) }>`;
        }

        if (typeof err === 'string') {
            return err;
        }

        if (err instanceof Error) {
            let stack = err && err.stack;
            let message = err && err.message;

            if (stack && message) {
                if (stack.indexOf(message) !== -1) {
                    return stack;
                } else {
                    return `${ message }\n${ stack }`;
                }
            } else if (stack) {
                return stack;
            } else if (message) {
                return message;
            }
        }

        if (typeof err.toString === 'function') {
            return err.toString();
        }

        return Object.prototype.toString.call(err);

    } catch (newErr) { // eslint-disable-line unicorn/catch-error-name
        return `Error while stringifying error: ${ stringifyError(newErr, level + 1) }`;
    }
}

// eslint-disable-next-line flowtype/no-weak-types
export let once = <T>(method : Function) : ((...args : Array<any>) => T | void) => {
    if (!method) {
        return method;
    }
    let called = false;
    return function onceWrapper() : T | void {
        if (!called) {
            called = true;
            return method.apply(this, arguments);
        }
    };
};

// eslint-disable-next-line no-unused-vars
export function noop(...args : Array<mixed>) {
    // pass
}

export function addEventListener(obj : Object, event : string, handler : Function) : { cancel : () => void } {
    if (obj.addEventListener) {
        obj.addEventListener(event, handler);
    } else {
        obj.attachEvent(`on${ event }`, handler);
    }

    return {
        cancel() {
            if (obj.removeEventListener) {
                obj.removeEventListener(event, handler);
            } else {
                obj.detachEvent(`on${ event }`, handler);
            }
        }
    };
}

export function uniqueID() : string {

    let chars = '0123456789abcdef';

    return 'xxxxxxxxxx'.replace(/./g, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    });
}

type MixedArrayType = Array<mixed>;

export function eachArray(item : MixedArrayType, callback : (item : mixed, key : number) => mixed) {
    for (let i = 0; i < item.length; i++) {
        callback(item[i], i);
    }
}

export function eachObject(item : Object, callback : (item : mixed, key : string) => mixed) {
    for (let key in item) {
        if (item.hasOwnProperty(key)) {
            callback(item[key], key);
        }
    }
}

export function each<T : Object | MixedArrayType>(item : T, callback : (item : mixed, key : number | string) => mixed) {
    if (Array.isArray(item)) {
        eachArray(item, callback);
    } else if (typeof item === 'object' && item !== null) {
        eachObject(item, callback);
    }
}

export function replaceObject<T : Object | MixedArrayType>(item : T, callback : (item : mixed, key : number | string) => mixed, depth : number = 1) : T {

    if (depth >= 100) {
        throw new Error(`Self-referential object passed, or object contained too many layers`);
    }

    let newobj;

    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        newobj = {};
    } else if (Array.isArray(item)) {
        newobj = [];
    } else {
        throw new TypeError(`Invalid type: ${ typeof item }`);
    }

    each(item, (childItem, key) => {

        let result = callback(childItem, key);

        if (typeof result !== 'undefined') {
            // $FlowFixMe
            newobj[key] = result;
        } else if (typeof childItem === 'object' && childItem !== null) {
            // $FlowFixMe
            newobj[key] = replaceObject(childItem, callback, depth + 1);
        } else {
            // $FlowFixMe
            newobj[key] = childItem;
        }
    });

    // $FlowFixMe
    return newobj;
}

export function safeInterval(method : Function, time : number) : { cancel : () => void } {
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

export function isRegex(item : mixed) : boolean {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}


type FunctionProxy<T : Function> = (method : T) => T;

// eslint-disable-next-line flowtype/no-weak-types
export let weakMapMemoize : FunctionProxy<*> = <R : mixed>(method : (arg : any) => R) : ((...args : Array<any>) => R) => {

    let weakmap = new WeakMap();

    // eslint-disable-next-line flowtype/no-weak-types
    return function weakmapMemoized(arg : any) : R {
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
};

export function getWindowType() : string {
    if (isPopup()) {
        return CONSTANTS.WINDOW_TYPES.POPUP;
    }
    if (isIframe()) {
        return CONSTANTS.WINDOW_TYPES.IFRAME;
    }
    return CONSTANTS.WINDOW_TYPES.FULLPAGE;
}

export function jsonStringify<T : mixed>(obj : T, replacer : ?Function, indent : number | void) : string {

    let objectToJSON;
    let arrayToJSON;

    try {
        if (JSON.stringify({}) !== '{}') {
            // $FlowFixMe
            objectToJSON = Object.prototype.toJSON;
            // $FlowFixMe
            delete Object.prototype.toJSON;
        }

        if (JSON.stringify({}) !== '{}') {
            throw new Error(`Can not correctly serialize JSON objects`);
        }

        if (JSON.stringify([]) !== '[]') {
            // $FlowFixMe
            arrayToJSON  = Array.prototype.toJSON;
            // $FlowFixMe
            delete Array.prototype.toJSON;
        }

        if (JSON.stringify([]) !== '[]') {
            throw new Error(`Can not correctly serialize JSON objects`);
        }

    } catch (err) {
        throw new Error(`Can not repair JSON.stringify: ${ err.message }`);
    }

    let result = JSON.stringify.call(this, obj, replacer, indent);

    try {
        if (objectToJSON) {
            // $FlowFixMe
            Object.prototype.toJSON = objectToJSON; // eslint-disable-line no-extend-native
        }

        if (arrayToJSON) {
            // $FlowFixMe
            Array.prototype.toJSON = arrayToJSON; // eslint-disable-line no-extend-native
        }

    } catch (err) {
        throw new Error(`Can not repair JSON.stringify: ${ err.message }`);
    }


    return result;
}

export function jsonParse(item : string) : mixed {
    return JSON.parse(item);
}
            
export function needsGlobalMessagingForBrowser() : boolean {

    if (getUserAgent(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
        return true;
    }
        
    if (!CONFIG.ALLOW_POSTMESSAGE_POPUP) {
        return true;
    }
        
    return false;
}
