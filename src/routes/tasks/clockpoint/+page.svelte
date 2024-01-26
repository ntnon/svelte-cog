<script lang="ts">
	import type { IHand, ITaskPage } from '$lib/dataInterfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import Clock from '../../../components/Clock.svelte';
	import { calculateMouseDialAngle } from '../../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../../scripts/getClientCoordinates';
	import { adjustClockwiseDistance } from '../../../scripts/adjustClockwiseDistance';
	import { defaultAppData } from '$lib/defaultAppData';

	const appState = getAppState();
	const store = appState.pages.clockpoint;

	let dial: HTMLElement;
	let initialMouseAngle: number;

	const calculateScore = () => {
		return $store.hands.reduce((acc, hand) => {
			if (hand.pointsAt && hand.target) {
				acc += adjustClockwiseDistance(Math.abs(hand.pointsAt - hand.target));
			}
			return acc;
		}, 0);
	};

	const calculateComplete = () => {
		let complete = $store.hands.every((hand) => hand.placed && hand.placed === true);
		return complete;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);
		let activeHand = $store.hands.find((hand) => hand.active);
		if (!activeHand) {
			return;
		}
		activeHand.angle = newAngle - initialMouseAngle;

		$store.hands = $store.hands.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle - initialMouseAngle;
				hand.pointsAt = cssRotationToClockHours(newAngle);
			}
			return hand;
		});
	};

	const handleMouseUp = () => {
		//calculate score and make all hands inactive

		$store.hands.map((hand) => {
			if (hand.active) {
				hand.placed = true;
			}
			hand.active = false;
			return hand;
		});

		$store.score = calculateScore();
		$store.enableNext = calculateComplete();
	};

	const handleMouseDown = (e: InteractionEvent, hand: IHand) => {
		// update initial mouse position
		hand.active = true;
		const { clientX, clientY } = getClientCoordinates(e);
		const currentAngle = calculateMouseDialAngle(dial, clientX, clientY);
		initialMouseAngle = currentAngle - hand.angle;
	};
</script>

{$store.enableNext ? 'complete' : 'not complete'}<h></h>
score: {$store.score}

{$store.corrections}
{$store.timestamp}
{$store.success}

<button
	on:click={() => {
		$store.hands = JSON.parse(JSON.stringify(defaultAppData.pages.clockpoint.hands));
		$store.enableNext = false;
	}}>Reset</button
>

<Clock>
	{#each $store.hands as hand}
		<div
			class="hand hand-{hand.name}"
			role="button"
			tabindex="0"
			on:mousedown={(e) => handleMouseDown(e, hand)}
			on:touchstart={(e) => handleMouseDown(e, hand)}
			style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
		/>
	{/each}
	<div class="dial" bind:this={dial}></div>
</Clock>

<svelte:window
	on:mouseup={handleMouseUp}
	on:touchend={handleMouseUp}
	on:touchmove={(e) => handleMouseMove(e, true)}
	on:mousemove={handleMouseMove}
/>

<style>
	.hand {
		touch-action: none;
		position: absolute;
		background-color: #3c6ca8;
		height: 3.5vh;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
		user-select: none;
	}

	.hand-minute {
		width: 45%;
	}

	.hand-hour {
		width: 30%;
	}

	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 3.5vh;
		height: 3.5vh;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
