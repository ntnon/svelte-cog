<script lang="ts">
	import type { IBlock } from '$lib/interfaces';
	import { flip } from 'svelte/animate';

	import HourBlocks from '../../../components/tasks/HourBlocks.svelte';
	import { createHourBlockStore } from '../../../stores/blockStore';
	import Draggable from '../../../components/Draggable.svelte';
	import Block from '../../../components/tasks/Block.svelte';

	const blocks = createHourBlockStore(12);
	const offset = 130;
	let clock: HTMLElement;
	let activeBlock: IBlock | undefined;

	let offsetX = 0;
	let offsetY = 0;
	let left = 0;
	let top = 0;
	let moving = false;

	const restart = () => {
		blocks.update((b) => b.map((b) => ({ ...b, placed: false, active: false })));
	};

	const onMouseUp = (e: MouseEvent | TouchEvent) => {
		moving = false;
		/*
		activeBlock.placed = blocks.isInsideClock(e, activeBlock, clock);
		blocks.update((b) => b.map((b) => (b.id === activeBlock.id ? activeBlock : b)));
		*/
	};

	function tetherToMouse(block: IBlock) {}

	const onMouseDown = (e: MouseEvent | TouchEvent, block: IBlock) => {
		moving = true;
	};

	const onMouseMove = (e: MouseEvent | TouchEvent) => {
		const { clientX, clientY } = getClientCoordinates(e);
		offsetX = clientX - left;
		offsetY = clientY - top;
	};

	function getClientCoordinates(e: MouseEvent | TouchEvent) {
		return e instanceof TouchEvent
			? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
			: { clientX: e.clientX, clientY: e.clientY };
	}

	// Ensures that the active block is linked to the block store
	$: {
		activeBlock = $blocks.find((b) => b.active);
	}
</script>

<h2>Klokketesten</h2>
<p>Gjenskap klokken! Dra tallene til riktig plassering på klokken.</p>
<button on:click={() => restart}>Restart</button>
{activeBlock?.id ? activeBlock.id : 'ingen'}
<div class="numberBlocks">
	<div class="hour-block-list">
		{#each $blocks.filter((b) => b.placed === false) as block (block.id)}
			<div animate:flip={{ duration: 200 }}>
				<Block onPress={(e) => onMouseDown(e, block)} {block} anchored={true}>{block.id}</Block>
			</div>
		{/each}
	</div>
	<div bind:this={clock} class="clock">
		<div class="dial"></div>
		<div class="hand hour"></div>
		<div class="hand minute"></div>
		<div class="hour-block-list placed">
			{#each $blocks.filter((block) => block.position !== undefined) as block (block.id)}
				<div animate:flip={{ duration: 200 }}>
					<Block onPress={(e) => onMouseDown(e, block)} {block} anchored={false}>{block.id}</Block>
				</div>
			{/each}
		</div>
	</div>
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.placed {
		position: absolute;
		width: max-content;
		height: max-content;
	}
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
