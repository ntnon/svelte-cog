import { SessionStorageManager as ssm } from './sessionStorage';
import dict from './words.json'
import { writable } from 'svelte/store';

interface Dict {
    [key: string]: string[];
}

const dictionaries: Dict = dict;
const words: string[] = ssm.getItem("words") || [];
const lang = "norsk"
const sampleSize = 3;

if (words.length === 0) {

    ssm.setItem("words", getRandomSubset(dictionaries[lang], sampleSize));
}

export const wordStore = writable(words);

function getRandomSubset(wordList: string[], size: number): string[] {
    const sample = [];
    const totalWords = wordList.length;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.push(wordList[randomIndex]);
    }
    return sample;
}

export function resetWords() {
    const newWords = getRandomSubset(dictionaries[lang], sampleSize)
    wordStore.set(newWords)
    ssm.setItem("words", newWords)
}

/* 

import { settingsStore } from './settingsStore';

function updateWords(lang: string, sampleSize: number) {
    try {
        const newWords = getRandomSubset(dictionaries[lang], sampleSize);
        ssm.setState("words", newWords);
        return newWords;
    }
    catch (err) {
        console.error(err);
        return;
    }
}

export async function resetWords() {
    ssm.clearState("words");
    getWords();
}

export async function getWords() {
    console.log("getWords")
    if (ssm.getState("words") === null) {
        settingsStore.subscribe(value => {
            const lang = value.lang;
            const sampleSize = value.wordRecallSampleSize;
            updateWords(lang, sampleSize);
        })
    }
    return ssm.getState("words");
}
*/