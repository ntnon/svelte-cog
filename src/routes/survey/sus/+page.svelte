<script lang="ts">
	import type { ISUS } from '$lib/dataInterfaces';
	import { getAppState } from '$lib/state.svelte';
	const store = getAppState<ISUS[]>('sus');
	const maxScore = 5;
</script>

<form>
	<span> 1: Strongly disagree 5: Strongly agree </span>
	<ul>
		{#each $store as s, index}
			{s.question}
			{#each Array.from({ length: maxScore }) as _, i}
				<div style="display:block">
					<input
						type="radio"
						name={s.id + index}
						value={i + 1}
						bind:group={s.score}
						class="radio-input"
					/>{i + 1}
				</div>
			{/each}
		{/each}
	</ul>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		max-width: 80%;
	}
	span {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	label {
		padding-bottom: 1rem;
	}

	li {
		padding-bottom: 2rem;
		padding: 1rem;
	}
	.SUSinput {
		display: flex;
		flex-direction: row;
		padding-bottom: 1rem;
		padding-top: 1rem;
		width: 100%;
		justify-radiocontent: space-evenly;
	}
</style>
