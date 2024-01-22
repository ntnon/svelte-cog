import type { InteractionEvent } from '$lib/types';

export const getClientCoordinates = (e: InteractionEvent) => {
	if (e instanceof TouchEvent && e.touches.length > 0) {
		return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
	}
	return { clientX: e.clientX, clientY: e.clientY };
};