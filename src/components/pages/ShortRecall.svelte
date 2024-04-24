<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Recall from '../tasks/Recall.svelte';
	import Stage from '../Stage.svelte';
	import type { SvelteComponent } from 'svelte';
	import NextStage from '../NextStage.svelte';
	import { guy, doctor } from '$lib/characters';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';

	const choices = getAppState().choices;

	const page = getAppState().pageData.shortRecall;

	let correctGuesses = 0;
	let rewardCount = 0;

	$: if (page) {
		correctGuesses = $page.data.correct.filter((item) => $page.data.guesses.includes(item)).length;
		rewardCount = Math.max(1, correctGuesses);
	}

	page.showInfo();

	let recall: SvelteComponent;

	const t = $choices.find((r) => r.key === 'shortRecall')?.content ?? 'wizard';
</script>

{#if $page.currentStage === 'initial'}
	<Stage {page}>
		<span slot="name"></span>
		<span slot="info"
			>Select the correct items {$page.data.guesses.length}/{$page.data.correct.length}</span
		>
		<Recall bind:this={recall} slot="component" {page} />
		<span slot="next" class="multiNav">
			<button class="btn w-[50vw]" on:click={() => recall.makeInvisible()}>Hint</button>
			<NextStage {page} nextStage="reward">Continue</NextStage>
		</span>
	</Stage>
{/if}

{#if $page.currentStage === 'reward'}
	{#if t === 'wizard'}
		<Stage {page}>
			<span slot="name" class="emoji">{doctor.char}</span>
			<span slot="info"><b>ribbit ribbit ribbit</b></span>
			<span slot="component">
				<Dialog
					character={doctor}
					on:complete={() => {
						page.ready();
					}}
					htmlString="Hello again Froggie!<pause /> I see you have been busy!<pause /> You managed to collect {correctGuesses} out of {$page
						.data.correct.length} items.  {correctGuesses === 0
						? "That's not a lot, but look! I found some items lying around, I can still turn you back into a human! "
						: correctGuesses === 1
							? 'That is not great, but I guess there were many items to pick from. Anway, I can still turn you back into a human!'
							: correctGuesses < 4
								? 'That is plenty of items! With these I can turn you into a human again!'
								: 'That is excellent! I can turn you back into a human!'} Hold still..."
				></Dialog></span
			>
			<NextStage slot="next" {page} nextStage="reward2">Turn back into a human</NextStage>
		</Stage>
	{:else}
		<Stage {page}>
			<span slot="name" class="emoji">{guy.char}</span>
			<span slot="info">Continue your journey</span>
			<span slot="component">
				<Dialog
					character={guy}
					on:complete={() => {
						page.showReward();
					}}
					htmlString="Hey, that's great!<pause /> I think these are the correct items... I forgot, but I'm sure they are fine! Thanks again, have some ballons!"
				></Dialog>
			</span>
			<Reward
				options={[
					{ name: 'balloon1', char: '🎈' },
					{ name: 'balloon2', char: '🎈' },
					{ name: 'balloon3', char: '🎈' },
					{ name: 'balloon4', char: '🎈' },
					{ name: 'balloon5', char: '🎈' }
				]}
				slot="reward"
				on:complete={() => page.showNav()}
			/>

			<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
		</Stage>
	{/if}
{/if}

{#if $page.currentStage === 'reward2'}
	<Stage {page}>
		<span slot="name" class="emoji">{doctor.char}</span>
		<span slot="info">Continue your journey</span>
		<span slot="component">
			<Dialog
				character={doctor}
				on:complete={() => {
					page.showReward();
				}}
				htmlString="Usually my patients have stuffed noses and sore throats, but this was really different, and fun! I have some items lying around that I don't need, feel free to pick {rewardCount}!"
			></Dialog></span
		>
		<Reward
			on:complete={() => page.showNav()}
			slot="reward"
			options={[
				{ name: 'crutch', char: '🩼' },
				{ name: 'thermometer', char: '🌡️' },
				{ name: 'bandage', char: '🩹' },
				{
					name: 'stethoscope',
					char: '🩺'
				},
				{ name: 'microscope', char: '🔬' }
			].slice(0, rewardCount)}
		/>
		<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
	</Stage>
{/if}
