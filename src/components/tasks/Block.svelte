<script lang="ts">
	import type { IBlock } from '$lib/interfaces';

	export let block: IBlock;
	export let anchored: boolean;

	export let onPress = (e: MouseEvent | TouchEvent, block: IBlock) => {};

	let x = block.position?.x || 0;
	let y = block.position?.y || 0;
</script>

<button
	on:mousedown={(e) => onPress(e, block)}
	class="block"
	style={anchored ? 'color: blue' : `position: absolute; left: ${y}px; top: ${x}px; color: red`}
>
	x: {x}, y: {y}
	<slot />
</button>

<style>
	.block {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: relative;
		z-index: 1;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		text-align: center;
		line-height: 1rem;
	}
</style>
