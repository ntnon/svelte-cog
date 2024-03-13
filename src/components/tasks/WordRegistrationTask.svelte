<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import WordRecallTask from './WordRecallTask.svelte';

	const appState = getAppState();
	export let words: string[];
	export let guesses: string[];

	export let showWords: boolean = true;
</script>

<span class="flex flex-grow flex-col p-1 center gap-[7vh]">
	<button
		class="bg-amber-500 md:p-5 p-3 rounded-full"
		on:click={() => (showWords = !showWords) && appState.taskData.recallGuesses.incrementHint()}
		>{showWords ? 'I remember the words' : "I don't remember the words"}</button
	>
	<span class="flex-col justify-between center gap-[4vh]">
		{#if showWords}
			{#each words as word}
				<div class="h-[4vh] text-center">{word}</div>
			{/each}
		{:else}
			<WordRecallTask bind:guesses {words} />
		{/if}
	</span>
</span>
