import settings from "../lib/settings.json";
import emojis from '$lib/emojis.json';
import type { IEmoji, IEmojiPool } from "$lib/interfaces";

export const generateRandomEmojis = (): IEmojiPool => {

    const totalWords = emojis.length;
    const pool = new Set<IEmoji>();
    while (pool.size < settings.itemRecallPoolSize) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        pool.add(emojis[randomIndex] as IEmoji);
    }

    const correct = new Set<IEmoji>();

    while (correct.size < settings.itemRecallCount) {
        const randomIndex = Math.floor(Math.random() * pool.size);
        correct.add(emojis[randomIndex] as IEmoji);
    }

    return { correct: Array.from(correct), pool: Array.from(pool) } as IEmojiPool
}