
import { util } from './util';
import { global } from '../global';
import { CONSTANTS } from '../conf';

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

export function isSameDomain(win) {

    for (let match of global.domainMatches) {
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

    global.domainMatches.push({
        win,
        match
    });

    if (!domainMatchTimeout) {
        domainMatchTimeout = setTimeout(function() {
            global.domainMatches = [];
            domainMatchTimeout = null;
        }, 1);
    }

    return match;
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

export function getParent(win) {

    if (!win) {
        return;
    }

    try {
        if (win.parent && win.parent !== win) {
            return win.parent;
        }
    } catch (err) {
        return;
    }
}

export function getTop(win) {

    if (!win) {
        return;
    }

    try {
        return win.top;
    } catch (err) {
        return;
    }
}


export function getFrameByName(win, name) {

    try {
        return win.frames[name];
    } catch (err) {
        // pass
    }

    try {
        return win[name];
    } catch (err) {
        // pass
    }
}

export function getFrames(win) {

    let result = [];

    let frames;

    try {
        frames = win.frames;
    } catch (err) {
        frames = win;
    }

    let len;

    try {
        len = frames.length;
    } catch (err) {
        // pass
    }

    if (len === 0) {
        return result;
    }

    if (len) {
        for (let i = 0; i < len; i++) {

            let frame;

            try {
                frame = frames[i];
            } catch (err) {
                continue;
            }

            result.push(frame);
        }
    } else {

        let i = 0;

        while (true) {
            let frame;

            try {
                frame = frames[i];
            } catch (err) {
                return result;
            }

            if (!frame) {
                return result;
            }

            result.push(frame);

            i += 1;

            if (i > 20) {
                return result;
            }
        }
    }

    return result;
}

export function isFrameOwnedBy(win, frame) {

    try {
        let frameParent = getParent(frame);

        if (frameParent) {
            return frameParent === win;
        }

    } catch (err) {
        // pass
    }

    try {
        let frames = getFrames(win);

        if (!frames || !frames.length) {
            return false;
        }

        for (let i = 0; i < frames.length; i++) {
            if (frames[i] === frame) {
                return true;
            }
        }

    } catch (err) {
        // pass
    }

    return false;
}

export function getParentWindow(win) {
    win = win || window;

    let opener = getOpener(win);

    if (opener) {
        return opener;
    }

    let parent = getParent(win);

    if (parent) {
        return parent;
    }
}


export function isParentWindow(child, parent) {
    parent = parent || window;

    let parentWindow = getParentWindow(child);

    if (parentWindow) {
        return parentWindow === parent;
    }

    if (child === window) {
        return getParentWindow(child) === parent;
    }

    if (child === parent) {
        return false;
    }

    if (getTop(child) === child) {
        return false;
    }

    let frames = getFrames(parent);

    if (frames && frames.length) {
        for (let i = 0; i < frames.length; i++) {
            if (frames[i] === child) {
                return true;
            }
        }
    }

    return false;
}



export function isPopup() {
    return Boolean(getOpener(window));
}

export function isIframe() {
    return Boolean(getParent(window));
}

export function isFullpage() {
    return Boolean(!isIframe() && !isPopup());
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



global.windows = global.windows || [];
let windowId = window.name || `${getWindowType()}_${util.uniqueID()}`;

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
    let top1 = getTop(win1);
    let top2 = getTop(win2);

    try {
        return top1 && top2 && top1 === top2;
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