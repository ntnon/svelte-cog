import settings from "../lib/settings.json";
import emojis from '$lib/emojis.json';
import type { IEmoji } from "$lib/interfaces";

export const generateRandomEmojis = () => {
    const count = settings.wordRecallCount;
    const totalWords = emojis.length;
    const sample = new Set<IEmoji>();
    while (sample.size < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(emojis[randomIndex] as IEmoji);
    }
    return Array.from(sample);
}