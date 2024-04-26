import type { IMarker } from "$lib/interfaces"
import { fisherYates } from "../FisherYates"


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
            score: 0,
        }
    })
    const randomize = fisherYates(array) as IMarker[];
    const split = randomize.splice(0, 6);

    return split as IMarker[];
}