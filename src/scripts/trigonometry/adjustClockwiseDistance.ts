export const adjustClockwiseDistance = (val: number): number => {
    if (val > 6) {
        val = 12 - val;
    }
    return val;
}