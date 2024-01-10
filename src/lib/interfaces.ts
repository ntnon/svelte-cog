
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
    id: string;
    angle: number;
    closestNumber?: number;
}

export type { IBlock, IPosition, IHand };
