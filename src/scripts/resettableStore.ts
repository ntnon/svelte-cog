import { writable } from "svelte/store";
import type { IResettableStore } from "$lib/interfaces";


export const createResettableStore = <T>(generator: () => T): IResettableStore<T> => {
    const { subscribe, set, update } = writable<T>(generator());
    const reset = () => set(generator());
    return {
        subscribe,
        set,
        update,
        reset,
    }
}