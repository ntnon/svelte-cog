import { writable } from "svelte/store";
import type { IResettableStore, IPageData, IResettablePageStore, IRewardStore, IRewards, IEmoji, IChoice } from "$lib/interfaces";

export const resettablePageStore = <T>(data: T): IResettablePageStore<IPageData<T>> => {

    const { set, update, subscribe } = writable<IPageData<T>>({
        data,
        completed: false,
        score: 0,
        errors: 0,
        choices: [],
        currentStage: "initial",
        rewards: [],
        showNav: false,
        showInfo: false,
        showReward: false,
    });

    const resetData = () => update(
        (v) => ({ ...v, data: data }) // Call generator() immediately
    );

    const reset = () => set({
        data: data,
        completed: false,
        score: 0,
        errors: 0,
        choices: [],
        currentStage: "initial",
        rewards: [],
        showNav: false,
        showInfo: false,
        showReward: false,
    });

    const addReward = (reward: IEmoji | IEmoji[]) => update((v) => ({
        ...v,
        rewards: Array.isArray(reward) ? [...v.rewards, ...reward] : [...v.rewards, reward]
    }));
    const incrementHint = () => update(
        (v) => ({ ...v, hints: v.errors + 1 })
    );

    const complete = (bool: boolean) => update(
        (v) => ({ ...v, completed: bool })
    );

    const changeStage = (stage: string) => update((v) => ({
        ...v,
        currentStage: stage,
        enableNextStage: false
    }));

    const addChoice = (choice: IChoice) => update((v) => ({ ...v, choices: [...v.choices, choice] }));

    const enableNext = () => update((v) => ({ ...v, enableNextStage: true }));

    const disableNext = () => update((v) => ({ ...v, enableNextStage: false }));

    const softReset = () => update((v) => ({
        ...v,
        showNav: false,
        showInfo: false,
        showReward: false
    }));

    const showNav = () => update((v) => ({ ...v, showNav: true }));
    const showInfo = () => update((v) => ({ ...v, showInfo: true }));
    const showReward = () => update((v) => ({ ...v, showReward: true }));

    const ready = () => {
        showNav();
        showInfo();
    }


    return {
        subscribe,
        set,
        update,
        resetData,
        incrementHint,
        reset,
        changeStage,
        complete: (bool: boolean) => complete(bool),
        disableNext,
        enableNext,
        addChoice,
        addReward,
        softReset,
        showNav,
        showInfo,
        showReward,
        ready
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
        if (v.locked.includes(item) || v.selected.includes(item)) return ({
            ...v,
            options: removeFromArray(v.options, item),
        })

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
