<script lang="ts">
	import { send, receive } from '../../../scripts/transition.js';
	import Draggable from '../../../components/Draggable.svelte';
	import type { IBlock } from '$lib/interfaces.js';

	export let blocks: any;

	const handleMouseUp = (e: MouseEvent | TouchEvent, block: IBlock) => {
		let f = blocks.findClosestAvailableSlot(e, block);
		console.log(f);
	};
</script>

<div class="blocklist">
	{#each $blocks.filter((block) => block.slot === null) as block (block.id)}
		<div class="block" in:receive={{ key: block.id }} out:send={{ key: block.id }}>
			<Draggable onMouseUpFn={(e) => handleMouseUp(e, block)}>
				{block.id}</Draggable
			>
		</div>
	{/each}
</div>

<style>
	.blocklist {
		display: flex;
		flex-direction: row;
		justify-items: center;
		width: 500px;
		height: 40px;
	}
	.block {
		margin-left: 5px;
	}
</style>
