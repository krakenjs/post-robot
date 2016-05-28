
import { listeners } from '../drivers';

export function proxy(window1, window2) {

    listeners.proxies.push({
        from: window1,
        to: window2
    });

    listeners.proxies.push({
        from: window2,
        to: window1
    });
}

export function unproxy(window1, window2) {

    let toRemove = [];

    for (let i = 0; i < listeners.proxies.length; i++) {
        let prox = listeners.proxies[i];
        if ((prox.to === window1 && prox.from === window2) || (prox.to === window2 && prox.from === window1)) {
            toRemove.push(prox);
        }
    }

    for (let i = 0; i < toRemove.length; i++) {
        listeners.proxies.splice(listeners.proxies.indexOf(toRemove[i]), 1);
    }
}