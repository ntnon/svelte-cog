<script lang="ts">
	import { getData } from '$lib/state.svelte';
	import RecallComponent from '../../../components/RecallComponent.svelte';

	const appData = getData('data');
	const store = appData.pages.wordregistration;
	const words = appData.data.words;

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
	<RecallComponent {store} words={$words} />
{/if}
{#if !$store.showWords}
	{#each $words as w}
		<p>{w}</p>
	{/each}
{/if}
