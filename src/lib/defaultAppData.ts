import type { IAppData, IHands, IMarker, IEmojiPool, IEmoji } from "./interfaces";
import { resettableStore, resettablePageStore, rewardStore } from "../scripts/stores";
import { generateClockMarkers } from "../scripts/dataGen/generateClockMarkers";
import { generateClockHands } from "../scripts/dataGen/generateClockHands";
import { generateRandomEmojis } from "../scripts/dataGen/generateRandomEmojis";
import { generateExampleBalls } from "../scripts/dataGen/generateExampleBalls";
import { writable } from "svelte/store";

const generatedEmojis = generateRandomEmojis();
const correctItems = generatedEmojis.correct

export const defaultAppData: IAppData = {
    choices: writable([]),
    rewards: rewardStore(),
    page: writable(0),
    consent: resettableStore<boolean>(false),
    recallItems: resettableStore<IEmoji[]>(correctItems),
    pageData: {
        introduction: resettablePageStore<string>(""),
        beginning: resettablePageStore<string>(""),
        markers: resettablePageStore<IMarker[]>(generateClockMarkers()),
        hands: resettablePageStore<IHands>(generateClockHands()),
        itemRegistration: resettablePageStore<boolean>(false),
        shortRecall: resettablePageStore<IEmojiPool>(generateRandomEmojis(correctItems)),
        longRecall: resettablePageStore<IEmojiPool>(generateRandomEmojis(correctItems)),
        exampleTask: resettablePageStore(generateExampleBalls(4)),
        end: resettablePageStore<string>(""),
        //expandable
    }
    //expandable

}