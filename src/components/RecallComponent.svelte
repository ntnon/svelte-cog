<script lang="ts">
	import { validateInput } from '../scripts/validateInput';
	import type { ITaskData, ITaskGuesses } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';
	import type { Writable } from 'svelte/store';

	export let store: Writable<ITaskGuesses>;

	let wordStore = getDataStore<string[]>('words');

	const calculateScore = () => {
		let correctGuesses = Array.from(new Set($store.guesses as string[])).filter((v) =>
			$wordStore.includes(v)
		);
		return correctGuesses.length;
	};

	const calculateComplete = () => {
		if ($store.guesses.length === $wordStore.length && !$store.guesses.includes('')) {
			return true;
		}
		return false;
	};

	//triggered whenever a user make changes
	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		$store.guesses[index] = validatedInput;
		$store.score = calculateScore();
		$store.complete = calculateComplete();
	};

	const handleBlur = (e: Event) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
	};
</script>

{#each $wordStore as w, index}
	<p>
		<input
			class={$wordStore.includes($store.guesses[index]) &&
			new Set($store.guesses).size === $store.guesses.length
				? 'correct'
				: 'incorrect'}
			type="text"
			value={$store.guesses[index] ?? ''}
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
