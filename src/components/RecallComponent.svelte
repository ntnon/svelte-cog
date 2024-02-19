<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { validateInput } from '../scripts/validateInput';
	import type { ITaskGuess, ITaskPage } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';

	const appState = getAppState();

	let guesses: string[] = [];
	export let words: Writable<string[]> = appState.data.words;
	export let enableNext: boolean = false;
	export let score: number = 0;

	const calculateScore = () => {
		let correctGuesses = Array.from(new Set(guesses as string[])).filter((v) => $words.includes(v));
		score = correctGuesses.length;
	};

	const calculateComplete = () => {
		if (guesses.length === $words.length && !guesses.includes('')) {
			enableNext = true;
			console.log('heelloo');
		}
	};

	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		guesses[index] = validatedInput;
		calculateScore();
		calculateComplete();
	};

	const handleBlur = (e: Event) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
	};
</script>

{#each $words as w, index}
	<p>
		<input
			class={$words.includes(guesses[index]) && new Set(guesses).size === guesses.length
				? 'correct'
				: 'incorrect'}
			type="text"
			value={guesses[index] ?? ''}
			on:input={(e) => handleInput(e, index)}
			on:blur={(e) => handleBlur(e)}
		/>
	</p>
{/each}

<style>
	input[type='text']:focus {
		/***/ /* Change as needed */
	}
	input {
		/***/
	}

	.correct {
		/***/
		background-color: green;
	}

	.incorrect {
		/***/
	}
</style>
