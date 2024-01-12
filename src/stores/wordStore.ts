import { writable } from "svelte/store";
import settings from "../lib/settings.json";
import dictionary from '../lib/words.json';
import { sessionStateManager as ssm } from "./sessionStateManager"

/*
All saving to session storage management should be done through this class
*/

const wordCount = settings.wordRecallCount;

function randomWords(wordList: string[], count: number = wordCount) {
    const totalWords = wordList.length;
    const sample = new Set<string>();
    while (sample.size < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(dictionary[randomIndex]);
    }
    return Array.from(sample);
}


const createWordStore = () => {
    const { subscribe, set, update } = writable();

    const sync = () => {
        wordStore.subscribe((value) => ssm.setItem("data", value));
        console.log("data synced to session storage")
        ssm.log()
    };

    return {
        subscribe,
        clear: () => set(new Array(settings.wordRecallCount).fill('')),
        update,
        sync,
    };
}

export const wordStore = createWordStore();