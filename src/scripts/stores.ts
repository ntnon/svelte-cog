import { writable } from "svelte/store";
import type { IResettableStore, ITaskData, IResettableTaskStore, IRewardStore, IRewards } from "$lib/interfaces";

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

export const rewardStore = <T>(): IRewardStore<T> => {
    const initialRewards: IRewards<T> = {
        options: [] as T[],
        selected: [] as T[],
        locked: [] as T[],
        maxRewards: 1,
        validSelection: false,
    };

    const { subscribe, set, update } = writable<IRewards<T>>(initialRewards);

    const removeFromArray = (arr: T[], item: T) => arr.filter((i) => i !== item);

    const select = (item: T) => update((v) => {
        const options = Array.from(new Set(removeFromArray(v.options, item)))
        const selected = Array.from(new Set([...v.selected, item]))
        const validSelection = selected.length === v.maxRewards

        if (v.selected.length >= v.maxRewards) {
            return ({
                ...v,
                options: [...options, v.selected[0]],
                selected: removeFromArray(selected, v.selected[0]),
                validSelection: v.selected.length === v.maxRewards
            })
        }

        else return ({
            ...v,
            options,
            selected,
            validSelection
        })
    });

    const deselect = (item: T) => update((v) => {
        const options = Array.from(new Set([...v.options, item]))
        const selected = Array.from(new Set(removeFromArray(v.selected, item)))
        const validSelection = selected.length === v.maxRewards

        return ({
            ...v,
            options, selected, validSelection
        })
    });

    const lock = () => update((v) => ({
        ...v,
        options: [],
        selected: [],
        locked: [...v.locked, ...v.selected],
    }));

    return {
        subscribe,
        set,
        update,
        select,
        deselect,
        lock,
    }
}
