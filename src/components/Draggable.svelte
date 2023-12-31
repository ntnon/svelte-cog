<script lang="ts">
	import type { IPosition } from '$lib/interfaces';
	import { getRectCenter } from '../scripts/getRectCenter';

	import { createEventDispatcher } from 'svelte';

	export let position: IPosition;

	let draggableElement: HTMLElement;
	let elementTop: number;
	let elementLeft: number;
	let moving = false;
	let offsetX = 0;
	let offsetY = 0;

	const dispatch = createEventDispatcher();

	function dispatchPosition() {
		let newPosition = getRectCenter(draggableElement);
		position = newPosition;
		dispatch('positionChange', { newPosition });
	}

	function getClientCoordinates(e: MouseEvent | TouchEvent) {
		if (e instanceof TouchEvent && e.touches.length > 0) {
			return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
		} else {
			return { clientX: e.clientX, clientY: e.clientY };
		}
	}

	function onMouseUp(e: MouseEvent | TouchEvent) {
		if (moving) {
			dispatchPosition();
			moving = false;
		}
	}

	function onMouseDown(e: MouseEvent | TouchEvent) {
		moving = true;
		const { clientX, clientY } = getClientCoordinates(e);
		offsetX = clientX - (elementLeft || 0);
		offsetY = clientY - (elementTop || 0);
	}

	function onMouseMove(e: MouseEvent | TouchEvent) {
		if (moving) {
			const { clientX, clientY } = getClientCoordinates(e);
			elementLeft = clientX - offsetX;
			elementTop = clientY - offsetY;
			dispatchPosition();
			e.preventDefault();
		}
	}
</script>

<div
	bind:this={draggableElement}
	role="button"
	on:mousedown={onMouseDown}
	on:mousemove={onMouseMove}
	on:mouseup={onMouseUp}
	on:touchstart={onMouseDown}
	on:touchmove={onMouseMove}
	on:touchend={onMouseUp}
	style={`position: relative; left: ${elementLeft}px; top: ${elementTop}px;`}
	class="draggable"
	tabindex="0"
>
	<slot />
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: relative;
		z-index: 1;
		width: 3rem;
		height: 3rem;
		min-height: 3rem;
		min-width: 3rem;
		border-radius: 50%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
</style>
