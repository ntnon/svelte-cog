import type { IAppData, IHands, IMarker, } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomWords } from "../scripts/generateRandomWords";
import { generateExampleBalls } from "../scripts/generateExampleBalls";


export const defaultAppData: IAppData = {
    consent: resettableStore<boolean>(() => false),
    words: resettableStore<string[]>(() => generateRandomWords()),
    taskData: {
        markers: resettableTaskStore<IMarker[]>("Clock Draw", () => generateClockMarkers()),
        hands: resettableTaskStore<IHands>("Clock Hands", () => generateClockHands()),
        recallGuesses: resettableTaskStore<string[]>("Recall", () => []),
        registrationGuesses: resettableTaskStore<string[]>("Registration", () => []),
        exampleTask: resettableTaskStore("Example", () => generateExampleBalls(4))
        //expandable
    }
    //expandable

}