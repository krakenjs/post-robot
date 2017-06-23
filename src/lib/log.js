/* @flow */

import { getWindowType, jsonStringify } from './util';
import { CONFIG } from '../conf';

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];

if (Function.prototype.bind && window.console && typeof console.log === 'object') {
    [ 'log', 'info', 'warn', 'error' ].forEach(function(method) {
        // $FlowFixMe
        console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
}

export let log = {

    clearLogs() {

        if (window.console && window.console.clear) {
            window.console.clear();
        }

        if (CONFIG.LOG_TO_PAGE) {
            let container = document.getElementById('postRobotLogs');

            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
    },

    writeToPage(level : string, args : Array<mixed>) {
        setTimeout(() => {
            let container = document.getElementById('postRobotLogs');

            if (!container) {
                container = document.createElement('div');
                container.id = 'postRobotLogs';
                container.style.cssText = 'width: 800px; font-family: monospace; white-space: pre-wrap;';
                if (document.body) {
                    document.body.appendChild(container);
                }
            }

            let el = document.createElement('div');

            let date = (new Date()).toString().split(' ')[4];

            let payload = Array.prototype.slice.call(args).map(item => {
                if (typeof item === 'string') {
                    return item;
                }
                if (!item) {
                    return Object.prototype.toString.call(item);
                }
                let json;
                try {
                    json = jsonStringify(item, null, 2);
                } catch (e) {
                    json = '[object]';
                }

                return `\n\n${json}\n\n`;
            }).join(' ');


            let msg = `${date} ${level} ${payload}`;
            el.innerHTML = msg;

            let color = {
                log: '#ddd',
                warn: 'orange',
                error: 'red',
                info: 'blue',
                debug: '#aaa'
            }[level];

            el.style.cssText = `margin-top: 10px; color: ${color};`;

            if (!container.childNodes.length) {
                container.appendChild(el);
            } else {
                container.insertBefore(el, container.childNodes[0]);
            }

        });
    },

    logLevel(level : string, args : Array<mixed>) {
        setTimeout(() => {
            try {
                let logLevel = window.LOG_LEVEL || CONFIG.LOG_LEVEL;

                if (LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel)) {
                    return;
                }

                args = Array.prototype.slice.call(args);

                args.unshift(`${window.location.host}${window.location.pathname}`);
                args.unshift(`::`);
                args.unshift(`${getWindowType().toLowerCase()}`);
                args.unshift('[post-robot]');

                if (CONFIG.LOG_TO_PAGE) {
                    log.writeToPage(level, args);
                }

                if (!window.console) {
                    return;
                }

                if (!window.console[level]) {
                    level = 'log';
                }

                if (!window.console[level]) {
                    return;
                }

                window.console[level].apply(window.console, args);

            } catch (err) {
                // pass
            }
        }, 1);
    },

    debug(...args : Array<mixed>) {
        log.logLevel('debug', args);
    },

    info(...args : Array<mixed>) {
        log.logLevel('info', args);
    },

    warn(...args : Array<mixed>) {
        log.logLevel('warn', args);
    },

    error(...args : Array<mixed>) {
        log.logLevel('error', args);
    }
};
