
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

export function getRequestListener(name, win) {
    for (let requestListener of global.listeners.request) {

        if (requestListener.name !== name) {
            continue;
        }

        if (!requestListener.win) {
            return requestListener.options;
        }

        if (win && win === requestListener.win) {
            return requestListener.options;
        }
    }
}

export function removeRequestListener(options) {

    let listener;

    for (let requestListener of global.listeners.request) {
        if (requestListener.options === options) {
            listener = requestListener;
            break;
        }
    }

    if (listener) {
        global.listeners.request.splice(global.listeners.request.indexOf(listener), 1);
    }
}

export function addRequestListener(name, win, options, override) {

    let listener = getRequestListener(name, win);

    if (listener) {
        if (override) {
            removeRequestListener(listener);
        } else {
            throw new Error(`Request listener already exists for ${name}`);
        }
    }

    listeners.request.push({ name, win, options });
}