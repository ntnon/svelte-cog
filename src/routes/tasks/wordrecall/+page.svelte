<script lang="ts">
	import { sessionStateManager } from '../../../stores/sessionStateManager';

	let words = sessionStateManager.getItem('words');
	let complete = false;
	let guesses: string[] = [];

	function handleInput(e: Event, index: number) {
		guesses[index] = (e.target as HTMLInputElement).value;
		console.log(guesses[index], words[index]);
		if (checkWords()) {
			complete = true;
		}
	}

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
</script>

<p>word recall</p>
{#if complete}
	GRATTIS!
{/if}

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
		outline: 2px solid rgb(0, 0, 0); /* Change as needed */
	}

	.correct {
		border: green 3px solid;
	}

	.incorrect {
		border: red 3px solid;
	}
</style>
