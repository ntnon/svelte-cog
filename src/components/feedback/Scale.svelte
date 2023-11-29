<script lang="ts">
	export let id: string;
</script>

<div class="SUSinput">
	{#each Array.from(Array(5).keys()) as i}
		{#if id}
			<!-- Use a unique ID for each input -->
			<label for={`${id}-${i}`}>
				<input type="radio" id={`${id}-${i}`} name={id} value={i} />
				<span class="radio-box"></span>
			</label>
		{/if}
	{/each}
</div>

<style>
	/* Styling for the box */
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

	.SUSinput {
		display: flex;
		flex-direction: row;
		padding-bottom: 1rem;
		padding-top: 1rem;
		width: 100%;
		justify-content: space-evenly;
	}
</style>
