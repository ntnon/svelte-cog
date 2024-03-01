<script lang="ts">
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel, defaultResetLabel } from '$lib/constants';

	export let fallbackFn: () => void;

	const taskState = getAppState().taskData.hands;
</script>

<Stage>
	<span slot="name">Clock Hands</span>
	<span slot="info"
		>{'Adjust the clock hands using your finger to display ' +
			$taskState.data.hour.target +
			':' +
			$taskState.data.minute.target * 5}</span
	>
	<span slot="progress">progress component!</span>
	<span slot="component" class="size-full"><ClockHandsTask /></span>
	<button slot="reset" on:click={taskState.resetData}>{defaultResetLabel}</button>
	<button slot="next" on:click={fallbackFn}>{defaultNextLabel}</button>
</Stage>
