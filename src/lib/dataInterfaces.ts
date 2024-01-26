import type { Writable } from "svelte/store";

type PageType = "task" | "survey" | "result" | "about" | "end" | "home";

interface IPage {
    type: PageType;
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
}

interface ITaskGuess extends ITaskPage {
    guesses: string[];
    showWords: boolean;
}

interface ITaskClockpoint extends ITaskPage {
    hands: IHand[]
    timestamp: string;
}

interface ITaskClockdraw extends ITaskPage {
    markers: IMarker[];
}

interface ISUSPage extends IPage {
    questions: [{
        id: string;
        question: string;
        score?: number;
    }
    ];

}

interface IUser extends IPage {
    phone: number | undefined;
    gender: "male" | "female" | "other" | "prefer not to say" | undefined;
    age: number | undefined;
    domain: "design" | "UX" | "web development" | "programming" | "caregiver" | "games" | "psychology" | "other" | string | undefined; //come up with more examples
}

interface IHand {
    name: string;
    angle: number;
    active: boolean;
    target?: number;
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
interface ISettings {
    wordcount: number;
    language: string;
    storageKey: string;
}

interface IMetaData {
    date: Date;
    version: string;
}

interface IAppData {
    metadata: IMetaData,
    settings: ISettings
    pages: {
        home: Writable<IPage>,
        wordregistration: Writable<ITaskGuess>,
        clockpoint: Writable<ITaskClockpoint>,
        clockdraw: Writable<ITaskClockdraw>,
        wordrecall: Writable<ITaskGuess>,
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

export type { ITaskPage, IPage, IMetaData, IUser, ISUSPage, IHand, IMarker, IAppData, ISettings, ITaskClockdraw, ITaskClockpoint, ITaskGuess, PageType }