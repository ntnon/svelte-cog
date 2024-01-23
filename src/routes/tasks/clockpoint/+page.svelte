<script lang="ts">
	import type { IHand, ITaskData, ITaskHands } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import Clock from '../../../components/Clock.svelte';
	import { cssRotationToClockHours } from '../../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../../scripts/getClientCoordinates';

	const store = getDataStore<ITaskHands>('clockPoint');

	let dial: HTMLElement;

	let hands: IHand[] = [$store.minute, $store.hour];

	console.log(hands);

	const calculateMouseDialAngle = (clientX: number, clientY: number) => {
		const dialRect = dial.getBoundingClientRect();
		const x = clientX - dialRect.left;
		const y = clientY - dialRect.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	};

	const onMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(clientX, clientY);
		const newHands = hands.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle;
			}
			return { ...hand };
		});
		store.update((value) => ({ ...value, hands: newHands }));
	};
	// hour: {cssRotationToClockHours($store.hour.angle).toFixed(10)}
</script>

<button
	on:click={() => {
		$store.hour.angle = 90;
		$store.minute.angle = 45;
	}}>Reset</button
>

<Clock>
	{#each [$store.minute, $store.hour] as hand}
		<div
			role="button"
			tabindex="0"
			on:mousedown={() => (hand.active = true)}
			on:mouseup={() => hands.map((hand) => (hand.active = false))}
			on:touchstart={() => (hand.active = true)}
			on:touchend={() => (hand.active = false)}
			class={'hand'}
			style={'transform: translate(-50%, -50%) rotate(' +
				hand.angle +
				'deg) translate(50%, 0%); width: ' +
				hand.length +
				'px'}
		/>
	{/each}
	<div class="dial" bind:this={dial}></div>
</Clock>

<svelte:window
	on:mouseup={() => hands.map((hand) => (hand.active = false))}
	on:touchend={() => hands.map((hand) => (hand.active = false))}
	on:touchmove={(e) => onMouseMove(e, true)}
	on:mousemove={onMouseMove}
/>

<style>
	.hand {
		touch-action: none;
		position: absolute;
		background-color: #3c6ca8;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
		user-select: none;
	}

	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 10px;
		height: 10px;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
