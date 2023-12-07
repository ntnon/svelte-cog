import { browser } from "$app/environment"

/*
All saving to local storage management should be done through this class
*/
export const localStateManager = {
    getItem(key: string) {
        if (browser) {
            return window.localStorage.getItem(key);
        }
        return null
    },
    setItem(key: string, value: unknown) {
        if (browser) {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    },
    clearItem(key: string) {
        if (browser) {
            window.localStorage.removeItem(key);
        }
    },
    clearAll() {
        if (browser) {
            window.localStorage.clear();
        }
    },
    view() {
        if (browser) {
            console.log("session storage: ", window.localStorage)
        }
    },
};
