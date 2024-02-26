<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { validateInput } from '../../scripts/validateInput';
	import type { IResettableStore } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';

	const appState = getAppState();
	let guesses: IResettableStore<string[]> = appState.recallGuesses;

	interface data {
		guesses: {
			[key: number]: {
				value: string;
				correct: boolean;
			};
		};
	}

	let words: Writable<string[]> = appState.words;

	const nextField = () => {
		for (let i = 0; i < $words.length; i++) {
			if ($guesses[i] === '' || $guesses[i] === undefined) {
				currentFieldIndex = i;
				break;
			}
		}
	};

	let currentFieldIndex: number = 0;
	let inputFields: { [key: number]: HTMLInputElement } = {};

	$: if (inputFields) {
		console.log(inputFields);
		nextField();
	}
	$: if (inputFields[currentFieldIndex]) {
		inputFields[currentFieldIndex].focus();
	}

	// const calculateScore = () => {
	// 	let correctGuesses = Array.from(new Set($guesses as string[])).filter((v) =>
	// 		$words.includes(v)
	// 	);
	// 	// score = correctGuesses.length;
	// };

	// const calculateComplete = () => {
	// 	if ($guesses.length === $words.length && !$guesses.includes('')) {
	// 		// enableNext = true;
	// 	}
	// };

	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		$guesses[index] = validatedInput;
	};
</script>

<ul class="flex flex-col words">
	{#each $words as guess, index}
		<input
			bind:this={inputFields[index]}
			class="
				{$words.includes($guesses[index]) && new Set($guesses).size === $guesses.length
				? 'correct'
				: 'incorrect'}
				text-center
			"
			type="text"
			value={$guesses[index] ?? ''}
			on:input={(e) => handleInput(e, index)}
		/>
	{/each}
</ul>
<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			currentFieldIndex = (currentFieldIndex + 1) % $words.length;
		}
	}}
/>

<style>
	.correct {
		/***/

		background-color: green;
	}
	.incorrect {
		font-style: italic;
	}
</style>
