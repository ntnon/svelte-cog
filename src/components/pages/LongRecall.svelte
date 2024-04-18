<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import BackButton from '../BackButton.svelte';
	import type { IEmoji } from '$lib/interfaces';

	export let taskState = getAppState().taskData.longRecall;

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

	$: if ($taskState.data.guesses.length >= $taskState.data.correct.length) {
		$taskState.completed = true;
	}

	const makeInvisible = () => {
		const toRemove = new Set<IEmoji>($taskState.data.removed);
		const target = toRemove.size + 2;
		//If there are nothing more to remove, return early
		if ($taskState.data.pool.length - toRemove.size <= 0) return;

		//Finds random items from pool that are not correct answers
		while (toRemove.size < target) {
			const remainingPool = $taskState.data.pool.filter((candidate) => !toRemove.has(candidate));
			if (remainingPool.every((candidate) => $taskState.data.correct.includes(candidate))) {
				break;
			}

			const randomIndex = Math.floor(Math.random() * remainingPool.length);
			const candidate = remainingPool[randomIndex];
			if (!$taskState.data.correct.includes(candidate)) {
				toRemove.add(candidate);
			}
		}

		//a new guesses list where all items that also appear in toRemove are filtered out
		const guesses = $taskState.data.guesses.filter((g) => !toRemove.has(g));

		//updates the store
		taskState.update((v) => {
			const removed = Array.from(toRemove);
			return { ...v, data: { ...v.data, removed, guesses } };
		});
	};
</script>

<Stage>
	<span slot="name">Emoji-logger part 2</span>
	<span slot="info"
		>Do you still remember the {$taskState.data.correct.length} words from before? {$taskState.data
			.guesses.length} / {$taskState.data.correct.length}</span
	>
	<div slot="component" class="grid grid-cols-5 gap-1 w-full h-full text-5xl">
		{#each $taskState.data.pool as e}
			<button
				class="{$taskState.data.guesses.includes(e)
					? ' bg-slate-200 border-5 border-solid rounded-full box-border'
					: 'border-5 border-solid rounded-full box-border'} {$taskState.data.removed.includes(e)
					? 'opacity-35 pointer-events-none'
					: ''}"
				on:click={() => toggleGuess(e)}>{e.char}</button
			>
		{/each}
	</div>
	<div slot="next" class="flex flex-row size-full gap-3">
		<button class="btnClass" on:click={makeInvisible}>help!</button>
		<NextButton active={$taskState.completed}></NextButton>
	</div>
</Stage>
