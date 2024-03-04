import type { IMarker } from "$lib/interfaces"

function fisherYates(toShuffle: unknown[]) {
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
            DOMElement: undefined,
            initialDOMElement: undefined,
            x: 0,
            y: 0,
            angle: 0,
            active: false,
            pointsAt: 0,
            isInsideClock: false,
        }
    })
    const randomize = fisherYates(array) as IMarker[];
    const split = randomize.splice(0, 6);

    return split;
}