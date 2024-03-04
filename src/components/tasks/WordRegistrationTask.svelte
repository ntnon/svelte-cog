<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import type { IResettableStore } from '$lib/interfaces';
	import WordRecallTask from './WordRecallTask.svelte';

	const appState = getAppState();
	export let words: string[];
	export let guesses: string[];
	const incremenetHint = appState.taskData.registrationGuesses.incrementHint;
	export let showWords: boolean = true;
</script>

<span class="flex flex-col words justify-between">
	<button class="btn" on:click={() => (showWords = !showWords) && incremenetHint()}
		>{showWords ? 'guess' : 'hint'}</button
	>
	{#if showWords}
		{#each words as word}
			<p>{word}</p>
		{/each}
	{:else}
		<WordRecallTask bind:guesses {words} />
	{/if}
</span>
