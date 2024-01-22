export const cssRotationToClockHours = (cssRotation: number) => {
    const degreePerBlock = 15;
    let clockHours = ((cssRotation + 90) % 360) / degreePerBlock;
    if (clockHours <= 0) clockHours += 360 / degreePerBlock;
    //if (clockHours < 1) clockHours += 1;
    return clockHours / 2;
};