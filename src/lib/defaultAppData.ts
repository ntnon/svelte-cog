import type { IAppData, IHands, IMarker, IEmoji } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomEmojis } from "../scripts/generateRandomEmojis";
import { generateExampleBalls } from "../scripts/generateExampleBalls";
import { writable } from "svelte/store";

export const defaultAppData: IAppData = {
    points: writable(0),
    consent: resettableStore<boolean>(() => false),
    words: resettableStore<IEmoji[]>(() => generateRandomEmojis()),
    isAnimating: writable(false),
    taskData: {
        markers: resettableTaskStore<IMarker[]>(() => generateClockMarkers()),
        hands: resettableTaskStore<IHands>(() => generateClockHands()),
        recallGuesses: resettableTaskStore<string[]>(() => []),
        registrationGuesses: resettableTaskStore<string[]>(() => []),
        exampleTask: resettableTaskStore(() => generateExampleBalls(4))
        //expandable
    }
    //expandable

}