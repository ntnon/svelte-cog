<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import RecallComponent from '../../../components/RecallComponent.svelte';

	const appState = getAppState();
	const store = appState.pages.wordregistration;
	const words = appState.data.words;

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
	<RecallComponent {store} {words} />
{/if}
{#if !$store.showWords}
	{#each $words as w}
		<p>{w}</p>
	{/each}
{/if}
