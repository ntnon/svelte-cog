import { getRandomTimeStamp } from "../scripts/getRandomTimeStamp";
import { getRandomWords } from "../scripts/getRandomWords";
import type { IMarker, IMetaData, IPage, ISUSPage, ISettings, ITaskPage, IUser } from "./dataInterfaces";
import susQuestions from "./susQuestions.json";

const generateMarkers = (): IMarker[] => {
    return Array.from({ length: 12 }, (_, i) => {
        return {
            id: i,
            x: 0,
            y: 0,
            angle: 0,
            active: false,
            pointsAt: 0,
            isInsideClock: false,
        }
    })
}

const generateSUSQuestions = (): { id: string, question: string, score?: number }[] => {
    return susQuestions.map((sus) => {
        return {
            id: sus.id,
            question: sus.question,
        }
    })
}


export const defaultAppData = {
    metadata: {
        date: new Date(),
        version: "0.0.1",
    } as IMetaData,
    settings: {
        wordcount: 3,
        language: "english",
        storageKey: "nydon-website",
    } as ISettings,
    pages: {
        home: {
            path: "/",
            enableNext: true,
            name: "Home",
            timesVisited: 0
        } as IPage,
        wordregistration: {
            path: "/tasks/wordregistration",
            enableNext: false,
            name: "Word Registration",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            showWords: false,
            guesses: [],
        } as ITaskPage,
        wordrecall: {
            path: "/tasks/wordrecall",
            enableNext: false,
            name: "Word Recall",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            showWords: false,
            guesses: [],
        } as ITaskPage,
        clockdraw: {
            path: "/tasks/clockdraw",
            enableNext: false,
            name: "Clock Draw",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            markers: generateMarkers(),
        } as ITaskPage,
        clockpoint: {
            path: "/tasks/clockpoint",
            enableNext: false,
            name: "Clock Point",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            hands: {
                targetTimestamp: getRandomTimeStamp(),
                hour: {
                    name: "hour",
                    angle: 0,
                    active: false,
                    pointsAt: 0,
                    placed: false
                },
                minute: {
                    name: "minute",
                    angle: 0,
                    active: false,
                    pointsAt: 0,
                    placed: false
                }
            },

        } as ITaskPage,
        result: {
            path: "/tasks/result",
            enableNext: true,
            name: "Result",
            timesVisited: 0,
        } as IPage,
        survey: {
            path: "/survey/tasks",
            enableNext: true,
            name: "Survey",
            timesVisited: 0,
        } as IPage,
        user: {
            path: "/survey/user",
            enableNext: true,
            name: "User",
            timesVisited: 0,
            gender: undefined,
            phone: undefined,
            domain: undefined,
            age: undefined,

        } as IUser,
        sus: {
            path: "/survey/sus",
            enableNext: true,
            name: "SUS",
            timesVisited: 0,
            questions: generateSUSQuestions()
        } as ISUSPage,
        about: {
            path: "/about",
            enableNext: true,
            name: "About",
            timesVisited: 0,
        } as IPage,
        end: {
            path: "/end",
            enableNext: true,
            name: "End",
            timesVisited: 0,
        } as IPage,
    },
    data: {
        consent: false,
        words: getRandomWords(),

    }
}