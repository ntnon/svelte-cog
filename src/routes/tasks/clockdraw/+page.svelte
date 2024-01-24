<script lang="ts">
	import type { IMarker, ITaskMarkers } from '$lib/dataInterfaces';
	import Clock from '../../../components/Clock.svelte';
	import { getDataStore } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { getClientCoordinates } from '../../../scripts/getClientCoordinates';
	import { calculateMouseDialAngle } from '../../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../../scripts/cssRotationToClockHours';
	import { getPagePosition } from '../../../scripts/getPagePosition';
	import { adjustClockwiseDistance } from '../../../scripts/adjustClockwiseDistance';

	const store = getDataStore<ITaskMarkers>('clockDraw');

	let mouseOffsetX = 0;
	let mouseOffsetY = 0;

	let dial: HTMLElement;

	const calculateScore = () => {
		let newScore = 0;
		let offDistance = 0;
		$store.markers.map((m) => {
			if (m.isInsideClock && m.pointsAt) {
				newScore += 1;
				let diff = Math.abs(m.pointsAt - m.id);
				offDistance += adjustClockwiseDistance(diff);
			}
		});
		return offDistance;
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
		const currentMarker = $store.markers.find((m) => m.active === true);
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

		const newMarkers = $store.markers.map((m) => {
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
		store.update((value) => ({ ...value, markers: newMarkers }));
	};

	const handleMouseUp = () => {
		$store.markers.map((m) => (m.active = false));
		$store.score = calculateScore();
		$store.complete = !$store.markers.find((m) => !m.isInsideClock);
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
			$store.corrections += 1;
		}
		marker.active = true;
	};
</script>

{$store.markers ? JSON.stringify($store.markers) : 'no markers'}
{$store.complete}
{$store.score}
<button
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
>
<span class="markerlist" id="markers">
	{#each $store.markers as marker}
		<div id={'marker-initial-slot-' + marker.id}>
			<div
				id={'marker-' + marker.id}
				role="button"
				tabindex="0"
				class="marker"
				style="top: {marker.y}px; left: {marker.x}px;"
				on:mousedown={(e) => handleMouseDown(e, marker)}
				on:touchstart={(e) => handleMouseDown(e, marker)}
			>
				{marker.id}
			</div>
		</div>
	{/each}
</span>
<Clock>
	<div class="dial" bind:this={dial}></div>
</Clock>

<svelte:window
	on:mouseup={handleMouseUp}
	on:touchend={handleMouseUp}
	on:mousemove={handleMouseMove}
	on:touchmove={(e) => handleMouseMove(e, true)}
/>

<style>
	.marker {
		touch-action: none;
		user-select: none;
		cursor: pointer;
		border: solid 3px #3c6ca8;
		position: relative;
		z-index: 1;
		width: 3rem;
		height: 3rem;
		min-height: 3rem;
		min-width: 3rem;
		border-radius: 50%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		margin: 0.1rem;
		background-color: #f4ebec;
	}
	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2.5vh;
		height: 2.5vh;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}

	.markerlist {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 80%;
	}
</style>
