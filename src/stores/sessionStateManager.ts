import { browser } from "$app/environment"
import settings from "../lib/settings.json";
import dictionary from '../lib/words.json';

/*
All saving to session storage management should be done through this class
*/

const wordCount = settings.wordRecallCount;

function randomWords(wordList: string[]) {
    const totalWords = wordList.length;
    const sample = new Set<string>();
    while (sample.size < wordCount) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(dictionary[randomIndex]);
    }
    return Array.from(sample);
}

export const sessionStateManager = {
    getWords() {
        if (!browser) return null;
        const storageObject = window.sessionStorage;
        if (!storageObject.words || storageObject.words.length !== wordCount) {
            storageObject.words = randomWords(dictionary);
            window.sessionStorage.setItem("words", JSON.stringify(storageObject));
        }
        return storageObject.words;

    },
    getItem(key: string) {
        if (!browser) return null;
        const storageObject = window.sessionStorage;
        console.log("this is the storage: ", storageObject)
        return storageObject[key] && JSON.parse(storageObject[key]);
    },
    setItem(key: string, value: unknown) {
        if (!browser) return null;
        if (!key || !value) return Error("key or value is null");
        window.sessionStorage[key] = JSON.stringify(value);

    },
    clearItem(key: string) {
        if (!browser) return null;
        const storageObject = window.sessionStorage || {};
        delete storageObject[key];
        window.sessionStorage = storageObject;
    },
    clearAll() {
        if (!browser) return null;
        window.sessionStorage.deleteAll();
    },
    log() {
        if (!browser) return null;
        console.log("session storage: ", window.sessionStorage)
    },
    getItemArray(key: string): [] | null {
        if (!browser) return null;
        const storageObject = window.sessionStorage || {};
        return storageObject[key] ? storageObject[key] : null;
    },
};