<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();

	export let speed: number = 100;

	export let htmlString =
		'<i>I am getting married, but I am afraid things are going awfully wrong. Will you help me?</i>'; // Your HTML string
	let displayString = '';
	let isPaused = false;
	let remainingPauseTime = 0;
	let index = 0;
	let inTag = false;
	let tag = '';
	export let delay: number = 1000; // Delay in milliseconds

	const delayed = setTimeout(() => {
		const interval = setInterval(() => {
			if (remainingPauseTime > 0) {
				remainingPauseTime -= speed; // Decrement remaining pause time
				return; // Skip execution during pause
			}

			if (index < htmlString.length) {
				if (htmlString[index] === '<') {
					inTag = true;
					tag = '<';
				} else if (htmlString[index] === '>') {
					inTag = false;
					tag += '>';

					if (tag.startsWith('<pause')) {
						const match = tag.match(/<pause\s+(\d+)\s*\/?>/);
						if (match) {
							const pauseDelay = parseInt(match[1], 10);
							remainingPauseTime = pauseDelay; // Set remaining pause time

							tag = ''; // Reset tag after processing pause
						}
					} else {
						displayString += tag;
					}
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
		}, speed); // Change to "speed" when not debugging
	}, delay); // Adjust the interval duration as needed

	// Clean up interval on component destroy
</script>

{@html displayString}
