<script lang="ts">
	import type { IHand, ITaskData, ITaskHands } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import Clock from '../../../components/Clock.svelte';
	import { calculateMouseDialAngle } from '../../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../../scripts/getClientCoordinates';
	import { adjustClockwiseDistance } from '../../../scripts/adjustClockwiseDistance';

	const store = getDataStore<ITaskHands>('clockPoint');

	let dial: HTMLElement;

	let initialMouseAngle: number;

	let hands: IHand[] = [$store.minute, $store.hour];

	const calculateScore = () => {
		let offDistance = 0;
		if ($store.minute.pointsAt && $store.hour.pointsAt) {
			offDistance += adjustClockwiseDistance(
				Math.abs($store.minute.pointsAt - $store.targetTimestamp.minute / 5)
			);
			offDistance += adjustClockwiseDistance(
				Math.abs($store.hour.pointsAt - $store.targetTimestamp.hour)
			);
		}
		return offDistance;
	};

	const calculateComplete = () => {
		if ($store.minute.placed && $store.hour.placed) {
			return true;
		}
		return false;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);
		const newHands = hands.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle - initialMouseAngle;

				hand.pointsAt = cssRotationToClockHours(newAngle);
			}
			return { ...hand };
		});
		store.update((value) => ({ ...value, hands: newHands }));
	};

	const handleMouseUp = () => {
		//calculate score and make all hands inactive
		hands.map((hand) => {
			if (hand.active) {
				hand.placed = true;
			}
			hand.active = false;
		});
		store.update((value) => ({ ...value, hands: hands }));
		$store.score = calculateScore();
		$store.complete = calculateComplete();
	};

	const handleMouseDown = (e: InteractionEvent, hand: IHand) => {
		// update initial mouse position
		hand.active = true;
		const { clientX, clientY } = getClientCoordinates(e);
		const currentAngle = calculateMouseDialAngle(dial, clientX, clientY);
		initialMouseAngle = currentAngle - hand.angle;
	};
</script>

{$store.complete ? 'complete' : 'not complete'}<h></h>
{$store.targetTimestamp.name}
{$store.score}

{$store.corrections}
{$store.comment}
{$store.success}

<button
	on:click={() => {
		$store.hour.angle = 90;
		$store.minute.angle = 45;
		$store.hour.placed = false;
		$store.minute.placed = false;
	}}>Reset</button
>

<Clock>
	{#each [$store.minute, $store.hour] as hand}
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
