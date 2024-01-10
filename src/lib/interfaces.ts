interface IRoute {
    name: string;
    path: string;
}

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

export type { IRoute, IBlock, IPosition, IHand };
