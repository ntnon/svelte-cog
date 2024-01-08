<script lang="ts">
	import type { IBlock, IPosition } from '$lib/interfaces';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';
	import type { SvelteComponent } from 'svelte';

	let blocks: IBlock[] = newBlocks(12);

	let clock: SvelteComponent;

	function newBlocks(num: number): IBlock[] {
		return Array(num)
			.fill(null)
			.map((_, i) => ({
				id: i,
				name: i + 1,
				position: { top: 0, left: 0 }
			}));
	}

	function handlePositionChange(block: IBlock, newPos: IPosition) {
		blocks[block.id].position = newPos;
		//update position block's position in blockstore?
	}
</script>

<h2>The Clock Test</h2>
<p>Drag the numbers to their right place on the clock</p>
<div class="numberBlocks">
	<div class="hour-block-list">
		{#each blocks as block (block.id)}
			<Draggable
				position={block.position}
				on:positionChange={(e) => handlePositionChange(block, e.detail.newPosition)}
				>{block.name}</Draggable
			>
		{/each}
	</div>
	<Clock bind:this={clock}></Clock>
</div>

<style>
	:global(.hour-block-list) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: beige;
	}

	.numberBlocks {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 50%;
	}
</style>
