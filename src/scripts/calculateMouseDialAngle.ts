export const calculateMouseDialAngle = (dial: HTMLElement, clientX: number, clientY: number) => {
    const dialRect = dial.getBoundingClientRect();
    const x = clientX - dialRect.left;
    const y = clientY - dialRect.top;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle;
};