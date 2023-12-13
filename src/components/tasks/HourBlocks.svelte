<script lang="ts">
	import { send, receive } from '../../scripts/transition';
	import Draggable from '../Draggable.svelte';
	import type { IBlock } from '$lib/interfaces.js';
	import type { Readable, Writable } from 'svelte/store';

	export let blocks: Readable<IBlock[]> | Writable<IBlock[]>;

	const handleMouseUp = (e: MouseEvent | TouchEvent, block: IBlock) => {
		//blocks.findClosestAvailableSlot(e, block);
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
	}
	.block {
		margin-left: 5px;
	}
</style>
