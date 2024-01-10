import type { IRoute } from "./interfaces";

interface IResult {
    id: string; // must be unique - check existing entries ? or create SHA256 based on timestamp
    settings: ISettings;
    date: Date;
    taskData: ITaskData[];
    surveyData: ISurveyData[];
    error: string[];
}

interface IData {
    user: IUser;
}

interface ITaskData {
    route: IRoute;
    complete: boolean;
    corrections: number;
    score: number;
    [key: string]: unknown;
}

interface ISurveyData {
    field: string;
    response: string | number;
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

export type { IResult, IData, ISettings, IUser, ITaskData, ISurveyData }