import type { IHands, IHand, ITimestamp } from "$lib/interfaces";
import { generateTimestamp } from "./generateTimestamp";


const randomAngle = () => {
    return Math.floor(Math.random() * 360);
}


export const generateClockHands = (): IHands => {
    const timestamp: ITimestamp = generateTimestamp();

    return {
        hour: {
            name: "hour",
            angle: randomAngle(),
            active: false,
            pointsAt: 0,
            placed: false,
            target: timestamp.hour
        } as IHand,
        minute: {
            name: "minute",
            angle: randomAngle(),
            active: false,
            pointsAt: 0,
            placed: false,
            target: timestamp.minute / 5
        } as IHand
    } as IHands
}