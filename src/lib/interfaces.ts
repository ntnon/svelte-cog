import type { SvelteComponent } from "svelte";
import type { Writable } from "svelte/store";
import type { resettableStore, resettableTaskStore } from "../scripts/resettableStore";

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

interface IResettableTaskStore<T> extends Writable<T> {
    resetData: () => void;
    reset: () => void;
    incrementHint: () => void;
    complete: (T: boolean) => void;
}
interface ITaskData<T> {
    score: number;
    completed: boolean;
    data: T;
    errors: number;
}

interface ITasks {
    markers: ReturnType<typeof resettableTaskStore<IMarker[]>>;
    hands: ReturnType<typeof resettableTaskStore<IHands>>;
    itemRegistration: ReturnType<typeof resettableTaskStore<boolean>>;
    shortRecall: ReturnType<typeof resettableTaskStore<IEmojiPool>>;
    longRecall: ReturnType<typeof resettableTaskStore<IEmojiPool>>;
    exampleTask: ReturnType<typeof resettableTaskStore<IBall[]>>;
    [key: string]: ReturnType<typeof resettableTaskStore<unknown>>;
}

interface IAppData {
    pageIndex: Writable<number>;
    points: Writable<number>;
    consent: ReturnType<typeof resettableStore<boolean>>;
    recallItems: ReturnType<typeof resettableStore<IEmoji[]>>;
    isAnimating: Writable<boolean>;
    taskData: ITasks;
}

// interface IAppData {
//     consent: IResettableStore<boolean>,
//     words: IResettableStore<string[]>,
//     markers: IResettableStore<IMarker[]>,
//     hands: IResettableStore<IHands>,
//     recallGuesses: IResettableStore<string[]>,
//     registrationGuesses: IResettableStore<string[]>
// }


export type { IEmojiPool, IEmoji, IAppData, IHand, IMarker, IResettableStore, IElement, IButtonElement, IStage, ITimestamp, IHands, ITaskData, ITasks, IResettableTaskStore, IBall, IPos }