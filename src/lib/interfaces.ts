interface IRoute {
    name: string;
    path: string;
}

interface IStatus {
    status: 'incomplete' | 'complete' | 'current';
    complete: boolean;
}

interface IBlock {
    id: number;
    placed: boolean;
    active: boolean;
    slot: ISlot | null;
    position?: IPosition;
}

interface ISlot {
    id: number;
    position: IPosition;
    absolutePosition: IPosition;
    block?: IBlock;
}

interface IPosition {
    x: number;
    y: number;
}

export type { IRoute, IStatus, IBlock, ISlot, IPosition, IResult };

