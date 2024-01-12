import type { ITaskData } from "$lib/dataInterfaces";
import settings from "../lib/settings.json";
import dictionary from '../lib/words.json';
import { ssmSyncedStore, taskDataStore } from "../scripts/ssmSyncedStore";


/*
All saving to session storage management should be done through this class
*/

const wordCount = settings.wordRecallCount;

const randomWords = (wordList: string[], count: number = wordCount) => {
    const totalWords = wordList.length;
    const sample = new Set<string>();
    while (sample.size < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(dictionary[randomIndex]);
    }
    return Array.from(sample);
}



export const wordStore = ssmSyncedStore<string>('words', () => randomWords(dictionary, wordCount));
/*
export const taskDataStore = ssmSyncedStore('taskData', () => []);
*/
export const guessStore = ssmSyncedStore("guesses", () => new Array(settings.wordRecallCount).fill(''));

export const taskData = taskDataStore<ITaskData>('taskData', () => []);
