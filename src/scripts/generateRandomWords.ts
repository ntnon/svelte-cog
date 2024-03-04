import settings from "../lib/settings.json";
import dictionary from '../lib/words.json';

export const generateRandomWords = () => {
    const count = settings.wordRecallCount;
    const totalWords = dictionary.length;
    const sample = new Set<string>();
    while (sample.size < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(dictionary[randomIndex]);
    }
    return Array.from(sample);
}