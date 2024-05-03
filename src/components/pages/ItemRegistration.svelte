<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, wizard, guyBalloon, doctor } from '$lib/characters';
	import { fade } from 'svelte/transition';
	import type { IPageData, IResettablePageStore } from '$lib/interfaces';

	const choices = getAppState().choices;

	const page: IResettablePageStore<IPageData<boolean>> = getAppState().pageData.itemRegistration;
	const recallItems = getAppState().recallItems;

	const offset = 800;
	const timeBetweenItems = 800;
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				on:complete={() => page.ready()}
				htmlString="Looking at your usual route to the {$choices.find((r) => r.key === 'preference')
					?.location ?? 'bakery'}, you see a wizard standing in the middle of the road.<pause /> 
What a strange sight!<pause /> You could take the other route, but there is a guy in a tuxedo, holding many balloons and looking somewhat anxious."
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				{page}
				choice={{
					key: 'shortRecall',
					text: 'you crossed paths with the wizard',
					content: 'wizard'
				}}
				nextStage="wizard">{wizard.char}</NextStage
			>
			<NextStage {page} nextStage="guy">{guyBalloon.char}</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'wizard'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={wizard}
				on:complete={() => page.ready()}
				htmlString="I am a wizard, and I am in a weird mood....!<pause />  <i>I TURN YOU INTO A FROG...</i><pause />  hehehe, you are now a frog. Good luck!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="wizard2">croak</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'wizard2'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				on:complete={() => page.ready()}
				htmlString="You're frog now, that's not good...<pause /> Do frogs even eat {$choices.find(
					(r) => r.key === 'preference'
				)?.content ?? 'bagels'}?<pause /> Maybe a doctor can help, I don't know anymore!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="doctor">ribbit</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'doctor'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={doctor}
				on:complete={() => page.ready()}
				htmlString="So you're telling me a wizard turned you into a frog?<pause /> That is very strange.<pause /> I thought the wizard was on vacation!<pause /> Luckily I know a bit of magic, but I am very busy. You will have to find the necessary ingredients yourself.<pause /> Here is the list of the items that we need --- remember them!"
			></Dialog></span
		>
		<NextStage slot="next" {page} nextStage="task">I am ready</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'guy'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={guyBalloon}
				on:complete={() => page.ready()}
				htmlString="It's my friend's birthday today and I told him I could plan his party and I planned everything and it is perfect, but I totally forgot to get him a present and I am so embarrassed and I don't know what to do!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{
					key: 'shortRecall',
					text: 'You ignored the guy, and met the wizard',
					content: 'wizard'
				}}
				{page}
				nextStage="other-path">I don't have time!</NextStage
			>
			<NextStage
				choice={{
					key: 'shortRecall',
					text: 'You chose to help the guy',
					content: 'guy'
				}}
				{page}
				nextStage="guy2">I can help!</NextStage
			>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'other-path'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				on:complete={() => page.ready()}
				htmlString="You decide that there is no time to help the guy, and you take the other route."
			></Dialog>
		</span>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{
					key: 'shortRecall',
					text: 'You ignored the guy',
					content: 'wizard'
				}}
				{page}
				nextStage="wizard">{wizard.char}</NextStage
			>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'guy2'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={guyBalloon}
				on:complete={() => {
					page.ready();
				}}
				htmlString="Thank you so much!<pause /> I'll tell you what my friend likes, so you know what to look for in the shop! ok?"
			></Dialog>
		</span>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="task">I'm ready</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'task'}
	<Stage {page} displayRewards={false}>
		<span slot="info">You will be asked to recall these items later!</span>
		<span slot="component" class="flex-col justify-between center space-y-10 text-3xl">
			{#each $recallItems as item, index}
				<div
					in:fade|global={{ duration: 1000, delay: offset + timeBetweenItems * index + 1 }}
					on:introend={() => {
						if (index === $recallItems.length - 1) {
							page.ready();
						}
					}}
				>
					{item.name}
				</div>
			{/each}
		</span>

		<NextStage slot="next" nextPage={true} {page}>I remember the items</NextStage>
	</Stage>
{/if}
