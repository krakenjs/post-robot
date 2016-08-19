
import { util } from './util';
import { global } from '../global';

function safeGet(obj, prop) {

    let result;

    try {
        result = obj[prop];
    } catch (err) {
        // pass
    }

    return result;
}

global.domainMatches = global.domainMatches || [];
let domainMatchTimeout;

export function isSameDomain(win, allowMockDomain = true) {

    for (let match of global.domainMatches) {
        if (match.win === win) {
            return allowMockDomain ? match.match : match.actualMatch;
        }
    }

    let match = false;
    let actualMatch = false;

    try {
        if (util.getDomain(window) === util.getDomain(win)) {
            match = true;
        }

        if (util.getDomain(window, false) === util.getDomain(win, false)) {
            actualMatch = true;
        }
    } catch (err) {
        // pass
    }

    global.domainMatches.push({
        win,
        match,
        actualMatch
    });

    if (!domainMatchTimeout) {
        domainMatchTimeout = setTimeout(function() {
            global.domainMatches = [];
            domainMatchTimeout = null;
        }, 1);
    }

    return allowMockDomain ? match : actualMatch;
}

export function isWindowClosed(win) {
    try {
        return !win || win.closed || typeof win.closed === 'undefined' || (isSameDomain(win) && safeGet(win, 'mockclosed'));
    } catch (err) {
        return true;
    }
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



global.windows = global.windows || [];
let windowId = window.name || `${util.getType()}_${util.uniqueID()}`;

export function getWindowId(win) {

    if (win === window) {
        return windowId;
    }

    for (let i = global.windows.length - 1; i >= 0; i--) {
        let map = global.windows[i];

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

    for (let i = global.windows.length - 1; i >= 0; i--) {
        let map = global.windows[i];

        try {
            if (map.id === id) {
                return map.win;
            }
        } catch (err) {
            continue;
        }
    }
}

export function getWindowDomain(win) {

    if (win === window) {
        return util.getDomain(window);
    }

    for (let i = global.windows.length - 1; i >= 0; i--) {
        let map = global.windows[i];

        try {
            if (map.win === win && map.domain) {
                return map.domain;
            }
        } catch (err) {
            continue;
        }
    }
}

export function registerWindow(id, win, domain) {

    for (let map of global.windows) {
        try {
            if (map.id === id && map.win === win) {
                map.domain = domain;
                return;
            }
        } catch (err) {
            continue;
        }

        if (map.id === id && map.win !== win) {
            if (!isWindowClosed(map.win)) {
                throw new Error(`Can not register a duplicate window with name ${id}`);
            }
        }
    }

    global.windows.push({
        id,
        win,
        domain
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


export function linkUrl(name, win, url) {

    let domain = util.getDomainFromUrl(url);

    registerWindow(name, win, domain);

    global.domainMatches.push({
        win,
        match: util.getDomain() === domain
    });
}


let openWindow = window.open;

window.open = function(url, name, x, y) {

    if (!name) {
        name = util.uniqueID();
        arguments[1] = name;
    }

    let win = util.apply(openWindow, this, arguments);

    if (url) {
        linkUrl(name, win, url);
    } else {
        registerWindow(name, win);
    }

    return win;
};