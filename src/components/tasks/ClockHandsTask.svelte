<script lang="ts">
	import type { IHand, IHands, IPos } from '$lib/interfaces';
	import type { InteractionEvent } from '$lib/types';
	import { calcAngle } from '../../scripts/trigonometry/calcAngle';
	import { angleToClockHour } from '../../scripts/trigonometry/angleToClockHour';
	import { getClientCoordinates } from '../../scripts/getClientCoordinates';
	import Clock from '../Clock.svelte';

	import { getRectCenter } from '../../scripts/getRectCenter';
	import { createEventDispatcher } from 'svelte';

	export let hands: IHands;

	let initialMouseAngle: number;
	let activeHand: IHand | null = null;

	let dial: HTMLElement;
	let clock: HTMLElement;
	let dialPos: IPos;

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!activeHand) {
			return;
		}
		if (!touch) {
			e.preventDefault();
		}

		const dialPos = getRectCenter(dial);
		const interactionPos = getClientCoordinates(e);
		if (!dialPos) return;
		if (!interactionPos) return;

		const newAngle = calcAngle(interactionPos, dialPos);

		activeHand.angle = newAngle - initialMouseAngle;
		activeHand.pointsAt = angleToClockHour(newAngle);

		if (activeHand.name === 'hour') {
			hands.hour = activeHand;
		}
		if (activeHand.name === 'minute') {
			hands.minute = activeHand;
		}
	};

	const handleMouseUp = () => {
		if (activeHand) {
			activeHand.completed = true;
			if (activeHand.name === 'hour') {
				hands.hour = activeHand;
			}
			if (activeHand.name === 'minute') {
				hands.minute = activeHand;
			}
		}
		//calculate score and make all hands inactive
		activeHand = null;
	};

	const handleMouseDown = (e: InteractionEvent, hand: IHand) => {
		// update initial mouse position
		hand.completed = true;
		activeHand = hand;

		const dialPos = getRectCenter(dial);
		const interactionPos = getClientCoordinates(e);
		if (!interactionPos) return;

		const angle = calcAngle(interactionPos, dialPos);

		initialMouseAngle = angle - hand.angle;
	};
</script>

<Clock bind:clock>
	{#each [hands.hour, hands.minute] as hand}
		<button
			class="{'hand hand-' + hand.name} {hand.completed ? '' : 'opacity-50'}"
			tabindex="0"
			on:mousedown={(e) => handleMouseDown(e, hand)}
			on:touchstart={(e) => handleMouseDown(e, hand)}
			style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
			><p>he</p>
		</button>
	{/each}
	<span class="dial" bind:this={dial} /></Clock
>

<svelte:window
	on:mouseup={handleMouseUp}
	on:touchend={handleMouseUp}
	on:touchmove={(e) => handleMouseMove(e, true)}
	on:mousemove={handleMouseMove}
/>

<style>
	.hand {
		top: 50%;
		left: 50%;
		touch-action: none;
		background-color: #3c6ca8;
		position: absolute;
		transform: translate(0%, -50%);
		user-select: none;
	}

	p {
		opacity: 0;
	}

	.hand-minute {
		width: 45%;
	}

	.hand-hour {
		width: 33%;
	}

	.dial {
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
