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
	<span slot="info">Do you remember the words from earlier? Write them in the fields below!</span>
	<span slot="progress"><slot /></span>
	<span slot="component" class="size-full"
		><WordRecallTask words={$words} bind:guesses={$taskState.data} /></span
	>
	<Button active={$taskState.completed} slot="next" fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
