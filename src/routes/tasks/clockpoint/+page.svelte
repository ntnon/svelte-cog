<script lang="ts">
	import type { IHand } from '$lib/interfaces';
	import type { InteractionEvent } from '$lib/types';
	import Clock from '../../../components/Clock.svelte';
	import { cssRotationToClockHours } from '../../../scripts/cssRotationToClockHours';
	import { getClientCoordinates } from '../../../scripts/getClientCoordinates';

	let dial: HTMLElement;

	let hands: IHand[] = [
		{ name: 'hour', angle: 0, active: false, length: 100 },
		{ name: 'minute', angle: 20, active: false, length: 130 }
	];

	const calculateMouseDialAngle = (clientX: number, clientY: number) => {
		const dialRect = dial.getBoundingClientRect();
		const x = clientX - dialRect.left;
		const y = clientY - dialRect.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	};

	const onMouseMove = (e: InteractionEvent) => {
		e.preventDefault();
		const { clientX, clientY } = getClientCoordinates(e);
		const newAngle = calculateMouseDialAngle(clientX, clientY);
		hands = hands.map((hand) => {
			if (hand.active) {
				hand.angle = newAngle;
			}
			return { ...hand };
		});
	};
</script>

hour: {cssRotationToClockHours(hands[0].angle).toFixed(3)}
min: {cssRotationToClockHours(hands[1].angle).toFixed(3)}
<button
	on:click={() =>
		(hands = hands.map((hand) => {
			hand.angle = 0;
			hand.active = false;
			return { ...hand };
		}))}>Reset</button
>
<Clock>
	{#each hands as hand}
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
	on:touchmove={onMouseMove}
	on:mousemove={onMouseMove}
/>

<style>
	.hand {
		touch-action: none;
		position: absolute;
		background-color: rgba(48, 105, 105);
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
