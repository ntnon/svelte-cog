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
	<span slot="info">Adjust the clock to display <b><i>{$taskState.data.timestamp.name}</i></b></span
	>
	<span slot="component" class="size-full">
		<div class="flex flex-grow-1 size-full">
			<ClockHandsTask bind:hands={$taskState.data} />
		</div></span
	>
	<NextButton active={$taskState.completed} slot="next"></NextButton>
</Stage>
