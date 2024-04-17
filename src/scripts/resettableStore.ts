import { writable } from "svelte/store";
import type { IResettableStore, ITaskData, IResettableTaskStore } from "$lib/interfaces";


export const resettableTaskStore = <T>(data: T): IResettableTaskStore<ITaskData<T>> => {

    const { set, update, subscribe } = writable<ITaskData<T>>({
        data,
        completed: false,
        score: 0,
        errors: 0
    });

    const resetData = () => update(
        (v) => ({ ...v, data: data }) // Call generator() immediately
    );

    const reset = () => set({
        data: data,
        completed: false,
        score: 0,
        errors: 0
    });

    const incrementHint = () => update(
        (v) => ({ ...v, hints: v.errors + 1 })
    );

    const complete = (bool: boolean) => update(
        (v) => ({ ...v, completed: bool })
    );


    return {
        subscribe,
        set,
        update,
        resetData,
        incrementHint,
        reset,
        complete: (bool: boolean) => complete(bool)
    }
}

export const resettableStore = <T>(data: T): IResettableStore<T> => {
    const { subscribe, set, update } = writable<T>(data);
    const reset = () => {
        console.log("resetting");
        set(data);
    }
    return {
        subscribe,
        set,
        update,
        reset,
    }
}