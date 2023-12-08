<script lang="ts">
	import settings from '../../../lib/settings.json';
	import dictionaries from '../../../lib/words.json';
	import { onMount } from 'svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';

	let language = settings.language as keyof typeof dictionaries;
	let wordCount = settings.wordRecallCount;
	let words: string[] = [];
	let guess = false;
	let guesses: string[] = [];

	function checkWords() {
		for (let i = 0; i < words.length; i++) {
			if (words[i].toLowerCase() !== guesses[i].toLowerCase()) {
				console.log('false');
				return false;
			}
		}
		console.log('true');
		return true;
	}

	function randomWords(wordList: string[], size: number): string[] {
		const totalWords = wordList.length;
		const sample: string[] = [];
		for (let i = 0; i < size; i++) {
			const randomIndex = Math.floor(Math.random() * totalWords);
			sample.push(wordList[randomIndex]);
		}
		return sample;
	}
	onMount(() => {
		words = ssm.getItemArray('words');
		if (words.length === 0 || words.length !== wordCount) {
			let newWords = randomWords(dictionaries[language], wordCount);
			ssm.setItem('words', newWords);
			words = newWords;
		}

		//ensures that the wordStore is populated before the component is mounted
	});
</script>

<h1>Word Registration</h1>
{#each words as w, index}
	{#if guess}
		<p><input type="text" bind:value={guesses[index]} /></p>
	{/if}
	{#if !guess}
		<p>{w}</p>
	{/if}
{/each}
<button on:click={() => (guess = true)}>gjett</button>
<button on:click={() => checkWords()}>sjekk</button>
