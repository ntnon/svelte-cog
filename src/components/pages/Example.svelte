<script lang="ts">
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';
	import ExampleTask from '../tasks/ExampleTask.svelte';
	import { getAppState } from '$lib/state.svelte';

	const taskState = getAppState().taskData.exampleTask;

	export let fallbackFn: () => void;

	$: if ($taskState.data.every((ball) => ball.completed)) {
		taskState.update((v) => ({ ...v, completed: true }));
	}
</script>

<Stage>
	<span slot="name">Example task</span>
	<span slot="info">
		Tap all the <span class="inline-block"><span class="clickable size-[1rem]"></span></span>'s
	</span>
	<span slot="progress">Your progress</span>
	<span slot="component" class="size-full center">
		<ExampleTask bind:balls={$taskState.data} />
	</span>
	<Button active={$taskState.completed} fn={fallbackFn} slot="next">{defaultNextLabel}</Button>
</Stage>
