import settings from "../lib/settings.json";
import dictionary from '../lib/words.json';
import { ssmSyncedStore } from "../scripts/ssmSyncedStore";

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

export const wordStore = ssmSyncedStore('words', () => randomWords(dictionary, wordCount));

export const consentStore = ssmSyncedStore("consent", () => false);
