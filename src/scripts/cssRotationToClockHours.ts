export const cssRotationToClockHours = (cssRotation: number) => {
    const degreePerUnit = 15;
    let clockHours = ((cssRotation + 90) % 360) / degreePerUnit;
    if (clockHours <= 0) clockHours += 360 / degreePerUnit;
    clockHours = clockHours / 2
    console.log(clockHours)
    if (Math.abs(clockHours - 12) < 0.001) return 0;
    //if (clockHours === 12) return 0;
    return clockHours;
};