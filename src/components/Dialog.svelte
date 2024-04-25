<script lang="ts">
	import { narrator } from '$lib/characters';
	import type { ICharacter } from '$lib/interfaces';
	import { createEventDispatcher } from 'svelte';
	import { onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();

	export const speed: number = 100;

	export let htmlString =
		'<i>I am getting married, but I am afraid things are going awfully wrong. Will you help me?</i>'; // Your HTML string
	let displayString = '';
	let isPaused = false;
	let remainingPauseTime = 0;
	let index = 0;
	let inTag = false;
	let tag = '';
	const pauseDuration = 1;
	export let delay = 850;

	export let character: ICharacter = narrator;

	console.log(character);

	let interval: number | undefined;

	const delayer = setTimeout(() => {
		interval = setInterval(() => {
			if (remainingPauseTime > 0) {
				remainingPauseTime -= 1; // Decrement remaining pause time
				return; // Skip execution during pause
			}

			if (index < htmlString.length) {
				if (htmlString[index] === '<') {
					inTag = true;
					tag = '<';
				} else if (htmlString[index] === '>') {
					inTag = false;
					tag += '>';
					console.log(tag);
					// Check if the tag is a pause tag
					if (tag === '<pause/>' || tag === '<pause />') {
						remainingPauseTime += pauseDuration; // Set the remaining pause time
					}
					// Add the tag to the display string
					displayString += tag;
				} else if (!inTag) {
					displayString += htmlString[index];
				} else {
					tag += htmlString[index];
				}
				index++;
			} else {
				clearInterval(interval);
				dispatch('complete', true);
			}
		}, character.talkingSpeed);
	}, delay);

	onDestroy(() => {
		clearTimeout(delayer);
		clearInterval(interval);
	});
	// Clean up interval on component destroy
</script>

<span class="w-auto font-bold text-3xl">{character.char}: </span>
<span class="bubble flex flex-row">
	<div class="">
		{@html displayString}
	</div>
</span>

<style>
	.bubble {
		border-radius: 10px;
		display: flex;
		flex-direction: column; /* Arrange children in a column */
		justify-content: flex-start; /* Align children to the start of the column */
		margin: 20px; /* Add this line */
	}

	.bubble::after {
		content: '';
	}
</style>
