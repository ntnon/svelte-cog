<script lang="ts">
	import type { IMarker, IPos } from '$lib/interfaces';

	import { angleToClockHour } from '../../scripts/trigonometry/angleToClockHour';

	import Clock from '../Clock.svelte';
	import Draggable from '../Draggable.svelte';
	import { getRectCenter } from '../../scripts/getRectCenter';
	import { calcAngle } from '../../scripts/trigonometry/calcAngle';
	import { adjustClockwiseDistance } from '../../scripts/trigonometry/adjustClockwiseDistance';

	export let markers: IMarker[];

	let dial: HTMLElement;
	let clock: HTMLElement;
	let dialPos: IPos;

	$: if (dial) {
		let rect = getRectCenter(dial);
		dialPos = { left: rect.left, top: rect.top };
	}

	const calcDistFromCenter = (pos: IPos) => {
		const mid = getRectCenter(dial);
		const dx = pos.left - mid.left;
		const dy = pos.top - mid.top;
		console.log(Math.sqrt(dx * dx + dy * dy));
		return Math.sqrt(dx * dx + dy * dy);
	};

	const updateMarker = (pos: IPos, m: IMarker) => {
		if (!dialPos) return m;
		let newAngle = calcAngle(dialPos, pos);
		return {
			...m,
			calcDistFromMid: calcDistFromCenter(pos),
			angle: newAngle,
			pointsAt: (angleToClockHour(newAngle) + 6) % 12, //0.15 is a slight adjustment to a bug
			completed: true
		};
	};
</script>

<span class="flex flex-col size-full items-center">
	<Clock bind:clock>
		<span class="dial" bind:this={dial} />
	</Clock>
	<span class="markers w-[100%] flex flex-row justify-center items-center"
		>{#each markers as marker}
			<Draggable on:positionChange={(e) => (marker = updateMarker(e.detail.newPosition, marker))}
				><span class="size-[7vh] marker"
					>{marker.id}_{(Math.round(marker.pointsAt * 100) / 100).toFixed(2)}</span
				></Draggable
			>
		{/each}</span
	>
</span>
