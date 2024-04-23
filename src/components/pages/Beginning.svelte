<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, neighbor } from '$lib/characters';

	const page = getAppState().pageData.beginning;
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="name" class="text-6xl">☀️</span>
		<span slot="info"> What will you do?</span>
		<span slot="component"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={narrator.talkingSpeed}
				htmlString="You wake up to rays of sunshine warming your face through the window.<pause /> <br/>
                A perfect day.<pause /> <br/>
                You remember that a new bakery opens today, and it is giving out free bagels! If you hurry, you can make it in time.<pause /> <br/>
                "
			></Dialog></span
		>

		<NextStage slot="next" {page} nextStage="reward">Go to the bakery</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	<Stage {page}>
		<span slot="name" class="text-6xl">☀️</span>
		<span slot="info">Which item do you bring with you?</span>
		<span slot="component" class="size-full"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => {
					page.showInfo();
					page.showReward();
				}}
				speed={narrator.talkingSpeed}
				htmlString="As you step out the front door, you find a coin and a flower on the ground!<pause /> <br/>
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
		<span slot="name" class="text-6xl">{neighbor.char}</span>
		<span slot="info">Do you speak with him?</span>
		<span slot="component"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={narrator.talkingSpeed}
				htmlString="As you step out the door, you see your neighbor eating the largest ice cream you've ever seen.<pause /> <br/>
				He tries to talk to you."
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				{page}
				choice={{
					key: 'preference',
					content: 'ice cream',
					text: 'you wanted ice cream more than the bagel',
					location: 'ice cream shop'
				}}
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
				}}
				nextStage="journey">No, I am in a hurry</NextStage
			>
		</span>
	</Stage>
{/if}
{#if $page.currentStage === 'ice-cream'}
	<Stage {page}>
		<span slot="name" class="text-6xl">{neighbor.char}</span>
		<span slot="info">Do you want to get the free bagel or ice cream?</span>
		<span slot="component"
			><b>{neighbor.name}: </b><Dialog
				on:complete={() => page.ready()}
				speed={neighbor.talkingSpeed}
				htmlString="Hey there, friend! You wouldn't believe my luck!<pause /> <br/>
				Becuase of the nice weather, all the ice cream scoops are extra exra large, no extra charge!<pause /><br/> You should check it out while the weather is still nice!!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				{page}
				nextPage={true}
				choice={{ key: 'neighbor', text: 'talked with your neighbor!' }}
				nextStage="journey">Bagel</NextStage
			>

			<NextStage
				{page}
				nextPage={true}
				choice={{ key: 'neighbor', text: "you didn't have time for your neighbor" }}
				nextStage="journey">Ice cream</NextStage
			>
		</span>
	</Stage>
{/if}
