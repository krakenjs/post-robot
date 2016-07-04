
import { CONSTANTS } from '../conf';
import { util } from './util';


let domainMatches = [];

export function isSameDomain(win) {

    for (let match of domainMatches) {
        if (match.win === win) {
            return match.match;
        }
    }

    let match = false;

    try {
        if (util.getDomain(window) === util.getDomain(win)) {
            match = true;
        }
    } catch (err) {
        // pass
    }

    domainMatches.push({
        win,
        match
    });

    return match;
}



let openers = [];

export function getOpener(win) {

    if (!win) {
        return;
    }

    for (let match of openers) {
        if (match.win === win) {
            return match.match;
        }
    }

    let match = win.opener;

    openers.push({
        win,
        match
    });

    return match;
}


getOpener(window);
getOpener(window.parent);
getOpener(window.opener);




export function getParentWindow(win) {
    win = win || window;

    let opener = getOpener(win);

    if (opener) {
        return opener;
    }

    if (win.parent !== win) {
        return win.parent;
    }
}



let windows = [];

function getMap(key, value) {
    return util.find(windows, map => {
        return map[key] === value;
    }, {});
}

export let childWindows = {

    getWindowId(win) {
        return getMap('win', win).id;
    },

    getWindowById(id) {
        if (window.frames && window.frames[id]) {
            return window.frames[id];
        }

        return getMap('id', id).win;
    },

    register(id, win, type) {

        let existing = util.find(windows, map => {
            return map.id === id && map.win === win;
        });

        if (existing) {
            return;
        }

        windows.push({
            id,
            win,
            type
        });
    },

    isEqual(win1, win2) {

        if (win1 === win2) {
            return true;
        }

        let id1 = this.getWindowId(win1);
        let id2 = this.getWindowId(win2);

        if (id1 && id2 && id1 === id2) {
            return true;
        }

        return false;
    }
};

let openWindow = window.open;

window.open = function(url, name, x, y) {

    if (!name) {
        name = util.uniqueID();
        arguments[1] = name;
    }

    let win = util.apply(openWindow, this, arguments);

    childWindows.register(name, win, CONSTANTS.WINDOW_TYPES.POPUP);

    getOpener(win);

    return win;
};