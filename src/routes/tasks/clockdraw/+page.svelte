<script lang="ts">
	import type { IBlock } from '$lib/interfaces';

	import HourBlocks from '../../../components/tasks/HourBlocks.svelte';
	import { createHourBlockStore } from '../../../stores/blockStore';

	const blocks = createHourBlockStore(12);
	const offset = 130;
	let clock: HTMLElement;

	const restart = () => {
		blocks.update((b) => b.map((b) => ({ ...b, placed: false })));
	};

	const handleMouseUpFn = (e: MouseEvent | TouchEvent, block: IBlock) => {
		//blocks.findClosestAvailableSlot(e, block);
		//blocks.isInsideClock(e, block, clock);
		block.placed = blocks.isInsideClock(e, block, clock);
		blocks.update((b) => b.map((b) => (b.id === block.id ? block : b)));
	};

	const handleMouseDownFn = (e: MouseEvent | TouchEvent, block: IBlock) => {
		console.log('handleMouseDownFn');
		let newBlock = { ...block, active: true };
		blocks.update((b) => b.map((b) => (b.id === block.id ? newBlock : b)));
	};
</script>

<h2>Klokketesten</h2>
<p>Gjenskap klokken! Dra tallene til riktig plassering på klokken.</p>
<button on:click={() => restart}>Restart</button>
<div class="numberBlocks">
	<HourBlocks {handleMouseDownFn} {handleMouseUpFn} {clock} {blocks} placedCondition={false} />
	<div bind:this={clock} class="clock">
		<div class="dial"></div>
		<div class="hand hour"></div>
		<div class="hand minute"></div>
		<HourBlocks {handleMouseDownFn} {handleMouseUpFn} {clock} {blocks} placedCondition={true} />
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
