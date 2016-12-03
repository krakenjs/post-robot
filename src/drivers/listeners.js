
import { global } from '../global';

global.listeners = global.listeners || {
    request: [],
    response: []
};

export let listeners = global.listeners;

export function resetListeners() {
    global.listeners.request = [];
    global.listeners.response = [];
}

function isRegex(item) {
    return Object.prototype.toString.call(item) === '[object RegExp]';
}

function matchDomain(domain, origin) {

    if (typeof domain === 'string') {

        if (isRegex(origin)) {
            return false;
        }

        if (Array.isArray(origin)) {
            return false;
        }

        return domain === '*' || origin === domain;
    }

    if (isRegex(domain)) {

        if (isRegex(origin)) {
            return domain.toString() === origin.toString();
        }

        if (Array.isArray(origin)) {
            return false;
        }

        return origin.match(domain);
    }

    if (Array.isArray(domain)) {

        if (isRegex(origin)) {
            return false;
        }

        if (Array.isArray(origin)) {
            return JSON.stringify(domain) === JSON.stringify(origin);
        }

        return domain.indexOf(origin) !== -1;
    }

    return false;
}

export function getRequestListener(name, win, domain) {

    let result = {};

    for (let requestListener of global.listeners.request) {

        if (requestListener.name !== name) {
            continue;
        }

        let specifiedWin = (requestListener.win && requestListener.win !== '*');
        let specifiedDomain = (requestListener.domain && requestListener.domain !== '*');

        let matchedWin = (specifiedWin && requestListener.win === win);
        let matchedDomain = (specifiedDomain && matchDomain(requestListener.domain, domain));

        if (specifiedWin && specifiedDomain) {
            if (matchedWin && matchedDomain) {
                result.all = result.all || requestListener.options;
            }
        } else if (specifiedDomain) {
            if (matchedDomain) {
                result.domain = result.domain || requestListener.options;
            }
        } else if (specifiedWin) {
            if (matchedWin) {
                result.win = result.win || requestListener.options;
            }
        } else {
            result.name = result.name || requestListener.options;
        }
    }

    return result.all || result.domain || result.win || result.name;
}

export function removeRequestListener(options) {

    for (let listener of global.listeners.request) {
        if (listener.options === options) {
            global.listeners.request.splice(global.listeners.request.indexOf(listener), 1);
        }
    }
}

export function addRequestListener(name, win, domain, options, override) {

    let listener = getRequestListener(name, win, domain);

    if (listener) {
        if (override) {
            removeRequestListener(listener);
        } else {

            if (win) {
                throw new Error(`Request listener already exists for ${name} on domain ${domain} for specified window: ${listener.win === win}`);
            }

            throw new Error(`Request listener already exists for ${name} on domain ${domain}`);
        }
    }

    global.clean.push(global.listeners.request, { name, win, domain, options });
}
