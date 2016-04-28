
export let listeners;

export function resetListeners() {
    listeners = {
        request: {},
        response: {},
        proxies: []
    }
}

resetListeners();