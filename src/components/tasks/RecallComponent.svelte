<script lang="ts">
	import { validateInput } from '../../scripts/validateInput';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';
	import type { Writable } from 'svelte/store';

	export let store: Writable<ITaskData>;
	export let guesses: string[] = []; //array of guesses, can be given by parent component, or will be empty on mount
	let wordStore = getDataStore<string[]>('words');

	console.log('store:', store);

	const calculateScore = () => {
		let correctGuesses = Array.from(guesses as string[]).filter((v) => $wordStore.includes(v));
		$store.score = correctGuesses.length;
		if ($store.score === $wordStore.length) {
			$store.success = true;
		}
		if (guesses.length === $wordStore.length) {
			$store.complete = true;
		}
	};

	//triggered whenever a user make changes
	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		guesses[index] = validatedInput;
		calculateScore();
	};

	const handleBlur = (e: Event) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
	};
</script>

{#each $wordStore as w, index}
	<p>
		<input
			class={guesses[index] === w ? 'correct' : 'incorrect'}
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
