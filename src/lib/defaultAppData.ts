import type { IAppData, IHands, IMarker } from "./interfaces";
import { createResettableStore } from "../scripts/resettableStore";
import { generateClockMarkers } from "../scripts/generateClockMarkers";
import { generateClockHands } from "../scripts/generateClockHands";
import { generateRandomWords } from "../scripts/generateRandomWords";


export const defaultAppData: IAppData = {
    consent: createResettableStore<boolean>(() => false),
    words: createResettableStore<string[]>(() => generateRandomWords()),
    markers: createResettableStore<IMarker[]>(() => generateClockMarkers()),
    hands: createResettableStore<IHands>(() => generateClockHands()),
    recallGuesses: createResettableStore<string[]>(() => []),
    registrationGuesses: createResettableStore<string[]>(() => []),
}