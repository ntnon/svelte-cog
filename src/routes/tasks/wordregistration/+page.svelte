<script lang="ts">
	import RecallComponent from '../../../components/RecallComponent.svelte';
	import { getDataStore } from '$lib/state.svelte';
	import type { ITaskGuesses } from '$lib/dataInterfaces';

	const store = getDataStore<ITaskGuesses>('wordregistration');
	const words = getDataStore<string[]>('words');

	const handleButton = () => {
		$store.showWords = !$store.showWords;
		store.update((v) => {
			return { ...v, corrections: v.corrections + 1 };
		});
	};
</script>

<h2>Word Registration</h2>
<button on:click={handleButton}> {$store.showWords ? 'Show words' : 'Guess'}</button>
{#if $store.showWords && store}
	<RecallComponent {store} />
{/if}
{#if !$store.showWords}
	{#each $words as w}
		<p>{w}</p>
	{/each}
{/if}
