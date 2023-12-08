import { browser } from "$app/environment"

/*
All saving to session storage management should be done through this class
*/
const SESSION_STORAGE_KEY = "nydon-website";

export const sessionStateManager = {
    getItem(key: string) {
        if (browser) {
            const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
            return storageObject[key];
        }
        return null;
    },
    setItem(key: string, value: unknown) {
        if (browser) {
            const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
            storageObject[key] = value;
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storageObject));
        }
    },
    clearItem(key: string) {
        if (browser) {
            const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
            delete storageObject[key];
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storageObject));
        }
    },
    clearAll() {
        if (browser) {
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({}));
        }
    },
    viewSessionState() {
        if (browser) {
            console.log("session storage: ", window.sessionStorage)
        }
    },
    getItemArray(key: string) {
        if (browser) {
            const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
            return storageObject[key] ? storageObject[key] : undefined;
        }
        return undefined;
    },
};