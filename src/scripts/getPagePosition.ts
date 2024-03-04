export function getPagePosition(element: Element) {
    const rect = element.getBoundingClientRect();
    return {
        offsetX: rect.left + rect.width / 2,
        offsetY: rect.top + rect.height / 2
    };
}