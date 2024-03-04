<script lang="ts">
	import type { IPosition, IHand, IBlock } from '$lib/interfaces';
	import { getRectCenter } from '../../../scripts/getRectCenter';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/Clock.svelte';
	import timestamps from '../../../lib/timestamps.json';
	import { onMount } from 'svelte';
	import type { ITaskData } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';

	const store = getAppState<ITaskData>('clockpoint');

	onMount(() => {
		time = timestamps[Math.floor(Math.random() * timestamps.length)];
	});

	let time: { name: string; hour: number; minute: number } = { name: '', hour: 0, minute: 0 };

	let placedBlocks = new Set<number>();

	const calculateScore = () => {
		$store.score = 0;
		let targetMinuteNumber = time.minute / 5; // 5 minutes per block
		let targetHour = time.hour;
		if (!minuteHand.closestNumber || !hourHand.closestNumber) return;
		let minuteDifference = Math.abs(targetMinuteNumber - minuteHand.closestNumber);
		let hourDifference = Math.abs(targetHour - hourHand.closestNumber);
		if (minuteDifference <= 0.5) {
			$store.score++;
		}
		if (hourDifference <= 0.5) {
			$store.score++;
		}
	};

	const calculateComplete = () => {
		if (placedBlocks.size == 2) {
			$store.complete = true;
		}
	};

	let clockElement: HTMLElement;
	let clockCenter: IPosition;
	let hourHand: IHand = { id: 'hour', angle: 90 };
	let minuteHand: IHand = { id: 'minute', angle: 90 };
	let hands = [hourHand, minuteHand];

	let hourBlock: IBlock = { id: 0, name: 'hour', position: { top: 0, left: 0 } };
	let minuteBlock: IBlock = { id: 1, name: 'minute', position: { top: 0, left: 0 } };

	const calculateAngleToCircle = (position: IPosition) => {
		const x = position.left - clockCenter.left;
		const y = position.top - clockCenter.top;
		const angle = Math.atan2(y, x) * (180 / Math.PI);
		return angle;
	};

	const handleMouseUp = (block: IBlock) => {
		if (placedBlocks.has(block.id)) {
			$store.corrections++;
		}
		placedBlocks.add(block.id);
		calculateComplete();
	};

	const handlePositionChange = (block: IBlock, position: IPosition) => {
		block.position = position;
		hands = hands.map((hand) => {
			if (hand.id === block.name) {
				hand.angle = calculateAngleToCircle(position);
				hand.closestNumber = ((Math.round(((hand.angle + 360) % 360) / 15) + 6) % 24) / 2; // Divides the circle into 24 slices, one slice for each half hour in a day. The slices are divided by two, which then accounts for all full and half hours, for instance, 1.5 is 1:30, 2.5 is 2:30, etc.
				// +6 is added to mitigate the offset caused by CSS axis rotation differing from the mathematical axis rotation. The offset is 90 degrees, which is 6 slices of 15 degrees.
				if (hand.closestNumber === 0) {
					hand.closestNumber = 12;
				}
			}
			return hand;
		});
		calculateScore();
	};

	const updateClockCenter = () => {
		//triggered by window resize and when clockElement is set
		clockCenter = getRectCenter(clockElement); //instantiate clockCenter - required for calculating the angle of the hands
	};

	$: if (clockElement) {
		updateClockCenter();
	}
</script>

<h2>{time.name}</h2>
<p>Adjust the clock by moving the circles</p>
{#each [hourBlock, minuteBlock] as block (block.id)}
	<div class="blocks">
		<Draggable
			position={block.position}
			on:positionChange={(e) => handlePositionChange(block, e.detail.position)}
			on:mouseUp={(e) => handleMouseUp(block)}
		>
			{block.name}
		</Draggable>
	</div>
{/each}

<div bind:this={clockElement}>
	<Clock>
		{#each hands as hand (hand.id)}
			<div
				class={'hand-' + hand.id}
				style={'transform: translate(-50%, -50%) rotate(' + hand.angle + 'deg) translate(50%, 0%);'}
			/>
		{/each}
	</Clock>
</div>
<svelte:window on:resize={() => updateClockCenter()} />

<style>
	.hand-hour {
		position: absolute;
		background-color: rgba(48, 105, 105, 0.21);
		width: 100px;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
	}
	.hand-minute {
		position: absolute;
		background-color: rgba(48, 105, 105, 0.21);
		width: 130px;
		height: 20px;
		left: 50%;
		top: 50%;
		transform: translate(0%, -50%);
	}

	.blocks {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		justify-content: space-between;
	}
</style>
