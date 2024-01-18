import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { dummyStore } from "../scripts/dummyStore";
import settings from "$lib/settings.json"

export const ssmSyncedStore = <T extends object | unknown[] | unknown>(key: string, defaultValueGenerator: () => T, _storageLocation: Storage = dummyStore) => {
    const { subscribe, set, update } = writable<T>();
    const fullKey = "nydon-website/" + key;
    const saveToStorage = () => {
        subscribe((value) => { //
            console.log("saving to storage...")
            _storageLocation[fullKey] = JSON.stringify(value)

        })
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
        update,
    };
}

const storageSelector = (type: "local" | "session" | "server"): Storage => {
    if (!browser) {
        return dummyStore
    }
    switch (type) {
        case "local":
            return window.localStorage
        case "session":
            return window.sessionStorage;
        case "server":
            return dummyStore; // implement later ?
    }
}

const dataService = (storage: Storage) => {
    const results: { [key: string]: unknown } = {};
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const value = storage.getItem(key);
        if (!value) continue;

        if (key.startsWith("nydon-website/")) {
            results[key] = JSON.parse(value)
        }
    }
    return results
}

export const centralStore = (storageObject: Storage, storageKey: string, existingData?: { [key: string]: unknown }) => {

    const { subscribe, set, update } = writable<{ [key: string]: unknown }>({});
    const customUpdate = (key: string, value: unknown) => {
        return update((last) => {

            return { ...last, [key]: value }
        })
    }
    if (existingData) { //if existing data is passed, update the store with it
        const keys = Object.keys(data);
        keys.forEach(key => {
            customUpdate(key, existingData[key])
        })
    }



    return {
        subscribe,
        set,
        update: customUpdate
    }
}

const storageKey = settings.key
const storage = storageSelector("session")
let data = {}

if (storage) {
    data = dataService(storage)
}

export const mainStore = centralStore(storage, storageKey, data);