import { browser } from "$app/environment"

/*
All saving to session storage should be done through this class
*/
export const sessionStateManager = {
    getItem(key: string) {
        if (browser) {
            return window.sessionStorage.getItem(key);
        }
        return null
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
    },
    viewSessionState() {
        if (browser) {
            console.log("session storage: ", window.sessionStorage)
        }
    },
    getItemArray(key: string) { //if a key contains an array, this will return it
        const storedWords = this.getItem(key);
        if (storedWords && storedWords !== "undefined") {
            const array = JSON.parse(storedWords) as [];
            return array.length !== 0 ? array : undefined;
        }
    },
};
