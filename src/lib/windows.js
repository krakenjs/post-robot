
import { CONSTANTS } from '../conf';
import { util } from '../lib';
import { on, send } from '../interface';

let windows = [];

function getMap(key, value) {
    return util.find(windows, map => {
        return map[key] === value;
    }, {});
};

export let childWindows = {

    getWindowId(win) {
        return getMap('win', win).id;
    },

    getWindowById(id) {
        return getMap('id', id).win;
    },

    getWindowType(win) {
        let map = getMap('win', win);

        if (map && map.type) {
            return map.type;
        }

        if (util.safeHasProp(win, 'parent') && win.parent !== win) {
            return CONSTANTS.WINDOW_TYPES.IFRAME;
        }

        if (util.safeHasProp(win, 'opener')) {
            return CONSTANTS.WINDOW_TYPES.POPUP;
        }

        let isFrame = util.some(windows, childWin => {
            return util.isFrameOwnedBy(childWin.win, win);
        });

        if (isFrame) {
            return CONSTANTS.WINDOW_TYPES.IFRAME;
        }

        return;
    },

    register(id, win, type) {

        let existing = util.find(windows, map => {
            return map.id === id && map.win === win;
        });

        if (existing) {
            return;
        }

        util.debug('Registering window:', type, id, win);

        windows.push({
            id,
            win,
            type
        });

        windows[id] = windows[id] || win;
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
    return win
};



export function propagate(id) {

    on(CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, (err, data, callback) => {
        if (!err) {
            return {
                id
            };
        }
    });

    let registered = [];

    function register(win, identifier) {

        if (!win || win === window || registered.indexOf(win) !== -1) {
            return;
        }

        util.debug('propagating to', identifier, win);

        registered.push(win);

        if (util.safeHasProp(win, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            win[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, util.getType())
        } else {
            send(win, CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
                id,
                type: util.getType()
            }).then(data => {
                childWindows.register(data.id, win, data.type);
            }, err => {
                util.debugError('Error sending identify:', err.stack || err.toString());
            });
        }
    }

    util.eachParent(parent => {

        register(parent, 'parent');
        
        util.eachFrame(parent, frame => {
            register(frame, 'frame');
        });
        
    }, true);
}