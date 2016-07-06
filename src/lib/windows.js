
import { util } from './util';

let domainMatches = [];

export function isSameDomain(win) {

    for (let match of domainMatches) {
        if (match.win === win) {

            if (!match.match) {
                return false;
            }

            match.match = false;

            try {
                match.match = util.getDomain(window) === util.getDomain(win);
            } catch (err) {
                return;
            }

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

export function getOpener(win) {

    if (!win) {
        return;
    }

    try {
        return win.opener;
    } catch (err) {
        return;
    }
}




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
let windowId = window.name || `${util.getType()}_${util.uniqueID()}`;


export function getWindowId(win) {

    if (win === window) {
        return windowId;
    }

    for (let i = windows.length - 1; i >= 0; i--) {
        let map = windows[i];

        try {
            if (map.win === win) {
                return map.id;
            }
        } catch (err) {
            continue;
        }
    }
}

export function getWindowById(id) {

    if (id === window.name || id === windowId) {
        return window;
    }

    if (window.frames && window.frames[id]) {
        return window.frames[id];
    }

    for (let i = windows.length - 1; i >= 0; i--) {
        let map = windows[i];

        try {
            if (map.id === id) {
                return map.win;
            }
        } catch (err) {
            continue;
        }
    }
}

export function registerWindow(id, win) {

    for (let map of windows) {
        try {
            if (map.id === id && map.win === win) {
                return;
            }
        } catch (err) {
            continue;
        }

        if (map.id === id && map.win !== win) {
            throw new Error(`Can not register a duplicate window with name ${id}`);
        }
    }

    windows.push({
        id,
        win
    });
}

export function isWindowEqual(win1, win2) {

    if (win1 === win2) {
        return true;
    }

    let id1 = getWindowId(win1);
    let id2 = getWindowId(win2);

    if (id1 && id2 && id1 === id2) {
        return true;
    }

    return false;
}

export function isSameTopWindow(win1, win2) {
    try {
        return win1.top === win2.top;
    } catch (err) {
        return false;
    }
}


let openWindow = window.open;

window.open = function(url, name, x, y) {

    if (!name) {
        name = util.uniqueID();
        arguments[1] = name;
    }

    let win = util.apply(openWindow, this, arguments);

    registerWindow(name, win);

    return win;
};

function safeGet(obj, prop) {

    let result;

    try {
        result = obj[prop];
    } catch (err) {
        // pass
    }

    return result;
}

export function isWindowClosed(win) {
    try {
        return !win || win.closed || typeof win.closed === 'undefined' || (isSameDomain(win) && safeGet(win, 'mockclosed'));
    } catch (err) {
        return true;
    }
}
