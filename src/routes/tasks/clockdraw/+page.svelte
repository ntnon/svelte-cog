<script lang="ts">
	import type { IBlock, IPosition } from '$lib/interfaces';
	import Draggable from '../../../components/Draggable.svelte';
	import { createHourBlockStore } from '../../../stores/blockStore';

	const blocks = createHourBlockStore(12);
	let clock: HTMLElement;

	function restart() {
		blocks.update((b) => b.map((b) => ({ ...b, position: { top: 0, left: 0 }, placed: false })));
	}

	const onMouseUpFn = (
		e: MouseEvent | TouchEvent,
		block: IBlock,
		position: IPosition | undefined
	) => {
		console.log('block', block.id);
		console.log('new position', position);

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
		console.log('picked up: ', block.id);

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
	<div bind:this={clock} class="clock">
		<div class="dial"></div>
		<div class="hand hour"></div>
		<div class="hand minute"></div>
	</div>
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

	.clock {
		margin-top: 1rem;
		width: 300px;
		height: 300px;
		border: 6px solid rgb(120, 117, 117);
		border-radius: 50%;
		position: relative;
		align-self: center;
	}
	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 10px;
		height: 10px;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
