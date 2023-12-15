<script lang="ts">
	export let onMouseUpFn = (e: MouseEvent | TouchEvent) => {};

	export let onMouseDownFn = (e: MouseEvent | TouchEvent) => {};

	let moving = false;
	let offsetX = 0;
	let offsetY = 0;
	let left = 0;
	let top = 0;

	function getClientCoordinates(e: MouseEvent | TouchEvent) {
		return e instanceof TouchEvent
			? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
			: { clientX: e.clientX, clientY: e.clientY };
	}

	function onMouseDown(e: MouseEvent | TouchEvent) {
		moving = true;
		const { clientX, clientY } = getClientCoordinates(e);
		offsetX = clientX - left;
		offsetY = clientY - top;
	}

	function onMouseMove(e: MouseEvent | TouchEvent) {
		if (moving) {
			const { clientX, clientY } = getClientCoordinates(e);
			left = clientX - offsetX;
			top = clientY - offsetY;
			e.preventDefault();
			onMouseDownFn(e);
		}
	}

	function onMouseUp(e: MouseEvent | TouchEvent) {
		if (moving) {
			onMouseUpFn(e);
			moving = false;
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
	style={`position: relative; left: ${left}px; top: ${top}px;`}
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
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		text-align: center;
		line-height: 2rem;
		/*TODO: MAKE PRETTY???**/
	}
</style>
