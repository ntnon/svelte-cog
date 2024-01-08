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
    name: string | number;
    position: IPosition;
}

interface ISlot {
    id: number;
    position: IPosition;
    absolutePosition: IPosition;
    block?: IBlock;
}

interface IPosition {
    top: number;
    left: number;
}

interface IHand {
    id: string;
    angle: number;
}

export type { IRoute, IStatus, IBlock, ISlot, IPosition, IHand };

