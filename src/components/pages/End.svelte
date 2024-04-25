<script lang="ts">
	import Stage from '../Stage.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import Reward from '../Reward.svelte';
	import Dialog from '../Dialog.svelte';
	import { allCharacters } from '$lib/characters';

	const choices = getAppState().choices;
	const page = getAppState().pageData.end;

	const shortRecall = getAppState().pageData.shortRecall;
	const longRecall = getAppState().pageData.longRecall;
	const clockDraw = getAppState().pageData.markers;
	const clockHands = getAppState().pageData.hands;
	const beginning = getAppState().pageData.beginning;
	const itemRegistration = getAppState().pageData.itemRegistration;

	const preference =
		$choices.find((c) => c.key === 'preference')?.content === 'bagel' ? 'bagel' : 'cream';
	console.log($choices);

	const loc =
		$choices.find((c) => c.key === 'preference')?.content === 'bagel' ? 'bakery' : 'ice cream shop';

	const finalReward = preference === 'bagel' ? '🥯' : '🍨';

	page.showInfo();
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="info" class=" flex flex-nowrap">
			{#each allCharacters as c}
				{c.symbol}
			{/each}
		</span>
		<span slot="component">
			<div class="text-4xl p-4 flex-nowrap">
				{#each allCharacters as c}
					{c.symbol}
				{/each}
			</div>
			<Dialog
				on:complete={() => {
					page.showNav();
				}}
				htmlString="You finally arive at the {loc}.<pause /> There is a long line! Even I want one of these!<pause /> Your reward at last!<pause /> Enjoy!!"
			></Dialog>
		</span>
		<NextStage slot="next" {page} nextStage={'reward'}>Complete game</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'reward'}
	<Stage {page}>
		<Reward
			slot="component"
			on:complete={() => page.showNav()}
			options={[{ name: 'ice-cream', char: finalReward }]}
		/>
		<NextStage slot="next" {page} nextStage={'statistics'}>See statistics</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'statistics'}
	<Stage {page}>
		<div slot="component">
			<div>Clock drawing score: {'idk'}</div>
			<div>
				Clock hands goal: {$clockHands.data.timestamp.hour}:{$clockHands.data.timestamp.minute}
			</div>
			<div>
				Your clock hands: {$clockHands.data.hour.target}:{$clockHands.data.minute.target * 5}
			</div>
			<div>
				Item recall score: {$shortRecall.data.correct.filter((i) =>
					$shortRecall.data.guesses.includes(i)
				).length -
					$shortRecall.errors * 0.5}
			</div>
			<div>
				Delayed recall score: {$longRecall.data.correct.filter((i) =>
					$longRecall.data.guesses.includes(i)
				).length -
					$longRecall.errors * 0.5}
			</div>
			<br />

			<div>Overall score: {'idk'}</div>
			<br />
			Remember to actively engage in activities that promote brain health!<br />
			<br />
			Thank you for playing!
		</div>
	</Stage>
{/if}
