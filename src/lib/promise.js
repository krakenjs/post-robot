
import { Promise as ES6Promise } from 'es6-promise-min';

export let promise = {

    get Promise() {
        return window.Promise ? window.Promise : ES6Promise;
    },

    run(method) {
        return promise.Promise.resolve().then(method);
    },

    method(method) {
        return function promiseWrapper() {
            return promise.Promise.resolve().then(() => {
                return method.apply(this, arguments);
            });
        };
    },

    nodeify(prom, callback) {
        if (!callback) {
            return prom;
        }
        prom.then(result => {
            callback(null, result);
        }, err => {
            callback(err);
        });
    },

    deNodeify(method, ...args) {
        return new promise.Promise(function(resolve, reject) {
            try {
                if (args.length < method.length) {
                    return method(...args, function(err, result) {
                        return err ? reject(err) : resolve(result);
                    });
                }

                return promise.run(() => {
                    return method(...args);
                }).then(resolve, reject);

            } catch (err) {
                return reject(err);
            }
        });
    },

    map(items, method) {

        let results = [];
        for (let i = 0; i < items.length; i++) {
            results.push(promise.run(() => {
                return method(items[i]);
            }));
        }
        return promise.Promise.all(results);
    }
};