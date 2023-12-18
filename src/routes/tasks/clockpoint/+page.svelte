<script lang="ts">
	import type { IBlock, IPosition } from '$lib/interfaces';
	import { afterUpdate, onMount } from 'svelte';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';
	import { getPosition } from '../../../scripts/clockSlotLocations';

	let clockElement: HTMLElement;

	let clockCenter: IPosition;

	onMount(() => {
		updateClockCenter();
	});

	afterUpdate(() => {
		updateClockCenter();
	});

	function updateClockCenter() {
		const rect = clockElement.getBoundingClientRect();
		clockCenter = {
			left: rect.left + rect.width / 2,
			top: rect.top + rect.height / 2
		};
	}

	interface IHand {
		id: string;
		angle: number;
	}

	let hourBlock: IBlock = {
		id: 1,
		name: 'hour',
		position: { top: 0, left: 0 }
	};

	let minuteBlock: IBlock = {
		id: 2,
		name: 'minute',
		position: { top: 0, left: 0 }
	};

	let hourHand: IHand = {
		id: 'hour',
		angle: 15
	};

	let minuteHand: IHand = {
		id: 'minute',
		angle: 90
	};

	// Function to calculate the angle between the center of the clock and a position
	function calculateAngle(position: IPosition) {
		if (clockCenter) {
			const dx = position.left - clockCenter.left;
			const dy = clockCenter.top - position.top; // Subtract from clockCenter.y because the y-axis is inverted in the DOM
			const rad = Math.atan2(dy, dx);
			const deg = rad * (180 / Math.PI);
			return deg;
		}
		console.log('clock center isnt yet set!');
		return 90;
	}

	let moving = false; // do something with make less lag

	const onMouseMove = (e: MouseEvent | TouchEvent) => {};

	const draggableMouseDown = (e: MouseEvent | TouchEvent, hand: IBlock) => {
		moving = true;
	};

	const draggableMouseUp = (e: MouseEvent | TouchEvent, hand: IBlock, position: IPosition) => {
		moving = false;
	};
</script>

{#if clockCenter}
	<div
		class="item"
		style={'position: absolute; top:' + clockCenter.top + 'px; left:' + clockCenter.left + 'px;'}
	>
		HELLOOOOOOO
	</div>
{/if}

<Draggable
	item={hourBlock}
	position={hourBlock.position}
	onMouseDownFn={(e) => draggableMouseDown(e, hourBlock)}
	onMouseUpFn={(e, position) => draggableMouseUp(e, hourBlock, position)}>hour</Draggable
>

<Draggable
	item={minuteBlock}
	position={minuteBlock.position}
	onMouseMoveFn={(e, position) => {
		minuteHand.angle = calculateAngle(position);
	}}
	onMouseDownFn={(e) => draggableMouseDown(e, minuteBlock)}
	onMouseUpFn={(e, position) => draggableMouseUp(e, minuteBlock, position)}>minute</Draggable
>
<p>{minuteHand.angle}</p>
<div bind:this={clockElement}>
	<Clock>
		{#each [hourHand, minuteHand] as hand (hand.id)}
			<div
				class="hand"
				style={'transform: translate(-50%, -50%) rotate(' +
					hand.angle +
					'deg) translate(50%, 0%); '}
			></div>
		{/each}
	</Clock>
</div>
<svelte:window on:mousemove={onMouseMove} />

<style>
	.hand {
		position: absolute;
		background-color: rgb(48, 105, 105);
		width: 100px;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
	}
</style>
