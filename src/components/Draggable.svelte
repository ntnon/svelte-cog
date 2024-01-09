<script lang="ts">
	import type { IPosition } from '$lib/interfaces';
	import { getRectCenter } from '../scripts/getRectCenter';

	import { createEventDispatcher } from 'svelte';

	export let position: IPosition; // only used for lifting up the position, cannot be used to set the position of a draggable

	let draggableElement: HTMLElement;
	let elementTop: number;
	let elementLeft: number;
	let moving = false;
	let offsetX = 0;
	let offsetY = 0;

	// dispatcher creates an on:positionChange that the parent component can actively listen to. This way, the draggable component need only broadcast the position of itself, and higher order functions are defined where used

	const dispatch = createEventDispatcher();

	// Enables handling of mouse and touch events
	function getClientCoordinates(e: MouseEvent | TouchEvent) {
		if (e instanceof TouchEvent && e.touches.length > 0) {
			return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
		} else {
			return { clientX: e.clientX, clientY: e.clientY };
		} //TypeScript does not like that the event may not contain necessary properties.
	}

	// triggered when input event occurs
	function onMouseDown(e: MouseEvent | TouchEvent) {
		moving = true;
		const { clientX, clientY } = getClientCoordinates(e);
		offsetX = clientX - (elementLeft || 0);
		offsetY = clientY - (elementTop || 0);
		dispatch('mouseDown', { e });
	}

	// when the mouse moves,something happens: the location of the draggable item is updated
	function onMouseMove(e: MouseEvent | TouchEvent) {
		if (moving) {
			const { clientX, clientY } = getClientCoordinates(e);
			elementLeft = clientX - offsetX;
			elementTop = clientY - offsetY;

			position = getRectCenter(draggableElement); // this is the position that is broadcasted to the parent component

			dispatch('positionChange', { position }); //sends a message to the parent component that the position has changed
			e.preventDefault();
		}
	}

	// triggered when inputevent is released
	function onMouseUp(e: MouseEvent | TouchEvent) {
		if (moving) {
			moving = false;
			dispatch('mouseUp', { position, draggableElement }); //sends a message to the parent component that the mouse is up
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
