<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Recall from '../tasks/Recall.svelte';
	import Stage from '../Stage.svelte';
	import type { SvelteComponent } from 'svelte';
	import NextStage from '../NextStage.svelte';
	import { guy, king } from '$lib/characters';
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
	<Stage {page} displayRewards={false}>
		<span slot="info"
			>Select the you same items you were asked to remember earlier, as many as you can!</span
		>
		<Recall bind:this={recall} slot="component" {page} />
		<span slot="next" class="multiNav">
			<button class="btn w-[50vw]" on:click={() => recall.makeInvisible()}>Hint</button>
			<NextStage {page} nextStage="reward"
				>Continue ({$page.data.guesses.length}/{$page.data.correct.length})</NextStage
			>
		</span>
	</Stage>
{/if}
{#if $page.currentStage === 'initial'}
	{#if $choices.find((c) => c.key === 'shortRecall')?.content === 'guy'}
		<Stage {page}>
			<span slot="component">
				<Dialog
					character={guy}
					on:complete={() => page.ready()}
					htmlString="Hey, I am the guy from before, but I have less balloons now!<pause /> I messed up again!<pause /> You remember the items you got for me?<pause /> I put them all next to other gifts and I lost track of which ones you got. What were the items again"
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
					htmlString="You see a frog on top of a rock. <pause /> Next to it is a crown.<pause /> 🐸👑 <pause /><i>crrooak...</i><pause /> The frog looks at you with big eyes.<pause /> Maybe it used to be human! <pause /> You remember how the doctor turned you into a human, if you only had the same items as before, maybe you could help this frog!"
				></Dialog>
			</span>
			<NextStage slot="next" {page} nextStage="task">Find the ingredients again</NextStage>
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
					htmlString="Thank you so so much! I think that's correct...<pause /> Did you enjoy the balloons?<pause /> Here, have more birthday stuff, I got too much anyway!"
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
					htmlString="Thank you graciously. I am the king of of a far away land, and I will never forget your kindness! <pause /> Have this train ticket, so you can visit my kingdom whenever you want<pause /> Goodbye for now!"
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
