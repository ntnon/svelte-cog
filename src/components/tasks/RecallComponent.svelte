<script lang="ts">
	import { validateInput } from '../../scripts/validateInput';
	import { wordStore } from '../../stores/stores';

	export let taskStore;

	const checkSuccess = () => {
		if ($taskStore.guesses.length !== $wordStore.length) {
			$taskStore.success = false;
			return;
		}
		for (let i = 0; i < $wordStore.length; i++) {
			if ($wordStore[i].toLowerCase() !== $taskStore.guesses[i].toLowerCase()) {
				$taskStore.success = false;
				return;
			}
		}
		$taskStore.success = true;
	};

	const calculateScore = () => {
		let correctGuesses = Array.from($taskStore.guesses as string[]).filter((v) =>
			$wordStore.includes(v)
		);

		$taskStore.score = correctGuesses.length;
	};

	//triggered whenever a user make changes
	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		$taskStore.guesses[index] = validatedInput;
		checkSuccess();
		calculateScore();
		if ($taskStore.guesses.every((v: string) => v !== '' && v.length >= 3)) {
			// if every input is filled and has more than 3 characters
			$taskStore.complete = true;
		}
	};

	const handleBlur = (e: Event) => {
		const target = e.target as HTMLInputElement;
		//if the input is correct, automatically "activate" the next input
	};
</script>

{#each $wordStore as w, index}
	<p>
		<input
			class={$taskStore.guesses[index] === w ? 'correct' : 'incorrect'}
			type="text"
			value={$taskStore.guesses[index] ?? ''}
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
