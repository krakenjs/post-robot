
export let listeners;

function resetListeners() {
    listeners = {
        request: {},
        response: {},
        proxies: []
    }
}

resetListeners();