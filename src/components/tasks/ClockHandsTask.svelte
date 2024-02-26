<script lang="ts">
	import type { IHand } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { calculateMouseDialAngle } from '../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../scripts/getClientCoordinates';
	import { adjustClockwiseDistance } from '../../scripts/adjustClockwiseDistance';
	import Clock from '../Clock.svelte';

	const appState = getAppState();
	export let handsData = appState.hands;
	let data = [$handsData.hour, $handsData.minute];
	handsData.subscribe((v) => (data = [v.hour, v.minute]));

	export let score: number = 0;
	export let enableNext: boolean = false;

	let dial: HTMLElement;
	let initialMouseAngle: number;

	const calculateScore = () => {
		score = data.reduce((acc, hand) => {
			if (hand.pointsAt && hand.target) {
				acc += adjustClockwiseDistance(Math.abs(hand.pointsAt - hand.target));
			}
			return acc;
		}, 0);
	};

	const calculateComplete = () => {
		let complete = data.every((hand) => hand.placed && hand.placed === true);
		enableNext = complete;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);
		let activeHand = data.find((hand) => hand.active);
		if (!activeHand) {
			return;
		}
		activeHand.angle = newAngle - initialMouseAngle;

		data = data.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle - initialMouseAngle;
				hand.pointsAt = cssRotationToClockHours(newAngle);
			}
			return hand;
		});
		handsData.update((v) => {
			v.hour = data[0];
			v.minute = data[1];
			return v;
		});
	};

	const handleMouseUp = () => {
		//calculate score and make all hands inactive

		data.map((hand) => {
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

<Clock
	>{#each data as hand}
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
