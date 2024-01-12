import { writable } from 'svelte/store';
import type { ISlot } from '../lib/interfaces';
import type { IPosition } from '../lib/interfaces';

export function getPosition(slot: number, offset: number): IPosition {
    const angle: number = (360 / 12) * slot - 90; // -90 ensures the circle starts at 12 o'clock
    const radians: number = angle * (Math.PI / 180);
    const x: number = offset * Math.cos(radians)
    const y: number = offset * Math.sin(radians)
    return { x, y };
}

export const slotLocations = writable<ISlot[]>([]);
