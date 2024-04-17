export const angleToClockHour = (angle: number) => {
    const degreePerUnit = 30; // 360 degrees / 12 hours
    let clockHours = ((angle + 90) % 360) / degreePerUnit;
    if (clockHours <= 0) clockHours += 12; // 360 degrees / degreePerUnit
    if (clockHours === 12) return 0;
    return clockHours;
};