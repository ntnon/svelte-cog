import type { IAppData, IHands, IMarker, } from "./interfaces";
import { resettableStore, resettableTaskStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomWords } from "../scripts/generateRandomWords";


export const defaultAppData: IAppData = {
    consent: resettableStore<boolean>(() => false),
    words: resettableStore<string[]>(() => generateRandomWords()),
    taskData: {
        markers: resettableTaskStore<IMarker[]>(() => generateClockMarkers()),
        hands: resettableTaskStore<IHands>(() => generateClockHands()),
        recallGuesses: resettableTaskStore<string[]>(() => []),
        registrationGuesses: resettableTaskStore<string[]>(() => []),
        //expandable
    }
    //expandable

}