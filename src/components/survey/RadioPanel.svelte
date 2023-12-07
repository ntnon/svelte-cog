<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let radioId: string;
	export let content: string[];
	export let showInside: boolean = true;
	export let horizontal: boolean = true;

	const handleInput = (e: Event) => {
		dispatch('select', (e.target as HTMLInputElement).value);
	};
</script>

<div class={'horizontal-' + horizontal.toString()}>
	{#each content as i}
		<!-- Use a unique ID for each input -->
		<label for={radioId + i} class="radio-label">
			<input
				type="radio"
				id={i}
				name={radioId}
				value={i}
				on:input={handleInput}
				class="radio-input"
			/>
			<span class="radio-box"
				>{#if showInside}{i}{/if}</span
			>{#if !showInside}{i}{/if}
		</label>
	{/each}
	<slot />
</div>

<style>
	.radio-label {
		position: relative;
	}

	.radio-input {
		/*Ensures the input can be pressed anywhere inside the radio box*/
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.horizontal-true {
		display: flex;
		flex-direction: row;
	}
	.horizontal-false {
		display: flex;
		flex-direction: column;
	}
	.radio-box {
		width: 20px; /* Adjust the size of the box */
		height: 20px; /* Adjust the size of the box */
		border: 2px solid #000; /* Border style for the box */
		display: inline-block;
		margin-right: 8px; /* Adjust spacing between box and label */
		text-align: center; /* Center text horizontally */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Styling for the text inside radio-box */
	.radio-text {
		font-size: 13px; /* Adjust the font size */
	}

	/* Hide default radio input */
	input[type='radio'] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	/* Style when radio is checked */
	input[type='radio']:checked + .radio-box {
		background-color: #000; /* Change background color when checked */
	}
</style>
