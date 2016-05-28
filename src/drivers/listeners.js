
import { childWindows } from '../lib';

export let listeners;

export function resetListeners() {
    listeners = {
        request: [],
        response: {},
        proxies: []
    };
}

export function getRequestListener(name, win) {
    for (let requestListener of listeners.request) {

        if (requestListener.name !== name) {
            continue;
        }

        if (!requestListener.win) {
            return requestListener.options;
        }

        if (win && childWindows.isEqual(win, requestListener.win)) {
            return requestListener.options;
        }
    }
}

export function removeRequestListener(options) {

    let listener;

    for (let requestListener of listeners.request) {
        if (requestListener.options === options) {
            listener = requestListener;
            break;
        }
    }

    if (listener) {
        listeners.request.splice(listeners.request.indexOf(listener), 1);
    }
}

export function addRequestListener(name, win, options, override) {

    let listener = getRequestListener(name, win);

    if (listener) {
        if (override) {
            removeRequestListener(listener.options);
        } else {
            throw new Error(`Request listener already exists for ${name}`);
        }
    }

    listeners.request.push({ name, win, options });
}

resetListeners();