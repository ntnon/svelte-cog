<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { validateInput } from '../scripts/validateInput';
	import type { ITaskPage } from '$lib/dataInterfaces';

	export let store: Writable<ITaskPage>;
	export let words: Writable<string[]>;

	if (!$store.guesses) {
		$store.guesses = [];
	}

	let guesses = $store.guesses;

	const calculateScore = () => {
		let correctGuesses = Array.from(new Set(guesses as string[])).filter((v) => $words.includes(v));
		return correctGuesses.length;
	};

	const calculateComplete = () => {
		if (guesses.length === $words.length && !guesses.includes('')) {
			return true;
		}
		return false;
	};

	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		guesses[index] = validatedInput;
		$store.score = calculateScore();
		$store.enableNext = calculateComplete();
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
		outline: 1px solid rgb(0, 0, 0); /* Change as needed */
	}
	input {
		text-align: center;
	}

	.correct {
		background-color: rgba(0, 128, 0, 0.437);
	}

	.incorrect {
		background-color: rgba(164, 9, 9, 0.475);
	}
</style>
