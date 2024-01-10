<script lang="ts">
	import type { IPosition, IHand, IBlock } from '$lib/interfaces';
	import { getRectCenter } from '../../../scripts/getRectCenter';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';

	let complete = false;
	let score: number = 0;
	let attempts: number = 0; // increase whenever a block is placed
	let placedBlocks = new Set<number>();
	let repositions: number = 0; // increase whenever a block is moved more than once

	function calculateScore() {
		//calculate score
		//if score is 12, set complete to true
		return 0;
	}

	let clockElement: HTMLElement;
	let clockCenter: IPosition;
	let hourHand: IHand = { id: 'hour', angle: 90 };
	let minuteHand: IHand = { id: 'minute', angle: 90 };

	let hourBlock: IBlock = { id: 0, name: 'hour', position: { top: 0, left: 0 } };
	let minuteBlock: IBlock = { id: 1, name: 'minute', position: { top: 0, left: 0 } };

	function calculateAngleToCircle(position: IPosition) {
		const x = position.left - clockCenter.left;
		const y = position.top - clockCenter.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	}

	function handleMouseUp(block: IBlock) {
		if (placedBlocks.has(block.id)) {
			repositions++;
		}
		placedBlocks.add(block.id);
	}

	function handlePositionChange(block: IBlock, position: IPosition) {
		block.position = position;
		hands = hands.map((hand) => {
			if (hand.id === block.name) {
				hand.angle = calculateAngleToCircle(position);
			}
			return hand;
		});
	}

	function updateClockCenter() {
		//triggered by window resize and when clockElement is set
		clockCenter = getRectCenter(clockElement); //instantiate clockCenter - required for calculating the angle of the hands
	}

	$: if (clockElement) {
		updateClockCenter();
	}
</script>

<h1>Ten minutes past 10</h1>
<p>Adjust the clock by moving the circles</p>
{#if minuteBlock && hourBlock}
	{#each [hourBlock, minuteBlock] as block (block.id)}
		<div class="blocks">
			<Draggable
				position={block.position}
				on:positionChange={(e) => handlePositionChange(block, e.detail.position)}
				on:mouseUp={(e) => handleMouseUp(block)}
			>
				{block.name}
			</Draggable>
		</div>
	{/each}
{/if}

<div bind:this={clockElement}>
	<Clock>
		{#each [minuteHand, hourHand] as hand (hand.id)}
			<div
				class={'hand-' + hand.id}
				style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
			></div>
		{/each}
	</Clock>
</div>
<svelte:window on:resize={() => updateClockCenter()} />

<style>
	.hand-hour {
		position: absolute;
		background-color: rgba(48, 105, 105, 0.21);
		width: 100px;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
	}
	.hand-minute {
		position: absolute;
		background-color: rgba(48, 105, 105, 0.21);
		width: 130px;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
	}

	.blocks {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		justify-content: space-between;
	}
</style>
