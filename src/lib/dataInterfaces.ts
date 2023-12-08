import type { IRoute, IStatus } from "./interfaces";

interface IResult {
    consent: boolean;
    version: string;
    complete: boolean
    settings: ISettings;
    date: Date;
    sessionDurationInSeconds: number;
    user: IUser;
    data: IData[]
}

interface IData {
    task: IRoute;
    comment: string;
    status: IStatus;
    score: number;
    maxScore: number;
    resets: number;
}

interface ISettings {
    version: string;
    wordRegistrationCount: number;
    language: "english" | "norsk";
}

interface IUser {
    id: string;
    phone: number;
    gender?: "male" | "female" | "other" | "prefer not to say";
    age?: number;
    expertise?: "design / UX" | "programming" | "games" | "psychology" | "other" | string;
}

export type { IResult, IData, ISettings, IUser }