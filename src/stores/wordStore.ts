import { writable } from 'svelte/store';
import { sessionStateManager as ssm } from './sessionStateManager';
import dict from './words.json'
import { onMount } from 'svelte';

interface Dict {
    [key: string]: string[];
}

const dictionaries: Dict = dict;
const lang = "norsk"
const sampleSize = 3;

export const wordStore = writable<string[]>();
wordStore.set(getWordsFromSessionStorage());

wordStore.subscribe((value) => {
    ssm.setItem("words", value);
});

function getRandomSubset(wordList: string[], size: number): string[] {
    const totalWords = wordList.length;
    const sample: string[] = [];
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.push(wordList[randomIndex]);
    }
    return sample;
}

function getWordsFromSessionStorage() {
    const storedWords = ssm.getItem("words");
    if (storedWords === null || storedWords === undefined || storedWords === "undefined") {
        return getRandomSubset(dictionaries[lang], sampleSize)
    }
    return JSON.parse(storedWords);
}
