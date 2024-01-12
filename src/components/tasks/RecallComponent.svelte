<script lang="ts">
	import type { ITaskData } from '$lib/dataInterfaces';
	import { validateInput } from '../../scripts/validateInput';
	import { guessStore } from '../../stores/ssmSyncedStore';
	import { wordStore } from '../../stores/ssmSyncedStore';

	export let taskData: ITaskData;

	const checkSuccess = () => {
		if ($guessStore.length !== $wordStore.length) {
			taskData.success = false;
			return;
		}
		for (let i = 0; i < $wordStore.length; i++) {
			if ($wordStore[i].toLowerCase() !== $guessStore[i].toLowerCase()) {
				taskData.success = false;
				return;
			}
		}
		taskData.success = true;
	};

	const calculateScore = () => {
		taskData.score = 0;
		let guesses = new Set($guessStore.map((v) => v.toLowerCase())); //ensures the same guess is not counted twice
		let correctWords = $wordStore.map((v) => v.toLowerCase());

		let correctGuesses = Array.from(correctWords).filter((v) => guesses.has(v));

		taskData.score += correctGuesses.length;
	};

	const checkComplete = () => {
		if ($guessStore.every((v) => v !== '' && v.length >= 3)) {
			// if every input is filled and has more than 3 characters
			taskData.complete = true;
		}
	};
	//triggered whenever a user make changes
	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input : '';
		guessStore.update((value) => {
			return value.map((v, i) => (i === index ? validatedInput : v));
		});
		checkSuccess();
		calculateScore();
		checkComplete();
	};

	const handleBlur = (e: Event) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
	};
	console.log($wordStore);
</script>

{#each $wordStore as w, index}
	<p>
		<input
			class={$guessStore[index].toLowerCase() === w.toLowerCase() ? 'correct' : 'incorrect'}
			type="text"
			value={$guessStore[index]}
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
