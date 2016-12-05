
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export function cleanup(obj) {

    let tasks = [];

    return {

        getters: {
            array:  () => { return []; },
            object: () => { return {}; }
        },

        set(name, item) {
            obj[name] = item;
            this.register(() => {
                delete obj[name];
            });
            return item;
        },

        push(collection, item) {
            collection.push(item);
            this.register(() => {
                let index = collection.indexOf(item);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
            });
            return item;
        },

        setItem(mapping, key, item) {
            mapping[key] = item;
            this.register(() => {
                delete mapping[key];
            });
            return item;
        },

        register(name, method) {

            if (!method) {
                method = name;
                name = undefined;
            }

            tasks.push({
                complete: false,

                name,

                run() {

                    if (this.complete) {
                        return;
                    }

                    this.complete = true;

                    return method();
                }
            });
        },

        hasTasks() {
            return Boolean(tasks.filter(item => !item.complete).length);
        },

        all() {
            let results = [];

            while (tasks.length) {
                results.push(tasks.pop().run());
            }

            return Promise.all(results).then(() => {
                return;
            });
        },

        run(name) {
            let results = [];
            let toClean = [];

            for (let item of tasks) {
                if (item.name === name) {
                    toClean.push(item);
                    results.push(item.run());
                }
            }

            for (let item of toClean) {
                tasks.splice(tasks.indexOf(item), 1);
            }

            return Promise.all(results).then(() => {
                return;
            });
        }
    };
}
