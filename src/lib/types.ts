import type { ITaskData, ISUSData } from "./dataInterfaces"


type DataSchema = {
    consent: boolean,
    words: string[],
    tasks: { [key: string]: ITaskData },
    sus: { [key: string]: ISUSData },
}

type StorageType = "local" | "session"

export type { DataSchema, StorageType }