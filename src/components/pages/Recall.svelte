<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';
	import WordRegistrationTask from '../tasks/WordRegistrationTask.svelte';
	export let fallbackFn: () => void;

	const words = getAppState().words;
	const taskState = getAppState().taskData.recallGuesses;
	let showWords = false;

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
	<span slot="info">
		{#if showWords}
			Remember the words below! Then press the guess button
		{:else}
			Stuck? Press hint to reveal the words.
		{/if}
	</span>
	<span slot="progress"><slot /></span>
	<span slot="component" class="size-full flex flex-col">
		<WordRegistrationTask bind:showWords words={$words} bind:guesses={$taskState.data} />
	</span>
	<Button active={$taskState.completed} slot="next" fn={fallbackFn}>{defaultNextLabel}</Button>
</Stage>
