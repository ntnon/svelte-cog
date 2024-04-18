<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import BackButton from '../BackButton.svelte';
	import type { IEmoji } from '$lib/interfaces';

	export let taskState = getAppState().taskData.shortRecall;

	const addGuess = (e: IEmoji) => {
		taskState.update((v) => {
			const guesses = Array.from(new Set([...v.data.guesses, e]));
			return { ...v, data: { ...v.data, guesses } };
		});
	};

	const removeGuess = (e: IEmoji) => {
		taskState.update((v) => {
			const guesses = v.data.guesses.filter((g) => g.char !== e.char);
			return { ...v, data: { ...v.data, guesses } };
		});
	};

	const toggleGuess = (e: IEmoji) => {
		if ($taskState.data.guesses.includes(e)) {
			removeGuess(e);
		} else {
			addGuess(e);
		}
	};

	$: if ($taskState.data.guesses.length) {
		$taskState.completed = $taskState.data.guesses.length >= $taskState.data.correct.length;
	}
</script>

<Stage>
	<span slot="name">Emoji-logger</span>
	<span slot="info"
		>Do you remember? <br />Tap the correct icons {$taskState.data.guesses.length}/{$taskState.data
			.correct.length}</span
	>
	<div slot="component" class="grid grid-cols-5 gap-1 w-full h-full text-5xl">
		{#each $taskState.data.pool as e}
			<button
				class={$taskState.data.guesses.includes(e)
					? ' bg-slate-200 border-green-600 border-5 border-solid rounded-full box-border'
					: 'border-5 border-solid rounded-full box-border'}
				on:click={() => toggleGuess(e)}>{e.char}</button
			>
		{/each}
	</div>
	<div slot="next" class="flex flex-row size-full gap-3">
		<BackButton>See words</BackButton>
		<NextButton active={$taskState.completed}></NextButton>
	</div>
</Stage>
