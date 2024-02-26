<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import type { IResettableStore } from '$lib/interfaces';

	const appState = getAppState();
	let words: IResettableStore<string[]> = appState.words;
</script>

<span class="flex flex-col words">
	{#each $words as w}
		<p>{w}</p>
	{/each}
</span>
