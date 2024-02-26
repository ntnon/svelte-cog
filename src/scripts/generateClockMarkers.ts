import type { IMarker } from "$lib/interfaces"

const fisherYates = (toShuffle: unknown[]) => {
    for (let i = (toShuffle.length - 1); i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[randomIndex]] = [toShuffle[randomIndex], toShuffle[i]];
    }
    return toShuffle;
}

export const generateClockMarkers = (): IMarker[] => {
    const array = Array.from({ length: 12 }, (_, i) => {
        return {
            id: i + 1,
            x: 0,
            y: 0,
            angle: 0,
            active: false,
            pointsAt: 0,
            isInsideClock: false,
        }
    })

    return fisherYates(array) as IMarker[];
}