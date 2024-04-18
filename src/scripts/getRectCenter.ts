export const getRectCenter = (e: HTMLElement) => {
    const rect = e.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
        left: rect.left + rect.width / 2 + scrollLeft,
        top: rect.top + rect.height / 2 + scrollTop,
    } as DOMRect;
}