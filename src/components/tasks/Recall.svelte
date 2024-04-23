<script lang="ts">
	import type { IEmoji, IEmojiPool, IPageData, IResettablePageStore } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';

	export let page: IResettablePageStore<IPageData<IEmojiPool>>;

	$: if ($page.data.guesses.length >= $page.data.correct.length) {
		$page.completed = true;
	}

	export const addGuess = (e: IEmoji) => {
		page.update((v) => {
			const guesses = Array.from(new Set([...v.data.guesses, e]));
			return { ...v, data: { ...v.data, guesses } };
		});
	};

	const removeGuess = (e: IEmoji) => {
		page.update((v) => {
			const guesses = v.data.guesses.filter((g) => g.char !== e.char);
			return { ...v, data: { ...v.data, guesses } };
		});
	};

	const toggleGuess = (e: IEmoji) => {
		if ($page.data.guesses.includes(e)) {
			removeGuess(e);
		} else {
			addGuess(e);
		}
	};

	$: if ($page.data.guesses) {
		$page.completed = $page.data.guesses.length === $page.data.correct.length;
	}

	export const makeInvisible = () => {
		const toRemove = new Set<IEmoji>($page.data.removed);
		const target = toRemove.size + 2;
		//If there are nothing more to remove, return early
		if ($page.data.pool.length - toRemove.size <= 0) return;

		//Finds random items from pool that are not correct answers
		while (toRemove.size < target) {
			const remainingPool = $page.data.pool.filter((candidate: IEmoji) => !toRemove.has(candidate));
			if (remainingPool.every((candidate: IEmoji) => $page.data.correct.includes(candidate))) {
				break;
			}

			const randomIndex = Math.floor(Math.random() * remainingPool.length);
			const candidate = remainingPool[randomIndex];
			if (!$page.data.correct.includes(candidate)) {
				toRemove.add(candidate);
			}
		}

		//a new guesses list where all items that also appear in toRemove are filtered out
		const guesses = $page.data.guesses.filter((g) => !toRemove.has(g));

		//updates the store
		page.update((v) => {
			const removed = Array.from(toRemove);
			return { ...v, data: { ...v.data, removed, guesses, errors: v.errors + 1 } };
		});
	};
</script>

<div class="grid grid-cols-5 size-full gap-1 text-5xl">
	{#each $page.data.pool as e}
		<button
			class="border-5 border-solid rounded-full box-border {$page.data.guesses.includes(e)
				? ' bg-slate-200 '
				: ''} {$page.data.removed.includes(e) ? 'opacity-0' : ''}"
			on:click={() => toggleGuess(e)}>{e.char}</button
		>
	{/each}
</div>
