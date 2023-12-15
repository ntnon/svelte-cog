<script lang="ts">
	import type { IBlock, IPosition } from '$lib/interfaces';
	import Draggable from '../../../components/Draggable.svelte';
	import { createHourBlockStore } from '../../../stores/blockStore';
	import Clock from '../../../components/tasks/Clock.svelte';
	import type { SvelteComponent } from 'svelte';

	const blocks = createHourBlockStore(12);
	let clock: SvelteComponent;

	function restart() {
		blocks.update((b) => b.map((b) => ({ ...b, position: { top: 0, left: 0 }, placed: false })));
	}

	const onMouseUpFn = (
		e: MouseEvent | TouchEvent,
		block: IBlock,
		position: IPosition | undefined
	) => {
		// Update the block store
		blocks.update((blocks) => {
			return blocks.map((b) => {
				if (b.id === block.id) {
					// Update the position of the block
					return { ...b, position };
				} else {
					return b;
				}
			});
		});
	};

	const onMouseDownFn = (e: MouseEvent | TouchEvent, block: IBlock) => {
		//implement logic
	};
</script>

<h2>Klokketesten</h2>
<p>Gjenskap klokken! Dra tallene til riktig plassering på klokken.</p>
<button on:click={() => restart()}>Restart</button>
<div class="numberBlocks">
	<div class="hour-block-list">
		{#each $blocks as block (block.id)}
			<Draggable
				item={block}
				position={block.position}
				onMouseDownFn={(e) => onMouseDownFn(e, block)}
				onMouseUpFn={(e, position) => onMouseUpFn(e, block, position)}>{block.id}</Draggable
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
	}
</style>
