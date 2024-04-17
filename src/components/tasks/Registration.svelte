<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import WordRecallTask from './WordRecallTask.svelte';

	const appState = getAppState();
	export let items: string[] = [];
</script>

<span class="flex flex-grow flex-col p-1 center gap-[7vh]">
	<span class="flex-col justify-between center gap-[4vh]">
		{#each items as i}
			<div class="h-[40%] text-center">{i}</div>
		{/each}
	</span>
</span>
