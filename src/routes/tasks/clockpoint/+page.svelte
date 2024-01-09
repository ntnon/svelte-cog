<script lang="ts">
	import type { IPosition, IHand } from '$lib/interfaces';
	import { getRectCenter } from '../../../scripts/getRectCenter';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';

	let complete = false;
	let score: number = 0;
	let attempts: number = 0; // increase whenever a block is placed

	function calculateScore() {
		//calculate score
		//if score is 12, set complete to true
		return 0;
	}

	const addAttempt = () => {
		attempts++;
	};

	let clockElement: HTMLElement;
	let clockCenter: IPosition;
	let hourHand: IHand = { id: 'hour', angle: 90 };
	let minuteHand: IHand = { id: 'minute', angle: 90 };
	let hourBlock = { id: 'hour', position: { top: 0, left: 0 } };
	let minuteBlock = { id: 'minute', position: { top: 0, left: 0 } };

	function calculateAngleToCircle(position: IPosition) {
		const x = position.left - clockCenter.left;
		const y = position.top - clockCenter.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	}

	$: if (clockCenter) {
		hourHand.angle = calculateAngleToCircle(hourBlock.position);
		minuteHand.angle = calculateAngleToCircle(minuteBlock.position);
	}

	$: if (clockElement) {
		clockCenter = getRectCenter(clockElement);
	}
</script>

<h1>Ten minutes past 10</h1>
<p>Adjust the clock by moving the circles</p>
{attempts}
{#if minuteBlock && hourBlock}
	{#each [hourBlock, minuteBlock] as block (block.id)}
		<div class="blocks">
			<Draggable
				position={block.position}
				on:positionChange={(e) => (block.position = e.detail.newPosition)}
				on:mouseUp={addAttempt}>{block.id}</Draggable
			>
		</div>
	{/each}
{/if}

<div bind:this={clockElement}>
	<Clock>
		{#each [hourHand, minuteHand] as hand (hand.id)}
			<div
				class={'hand-' + hand.id}
				style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
			></div>
		{/each}
	</Clock>
</div>

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
