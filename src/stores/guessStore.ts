import { writable } from "svelte/store";
import settings from "$lib/settings.json";



const createGuessStore = () => {
    const { subscribe, set, update } = writable(new Array(settings.wordRecallCount).fill(''));

    return {
        subscribe,
        clear: () => set(new Array(settings.wordRecallCount).fill('')),
        update
    };
}

export const guessStore = createGuessStore();