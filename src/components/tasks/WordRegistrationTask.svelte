<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import WordRecallTask from './WordRecallTask.svelte';

	const appState = getAppState();
	export let words: string[];
	export let guesses: string[];

	export let showWords: boolean = true;
</script>

<button
	class="btn"
	on:click={() => (showWords = !showWords) && appState.taskData.recallGuesses.incrementHint()}
	>{showWords ? 'guess' : 'hint'}</button
>
<span class="flex flex-grow flex-col center gap-[1rem]">
	{#if showWords}
		{#each words as word}
			<p>{word}</p>
		{/each}
	{:else}
		<WordRecallTask bind:guesses {words} />
	{/if}
</span>
