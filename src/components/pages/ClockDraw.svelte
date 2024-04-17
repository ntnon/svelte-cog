<script lang="ts">
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';

	const taskState = getAppState().taskData.markers;

	$: {
		let completed = $taskState.data.every((marker) => marker.completed === true);
		taskState.complete(completed);
	}
</script>

<Stage>
	<span slot="name">Clock Draw</span>
	<span slot="info">Drag the numbers to their correct place in the clock</span>
	<span slot="component" class="size-full"><ClockDrawTask bind:markers={$taskState.data} /></span>

	<NextButton active={$taskState.completed} slot="next"></NextButton>
</Stage>
