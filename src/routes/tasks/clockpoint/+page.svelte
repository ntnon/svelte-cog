<script lang="ts">
	import type { IPosition, IHand } from '$lib/interfaces';
	import { getRectCenter } from '../../../scripts/getRectCenter';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';

	let clockElement: HTMLElement;
	let clockCenter: IPosition;

	let hourHand: IHand = { id: 'hour', angle: 0 };
	let minuteHand: IHand = { id: 'minute', angle: 0 };

	$: if (clockElement) {
		clockCenter = getRectCenter(clockElement);
	}
	let hourBlock: IPosition = { top: 0, left: 0 };
	let minuteBlock: IPosition = { top: 0, left: 0 };

	function calculateAngleToCircle(position: IPosition) {
		const x = position.left - clockCenter.left;
		const y = position.top - clockCenter.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	}

	$: if (clockCenter) {
		hourHand.angle = calculateAngleToCircle(hourBlock);
		minuteHand.angle = calculateAngleToCircle(minuteBlock);
	}
</script>

{#if minuteBlock && hourBlock}
	<Draggable
		position={hourBlock}
		on:positionChange={(e) => (hourBlock = { ...hourBlock, ...e.detail.newPosition })}
		>hour</Draggable
	>
	<Draggable
		position={minuteBlock}
		on:positionChange={(e) => (minuteBlock = { ...minuteBlock, ...e.detail.newPosition })}
		>minute</Draggable
	>
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
</style>
