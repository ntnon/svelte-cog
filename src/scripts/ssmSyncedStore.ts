import { writable } from "svelte/store";
import { sessionStateManager as ssm } from "../stores/sessionStateManager"


export const ssmSyncedStore = <T>(key: string, defaultValueGenerator: () => T[]) => {
    const { subscribe, set, update } = writable<T[]>([]);
    const sync = () => {
        console.log("syncing to session storage", key)
        subscribe((value) => ssm.setItem(key, value));
    };

    const catchUp = () => {
        console.log("catching up", key);
        const item = ssm.getItem(key);
        if (item && Array.isArray(item) && item.length > 0) {
            set(item);
        } else {
            const newValue = defaultValueGenerator();
            set(newValue);
        }
        sync();
    };

    catchUp();

    return {
        subscribe,
        set,
        sync,
        catchUp,
        update,
    };
}

export const taskDataStore = <T extends { id: number | string }>(key: string, defaultValueGenerator: () => T[]) => {
    const baseStore = ssmSyncedStore<T>(key, defaultValueGenerator);
    const { subscribe, set, sync, catchUp, update } = baseStore;

    const listUpdate = (newData: T) => {
        update((value) => value.map((data) => data.id === newData.id ? newData : data));
    }

    return {
        subscribe,
        set,
        sync,
        catchUp,
        update: listUpdate,
    };
};