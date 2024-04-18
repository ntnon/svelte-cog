<script lang="ts">
	import { getClientCoordinates } from '../scripts/getClientCoordinates';
	import { getRectCenter } from '../scripts/getRectCenter';
	import { createEventDispatcher } from 'svelte';

	let container: HTMLElement;
	let elementTop: number;
	let elementLeft: number;
	let moving = false;
	let offsetX = 0;
	let offsetY = 0;

	const dispatch = createEventDispatcher();

	function dispatchPosition() {
		let newPosition = getRectCenter(container);
		dispatch('positionChange', { newPosition });
	}

	function onMouseUp(e: MouseEvent | TouchEvent) {
		if (moving) {
			dispatchPosition();
			moving = false;
		}
	}

	function onMouseDown(e: MouseEvent | TouchEvent) {
		moving = true;
		const pos = getClientCoordinates(e);
		if (!pos) return;
		offsetX = pos.left - (elementLeft || 0);
		offsetY = pos.top - (elementTop || 0);
	}

	function onMouseMove(e: MouseEvent | TouchEvent) {
		if (moving) {
			const pos = getClientCoordinates(e);
			if (!pos) return;
			elementLeft = pos.left - offsetX;
			elementTop = pos.top - offsetY;

			e.preventDefault();
		}
	}
</script>

<div
	bind:this={container}
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
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
</style>
