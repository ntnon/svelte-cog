import { getRandomTimeStamp } from "../scripts/generateTimestamp";
import { generateRandomWords } from "../scripts/generateRandomWords";
import type { IMarker, IMetaData, IPage, ISUSPage, ISettings, ITaskClockdraw, ITaskClockpoint, ITaskGuess, IUser, PageType } from "../lib/interfaces";
import susQuestions from "../lib/susQuestions.json";

const generateMarkers = (): IMarker[] => {
    return Array.from({ length: 12 }, (_, i) => {
        return {
            id: i + 1,
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

const timestamp = getRandomTimeStamp();


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
            type: "home" as PageType,
            path: "/",
            enableNext: true,
            name: "Home",
            timesVisited: 0
        } as IPage,
        wordregistration: {
            type: "task" as PageType,
            path: "/tasks/wordregistration",
            enableNext: false,
            name: "Word Registration",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            showWords: false,
            guesses: [],
        } as ITaskGuess,
        wordrecall: {
            type: "task" as PageType,
            path: "/tasks/wordrecall",
            enableNext: false,
            name: "Word Recall",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            showWords: false,
            guesses: [],
        } as ITaskGuess,
        clockdraw: {
            type: "task" as PageType,
            path: "/tasks/clockdraw",
            enableNext: false,
            name: "Clock Draw",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            markers: generateMarkers(),
        } as ITaskClockdraw,
        clockpoint: {
            type: "task" as PageType,
            path: "/tasks/clockpoint",
            enableNext: false,
            name: "Clock Point",
            timesVisited: 0,
            corrections: 0,
            score: 0,
            success: false,
            timestamp: timestamp.name,
            hands: [
                {
                    name: "hour",
                    angle: 0,
                    active: false,
                    pointsAt: 0,
                    placed: false,
                    target: timestamp.hour
                },
                {
                    name: "minute",
                    angle: 0,
                    active: false,
                    pointsAt: 0,
                    placed: false,
                    target: timestamp.minute / 5
                }
            ]
        } as ITaskClockpoint,
        result: {
            type: "result" as PageType,
            path: "/tasks/results",
            enableNext: true,
            name: "Result",
            timesVisited: 0,
        } as IPage,
        survey: {
            type: "survey" as PageType,
            path: "/survey/tasks",
            enableNext: true,
            name: "Survey",
            timesVisited: 0,
        } as IPage,
        user: {
            type: "survey" as PageType,
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
            type: "survey" as PageType,
            path: "/survey/sus",
            enableNext: true,
            name: "SUS",
            timesVisited: 0,
            questions: generateSUSQuestions()
        } as ISUSPage,
        about: {
            type: "about" as PageType,
            path: "/about",
            enableNext: true,
            name: "About",
            timesVisited: 0,
        } as IPage,
        end: {
            type: "end" as PageType,
            path: "/end",
            enableNext: true,
            name: "End",
            timesVisited: 0,
        } as IPage,
    },
    data: {
        consent: false,
        words: generateRandomWords(),
        guesses: [],
    }
}