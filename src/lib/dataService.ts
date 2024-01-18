import { browser } from "$app/environment";
import settings from "./settings.json"
import type { StorageType } from "./types";

export function getData<T>(key: string, storageKey: StorageType, defaultValue: T): T | null {
    if (!browser) return defaultValue;
    const fullKey = settings.key + key;
    const storageObject: Storage = storageKey === "local" ? window.localStorage : window.sessionStorage;
    const returnData = storageObject.getItem(fullKey)
    if (returnData === null || returnData === "undefined") {
        return defaultValue;
    }
    return JSON.parse(returnData);
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