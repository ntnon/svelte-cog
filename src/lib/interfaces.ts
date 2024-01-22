
interface IBlock {
    id: number;
    name: string | number;
    position: IPosition;
}

interface IPosition {
    top: number;
    left: number;
    angle?: number;
}

interface IHand {
    name: 'hour' | 'minute';
    angle: number;
    active: boolean;
    length: number;
}

export type { IBlock, IPosition, IHand };
