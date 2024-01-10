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

const SESSION_STORAGE_KEY = "nydon-website";

export const sessionStateManager = {
    getWords() {
        if (!browser) return null;
        const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        console.log("storage object: ", storageObject)
        if (storageObject.words.length !== wordCount) {
            console.log("hi")
            storageObject.words = randomWords(dictionary);
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storageObject));
        }
        return storageObject.words;

    },
    getItem(key: string) {
        if (!browser) return null;
        const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        return storageObject[key];
    },
    setItem(key: string, value: unknown) {
        if (!browser) return null;

        const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        storageObject[key] = value;
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storageObject));

    },
    clearItem(key: string) {
        if (!browser) return null;
        const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        delete storageObject[key];
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(storageObject));

    },
    clearAll() {
        if (!browser) return null;

        window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({}));

    },
    viewSessionState() {
        if (!browser) return null;

        console.log("session storage: ", window.sessionStorage)

    },
    getItemArray(key: string) {
        if (!browser) return null;
        const storageObject = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        return storageObject[key] ? storageObject[key] : null;

    },
};