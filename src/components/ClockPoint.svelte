<script lang="ts">
	import type { IHand, ITaskPage } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { calculateMouseDialAngle } from '../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../scripts/getClientCoordinates';
	import { adjustClockwiseDistance } from '../scripts/adjustClockwiseDistance';
	import { defaultAppData } from '$lib/defaultAppData';
	import PageLayout from '../routes/tasks/PageLayout.svelte';

	const appState = getAppState();
	export let data = appState.data.hands;

	export let score: number = 0;
	export let enableNext: boolean = false;

	let dial: HTMLElement;
	let initialMouseAngle: number;

	const calculateScore = () => {
		score = $data.reduce((acc, hand) => {
			if (hand.pointsAt && hand.target) {
				acc += adjustClockwiseDistance(Math.abs(hand.pointsAt - hand.target));
			}
			return acc;
		}, 0);
	};

	const calculateComplete = () => {
		let complete = $data.every((hand) => hand.placed && hand.placed === true);
		enableNext = complete;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);
		let activeHand = $data.find((hand) => hand.active);
		if (!activeHand) {
			return;
		}
		activeHand.angle = newAngle - initialMouseAngle;

		$data = $data.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle - initialMouseAngle;
				hand.pointsAt = cssRotationToClockHours(newAngle);
			}
			return hand;
		});
	};

	const handleMouseUp = () => {
		//calculate score and make all hands inactive

		$data.map((hand) => {
			if (hand.active) {
				hand.placed = true;
			}
			hand.active = false;
			return hand;
		});

		calculateScore();
		calculateComplete();
	};

	const handleMouseDown = (e: InteractionEvent, hand: IHand) => {
		// update initial mouse position
		hand.active = true;
		const { clientX, clientY } = getClientCoordinates(e);
		const currentAngle = calculateMouseDialAngle(dial, clientX, clientY);
		initialMouseAngle = currentAngle - hand.angle;
	};
</script>

<div class="clock">
	{#each $data as hand}
		<div
			class={'hand hand-' + hand.name}
			role="button"
			tabindex="0"
			on:mousedown={(e) => handleMouseDown(e, hand)}
			on:touchstart={(e) => handleMouseDown(e, hand)}
			style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
		/>
	{/each}
	<div class="dial" bind:this={dial}></div>
</div>

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
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
