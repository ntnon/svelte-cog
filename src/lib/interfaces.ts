import type { SvelteComponent } from "svelte";
import type { Writable } from "svelte/store";
import type { resettableStore, resettableTaskStore } from "../scripts/resettableStore";

interface IResettableStore<T> extends Writable<T> {
    reset: () => void;
}

interface IResettableTaskStore<T> extends Writable<T> {
    resetData: () => void;
    reset: () => void;
    incrementHint: () => void;
    complete: (T: boolean) => void;
}

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
    DOMElement: undefined | HTMLElement,
    initialDOMElement: undefined | HTMLElement,
    x: number,
    y: number,
    active: boolean,
    pointsAt: number,
    angle: number,
    completed: boolean,
}

interface IBall {
    id: number;
    left: number;
    top: number;
    completed: boolean;
}

interface ITaskData<T> {
    score: number;
    completed: boolean;
    data: T;
    hints: number;

}

interface IEmoji {
    name: string;
    char: string;
}
interface IEmojiPool {
    correct: IEmoji[];
    pool: IEmoji[];
}

interface ITasks {
    markers: ReturnType<typeof resettableTaskStore<IMarker[]>>;
    hands: ReturnType<typeof resettableTaskStore<IHands>>;
    recallGuesses: ReturnType<typeof resettableTaskStore<string[]>>;
    registrationGuesses: ReturnType<typeof resettableTaskStore<string[]>>;
    exampleTask: ReturnType<typeof resettableTaskStore<IBall[]>>;
    [key: string]: ReturnType<typeof resettableTaskStore<unknown>>;
}

interface IAppData {
    points: Writable<number>;
    consent: ReturnType<typeof resettableStore<boolean>>;
    recallItems: ReturnType<typeof resettableStore<IEmojiPool>>;
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


export type { IEmojiPool, IEmoji, IAppData, IHand, IMarker, IResettableStore, IElement, IButtonElement, IStage, ITimestamp, IHands, ITaskData, ITasks, IResettableTaskStore, IBall }