import type { IPos } from "$lib/interfaces";

//takes two x,y positions and returns the angle between them
export const calcAngle = (pos1: IPos, pos2: IPos) => {
    const x = pos1.left - pos2.left;
    const y = pos1.top - pos2.top;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle;
};