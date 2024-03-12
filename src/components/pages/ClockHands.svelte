<script lang="ts">
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';

	export let fallbackFn: () => void;

	const taskState = getAppState().taskData.hands;

	$: {
		let completed = $taskState.data.hour.completed && $taskState.data.minute.completed;
		taskState.complete(completed);
	}
</script>

<Stage>
	<span slot="name">Clock Hands</span>
	<span slot="info"
		>{'Adjust the clock hands using your finger to display ' + $taskState.data.timestamp.name}</span
	>
	<span slot="progress"><slot /></span>
	<span slot="component" class="size-full"><ClockHandsTask bind:hands={$taskState.data} /></span>
	<Button slot="next" active={$taskState.completed} fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
