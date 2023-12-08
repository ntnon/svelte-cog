import { browser } from "$app/environment"
const LOCAL_STORAGE_KEY = "nydon-website";

/*
All saving to local storage management should be done through this class
*/

export const localStateManager = {
    getItem(key: string) {
        if (browser) {
            const storageObject = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            return storageObject[key];
        }
        return null;
    },
    setItem(key: string, value: unknown) {
        if (browser) {
            const storageObject = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            console.log("local storage", LOCAL_STORAGE_KEY, key, value)
            storageObject[key] = value;
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObject));
        }
    },
    clearItem(key: string) {
        if (browser) {
            const storageObject = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            delete storageObject[key];
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageObject));
        }
    },
    clearAll() {
        if (browser) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
        }
    },
    view() {
        if (browser) {
            console.log("session storage: ", window.localStorage)
        }
    },
};