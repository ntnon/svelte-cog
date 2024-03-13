<script lang="ts">
	import { validateInput } from '../../scripts/validateInput';

	export let guesses: string[];
	export let words: string[];

	const nextField = () => {
		for (let i = 0; i < words.length; i++) {
			if (guesses[i] === '' || guesses[i] === undefined) {
				currentFieldIndex = i;
				break;
			}
		}
	};

	let currentFieldIndex: number = 0;
	let inputFields: { [key: number]: HTMLInputElement } = {};

	$: if (inputFields) nextField();

	$: if (inputFields[currentFieldIndex]) {
		inputFields[currentFieldIndex].focus();
	}

	const handleInput = (e: Event, index: number) => {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input.toLowerCase() : '';
		guesses[index] = validatedInput;
	};
</script>

{#each words as guess, index}
	<input
		bind:this={inputFields[index]}
		class="
				{words.includes(guesses[index]) && new Set(guesses).size === guesses.length ? 'bg-green-500' : ''}
				text-center
				border-none
				outline-none
				p-0
				h-[4vh]
			"
		type="text"
		value={guesses[index] ?? ''}
		on:input={(e) => handleInput(e, index)}
	/>
{/each}

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			currentFieldIndex = (currentFieldIndex + 1) % words.length;
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
