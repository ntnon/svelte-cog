<script lang="ts">
	import type { IHand, IHands } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { calculateMouseDialAngle } from '../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../scripts/getClientCoordinates';
	import Clock from '../Clock.svelte';

	export let hands: IHands;

	let dial: HTMLElement;
	let initialMouseAngle: number;
	let container: HTMLElement;
	let activeHand: IHand | null = null;

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!activeHand) {
			return;
		}
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);

		activeHand.angle = newAngle - initialMouseAngle;
		activeHand.pointsAt = cssRotationToClockHours(newAngle);
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
		activeHand = hand;
		const { clientX, clientY } = getClientCoordinates(e);
		const currentAngle = calculateMouseDialAngle(dial, clientX, clientY);
		initialMouseAngle = currentAngle - hand.angle;
	};
</script>

<!-- <Clock>
	<span class="">
		{#each data as hand}
			<div
				class={'hand hand-' + hand.name}
				role="button"
				tabindex="0"
				on:mousedown={(e) => handleMouseDown(e, hand)}
				on:touchstart={(e) => handleMouseDown(e, hand)}
				style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
			/>
		{/each}
		<span class="dial" bind:this={dial} />
	</span>
</Clock> -->

<Clock>
	{#each [hands.hour, hands.minute] as hand}
		<div
			class={'hand hand-' + hand.name}
			role="button"
			tabindex="0"
			on:mousedown={(e) => handleMouseDown(e, hand)}
			on:touchstart={(e) => handleMouseDown(e, hand)}
			style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
		/>
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

	.hand-minute {
		width: 45%;
		height: 3vh;
	}

	.hand-hour {
		width: 33%;
		height: 3vh;
	}

	.dial {
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
