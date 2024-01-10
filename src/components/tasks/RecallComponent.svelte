<script lang="ts">
	import type { IData, IResult, ITaskData } from '$lib/dataInterfaces';
	import { writable } from 'svelte/store';
	import { validateInput } from '../../scripts/validateInput';
	import { sessionStateManager as ssm } from '../../stores/sessionStateManager';
	import Clock from './Clock.svelte';
	import { guessStore } from '../../stores/guessStore';
	import { onMount } from 'svelte';

	export let taskData: ITaskData;
	export let words: string[] = ssm.getWords();

	function checkWords() {
		for (let i = 0; i < words.length; i++) {
			if ($guessStore.length !== words.length) {
				taskData.complete = false;
				return;
			}
			if (words[i].toLowerCase() !== $guessStore[i].toLowerCase()) {
				taskData.complete = false;
				return;
			}
		}
		taskData.complete = true;
	}
	//triggered whenever a user make changes
	function handleInput(e: Event, index: number) {
		const input = (e.target as HTMLInputElement).value;
		let validatedInput = validateInput(input) ? input : '';
		guessStore.update((value) => {
			return value.map((v, i) => (i === index ? validatedInput : v));
		});

		checkWords();
	}

	function handleBlur(e: Event) {
		const target = e.target as HTMLInputElement;
	}
</script>

{taskData.complete}
{#each words as w, index}
	<p>
		<input
			class={$guessStore[index] === w.toLowerCase() ? 'correct' : 'incorrect'}
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
