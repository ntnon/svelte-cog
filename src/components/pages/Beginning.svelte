<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { neighbor } from '$lib/characters';
	import { fade } from 'svelte/transition';

	const page = getAppState().pageData.beginning;
	page.softReset();
</script>

{#if $page.currentStage === 'initial'}
	<div
		in:fade|global={{ duration: 2500, delay: 700 }}
		class="w-[100dvw] h-[100dvh] flex center"
		on:introend={() => page.ready()}
	>
		<div class="flex h-[15dvh] w-[60dvw]">
			<NextStage {page} nextStage="wake-up">Wake up</NextStage>
		</div>
	</div>
{/if}
{#if $page.currentStage === 'wake-up'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				delay={1500}
				on:complete={() => page.ready()}
				htmlString="You wake up to rays of sunshine warming your face through the window.<pause /> 
		A perfect day.<pause /> You remember that a new bakery opens today, and is giving out free bagels!"
			></Dialog></span
		>

		<NextStage slot="next" {page} nextStage="reward">Go to the bakery</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	<Stage {page}>
		<span slot="component" class="size-full"
			><Dialog
				on:complete={() => {
					page.showInfo();
					page.showReward();
				}}
				htmlString="As you step out the front door, you find a coin and a flower on the ground!<pause /> You will find items like these throughout your journey.<pause /> Tap the items to pick them up
			"
			></Dialog>
		</span>
		<Reward
			slot="reward"
			on:complete={() => page.showNav()}
			options={[
				{ name: 'coin', char: '🪙' },
				{ name: 'sunflower', char: '🌻' }
			]}
		/>
		<NextStage slot="next" {page} nextStage="neighbor">Continue</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'neighbor'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				on:complete={() => page.ready()}
				htmlString="As you step out the door, you see your neighbor eating the largest ice cream you've ever seen.<pause />
				He seems eager to share something with you. Do you stop to talk with him?"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{ key: 'neighbor', text: 'you talked with your neighbor' }}
				{page}
				nextStage="ice-cream">Yes</NextStage
			>
			<NextStage
				{page}
				nextPage={true}
				choice={{
					key: 'preference',
					content: 'bagel',
					text: 'you really wanted a bagel',
					location: 'bakery'
				}}>No, I am in a hurry</NextStage
			>
		</span>
	</Stage>
{/if}
{#if $page.currentStage === 'ice-cream'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={neighbor}
				on:complete={() => page.ready()}
				htmlString="Hey neighbor! I reckon you wanted to know how I got this ice cream...<pause /> I'll tell you...<pause /> No, I won't...<pause /> Just kidding!<pause />
				Becuase of the nice weather, all the ice cream scoops are extra large today, no extra charge!<pause /> You should check it out while the weather is still nice!!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				{page}
				nextPage={true}
				choice={{
					key: 'preference',
					content: 'bagel',
					text: 'you really wanted a bagel',
					location: 'bakery'
				}}>🥯Bagel</NextStage
			>

			<NextStage
				choice={{
					key: 'preference',
					content: 'ice cream',
					text: 'you wanted ice cream instead of a bagel',
					location: 'ice cream shop'
				}}
				{page}
				nextPage={true}>🍨Ice cream</NextStage
			>
		</span>
	</Stage>
{/if}
