<script lang="ts">
	import sus from '../../../lib/sus.json';
	import { ssmSyncedStore } from '../../../scripts/ssmSyncedStore';

	const id = '/survey/sus';

	const maxScore = 5;

	const surveyStore = ssmSyncedStore(id, () => {
		return sus.map((s) => {
			return {
				id: s.id,
				question: s.question,
				score: undefined
			};
		});
	});

	const handleSelect = (radioId: string, value: string) => {
		console.log(radioId, value);
	};
	$: q1 = $surveyStore[0];
</script>

<form>
	<span> 1: Strongly disagree 5: Strongly agree </span>
	<ul>
		{#each $surveyStore as s, index}
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
