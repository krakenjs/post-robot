
import { Promise as ES6Promise } from 'es6-promise-min';
export let promise = {

    get Promise() {
        return window.Promise ? window.Promise : ES6Promise;
    },

    asyncPromise(method) {
        return new promise.Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    return method(resolve, reject);
                } catch (err) {
                    return reject(err);
                }
            });
        });
    },

    run(method) {
        return promise.Promise.resolve().then(method);
    },

    method(method) {
        return function promiseWrapper() {
            return promise.Promise.resolve().then(() => {
                return method.apply(this, arguments);
            });
        }
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
    }
}