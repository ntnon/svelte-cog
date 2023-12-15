<script lang="ts">
	import type { IPosition } from '$lib/interfaces';

	export let onMouseUpFn: (...args: any[]) => void;
	export let onMouseDownFn: (...args: any[]) => void;
	export let onMouseMoveFn: (...args: any[]) => void = () => {};
	export let item: any;
	export let position: IPosition | undefined;

	let moving = false;
	let offsetX = 0;
	let offsetY = 0;

	function getClientCoordinates(e: MouseEvent | TouchEvent) {
		if (e instanceof TouchEvent && e.touches.length > 0) {
			return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
		} else {
			return { clientX: e.clientX, clientY: e.clientY };
		}
	}

	function onMouseUp(e: MouseEvent | TouchEvent) {
		if (moving) {
			onMouseUpFn(e, position);

			moving = false;
		}
	}

	function onMouseDown(e: MouseEvent | TouchEvent) {
		moving = true;
		const { clientX, clientY } = getClientCoordinates(e);
		offsetX = clientX - (position?.left || 0);
		offsetY = clientY - (position?.top || 0);
		onMouseDownFn();
	}

	function onMouseMove(e: MouseEvent | TouchEvent) {
		if (moving) {
			const { clientX, clientY } = getClientCoordinates(e);
			position = {
				...position,
				left: clientX - offsetX,
				top: clientY - offsetY
			};
			onMouseMoveFn(e, position);
			e.preventDefault();
		}
	}
</script>

<div
	role="button"
	on:mousedown={onMouseDown}
	on:mousemove={onMouseMove}
	on:mouseup={onMouseUp}
	on:touchstart={onMouseDown}
	on:touchmove={onMouseMove}
	on:touchend={onMouseUp}
	style={`position: relative; left: ${position?.left}px; top: ${position?.top}px;`}
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
		border-radius: 50%;
		text-align: center;
		line-height: 3rem;
		/*TODO: MAKE PRETTY???**/
	}
</style>
