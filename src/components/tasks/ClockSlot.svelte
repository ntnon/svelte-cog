<script lang="ts">
	import type { ISlot } from '$lib/interfaces';
	import { get } from 'svelte/store';
	import { getPagePosition } from '../../scripts/getPagePosition';
	import { slotLocations } from '../../stores/clockSlotLocations';
	import { getPosition } from '../../stores/clockSlotLocations';

	export let slotId: number;
	export let offset: number;
	let element: HTMLElement;
	const { x, y } = getPosition(slotId, offset);
	$: if (element) {
		const slots = get(slotLocations);
		const newSlot = {
			id: slotId,
			position: getPosition(slotId, offset),
			absolutePosition: getPagePosition(element),
			offset: offset
		};
		let index = slots.findIndex((slot) => slot.id === newSlot.id);
		if (index === -1) {
			slotLocations.update((slots) => [...slots, newSlot]);
		} else {
			slotLocations.update((slots) => {
				slots[index] = newSlot;
				return slots;
			});
		}
	}
</script>

<div
	bind:this={element}
	class="square"
	data-id={slotId}
	style={`transform: translate(${x}px, ${y}px) translate(-50%, -50%);`}
>
	<slot />
</div>

<style>
	.square {
		width: 20px;
		height: 20px;
		background-color: rgba(0, 255, 255, 0.139);
		margin: 0;
		position: absolute;
		left: 50%;
		top: 50%;
	}
</style>
