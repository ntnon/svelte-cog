<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { validateInput } from '../../scripts/validateInput';
	import type { IResettableStore } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';

	const appState = getAppState();
	let guesses: IResettableStore<string[]> = appState.recallGuesses;

	let words: Writable<string[]> = appState.words;

	const nextField = () => {
		console.log('next field');
		console.log();
		let openField = $guesses.findIndex((v) => v === '') ?? 0;
		return Math.max(openField, 0);
	};

	let activeInputField: number = nextField();
	const inputFields: HTMLInputElement[] = [];

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

	const handleFoucs = (e: Event, index: number) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
		activeInputField = index;
	};
	const isCorrect = (index: number) => {
		return $words.includes($guesses[index]) && new Set($guesses).size === $guesses.length;
	};
</script>

<span class="flex flex-col words">
	{#each $words as guess, index}
		<input
			bind:this={inputFields[index]}
			class="
				{$words.includes($guesses[index]) && new Set($guesses).size === $guesses.length
				? 'correct'
				: 'incorrect'}
				text-center"
			type="text"
			value={$guesses[index] ?? ''}
			on:input={(e) => handleInput(e, index)}
			on:focus={(e) => handleFoucs(e, index)}
		/>
	{/each}
</span>
<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			nextField();
		}
	}}
/>

<style>
	.correct {
		/***/

		background-color: green;
	}
</style>
