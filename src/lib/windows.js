
import { CONSTANTS } from '../conf';
import { util } from './util';
import { log } from './log';
import { on, send } from '../interface';


let domainMatches = [];

export function isSameDomain(win) {

    for (let match of domainMatches) {
        if (match.win === win) {
            return match.match;
        }
    }

    let windowDomain = `${window.location.protocol}//${window.location.host}`;
    let match = false;

    try {
        if (win.location.protocol && win.location.host) {
            let otherDomain = `${win.location.protocol}//${win.location.host}`;
            if (otherDomain === windowDomain) {
                match = true;
            }
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

        log.debug('Registering window:', type, id, win);

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
    return win;
};



export function propagate(id) {

    on(CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, (source, data, callback) => {
        return {
            id
        };
    });

    let registered = [];

    function register(win, identifier) {

        if (!win || win === window || registered.indexOf(win) !== -1) {
            return;
        }

        log.debug('propagating to', identifier, win);

        registered.push(win);

        if (isSameDomain(win) && util.safeHasProp(win, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            win[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, util.getType());
        } else {

            util.windowReady.then(() => {
                send(win, CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
                    id,
                    type: util.getType()
                }).then(data => {
                    childWindows.register(data.id, win, data.type);
                }, err => {
                    log.debug('Error sending identify:', err.stack || err.toString());
                });
            });
        }
    }

    util.eachParent(parent => {

        register(parent, 'parent');

        try {
            parent.frames.length; // eslint-disable-line
        } catch (err) {
            return;
        }
        
        util.eachFrame(parent, frame => {
            register(frame, 'frame');
        });
        
    }, true);
}