<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getAppState } from '$lib/state.svelte';

	const appState = getAppState();
	export let words: Writable<string[]> = appState.data.words;
	export const enableNext: boolean = true;
	export const score: number = 0;
</script>

{#each $words as w}
	<p>{w}</p>
{/each}
