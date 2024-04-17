import type { IAppData, IHands, IMarker, IEmojiPool, IEmoji } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/dataGen/generateClockMarkers";
import { generateClockHands } from "../scripts/dataGen/generateClockHands";
import { generateRandomEmojis } from "../scripts/dataGen/generateRandomEmojis";
import { generateExampleBalls } from "../scripts/dataGen/generateExampleBalls";
import { writable } from "svelte/store";

const generatedEmojis = generateRandomEmojis();
const correctItems = generatedEmojis.correct

export const defaultAppData: IAppData = {
    points: writable(0),
    pageIndex: writable(0),
    consent: resettableStore<boolean>(false),
    recallItems: resettableStore<IEmoji[]>(correctItems),
    isAnimating: writable(false),
    taskData: {
        markers: resettableTaskStore<IMarker[]>(generateClockMarkers()),
        hands: resettableTaskStore<IHands>(generateClockHands()),
        itemRegistration: resettableTaskStore<boolean>(false),
        shortRecall: resettableTaskStore<IEmojiPool>(generateRandomEmojis(correctItems)),
        longRecall: resettableTaskStore<IEmojiPool>(generateRandomEmojis(correctItems)),
        exampleTask: resettableTaskStore(generateExampleBalls(4))
        //expandable
    }
    //expandable

}