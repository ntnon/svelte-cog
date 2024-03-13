<script lang="ts">
	import type { IMarker, ITaskData } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import type { InteractionEvent } from '$lib/types';
	import { getClientCoordinates } from '../../scripts/getClientCoordinates';
	import { calculateMouseDialAngle } from '../../scripts/calculateMouseDialAngle';
	import { cssRotationToClockHours } from '../../scripts/cssRotationToClockHours';
	import { getPagePosition } from '../../scripts/getPagePosition';
	import Clock from '../Clock.svelte';

	export let markers: IMarker[];

	let activeMarker: IMarker | undefined = undefined;

	let mouseOffsetX = 0;
	let mouseOffsetY = 0;

	let dial: HTMLElement;
	let clock: HTMLElement;

	const isMarkerInCircle = (marker: IMarker) => {
		if (!clock) {
			console.warn('no clock');
			return false;
		}
		if (!marker.DOMElement) {
			console.warn('no marker');
			return false;
		}
		const markerPosition = getPagePosition(marker.DOMElement);

		const clockPosition = getPagePosition(clock);

		const clockRadius = clock.offsetWidth / 2;
		const dx = clockPosition.offsetX - markerPosition.offsetX;
		const dy = clockPosition.offsetY - markerPosition.offsetY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const overlap = distance <= clockRadius;
		console.log(overlap);
		return overlap;
	};

	const handleMouseMove = (e: InteractionEvent, touch: boolean = false) => {
		if (!touch) {
			e.preventDefault();
		}

		if (!activeMarker || !activeMarker.initialDOMElement) {
			return;
		}

		const { clientX, clientY } = getClientCoordinates(e);
		const { offsetX, offsetY } = getPagePosition(activeMarker.initialDOMElement);
		// Adjust the marker position

		activeMarker = {
			...activeMarker,
			x: clientX - offsetX - mouseOffsetX,
			y: clientY - offsetY - mouseOffsetY,
			angle: calculateMouseDialAngle(dial, clientX, clientY),
			pointsAt: cssRotationToClockHours(activeMarker.angle)
		};

		markers = markers.map((m: IMarker) => {
			if (m.id === activeMarker!.id) {
				return activeMarker!;
			}
			return m;
		});
	};

	const handleMouseUp = () => {
		if (activeMarker) {
			activeMarker = {
				...activeMarker,
				completed: true //isMarkerInCircle(activeMarker)
			};
			markers = markers.map((m: IMarker) => {
				if (m.id === activeMarker!.id) {
					return activeMarker!;
				}
				return m;
			});
		}
		activeMarker = undefined;
	};

	// const handleMouseDown = (e: InteractionEvent, marker: IMarker) => {
	// 	activeMarker = marker;
	// 	if (!activeMarker.DOMElement) {
	// 		console.warn('no DOM element');
	// 		return;
	// 	}

	// 	const rect = activeMarker.DOMElement.getBoundingClientRect();
	// 	offsetX = rect.x;
	// 	offsetY = rect.y;

	// 	e.preventDefault();
	// };

	const handleMouseDown = (e: InteractionEvent, marker: IMarker) => {
		activeMarker = marker;
		if (!activeMarker.DOMElement) {
			console.warn('no DOM element');
			return;
		}
		const { clientX, clientY } = getClientCoordinates(e);

		const { offsetX, offsetY } = getPagePosition(activeMarker.DOMElement);

		mouseOffsetX = clientX - offsetX;
		mouseOffsetY = clientY - offsetY;

		e.preventDefault();
	};
</script>

<span class="flex flex-col size-full items-center">
	<Clock bind:clock>
		<span class="dial" bind:this={dial} />
	</Clock>
	<span class="markers w-[100%] flex flex-row justify-center items-center flex-wrap"
		>{#each markers as marker}
			<span bind:this={marker.initialDOMElement}>
				<div
					bind:this={marker.DOMElement}
					role="button"
					tabindex="0"
					id="marker-{marker.id}"
					class="marker size-[7vh]"
					style="top: {marker.y}px; left: {marker.x}px;"
					on:mousedown={(e) => handleMouseDown(e, marker)}
					on:touchstart={(e) => handleMouseDown(e, marker)}
				>
					{marker.id}
				</div>
			</span>
		{/each}</span
	>
</span>
<svelte:window
	on:mouseup={handleMouseUp}
	on:touchend={handleMouseUp}
	on:mousemove={handleMouseMove}
	on:touchmove={(e) => handleMouseMove(e, true)}
/>
