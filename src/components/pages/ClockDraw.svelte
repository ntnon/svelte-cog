<script lang="ts">
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';

	export let fallbackFn: () => void;

	const taskState = getAppState().taskData.markers;

	$: {
		let completed = $taskState.data.every((marker) => marker.completed === true);
		taskState.complete(completed);
	}
</script>

<Stage>
	<span slot="name">Clock Draw</span>
	<span slot="info">The clock is broken!... Drag the numbers back in place using your finger</span>
	<span slot="progress">progress component!</span>
	<span slot="component" class="size-full"><ClockDrawTask bind:markers={$taskState.data} /></span>

	<Button active={$taskState.completed} slot="next" fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
