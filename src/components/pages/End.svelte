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

	const loc =
		$choices.find((c) => c.key === 'preference')?.content === 'bagel' ? 'bakery' : 'ice cream shop';

	const finalReward = preference === 'bagel' ? '🥯' : '🍨';

	page.showInfo();
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="component">
			<div class="emoji p-4 flex-nowrap">
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
		<NextStage slot="next" {page} nextStage={'statistics'}>Results and survey</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'statistics'}
	<Stage {page}>
		<div slot="component" class="p-5">
			<b>Thank you for playing!</b>
			<!-- <div>Clock drawing score: {'idk'}</div> -->
			<span class="text-slate-600">
				{#if $clockHands.data.hour.pointsAt && $clockHands.data.minute.pointsAt}
					<div>
						Clock hands goal: {$clockHands.data.timestamp.hour}:{$clockHands.data.timestamp.minute}
					</div>
					<div>
						Your clock hands: {Math.round($clockHands.data.hour.pointsAt)}:{Math.round(
							$clockHands.data.minute.pointsAt * 5
						)}
					</div>
				{/if}
				<div>
					Item recall score: {$shortRecall.data.correct.filter((i) =>
						$shortRecall.data.guesses.includes(i)
					).length}, hints used: {$shortRecall.errors * 0.5}
				</div>
				<div>
					Delayed recall score: {$longRecall.data.correct.filter((i) =>
						$longRecall.data.guesses.includes(i)
					).length}, hints used: {$shortRecall.errors * 0.5}
				</div>
				<br />
			</span>
			<br />
			<p class="center nb text-[8vmin]">Please respond to the survey!</p>
		</div>

		<a
			slot="next"
			class="center ease size-full btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500"
			href="https://svar.uib.no/LinkCollector?key=TJSL3WGQLN16">Respond to survey</a
		>
	</Stage>
{/if}
