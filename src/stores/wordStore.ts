import { sessionStateManager as ssm } from './sessionStateManager';
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
    const totalWords = wordList.length;
    const sample: string[] = [];
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