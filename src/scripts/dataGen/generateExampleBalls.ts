import type { IBall } from "$lib/interfaces";

export const generateExampleBalls = (numBalls: number) => {
    return Array.from(
        { length: numBalls },
        (_, index) =>
            ({
                id: index,
                left: Math.random() - 0.5,
                top: Math.random() - 0.5,
                completed: false,
            }) as IBall
    );
};

