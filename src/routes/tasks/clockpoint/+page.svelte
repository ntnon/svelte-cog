<script lang="ts">
	import type { IHand, ITaskPage } from '$lib/dataInterfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
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

<h2>Clock point</h2>
<div class="clock aspect-square w-[50vh] border-orange bg-off-white border-solid border-[1.25vh]">
	{#each $store.hands as hand}
		<div
			class="hand h-4 bg-blue hand-{hand.name} top-1/2 left-1/2"
			role="button"
			tabindex="0"
			on:mousedown={(e) => handleMouseDown(e, hand)}
			on:touchstart={(e) => handleMouseDown(e, hand)}
			style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
		/>
	{/each}
	<div class="dial bg-orange w-4 h-4 absolute top-1/2 left-1/2" bind:this={dial}></div>
</div>
<button
	on:click={() => {
		$store.hands = JSON.parse(JSON.stringify(defaultAppData.pages.clockpoint.hands));
		$store.enableNext = false;
	}}>Reset</button
>

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
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
