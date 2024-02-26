import type { ITaskData, ISUS } from "../lib/interfaces"


type DataSchema = {
    consent: boolean,
    words: string[],
    tasks: { [key: string]: ITaskData },
    sus: { [key: string]: ISUS },
}

type StorageType = "local" | "session"

type InteractionEvent = MouseEvent | TouchEvent;


export type { DataSchema, StorageType, InteractionEvent }