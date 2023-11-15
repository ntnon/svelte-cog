import { settingsStore } from './settingsStore';
import { SessionStorageManager as ssm } from './sessionStorage';
import dict from './words.json'

function getRandomSubset(words: string[], size: number): string[] {
    const sample = [];
    console.log(words)
    const totalWords = words.length;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.push(words[randomIndex]);
    }
    return sample;
}

function updateWords(lang: string, sampleSize: number) {
    try {
        const words: string[] = dict[lang as keyof typeof dict]; // Access the correct property based on the language parameter
        console.log("words: ", words)
        const newWords = getRandomSubset(words, sampleSize)
        ssm.setState("words", newWords);
        return
    }
    catch (err) {
        console.error("Language not supported");
        return;
    }
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