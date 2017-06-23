/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export function promiseMap<T : mixed, R : mixed>(items : Array<T>, method : (item : T) => mixed | ZalgoPromise<mixed>) : ZalgoPromise<Array<R>> {
    let results = [];
    for (let i = 0; i < items.length; i++) {
        results.push(ZalgoPromise.try(() => {
            return method(items[i]);
        }));
    }
    return ZalgoPromise.all(results);
}
