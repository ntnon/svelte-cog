<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import { scale } from 'svelte/transition';
	import { getAppState } from '$lib/state.svelte';
	import Jurrasic from '../Jurrasic.svelte';
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import Reward from '../Reward.svelte';
	import { academic, narrator } from '$lib/characters';
	import NextStage from '../NextStage.svelte';
	import { quintIn } from 'svelte/easing';
	const choices = getAppState().choices;
	const page = getAppState().pageData.markers;

	$: if ($page.data.every((marker) => marker.completed)) {
		if ($page.currentStage === 'task') {
			page.complete(true);
			page.showNav();
		}
	}
</script>

{#if $page.currentStage === 'task'}
	<Stage {page} displayRewards={false}>
		<p slot="info">Drag all the numbers to their correct place on the clock</p>
		<span slot="component" class="size-full flex flex-grow-1">
			<ClockDrawTask bind:markers={$page.data}></ClockDrawTask>
		</span>
		<NextStage slot="next" {page} nextStage={'reward'}>Continue</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="component"
			><Dialog
				character={academic}
				on:complete={() => page.ready()}
				htmlString="I am going on an epic adventure, and I could really use the company. <pause /> Are you up for it?"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage
				choice={{
					key: 'adventure',
					content: 'no',
					text: "you decided that you didn't have time to go on an adventure"
				}}
				{page}
				nextStage={'no'}>No thanks</NextStage
			>

			<NextStage
				choice={{
					key: 'adventure',
					content: 'yes',
					text: 'you went on an adventure with the academic'
				}}
				{page}
				nextStage={'yes'}>Sure</NextStage
			>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'yes'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				character={academic}
				on:complete={() => page.ready()}
				htmlString="<i>FANTASTIC!</i> <pause /> The local wizard gave me a magical clock that can time travel, and I really want to see the dinosaurs to study them. Let's go then!"
			></Dialog></span
		>
		<span slot="next" class="multiNav">
			<NextStage {page} nextStage={'dinosaur'}>See the dinosaurs</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'no'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				character={academic}
				on:complete={() => page.ready()}
				htmlString="Oh..<pause />  I understand. I will go on my own then. <pause /> "
			></Dialog></span
		>

		<NextStage slot="next" {page} nextStage={'no2'}>Continue</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'no2'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				on:complete={() => page.ready()}
				htmlString="As the academic leaves, you see he has dropped something.<pause /> A watch."
			></Dialog></span
		>
		<span class="multiNav" slot="next">
			<NextStage
				choice={{
					key: 'watch',
					content: 'keep-watch',
					text: 'you decided to keep the watch'
				}}
				{page}
				nextStage={'found-watch'}>keep the watch</NextStage
			>
			<NextStage
				choice={{
					key: 'watch',
					content: 'return-watch',
					text: 'you decided to return the watch'
				}}
				{page}
				nextStage={'found-watch'}>give back the watch</NextStage
			>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'found-watch'}
	<Stage {page}>
		<span slot="component">
			<Dialog
				on:complete={() => page.ready()}
				htmlString="The watch is broken, but it looks easy to repair!"
			></Dialog></span
		>
		<span class="multiNav" slot="next">
			<NextStage {page} nextStage={'task'}>Repair the watch</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'dinosaur'}
	<div in:scale={{ duration: 1500, delay: 0, start: 0.2, easing: quintIn }}>
		<Stage {page}>
			<span slot="component" class="size-full flex space-between flex-col space-y-10">
				<Jurrasic />
				<span class="">
					<Dialog
						character={academic}
						on:complete={() => page.ready()}
						delay={1000}
						htmlString="Welcome to <b> the jurassic era!</b>"
					></Dialog>
				</span>
			</span>
			<NextStage slot="next" {page} nextStage={'dinosaur2'}>Continue</NextStage>
		</Stage>
	</div>
{/if}

{#if $page.currentStage === 'dinosaur2'}
	<Stage {page}>
		<span slot="component" class="size-full flex space-between flex-col space-y-10">
			<span class="">
				<Dialog
					character={academic}
					on:complete={() => page.ready()}
					delay={1000}
					htmlString="
						<b>OH NO!!!</b><pause />
						I stepped on the clock, and the numbers fell off!!!<pause /> How will we get back?<pause /> We have to repair the clock, I don't want to be eaten by a dinosaur!!!<pause /> Or by anything else for that matter......"
				></Dialog>
			</span>
		</span>
		<NextStage slot="next" {page} nextStage={'task'}>Repair the time travel clock</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	{#if $choices.find((choice) => choice.key === 'adventure' && choice.content === 'yes')}
		<Stage {page}>
			<span slot="component" class="size-full">
				<Dialog
					character={academic}
					on:complete={() => page.showReward()}
					htmlString="Whatever you did, it worked!<pause /> I thought we were toast for sure!<pause /> I want you to have this, as a souvenir!"
				></Dialog>
			</span>
			<Reward
				on:complete={() => page.showNav()}
				slot="reward"
				options={[{ name: 'dinosaur', char: '🦖' }]}
			/>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{:else if $choices.find((choice) => choice.key === 'watch')?.content === 'keep-watch'}
		<Stage {page}>
			<span slot="component">
				<Dialog on:complete={() => page.showReward()} htmlString="You keep the academic's watch."
				></Dialog>
			</span>
			<Reward
				on:complete={() => page.showNav()}
				slot="reward"
				options={[{ name: 'stolen-watch', char: '⌚' }]}
			/>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{:else}
		<Stage {page}>
			<span slot="component" class="size-full">
				<Dialog
					character={academic}
					on:complete={() => page.showReward()}
					htmlString="Wow thanks, you even repaired my watch! Please have this as a token of my gratitude!"
				></Dialog>
			</span>
			<Reward
				slot="reward"
				on:complete={() => page.showNav()}
				options={[{ name: 'sunglasses', char: '🕶️' }]}
			/>
			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{/if}
{/if}
