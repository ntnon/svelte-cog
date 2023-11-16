import { browser } from "$app/environment"

export const SessionStateManager = {
    getItem(key: string) {
        if (browser) {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
    },
    setItem(key: string, value: unknown) {
        if (browser) {
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
    }
};
