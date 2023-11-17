import { writable } from 'svelte/store';
import { sessionStateManager as ssm } from './sessionStateManager';
import dict from './words.json'

interface Dict {
    [key: string]: string[];
}
// collect these from a settings file
const dictionaries: Dict = dict;
const lang = "norsk"
const dictionary = dictionaries[lang];
const sampleSize = 3;
// --
const key = "words"

export const wordStore = writable<string[]>();
wordStore.set(initialize(dictionary, sampleSize));

wordStore.subscribe((value) => {
    ssm.setItem(key, value);
});

function randomWords(wordList: string[], size: number): string[] {
    const totalWords = wordList.length;
    const sample: string[] = [];
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.push(wordList[randomIndex]);
    }
    return sample;
}
//if the key is not set, initialize it with a random sample
function initialize(dict: string[], size: number = sampleSize): string[] {
    const currentValue = ssm.getItemArray(key);
    if (currentValue === undefined) {
        return randomWords(dict, size);
    }
    return currentValue;
}