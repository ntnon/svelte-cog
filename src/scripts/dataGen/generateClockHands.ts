import type { IHands, IHand, ITimestamp } from "$lib/interfaces";
import { generateTimestamp } from "./generateTimestamp";


const randomAngle = () => {
    return Math.floor(Math.random() * 360);
}

export const generateClockHands = (): IHands => {
    const timestamp: ITimestamp = generateTimestamp();
    return {
        timestamp: timestamp,
        hour: {
            name: "hour",
            angle: randomAngle(),
            active: false,
            pointsAt: 0,
            placed: false,
            target: timestamp.hour,
            completed: false,
        } as IHand,
        minute: {
            name: "minute",
            angle: randomAngle(),
            active: false,
            pointsAt: 0,
            placed: false,
            target: timestamp.minute / 5,
            completed: false,
        } as IHand
    } as IHands
}