<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Recall from '../tasks/Recall.svelte';
	import Stage from '../Stage.svelte';
	import type { SvelteComponent } from 'svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, wizard, guy, doctor } from '$lib/characters';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';

	const previousPage = getAppState().pageData.itemRegistration;

	const page = getAppState().pageData.shortRecall;
	let correctGuesses = 0;

	$: if (page) {
		correctGuesses = $page.data.correct.filter((item) => $page.data.guesses.includes(item)).length;
	}

	page.showNav();
	page.showInfo();

	let recall: SvelteComponent;

	const t = $previousPage.choices.find((r) => r.key === 'shortRecall')?.content ?? 'wizard';
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
			<NextStage inactive={$page.completed} {page} nextStage="reward">zzzz</NextStage>
		</span>
	</Stage>
{/if}
{#if t === 'wizard'}
	{#if $page.currentStage === 'reward'}
		<Stage {page}>
			<span slot="name" class="emoji">{doctor.char}</span>
			<span slot="info">You have unlocked the Wizard!</span>
			<span slot="component">
				<b>{doctor.char}: </b><Dialog
					on:complete={() => {
						page.showReward();
					}}
					speed={doctor.talkingSpeed}
					htmlString="Hello again Froggie!<pause /><br />I see you have been busy!<pause /><br />You managed to collect {correctGuesses} out of {$page
						.data.correct.length} items.  {correctGuesses === 0
						? "That's not a lot, but look! I found some items lying around, I can still turn you back into a human! "
						: correctGuesses === 1
							? 'That is not great, but I guess there were many items to pick from. Anway, I can still turn you back into a human!'
							: correctGuesses < 4
								? 'That is plenty of items! With these I can turn you into a human again!'
								: 'That is excellent! I can turn you back into a human!'} Hold still..."
				></Dialog></span
			>
			<Reward
				on:complete={() => page.showNav()}
				slot="reward"
				options={[
					{ name: 'crutch', char: '🩼' },
					{
						name: 'stethoscope',
						char: '🩺'
					},
					{ name: 'thermometer', char: '🌡️' },
					{ name: 'bandage', char: '🩹' },
					{ name: 'microscope', char: '🔬' }
				]}
			/>
			<NextStage {page} nextStage="reward2">Continue</NextStage>
		</Stage>
	{/if}
	{#if $page.currentStage === 'reward2'}
		<Stage {page}>
			<span slot="name">Knight</span>
			<span slot="info">You have unlocked the Knight!</span>
			<span slot="component"> fffff</span></Stage
		>
	{/if}
{/if}

{#if t !== 'wizard'}
	{#if $page.currentStage === 'reward'}
		<Stage {page}>
			<span slot="name" class="emoji">{doctor.char}</span>
			<span slot="info">You have unlocked the Wizard!</span>
			<span slot="component">
				<b>{doctor.char}: </b><Dialog
					on:complete={() => {
						page.showReward();
					}}
					speed={doctor.talkingSpeed}
					htmlString="Oh you made it! Did you remember any of the items that my friend likes?<pause /><br />I see you have been busy!<pause /><br />You managed to collect {correctGuesses} out of {$page
						.data.correct.length} items.  {correctGuesses === 0
						? "That's not a lot, but look! I found some items lying around, I can still turn you back into a human! "
						: correctGuesses === 1
							? 'That is not great, but I guess there were many items to pick from. Anway, I can still turn you back into a human!'
							: correctGuesses < 4
								? 'That is plenty of items! With these I can turn you into a human again!'
								: 'That is excellent! I can turn you back into a human!'} Hold still..."
				></Dialog></span
			>
			<Reward
				on:complete={() => page.showNav()}
				slot="reward"
				options={[
					{ name: 'crutch', char: '🩼' },
					{
						name: 'stethoscope',
						char: '🩺'
					},
					{ name: 'thermometer', char: '🌡️' },
					{ name: 'bandage', char: '🩹' },
					{ name: 'microscope', char: '🔬' }
				]}
			/>
			<NextStage {page} nextStage="reward2">Continue</NextStage>
		</Stage>
	{/if}
{/if}
