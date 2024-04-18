import type { IPos } from '$lib/interfaces';

export const getClientCoordinates = (e: MouseEvent | TouchEvent): IPos | null => {
	if (e instanceof TouchEvent && e.touches.length > 0) {
		return { left: e.touches[0].clientX, top: e.touches[0].clientY };
	}
	if (e instanceof MouseEvent)
		return { left: e.clientX, top: e.clientY };
	else return null
};