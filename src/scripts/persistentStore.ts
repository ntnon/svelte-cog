import { storageSelector } from "$lib/state.svelte";
import type { StorageType } from "$lib/types";
import { writable } from "svelte/store";
import { defaultAppData as data } from "$lib/defaultAppData";

export const persistentStore = <T>(key: string, storage: StorageType, initialData: T) => {
    const { subscribe, set, update } = writable<T>(initialData);
    subscribe((value) => {
        const fullKey = data.settings.storageKey + key;
        const storageObject = storageSelector(storage);
        storageObject.setItem(fullKey, JSON.stringify(value));
        return value;
    })
    return {
        subscribe,
        set,
        update,
    }
}