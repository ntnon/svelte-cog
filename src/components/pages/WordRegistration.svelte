<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import WordRegistrationTask from '../tasks/WordRegistrationTask.svelte';
	import Button from '../Button.svelte';
	export let fallbackFn: () => void;

	const words = getAppState().words;
	const taskState = getAppState().taskData.registrationGuesses;

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
	<span slot="info">Remember the words below! When ready, press "guess"!</span>
	<span slot="progress"><slot /></span>
	<span slot="component" class="size-full">
		<WordRegistrationTask words={$words} bind:guesses={$taskState.data} />
	</span>

	<Button active={$taskState.completed} slot="next" fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
