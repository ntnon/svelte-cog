<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import WordRecallTask from './WordRecallTask.svelte';

	const appState = getAppState();
	export let words: string[];
	export let guesses: string[];

	export let showWords: boolean = true;
</script>

<span class="flex flex-col words justify-between">
	{#if showWords}
		{#each words as word}
			<p>{word}</p>
		{/each}
	{:else}
		<WordRecallTask bind:guesses {words} />
	{/if}
</span>
