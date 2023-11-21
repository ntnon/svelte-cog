<script lang="ts">
	export let left = 100;
	export let top = 100;

	let moving = false;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
	}

	// 	$: console.log(moving);
</script>

<div
	role="button"
	on:mousedown={onMouseDown}
	on:touchstart={onMouseDown}
	style="left: {left}px; top: {top}px;"
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
		position: absolute;
	}
</style>
