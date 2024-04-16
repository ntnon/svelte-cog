import settings from "../lib/settings.json";
import emojis from '$lib/emojis.json';
import type { IEmoji, IEmojiPool } from "$lib/interfaces";

export const generateRandomEmojis = (): IEmojiPool => {
    const count = settings.wordRecallSample;
    const totalWords = emojis.length;
    const sample = new Set<IEmoji>();
    while (sample.size < count) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sample.add(emojis[randomIndex] as IEmoji);
    }

    const correct = new Set<IEmoji>();

    while (correct.size < settings.wordRecallCount) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        correct.add(emojis[randomIndex] as IEmoji);
    }

    return { correct: Array.from(correct), pool: Array.from(sample) } as IEmojiPool
}