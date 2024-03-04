import { browser } from "$app/environment";
import type { StorageType } from "./types";
import type { IAppData, IHand, IMarker } from "../lib/interfaces"
import { persistentStore } from "../scripts/persistentStore";
import { getRandomTimeStamp } from "../scripts/generateTimestamp";
import { generateRandomWords } from "../scripts/generateRandomWords";

const timestamp = getRandomTimeStamp();

const storageKey = "nydon-website"

const randomAngle = () => {
    return Math.floor(Math.random() * 360);
}

const generateMarkers = (): IMarker[] => {
    return Array.from({ length: 12 }, (_, i) => {
        return {
            id: i + 1,
            x: 0,
            y: 0,
            angle: 0,
            active: false,
            pointsAt: 0,
            isInsideClock: false,
        }
    })
}

const hands: IHand[] = [
    {
        name: "hour",
        angle: randomAngle(),
        active: false,
        pointsAt: 0,
        placed: false,
        target: timestamp.hour
    },
    {
        name: "minute",
        angle: randomAngle(),
        active: false,
        pointsAt: 0,
        placed: false,
        target: timestamp.minute / 5
    }
]


export function getData<T>(key: string, storageKey: StorageType, defaultValue: T): T {
    if (!browser) {
        return defaultValue
    }
    const fullKey = storageKey + key;
    const storageObject: Storage = storageKey === "local" ? window.localStorage : window.sessionStorage;
    const returnData = storageObject.getItem(fullKey)
    if (returnData === null || returnData === "undefined") { // TODO: Ensure the type for the return object matches T
        return defaultValue;
    }
    return JSON.parse(returnData);
}

// const wordregistrationData = getData<ITaskGuess>(data.pages.wordregistration.path, "session", data.pages.wordregistration);
// const wordrecallData = getData<ITaskGuess>(data.pages.wordrecall.path, "session", data.pages.wordrecall);
// const clockpointData = getData<ITaskClockpoint>(data.pages.clockpoint.path, "session", data.pages.clockpoint);
// const clockdrawData = getData<ITaskClockdraw>(data.pages.clockdraw.path, "session", data.pages.clockdraw);
// const userData = getData<IUser>(data.pages.user.path, "session", data.pages.user);
// const susData = getData<ISUSPage>(data.pages.sus.path, "session", data.pages.sus);
const wordsData = getData<string[]>("/words", "session", generateRandomWords());
const guessData = getData<string[]>("/guess", "session", []);

const consentData = getData<boolean>("/consent", "local", false);
const handsData = getData<IHand[]>("/clockpoint", "session", hands);
const markersData = getData<IMarker[]>("/markers", "session", generateMarkers());


export function getAppData(): IAppData {
    return {
        metadata: {
            date: new Date(),
            version: "1.0",
        },
        settings: {
            wordcount: 3,
            language: "english",
            storageKey: storageKey,
        },
        data: {
            consent: persistentStore<boolean>("/consent", "local", consentData),
            words: persistentStore<string[]>("/words", "session", wordsData),
            guesses: persistentStore<string[]>("/guess", "session", guessData),
            hands: persistentStore<IHand[]>("/clockpoint", "session", handsData),
            markers: persistentStore<IMarker[]>("/markers", "session", markersData),
        },
    }
}


// import type { ISUSData, ISurveyData, ITaskData } from "./dataInterfaces";
// import { storageSelector } from "./state.svelte";
// import type { DataSchema } from "./types";
// export function getFromStorage<T>(key: string, storageType: StorageType): T {
//     const storageObject = storageSelector(storageType);
//     return JSON.parse(storageObject[key] || "null");
// }

// export function getAllData(): DataSchema {
//     return {
//         consent: getFromStorage<boolean>("consent", "local"),
//         words: getFromStorage<string[]>("words", "session"),
//         tasks: {
//             clockPoint: getFromStorage<ITaskData>("clockPoint", "session"),
//         },
//         survey: getFromStorage<{ [key: string]: ISurveyData }>("survey", "session"),
//         sus: getFromStorage<{ [key: string]: ISUSData }>("sus", "session"),
//     }
// }