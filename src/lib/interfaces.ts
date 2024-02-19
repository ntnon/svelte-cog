import type { Writable } from "svelte/store";

type PageType = "task" | "survey" | "result" | "about" | "end" | "home" | "error" | "tutorial" | "user";

type IPageType = ITaskPage | ISUSPage | IPage | IUser | ITaskClockdraw | ITaskClockpoint | ITaskGuess

interface IPage {
    type: PageType;
    info?: string;
    path: string, //MUST start with a slash and contain the proper path to the page in the folder structure of the app.
    //Perhaps it is possible to generate on the run!
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
    pointsAt: number,
    angle: number,
    isInsideClock: boolean,
}

interface IHands {
    name: string;
    angle: number;
    active: boolean;
    target?: number;
    pointsAt?: number;
    placed?: boolean;
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
    pages?: { //the order of pages will be reflected in the router
        home: Writable<IPage>,
        wordregistration: Writable<ITaskGuess>,
        clockdraw: Writable<ITaskClockdraw>,
        clockpoint: Writable<ITaskClockpoint>,
        wordrecall: Writable<ITaskGuess>,
        result: Writable<IPage>,
        user: Writable<IUser>,
        survey: Writable<IPage>,
        sus: Writable<ISUSPage>,
        about: Writable<IPage>,
        end: Writable<IPage>,
    },
    data: {
        words: Writable<string[]>,
        consent: Writable<boolean>,
        guesses: Writable<string[]>,
        hands: Writable<IHands[]>,
        markers: Writable<IMarker[]>,
    }
}

interface IPages {
    home: IPage,
    wordregistration: ITaskGuess,
    clockdraw: ITaskClockdraw,
    clockpoint: ITaskClockpoint,
    wordrecall: IPageType,
    result: IPageType,
    user: IPageType,
    survey: IPageType,
    sus: IPageType,
    about: IPageType,
    end: IPageType
}



interface IAppData2 {
    metadata: IMetaData,
    settings: ISettings
    pages: Writable<IPages>,
    words: Writable<string[]>,
    consent: Writable<boolean>,
}


export type { ITaskPage, IPage, IMetaData, IUser, ISUSPage, IHand, IMarker, IAppData, ISettings, ITaskClockdraw, ITaskClockpoint, ITaskGuess, PageType, IPageType, IAppData2, IPages, IHands }