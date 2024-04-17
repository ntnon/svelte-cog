<script lang="ts">
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';

	const taskState = getAppState().taskData.hands;

	$: {
		let completed = $taskState.data.hour.completed && $taskState.data.minute.completed;
		taskState.complete(completed);
	}
</script>

<Stage>
	<span slot="name">Clock Hands</span>
	<span slot="info">Move the clock hands to adjust the</span>
	<span slot="component" class="size-full"
		><span class="btn center">{$taskState.data.timestamp.name}</span>
		<ClockHandsTask bind:hands={$taskState.data} /></span
	>
	<NextButton active={$taskState.completed} slot="next"></NextButton>
</Stage>
