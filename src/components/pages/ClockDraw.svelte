<script lang="ts">
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import { getAppState } from '$lib/state.svelte';

	import Stage from '../Stage.svelte';
	import { defaultNextLabel, defaultResetLabel } from '$lib/constants';

	export let fallbackFn: () => void;

	const taskState = getAppState().taskData.markers;
</script>

<Stage>
	<span slot="name">Clock Draw</span>
	<span slot="info">The clock is broken!... Drag the numbers back in place using your finger</span>
	<span slot="progress">progress component!</span>
	<span slot="component" class="size-full"><ClockDrawTask /></span>
	<button slot="reset" on:click={taskState.resetData}>{defaultResetLabel}</button>
	<button slot="next" on:click={fallbackFn}>{defaultNextLabel}</button>
</Stage>
