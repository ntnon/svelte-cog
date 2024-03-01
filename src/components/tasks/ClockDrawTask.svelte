<script lang="ts">
	import type { IMarker } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { getClientCoordinates } from '../../scripts/getClientCoordinates';
	import { calculateMouseDialAngle } from '../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../scripts/cssRotationToClockHours';
	import { getPagePosition } from '../../scripts/getPagePosition';
	import { adjustClockwiseDistance } from '../../scripts/adjustClockwiseDistance';
	import Clock from '../Clock.svelte';

	const taskState = getAppState().taskData.markers;
	let markers = $taskState.data;

	let activeMarkerId: number | undefined = undefined;

	let mouseOffsetX = 0;
	let mouseOffsetY = 0;

	let dial: HTMLElement;

	const calculateScore = () => {
		let newScore = 0;
		let offDistance = 0;
		markers.map((m) => {
			if (m.isInsideClock && m.pointsAt) {
				newScore += 1;
				let diff = Math.abs(m.pointsAt - m.id);
				offDistance += adjustClockwiseDistance(diff);
			}
		});
		// return $store.markers.reduce((acc, marker) => {
		// 	if (marker.isInsideClock && marker.pointsAt) {
		// 		acc += 1;
		// 		let diff = Math.abs(marker.pointsAt - marker.id);
		// 		acc += adjustClockwiseDistance(diff);
		// 	}
		// 	return acc;
		// }, 0);
		// score = offDistance;
	};

	const isMarkerInCircle = (markerId: string) => {
		const clockHTMLElement = document.getElementById('clock');
		const markerHTMLElement = document.getElementById('marker-' + markerId);

		if (!clockHTMLElement) {
			console.warn('clock not found');
			return false;
		}
		if (!markerHTMLElement) {
			console.warn('marker not found');
			return false;
		}
		const markerPosition = getPagePosition(markerHTMLElement);
		const clockPosition = getPagePosition(clockHTMLElement);
		const clockRadius = clockHTMLElement.offsetWidth / 2;
		const dx = clockPosition.x - markerPosition.x;
		const dy = clockPosition.y - markerPosition.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const overlap = distance <= clockRadius;
		return overlap;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}
		const activeMarker = markers.find((m) => m.id === activeMarkerId);
		if (!activeMarker) {
			console.log('no active marker');
			return;
		}
		console.log('active marker!');

		const { clientX, clientY } = getClientCoordinates(e);

		activeMarker.angle = calculateMouseDialAngle(dial, clientX, clientY);
		activeMarker.pointsAt = cssRotationToClockHours(activeMarker.angle);
		activeMarker.isInsideClock = isMarkerInCircle(activeMarker.id.toString());
		activeMarker.x = clientX - mouseOffsetX;
		activeMarker.y = clientY - mouseOffsetY;
	};

	const handleMouseUp = () => {
		activeMarkerId = undefined;
		calculateScore();
		// enableNext = !$data.find((m) => !m.isInsideClock);
	};

	const handleMouseDown = (e: InteractionEvent, marker: IMarker) => {
		const currentMarkerHTMLElement = document.getElementById('marker-' + marker.id);
		if (!currentMarkerHTMLElement) {
			return;
		}
		const { clientX, clientY } = getClientCoordinates(e);
		const { x: offsetX, y: offsetY } = getPagePosition(currentMarkerHTMLElement);
		mouseOffsetX = clientX - offsetX;
		mouseOffsetY = clientY - offsetY;
		if (marker.isInsideClock) {
			// $store.corrections += 1;
		}
		activeMarkerId = marker.id;
	};

	$: if (markers) {
		console.log('markers!');
	}
</script>

<!-- <button
	on:click={() =>
		($store.markers = $store.markers.map((m) => ({
			...m,
			active: false,
			x: 0,
			y: 0,
			pointsAt: undefined,
			isInsideClock: false,
			angle: undefined
		})))}>Reset</button
> -->
<!-- <span class="container flex flex-col">
	<div class="clock size-[80%]" id="clock">
		<div class="dial" bind:this={dial}></div>
	</div>
	<span class="markerlist flex flex-wrap" id="markers">
		{#each $data as marker}
			<div id={'marker-initial-slot-' + marker.id}>
				<div
					id={'marker-' + marker.id}
					role="button"
					tabindex="0"
					class="marker size-[3rem]"
					style="top: {marker.y}px; left: {marker.x}px;"
					on:mousedown={(e) => handleMouseDown(e, marker)}
					on:touchstart={(e) => handleMouseDown(e, marker)}
				>
					{marker.id}
				</div>
			</div>
		{/each}
	</span>
</span> -->

<button
	on:click={() => {
		console.log('hi');
		markers.map((m) => {
			m.x += Math.random() * 100 - 50;
			m.y += Math.random() * 100 - 50;
		});
	}}>randomize</button
>
<span class="flex flex-col size-full items-center">
	<Clock>
		<span class="dial" bind:this={dial} />
	</Clock>

	<span class="markers w-[100%] flex flex-row justify-center items-center flex-wrap"
		>{#each $taskState.data as marker}
			<div id={'marker-initial-slot-' + marker.id}>
				<div
					id={'marker-' + marker.id}
					role="button"
					tabindex="0"
					class="marker size-[6vh]"
					style="top: {marker.y}px; left: {marker.x}px;"
					on:mousedown={(e) => handleMouseDown(e, marker)}
					on:touchstart={(e) => handleMouseDown(e, marker)}
				>
					{marker.id}
				</div>
			</div>
		{/each}</span
	>
</span>
<svelte:window
	on:mouseup={handleMouseUp}
	on:touchend={handleMouseUp}
	on:mousemove={handleMouseMove}
	on:touchmove={(e) => handleMouseMove(e, true)}
/>
