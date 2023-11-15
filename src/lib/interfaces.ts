interface IRoute {
    id: number;
    name: string;
    path: string;
}

interface IStatus extends IRoute {
    status: 'incomplete' | 'complete' | 'current';
}

export type { IRoute, IStatus };

