import type { IAppData, IHands, IMarker, } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomWords } from "../scripts/generateRandomWords";
import { generateExampleBalls } from "../scripts/generateExampleBalls";
import { writable } from "svelte/store";

export const defaultAppData: IAppData = {
    consent: resettableStore<boolean>(() => false),
    words: resettableStore<string[]>(() => generateRandomWords()),
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