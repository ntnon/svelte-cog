<script lang="ts">
	import type { IPosition } from '$lib/interfaces';
	import { afterUpdate, onMount } from 'svelte';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';

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
		position: { top: number; left: number };
	}

	let hourBlock = {
		id: 'hourHand',
		position: { top: 0, left: 0 }
	};

	let minuteBlock = {
		id: 'hourHand',
		position: { top: 0, left: 0 }
	};

	let hourHand = {
		id: 'hour',
		angle: 15
	};

	let minuteHand = {
		id: 'minute',
		angle: 90
	};

	$: {
		if (clockCenter) {
			hourHand.angle = calculateAngle(hourBlock.position);
			minuteHand.angle = calculateAngle(minuteBlock.position);
		}
	}

	// Function to calculate the angle between the center of the clock and a position
	function calculateAngle(position: IPosition) {
		if (clockCenter) {
			const dx = position.left - clockCenter.left;
			const dy = clockCenter.top - position.top; // Subtract from clockCenter.y because the y-axis is inverted in the DOM
			const rad = Math.atan2(dy, dx);
			const deg = rad * (180 / Math.PI);
			return deg;
		}
		return 90;
	}

	let moving = false; // do something with make less lag

	const onMouseMove = (e: MouseEvent | TouchEvent) => {};

	const draggableMouseDown = (e: MouseEvent | TouchEvent, hand: IHand) => {
		moving = true;
	};

	const draggableMouseUp = (e: MouseEvent | TouchEvent, hand: IHand, position: IPosition) => {
		moving = false;
	};
</script>

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
		console.log(position);
	}}
	onMouseDownFn={(e) => draggableMouseDown(e, minuteBlock)}
	onMouseUpFn={(e, position) => draggableMouseUp(e, minuteBlock, position)}>minute</Draggable
>

<div bind:this={clockElement}>
	<Clock>
		{#each [hourHand, minuteHand] as hand (hand.id)}
			<div
				class="hand"
				style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) '}
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
