import { writable } from "svelte/store";
import { browser } from "$app/environment";

let storageObject: Storage = {
    length: 0,
    clear: function () { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem: function (key: string) { return null; },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: function (index: number) { return null; },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: function (key: string) { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setItem: function (key: string, value: string) { }
};

if (browser) {
    storageObject = window.sessionStorage;
}

export const ssmSyncedStore = <T extends object | unknown[] | unknown>(key: string, defaultValueGenerator: () => T, _storageLocation: Storage = storageObject) => {
    const fullKey = "nydon-website/" + key;
    const { subscribe, set, update } = writable<T>();

    const saveToStorage = () => {
        subscribe((value) =>
            _storageLocation[fullKey] = JSON.stringify(value))
    };

    const loadFromStorage = () => {
        let item = undefined;
        try {
            item = JSON.parse(_storageLocation[fullKey]);
        } catch (e) {
            //handle error
        }
        if (item !== undefined) {
            set(item);
        } else {
            const newValue = defaultValueGenerator();
            set(newValue);
        }
        saveToStorage();
    };

    loadFromStorage();

    return {
        subscribe,
        set,
        saveToStorage,
        loadFromStorage,
        update,
    };
}