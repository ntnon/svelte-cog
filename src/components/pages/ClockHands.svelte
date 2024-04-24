<script lang="ts">
	import NextStage from '../NextStage.svelte';
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Reward from '../Reward.svelte';
	import { mayor, narrator } from '$lib/characters';
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
	<Stage {page}>
		<span slot="name" class="emoji">☀️</span>
		<p slot="info">Adjust the clock to display <b><i>{$page.data.timestamp.name}</i></b></p>
		<span slot="component" class="flex flex-grow-1 size-full">
			<ClockHandsTask bind:hands={$page.data} />
		</span>
		<NextStage slot="next" {page} nextStage={'reward'}>Continue</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="name" class="emoji">{mayor.char}</span>
		<span slot="info"> Will you climb the city hall building? </span>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Good day!<pause /> You look like you could climb the city hall building! It would really help me out..."
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
				nextStage={'yes'}>Climb</NextStage
			>
		</span>
	</Stage>
{/if}
{#if $page.currentStage === 'no'}
	<Stage {page}>
		<span slot="name" class="emoji">{mayor.char}</span>
		<span slot="info"> Adjust your watch </span>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Well at least you are honest! <pause /> By the way, your watch shows the wrong time.<pause /> Anyway I have to go, don't forget to vote for me!"
			></Dialog></span
		>
		<NextStage slot="next" {page} nextStage={'task'}>Adjust watch</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'yes'}
	<Stage {page}>
		<span slot="name" class="emoji">{mayor.char}</span>
		<span slot="info">
			Will you help the {mayor.name}?
		</span>
		<span slot="component">
			<Dialog
				character={mayor}
				on:complete={() => page.ready()}
				htmlString="Lovely! <pause />The town clock on top of city hall displays the wrong time. I need you to adjust it!"
			></Dialog></span
		>

		<NextStage slot="next" {page} nextStage={'task'}>Climb</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	{#if $choices.find((c) => c.key === 'climb')?.content === 'yes'}
		<Stage {page}>
			<span slot="name" class="emoji">{mayor.char}</span>
			<span slot="info">
				Will you help the {mayor.name}?
			</span>
			<span slot="component">
				<Dialog
					character={mayor}
					on:complete={() => {
						page.showInfo();
						page.showReward();
					}}
					htmlString="Wonderful! Please have my pen, really, I insist!<pause /> Don't forget to vote!"
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
			<span slot="name" class="emoji">{narrator.char}</span>
			<span slot="info">Continue your journey!</span>
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
