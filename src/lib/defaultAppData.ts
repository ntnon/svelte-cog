import type { IAppData, IHands, IMarker, IEmojiPool, IEmoji } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomEmojis } from "../scripts/generateRandomEmojis";
import { generateExampleBalls } from "../scripts/generateExampleBalls";
import { writable } from "svelte/store";

export const defaultAppData: IAppData = {
    points: writable(0),
    consent: resettableStore<boolean>(() => false),
    recallItems: resettableStore<IEmojiPool>(() => generateRandomEmojis()),
    isAnimating: writable(false),
    taskData: {
        markers: resettableTaskStore<IMarker[]>(() => generateClockMarkers()),
        hands: resettableTaskStore<IHands>(() => generateClockHands()),
        shortRecall: resettableTaskStore<IEmoji[]>(() => []),
        longRecall: resettableTaskStore<IEmoji[]>(() => []),
        exampleTask: resettableTaskStore(() => generateExampleBalls(4))
        //expandable
    }
    //expandable

}