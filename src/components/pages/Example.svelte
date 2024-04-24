<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import ExampleTask from '../tasks/ExampleTask.svelte';
	import { getAppState } from '$lib/state.svelte';

	const taskState = getAppState().taskData.exampleTask;

	$: if ($taskState.data.every((ball) => ball.completed)) {
		taskState.update((v) => ({ ...v, completed: true }));
	}
</script>

<Stage {page}>
	<span slot="name">Example task</span>
	<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}>
		Let us begin with an example task, to get you started! Tap all the <span class="inline-block"
			><span class="clickable size-[1rem]"></span></span
		>'s
	</span>
	<span slot="component" class="size-full center">
		<ExampleTask bind:balls={$taskState.data} />
	</span>

	<NextButton active={$taskState.completed} slot="next"></NextButton>
</Stage>
