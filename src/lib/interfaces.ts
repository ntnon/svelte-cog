import type { SvelteComponent } from "svelte";
import type { Writable } from "svelte/store";
import type { resettableStore, resettablePageStore, rewardStore } from "../scripts/stores";


interface IStage {
    completed: boolean;
    name: IElement;
    progress: IElement;
    info: IElement;
    main: IElement;
    reset: IButtonElement;
    help: IButtonElement;
    next: IButtonElement;
    data?: IResettableStore<unknown>;
}

interface IElement {
    hidden?: boolean;
    highlight?: boolean;
    text?: string;
    inactive?: boolean;
    component?: typeof SvelteComponent;
    componentData?: IResettableStore<unknown>;
}

interface IButtonElement extends IElement {
    function?: () => void;
}

interface IPos {
    left: number;
    top: number;
}

interface ITimestamp {
    name: string,
    hour: number;
    minute: number
}

interface IHand {
    name: string;
    angle: number;
    active: boolean;
    target: number;
    pointsAt?: number;
    completed: boolean;
}

interface IHands {
    hour: IHand,
    minute: IHand,
    timestamp: ITimestamp,
}

interface IMarker {
    id: number,
    pos: IPos,
    pointsAt: number,
    angle: number,
    distFromCenter: number,
    completed: boolean,
    moving: boolean,
}

interface IBall {
    id: number;
    left: number;
    top: number;
    completed: boolean;
}

interface IEmoji {
    name: string;
    char: string;
}

interface IEmojiPool {
    correct: IEmoji[];
    pool: IEmoji[];
    guesses: IEmoji[];
    removed: IEmoji[];
}

interface IResettableStore<T> extends Writable<T> {
    reset: () => void;
}

interface IResettablePageStore<T> extends Writable<T> {
    resetData: () => void;
    reset: () => void;
    incrementHint: () => void;
    complete: (T: boolean) => void;
    changeStage: (T: string) => void;
    addChoice: (T: IChoice) => void;
    enableNext: () => void;
    disableNext: () => void;
    addReward: (T: IEmoji | IEmoji[]) => void;
    softReset: () => void;
    showNav: () => void;
    showInfo: () => void;
    showReward: () => void;
    ready: () => void;
}

interface IRewards<T> {
    options: T[];
    selected: T[];
    locked: T[];
    maxRewards: number;
    validSelection: boolean;
}

interface IChoice {
    key: string;
    text?: string;
    location?: string;
    content?: string;
}

interface IRewardStore<T> extends Writable<IRewards<T>> {
    select: (item: T) => void;
    deselect: (item: T) => void;
    lock: () => void;

}
interface ICharacter {
    name: string;
    char: string;
    talkingSpeed: number;
    symbol: string;
}


interface IPageData<T> {
    score: number;
    completed: boolean;
    data: T;
    errors: number;
    choices: IChoice[];
    currentStage: string;
    rewards: IEmoji[];
    showNav: boolean;
    showInfo: boolean;
    showReward: boolean;
}

interface IPages {
    introduction: ReturnType<typeof resettablePageStore<string>>;
    beginning: ReturnType<typeof resettablePageStore<string>>;
    itemRegistration: ReturnType<typeof resettablePageStore<boolean>>;
    shortRecall: ReturnType<typeof resettablePageStore<IEmojiPool>>;
    markers: ReturnType<typeof resettablePageStore<IMarker[]>>;
    hands: ReturnType<typeof resettablePageStore<IHands>>;
    longRecall: ReturnType<typeof resettablePageStore<IEmojiPool>>;
    exampleTask: ReturnType<typeof resettablePageStore<IBall[]>>;
    end: ReturnType<typeof resettablePageStore<string>>;
}

interface IAppData {
    choices: Writable<IChoice[]>;
    page: Writable<number>;
    rewards: ReturnType<typeof rewardStore<IEmoji>>;
    consent: ReturnType<typeof resettableStore<boolean>>;
    recallItems: ReturnType<typeof resettableStore<IEmoji[]>>;
    pageData: IPages;
}

// interface IAppData {
//     consent: IResettableStore<boolean>,
//     words: IResettableStore<string[]>,
//     markers: IResettableStore<IMarker[]>,
//     hands: IResettableStore<IHands>,
//     recallGuesses: IResettableStore<string[]>,
//     registrationGuesses: IResettableStore<string[]>
// }


export type { ICharacter, IEmojiPool, IEmoji, IAppData, IHand, IMarker, IResettableStore, IElement, IButtonElement, IStage, ITimestamp, IHands, IPageData, IPages, IResettablePageStore, IBall, IPos, IRewardStore, IRewards, IChoice }