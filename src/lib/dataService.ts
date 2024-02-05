import { browser } from "$app/environment";
import type { StorageType } from "./types";
import type { IAppData, IPage, ISUSPage, ITaskClockdraw, ITaskClockpoint, ITaskGuess, IUser } from "./interfaces"
import { persistentStore } from "../scripts/persistentStore";
import { defaultAppData } from "./defaultAppData";
import { writable } from "svelte/store";

function getDefaultAppData() {
    return JSON.parse(JSON.stringify(defaultAppData));
}

const data = getDefaultAppData() // creates a copy of the default values


export function getData<T>(key: string, storageKey: StorageType, defaultValue: T): T {
    if (!browser) {
        return defaultValue
    }
    const fullKey = data.settings.storageKey + key;
    const storageObject: Storage = storageKey === "local" ? window.localStorage : window.sessionStorage;
    const returnData = storageObject.getItem(fullKey)
    if (returnData === null || returnData === "undefined") { // TODO: Ensure the type for the return object matches T

        return defaultValue;
    }

    return JSON.parse(returnData);
}

const metadata = data.metadata;
const settings = data.settings;
const wordregistrationData = getData<ITaskGuess>(data.pages.wordregistration.path, "session", data.pages.wordregistration);
const wordrecallData = getData<ITaskGuess>(data.pages.wordrecall.path, "session", data.pages.wordrecall);
const clockpointData = getData<ITaskClockpoint>(data.pages.clockpoint.path, "session", data.pages.clockpoint);
const clockdrawData = getData<ITaskClockdraw>(data.pages.clockdraw.path, "session", data.pages.clockdraw);
const userData = getData<IUser>(data.pages.user.path, "session", data.pages.user);
const susData = getData<ISUSPage>(data.pages.sus.path, "session", data.pages.sus);
const wordsData = getData<string[]>("/words", "session", data.data.words);


export function getAppData(): IAppData {
    return {
        metadata: metadata,
        settings: settings,
        pages: {
            home: writable<IPage>(data.pages.home),
            wordregistration: persistentStore<ITaskGuess>(wordregistrationData.path, "session", wordregistrationData),
            clockdraw: persistentStore<ITaskClockdraw>(clockdrawData.path, "session", clockdrawData),
            clockpoint: persistentStore<ITaskClockpoint>(clockpointData.path, "session", clockpointData),
            wordrecall: persistentStore<ITaskGuess>(wordrecallData.path, "session", wordrecallData),
            result: writable<IPage>(data.pages.result),
            survey: writable<IPage>(data.pages.survey),
            user: persistentStore<IUser>(userData.path, "session", userData),
            sus: persistentStore<ISUSPage>(susData.path, "session", susData),
            about: writable<IPage>(data.pages.about),
            end: writable<IPage>(data.pages.end),
        },
        data: {
            consent: persistentStore<boolean>("/consent", "local", data.data.consent),
            words: persistentStore<string[]>("/words", "session", wordsData),
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