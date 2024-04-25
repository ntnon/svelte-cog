<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Recall from '../tasks/Recall.svelte';
	import Stage from '../Stage.svelte';
	import type { SvelteComponent } from 'svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, wizard, guy, doctor, king } from '$lib/characters';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';

	const choices = getAppState().choices;
	const page = getAppState().pageData.longRecall;
	let recall: SvelteComponent;
	let correctGuesses = 0;

	$: if (page) {
		correctGuesses = $page.data.correct.filter((item) => $page.data.guesses.includes(item)).length;
	}
</script>

{#if $page.currentStage === 'task'}
	<Stage {page}>
		<p slot="info">
			Select the correct items {$page.data.guesses.length}/{$page.data.correct.length}
		</p>
		<Recall bind:this={recall} slot="component" {page} />
		<p slot="next" class="multiNav">
			<button class="btn w-[50vw]" on:click={() => recall.makeInvisible()}>Hint</button>
			<NextStage {page} nextStage="reward">Continue</NextStage>
		</p>
	</Stage>
{/if}

{#if $page.currentStage === 'initial'}
	{#if $choices.find((c) => c.key === 'shortRecall')?.content === 'guy'}
		<Stage {page}>
			<span slot="component">
				<Dialog
					character={guy}
					on:complete={() => page.ready()}
					htmlString="Hey, I am the guy from before! I messed up again!!<pause /> You remember the items you got for me? I put them all next to other gifts, and I lost track of which ones you got!<pause /> What were the items again?"
				></Dialog>
			</span>
			<NextStage slot="next" {page} nextStage="task">Recall the items</NextStage>
		</Stage>
	{:else}
		<Stage {page}>
			<span slot="component">
				<Dialog
					on:complete={() => {
						page.ready();
					}}
					htmlString="You see a frog and a crown on top of a rock. It looks at you with big eyes. <pause /> Maybe the frog used to be human! <pause /> Recall all the items, maybe the frog will turn into a human again!"
				></Dialog>
			</span>
			<NextStage slot="next" {page} nextStage="task">Find items</NextStage>
		</Stage>
	{/if}
{/if}

{#if $page.currentStage === 'reward'}
	{#if $choices.find((c) => c.key === 'shortRecall')?.content === 'guy'}
		<Stage {page}>
			<span slot="component">
				<Dialog
					character={guy}
					on:complete={() => page.showReward()}
					htmlString="Thank you so so much! I think that's correct, but yeah - I forgot! <pause />  Did you enjoy your balloons?<pause /> Here, have more birthday stuff, I got too much anyway!"
				></Dialog>
			</span>
			<Reward
				slot="reward"
				maxRewards={3}
				options={[
					{ name: 'cake', char: '🍰' },
					{ name: 'party-popper', char: '🎉' },
					{ name: 'candy', char: '🍬' }
				]}
				on:complete={() => page.showNav()}
			/>
			<NextStage slot="next" {page} nextPage={true}>Recall items</NextStage>
		</Stage>
	{:else if correctGuesses > 3}
		<Stage {page}>
			<span slot="component">
				<Dialog
					character={king}
					on:complete={() => {
						page.showReward();
					}}
					htmlString="O thank you so much! You turned me back into a human! I am the king of of a far away land, and I will never forget your kindness! <pause />  Have this train ticket, so you can visit my kingdom whenever you want<pause /> Goodbye for now!"
				></Dialog>
			</span>
			<Reward
				slot="reward"
				on:complete={() => page.showNav()}
				options={[{ name: 'ticket', char: '🎫' }]}
			/>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{:else}
		<Stage {page}>
			<span slot="component">
				<Dialog
					on:complete={() => page.ready()}
					htmlString="Hmm, you didn't get all the items right.<pause /> It is probably just a regular frog anyway!"
				></Dialog>
			</span>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{/if}
{/if}
