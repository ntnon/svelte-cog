import { browser } from "$app/environment"

export const sessionStateManager = {
    getItem(key: string) {
        if (browser) {
            console.log("from storage you got: ", window.sessionStorage.getItem(key))
            return window.sessionStorage.getItem(key);
        }
        return null
    },
    setItem(key: string, value: unknown) {
        if (browser) {
            console.log("setting item: ", key, " to: ", value, " in session storage")
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
    },
    clearItem(key: string) {
        if (browser) {
            window.sessionStorage.removeItem(key);
        }
    },
    clearAll() {
        if (browser) {
            window.sessionStorage.clear();
        }
    },
    viewSessionState() {
        if (browser) {
            console.log("session storage: ", window.sessionStorage)
        }
    }
};
