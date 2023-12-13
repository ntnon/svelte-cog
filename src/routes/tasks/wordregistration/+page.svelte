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
	let complete = false;

	function checkWords() {
		for (let i = 0; i < words.length; i++) {
			if (guesses.length !== words.length) {
				return false;
			}
			if (words[i].toLowerCase() !== guesses[i].toLowerCase()) {
				return false;
			}
		}
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
		if (words === undefined || words.length === 0 || words.length !== wordCount) {
			// if the first condition is met the subsequent are not checked
			let newWords = randomWords(dictionaries[language], wordCount);
			ssm.setItem('words', newWords);
			words = newWords;
		}
	});

	function handleInput(e: Event, index: number) {
		guesses[index] = (e.target as HTMLInputElement).value;
		console.log(guesses[index], words[index]);
		if (checkWords()) {
			complete = true;
		}
	}
</script>

<h1>Word Registration</h1>
<button on:click={() => (guess ? (guess = false) : (guess = true))}
	>{guess ? 'Vis ord' : 'Gjett'}</button
>
{#if complete}
	GRATTIS!
{/if}
{#each words as w, index}
	{#if guess}
		<p>
			<input
				class={guesses[index] === w.toLowerCase() ? 'correct' : 'incorrect'}
				type="text"
				on:input={(e) => handleInput(e, index)}
			/>
		</p>
	{/if}
	{#if !guess}
		<p>{w}</p>
	{/if}
{/each}

<style>
	input[type='text']:focus {
		outline: 2px solid rgb(0, 0, 0); /* Change as needed */
	}

	.correct {
		border: green 3px solid;
	}

	.incorrect {
		border: red 3px solid;
	}
</style>
