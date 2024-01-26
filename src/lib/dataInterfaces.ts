import type { Writable } from "svelte/store";

interface IPage {
    path: string,
    enableNext: boolean,
    name: string,
    timesVisited: number,
}

interface ITaskPage extends IPage {
    corrections: number;
    score: number;
    success: boolean;
    comment?: string;
    guesses?: string[];
    showWords?: boolean;
    hands?: {
        targetTimestamp: ITimeStamp,
        hour: IHand,
        minute: IHand,
    };
    markers?: IMarker[];
}

interface ITimeStamp {
    hour: number;
    minute: number;
    name: string;
}

interface IHand {
    name: string;
    angle: number;
    active: boolean;
    pointsAt?: number;
    placed?: boolean;
}

interface IMarker {
    id: number,
    x: number,
    y: number,
    active: boolean,
    pointsAt?: number,
    angle?: number,
    isInsideClock?: boolean,
}


interface ISUSPage extends IPage {
    questions: [{
        id: string;
        question: string;
        score?: number;
    }
    ];

}

interface IMetaData {
    date: Date;
    version: string;
}

interface IUser extends IPage {
    phone?: number | undefined;
    gender?: "male" | "female" | "other" | "prefer not to say" | undefined;
    age?: number | undefined;
    domain?: "design" | "UX" | "web development" | "programming" | "caregiver" | "games" | "psychology" | "other" | string | undefined; //come up with more examples
}


interface ISettings {
    wordcount: number;
    language: string;
    storageKey: string;
}

interface IAppData {
    metadata: IMetaData,
    settings: ISettings
    pages: {
        home: Writable<IPage>,
        wordregistration: Writable<ITaskPage>,
        clockpoint: Writable<ITaskPage>,
        clockdraw: Writable<ITaskPage>,
        wordrecall: Writable<ITaskPage>,
        result: Writable<IPage>,
        survey: Writable<IPage>,
        user: Writable<IUser>,
        sus: Writable<ISUSPage>,
        about: Writable<IPage>,
        end: Writable<IPage>
    },
    data: {
        words: Writable<string[]>,
        consent: Writable<boolean>,
    }
}

export type { ITaskPage, IPage, IMetaData, IUser, ISUSPage, IHand, IMarker, IAppData, ISettings }