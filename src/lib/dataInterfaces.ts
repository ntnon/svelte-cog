interface IResult {
    id: string; // must be unique - check existing entries ? or create SHA256 based on timestamp
    settings: IMetaData;
    date: Date;
    taskData: ITaskData[];
    error: string[];
}

interface ITaskData {
    id: string;
    name: string;
    complete: boolean;
    corrections: number;
    score: number;
    comment?: string;
    guesses?: string[];
    [key: string]: unknown; //if you want to add more metrics
}

interface ISUS {
    id: string;
    question: string;
    score?: number;
}

interface IRoute {
    name: string;
    path: string;
    complete: boolean;
}


interface IMetaData {
    date: Date;
    version: string;
    wordRegistrationCount: number;
    language: "english" | "norsk";
}

interface IUserData {
    id: string;
    phone: number;
    gender?: "male" | "female" | "other" | "prefer not to say";
    age?: number;
    domain?: "design" | "UX" | "web development" | "programming" | "caregiver" | "games" | "psychology" | "other" | string; //come up with more examples
}

export type { IResult, ITaskData, IMetaData, IUserData, ISUS, IRoute }