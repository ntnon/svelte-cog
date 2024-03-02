<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';

	import WordRecallTask from '../tasks/WordRecallTask.svelte';
	import Button from '../Button.svelte';
	export let fallbackFn: () => void;

	const words = getAppState().words;
	const taskState = getAppState().taskData.recallGuesses;

	$taskState.completed =
		$taskState.data.length === $words.length && $taskState.data.every((guess) => guess !== '');

	$: {
		let completed =
			$taskState.data.length === $words.length && $taskState.data.every((guess) => guess !== '');
		taskState.complete(completed);
	}
</script>

<Stage>
	<span slot="name">Word Recall</span>
	<span slot="info"
		>You will be shown a list of words. Try to remember as many as you can. You will be asked to
		recall them later.</span
	>
	<span slot="progress">progress component!</span>
	<span slot="component" class="size-full"
		><WordRecallTask words={$words} bind:guesses={$taskState.data} /></span
	>
	<Button active={$taskState.completed} slot="next" fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
