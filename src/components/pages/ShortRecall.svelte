<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import Button from '../Button.svelte';
	import type { IEmoji } from '$lib/interfaces';
	export let fallbackFn: () => void;

	const taskState = getAppState().taskData.shortRecall;
	let taskData = $taskState.data;

	const emojis = getAppState().recallItems;

	const addGuess = (e: IEmoji) => {
		taskState.update((t) => ({ ...t, data: [...t.data, e] }));
	};
	const removeGuess = (e: IEmoji) => {
		taskState.update((t) => ({ ...t, data: t.data.filter((f) => f.name !== e.name) }));
	};
</script>

<Stage>
	<span slot="name">Emoji-logger</span>
	<span slot="info">Complete the tasks, earn points. There are 6 unique tasks</span>
	<span slot="component" class=" flex-col">
		{#each $emojis.pool as e}
			{#if $taskState.data.includes(e)}
				<button class="border-red-600 border-2 border-solid" on:click={() => removeGuess(e)}
					>{e.char}</button
				>
			{:else}
				<button class="border-blue-600 border-2 border-solid" on:click={() => addGuess(e)}
					>{e.char}</button
				>
			{/if}
		{/each}
	</span>
	<div slot="next" class="flex-row">
		<button>go back</button>
		<Button fn={fallbackFn}>next</Button>
	</div>
</Stage>
