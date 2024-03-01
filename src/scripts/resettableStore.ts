import { writable } from "svelte/store";
import type { IResettableStore, ITaskData, IResettableTaskStore } from "$lib/interfaces";


export const resettableTaskStore = <T>(generator: () => T): IResettableTaskStore<ITaskData<T>> => {
    const data = generator();
    const { set, update, subscribe } = writable<ITaskData<T>>({
        data,
        completed: false,
        score: 0
    });

    const resetData = () => update(
        (v) => ({ ...v, data: generator() }) // Call generator() immediately
    );

    const reset = () => set({
        data: generator(),
        completed: false,
        score: 0
    });

    return {
        subscribe,
        set,
        update,
        resetData,
        reset
    }
}

export const resettableStore = <T>(generator: () => T): IResettableStore<T> => {
    const { subscribe, set, update } = writable<T>(generator());
    const reset = () => set(generator());
    return {
        subscribe,
        set,
        update,
        reset,
    }
}