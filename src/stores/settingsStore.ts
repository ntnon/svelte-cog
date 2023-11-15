import { writable } from 'svelte/store';

export const settingsStore = writable({
    lang: "english", // Default language. Alternative: "norsk"
    wordRecallSampleSize: 3
});