<script lang="ts">
	import Stage from '../Stage.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import Reward from '../Reward.svelte';
	import Dialog from '../Dialog.svelte';
	import { allCharacters, narrator } from '$lib/characters';
	const choices = getAppState().choices;
	const page = getAppState().pageData.default;

	const preference =
		$choices.find((c) => c.key === 'preference')?.content === 'bagel' ? 'ice cream' : 'bagel';
	console.log($choices);

	const loc =
		$choices.find((c) => c.key === 'preference')?.content === 'bagel' ? 'ice cream shop' : 'bakery';

	const finalReward = preference === 'bagel' ? '🥯' : '🍨';

	page.showInfo();
</script>

<Stage {page}>
	<p slot="info">
		<span class=" flex flex-wrap">
			{#each allCharacters as c}
				<span class="emoji">{c.symbol}</span>
			{/each}
		</span>
	</p>
	<span slot="component">
		<Dialog
			on:complete={() => {
				page.showReward();
			}}
			htmlString="There is a long line! Even I want one of these! You deserve it!"
		></Dialog>
	</span>
	<Reward
		slot="reward"
		on:complete={() => page.showNav()}
		options={[{ name: 'ice-cream', char: finalReward }]}
	/>
	<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
</Stage>
