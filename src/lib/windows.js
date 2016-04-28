
import { CONSTANTS } from '../conf';
import { util } from '../lib';
import { on, send } from '../interface';
import { getBridgeFor } from '../compat';

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
            return util.isFrameOwnedBy(win.win, childWin);
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

window.open = (url, name, x, y) => {

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

    let parentWindow = util.getParent();

    if (parentWindow) {
        send(parentWindow, CONSTANTS.POST_MESSAGE_NAMES.IDENTIFY, {
            id,
            type: util.getType()
        }).then(data => {
            childWindows.register(data.id, parentWindow, data.type);
        }, err => {
            util.error('Error sending identify:', err.stack || err.toString());
        });
    }

    util.eachParent(parent => {

        if (util.safeHasProp(parent, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            parent[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, util.getType())
        }

        let parentBridge = getBridgeFor(window.opener);

        if (parentBridge && util.safeHasProp(parentBridge, CONSTANTS.WINDOW_PROPS.POSTROBOT)) {
            parentBridge[CONSTANTS.WINDOW_PROPS.POSTROBOT].registerSelf(id, window, util.getType());
        }
    });
}