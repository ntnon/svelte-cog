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

	const appState = getAppState();
	export let data = appState.markers;

	let mouseOffsetX = 0;
	let mouseOffsetY = 0;

	let dial: HTMLElement;

	const calculateScore = () => {
		let newScore = 0;
		let offDistance = 0;
		$data.map((m) => {
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
		const currentMarker = $data.find((m) => m.active === true);
		if (!currentMarker) return;
		const currentMarkerHTMLElement = document.getElementById(
			'marker-initial-slot-' + currentMarker.id
		);

		if (!currentMarkerHTMLElement) return;
		const { x: offsetX, y: offsetY } = getPagePosition(currentMarkerHTMLElement);
		const { clientX, clientY } = getClientCoordinates(e);

		const newAngle = calculateMouseDialAngle(dial, clientX, clientY);
		const newPointsAt = cssRotationToClockHours(newAngle);
		const newInsideClock = isMarkerInCircle(currentMarker.id.toString());
		const newMarkers = $data.map((m) => {
			if (m.id === currentMarker?.id) {
				return {
					...currentMarker,
					pointsAt: newPointsAt,
					angle: newAngle,
					x: clientX - offsetX - mouseOffsetX,
					y: clientY - offsetY - mouseOffsetY,
					isInsideClock: newInsideClock
				};
			}
			return m;
		});
		data.update((value) => newMarkers);
	};

	const handleMouseUp = () => {
		$data.map((m) => (m.active = false));
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
		marker.active = true;
	};
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
<span class="flex flex-col size-full items-center">
	<Clock>
		<span class="dial" bind:this={dial} />
	</Clock>

	<span class="markers w-[100%] flex flex-row justify-center items-center flex-wrap"
		>{#each $data as marker}
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
