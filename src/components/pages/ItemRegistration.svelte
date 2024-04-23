<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, wizard, guy, doctor } from '$lib/characters';
	import { fade } from 'svelte/transition';
	import type { IPageData, IResettablePageStore } from '$lib/interfaces';
	import Reward from '../Reward.svelte';

	const nextPage = getAppState().pageData.shortRecall;

	const previousPage = getAppState().pageData.beginning;

	const page: IResettablePageStore<IPageData<boolean>> = getAppState().pageData.itemRegistration;
	const recallItems = getAppState().recallItems;

	const offset = 800;
	const timeBetweenItems = 500;

	$page.currentStage = 'initial';
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="name" class="text-6xl">☀️</span>
		<span slot="info">Which path do you choose?</span>
		<span slot="component"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={narrator.talkingSpeed}
				htmlString="Looking at your usual route to the 	{$previousPage.choices.find(
					(r) => r.key === 'preference'
				)?.location ??
					'bakery'}, you see a wizard standing in the middle of the road.<pause /> <br/>
				What a strange sight!<pause /> <br/>You could take the other route, but there is a man in tuxedo, looking very nervous.<pause /> <br/>"
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
				nextStage="wizard">🧙🏻‍♂️Wizard</NextStage
			>
			<NextStage {page} nextStage="guy">🤵🏾‍♂️guy</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'wizard'}
	<Stage {page}>
		<span slot="name" class="text-6xl">{wizard.char}</span>
		<span slot="info">ribbit ribbit</span>
		<span slot="component"
			><b>{wizard.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={wizard.talkingSpeed}
				htmlString="I am a wizard, and I am in a weird mood....!<pause /> <br/> <i>I TURN YOU INTO A FROG</i><pause /> <br/> hehehe, you are now a frog. Good luck!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="wizard2">croak</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'wizard2'}
	<Stage {page}>
		<span slot="name" class="text-6xl">{narrator.char}</span>
		<span slot="info">ribbit ribbit</span>
		<span slot="component"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={narrator.talkingSpeed}
				htmlString="So you've turned into a frog. That's not good. Maybe the doctor can help?"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="doctor">ribbit</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'doctor'}
	<Stage {page}>
		<span slot="name" class="text-6xl">{doctor.char}</span>
		<span slot="info">Remember the ingredients</span>
		<span slot="component"
			><b>{doctor.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={doctor.talkingSpeed}
				htmlString="So you're telling me a wizard turned you into a frog?<pause /><br/> That is very strange.<pause /><br/>I thought the wizard was on vacation!<pause /><br/>Luckily I know a bit of magic, but I am very busy. You will have to find the ingredients yourself. Here is the list of items that we need!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="task">See list</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'guy'}
	<Stage {page}>
		<span slot="name" class="text-6xl">{guy.char}</span>
		<span slot="info">Do you want to help him?</span>
		<span slot="component"
			><b>{guy.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={guy.talkingSpeed}
				htmlString="It is my friend's birthday today, and I told him I could plan his party. I did, but I totally forgot to get him a gift. I am so embarrassed. I don't know what to do."
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{
					key: 'shortRecall',
					text: 'You chose to help the guy',
					content: 'guy'
				}}
				{page}
				nextStage="guy2">Help him</NextStage
			>
			<NextStage
				choice={{
					key: 'shortRecall',
					text: 'You ignored the guy, and met the wizard',
					content: 'wizard'
				}}
				{page}
				nextStage="other-path">Walk the other way</NextStage
			>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'other-path'}
	<Stage {page}>
		<span slot="name" class="text-6xl">☀️</span>
		<span slot="info">Take the other route</span>
		<span slot="component"
			><b>{narrator.char}: </b><Dialog
				on:complete={() => page.ready()}
				speed={narrator.talkingSpeed}
				htmlString="You decide that there is no time to help the guy, and you walk the other way."
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
		<span slot="name" class="text-6xl">{guy.char}</span>
		<span slot="info">Pick up the balloon</span>
		<span slot="component"
			><b>{guy.char}: </b><Dialog
				on:complete={() => {
					page.showReward();
					page.showInfo();
				}}
				speed={guy.talkingSpeed}
				htmlString="Thank you so much!<pause /> <br/> Here is a list a list of things that my friend loves, that should help you find the perfect gift at the local toy shop! Also, I have this balloon, please have it!"
			></Dialog>
		</span>
		<Reward
			on:complete={() => page.showNav()}
			slot="reward"
			options={[{ name: 'balloon', char: '🎈' }]}
		/>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage="task">Continue</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'task'}
	<Stage {page}>
		<span slot="name">Word Registration</span>
		<span slot="info">Remember the items below, you will be asked to recall them later!</span>
		<span slot="component" class="flex-col justify-between center space-y-10 mt-20 text-3xl">
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

		<NextStage slot="next" nextPage={true} {page} nextStage="completed">Continue</NextStage>
	</Stage>
{/if}
