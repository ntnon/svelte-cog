<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Recall from '../tasks/Recall.svelte';
	import Stage from '../Stage.svelte';
	import type { SvelteComponent } from 'svelte';
	import NextStage from '../NextStage.svelte';
	import { guyBalloon, doctor } from '$lib/characters';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';

	const choices = getAppState().choices;

	const page = getAppState().pageData.shortRecall;

	let correctGuesses = 0;
	let rewardCount = 0;

	$: if (page) {
		correctGuesses = $page.data.correct.filter((item) => $page.data.guesses.includes(item)).length;
		rewardCount = Math.max(1, correctGuesses);
	}

	page.showInfo();

	let recall: SvelteComponent;

	const t = $choices.find((r) => r.key === 'shortRecall')?.content ?? 'wizard';
</script>

<Stage {page} displayRewards={false}>
	<span slot="info">Select the you items were asked to remember, as many as you can!</span>
	<Recall bind:this={recall} slot="component" {page} />
	<span slot="next" class="multiNav">
		<button class="btn w-[50vw]" on:click={() => recall.makeInvisible()}>Hint</button>
		<NextStage {page} nextPage={true}
			>Continue ({$page.data.guesses.length}/{$page.data.correct.length})</NextStage
		>
	</span>
</Stage>
