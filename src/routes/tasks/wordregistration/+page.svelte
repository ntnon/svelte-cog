<script lang="ts">
	import settings from '../../../lib/settings.json';
	import dictionaries from '../../../lib/words.json';
	import { onMount } from 'svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';

	let language = settings.language as keyof typeof dictionaries;
	let wordCount = settings.wordRecallCount;
	let words: string[] = [];
	let recallMode = false;
	let complete = false;

	//generates a random set of words from a list of words
	function randomWords(wordList: string[], size: number): string[] {
		const totalWords = wordList.length;
		const sample: string[] = [];
		for (let i = 0; i < size; i++) {
			const randomIndex = Math.floor(Math.random() * totalWords);
			sample.push(wordList[randomIndex]);
		}
		return sample;
	}

	//ensures that some words populate the "guessable words"
	onMount(() => {
		words = ssm.getItemArray('words');
		if (words === undefined || words.length === 0 || words.length !== wordCount) {
			// if the first condition is met the subsequent are not checked
			let newWords = randomWords(dictionaries[language], wordCount);
			ssm.setItem('words', newWords);
			words = newWords;
		}
	});
</script>

<h1>Word Registration</h1>
<button on:click={() => (recallMode ? (recallMode = false) : (recallMode = true))}
	>{recallMode ? 'Show words' : 'Guess'}</button
>
{#if complete}
	GRATTIS!
{/if}
{#if recallMode}
	<RecallComponent {complete} />
{/if}
{#each words as w}
	{#if !recallMode}
		<p>{w}</p>
	{/if}
{/each}
