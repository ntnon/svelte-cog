import type { SvelteComponent } from "svelte";
import type { Writable } from "svelte/store";

interface IResettableStore<T> extends Writable<T> {
    reset: () => void;
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
    hour: number;
    minute: number
}

interface IHand {
    name: string;
    angle: number;
    active: boolean;
    target: number;
    pointsAt?: number;
    placed?: boolean;
}

interface IHands {
    hour: IHand,
    minute: IHand
}

interface IMarker {
    id: number,
    x: number,
    y: number,
    active: boolean,
    pointsAt: number,
    angle: number,
    isInsideClock: boolean,
}

interface IAppData {
    consent: IResettableStore<boolean>,
    words: IResettableStore<string[]>,
    markers: IResettableStore<IMarker[]>,
    hands: IResettableStore<IHands>,
    recallGuesses: IResettableStore<string[]>,
    registrationGuesses: IResettableStore<string[]>
}


export type { IAppData, IHand, IMarker, IResettableStore, IElement, IButtonElement, IStage, ITimestamp, IHands }