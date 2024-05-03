<script lang="ts">
	import NextStage from '../NextStage.svelte';
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Reward from '../Reward.svelte';
	import { mayor } from '$lib/characters';
	const choices = getAppState().choices;
	const page = getAppState().pageData.hands;

	$: if ($page.data.hour.completed && $page.data.minute.completed) {
		if (!$page.completed) {
			page.ready();
		}
		page.complete(true);
	}
</script>

{#if $page.currentStage === 'task'}
	<Stage {page} displayRewards={false}>
		<div slot="info" class="h-[20%]">
			Adjust the clock to display <b><i>{$page.data.timestamp.name}</i></b>
		</div>

		<ClockHandsTask slot="component" bind:hands={$page.data} />

		<NextStage slot="next" {page} nextStage={'reward'}>Continue</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Good day.<pause /> You look like you could climb the city hall building.<pause /> Would you do it for me?"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{
					key: 'climb',
					content: 'no',
					text: 'you decided to not climb the building'
				}}
				{page}
				nextStage={'no'}>No, I am in a hurry</NextStage
			>

			<NextStage
				choice={{
					key: 'climb',
					content: 'yes',
					text: 'you decided to help the mayor'
				}}
				{page}
				nextStage={'yes'}>Sure</NextStage
			>
		</span>
	</Stage>
{/if}
{#if $page.currentStage === 'no'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Well at least you are honest. <pause /> By the way, your watch shows the wrong time.<pause /> Anyway I have to go. <b>Don't forget to vote for me!!!</b>"
			></Dialog></span
		>
		<NextStage slot="next" {page} nextStage={'task'}>Adjust watch</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'yes'}
	<Stage {page}>
		<span slot="info">
			Will you help the {mayor.name}?
		</span>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Lovely.<pause /> The town clock on top of city hall displays the wrong time.<pause /> I need you to adjust it.<pause /> Thank you."
			></Dialog></span
		>

		<NextStage slot="next" {page} nextStage={'task'}>Adjust clock</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	{#if $choices.find((c) => c.key === 'climb')?.content === 'yes'}
		<Stage {page}>
			<span slot="component">
				<Dialog
					character={mayor}
					on:complete={() => {
						page.showInfo();
						page.showReward();
					}}
					htmlString="Thank you again. Please have my pen.<pause />  Really, I insist.<pause /> Don't forget to vote!"
				></Dialog>
			</span>
			<Reward
				slot="reward"
				on:complete={() => page.showNav()}
				options={[{ name: 'fountain-pen', char: '🖋️' }]}
			/>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{:else}
		<Stage {page}>
			<span slot="component"
				><Dialog
					on:complete={() => page.ready()}
					htmlString="After adjusting your watch, you're once again ready to continue"
				></Dialog>
			</span>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{/if}
{/if}
