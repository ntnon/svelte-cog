import type { IRoute, IStatus } from "./interfaces";

interface IResult {
    consent: boolean;
    version: string;
    complete: boolean
    settings: ISettings;
    user: IUser;
    data: IData[]
}

interface IData {
    task: IRoute;
    comment: string;
    status: IStatus;
    score: number;
}

interface ISettings {
    version: string;
}

interface IUser {
    id: string;
    gender?: "male" | "female" | "other" | "prefer not to say";
    age?: number;
    expertise?: "design / UX" | "programming" | "games" | "psychology" | "other" | string;
}

export type { IResult, IData, ISettings, IUser }