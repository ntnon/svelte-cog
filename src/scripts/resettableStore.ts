import { writable } from "svelte/store";
import type { IResettableStore, ITaskData, IResettableTaskStore } from "$lib/interfaces";


export const resettableTaskStore = <T>(taskName: string, generator: () => T): IResettableTaskStore<ITaskData<T>> => {
    const data = generator();
    const { set, update, subscribe } = writable<ITaskData<T>>({
        name: taskName,
        data,
        completed: false,
        score: 0,
        hints: 0
    });

    const resetData = () => update(
        (v) => ({ ...v, data: generator() }) // Call generator() immediately
    );

    const reset = () => set({
        name: taskName,
        data: generator(),
        completed: false,
        score: 0,
        hints: 0
    });

    const incrementHint = () => update(
        (v) => ({ ...v, hints: v.hints + 1 })
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

export const resettableStore = <T>(generator: () => T): IResettableStore<T> => {
    const { subscribe, set, update } = writable<T>(generator());
    const reset = () => {
        console.log("resetting");
        set(generator());
    }
    return {
        subscribe,
        set,
        update,
        reset,
    }
}