<script lang="ts">
	import { wordStore } from '../../../stores/wordStore';
	import { updateProgress } from '../../../stores/progressTracker';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let f: string[] = [];
	let guess = false;
	let guesses: string[] = [];

	function checkWords() {
		for (let i = 0; i < f.length; i++) {
			if (f[i].toLowerCase() !== guesses[i].toLowerCase()) {
				console.log('false');
				return false;
			}
		}
		console.log('true');
		return true;
	}
	onMount(() => {
		//ensures that the wordStore is populated before the component is mounted
		f = $wordStore;
	});
</script>

<h1>Word Registration</h1>
{#each f as w, index}
	{#if guess}
		<p><input type="text" bind:value={guesses[index]} /></p>
	{/if}
	{#if !guess}
		<p>{w}</p>
	{/if}
{/each}
<button on:click={() => (guess = true)}>gjett</button>
<button on:click={() => checkWords()}>sjekk</button>
