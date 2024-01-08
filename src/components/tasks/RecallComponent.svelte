<script lang="ts">
	import { sessionStateManager as ssm } from '../../stores/sessionStateManager';
	export let success: boolean = false;

	const words = ssm.getItemArray('words');
	let guesses: string[] = [];
	export let complete = false;

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
	//triggered whenever a user make changes
	function handleInput(e: Event, index: number) {
		guesses[index] = (e.target as HTMLInputElement).value;
		if (checkWords()) {
			complete = true;
		}
	}
</script>

{complete}
{#each words as w, index}
	<p>
		<input
			class={guesses[index] === w.toLowerCase() ? 'correct' : 'incorrect'}
			type="text"
			on:input={(e) => handleInput(e, index)}
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
