<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { flip } from 'svelte/animate';
	import { receive } from '../scripts/transition.js';

	let rewards = getAppState().rewards;
</script>

<div class="text-5xl flex flex-row flex-wrap">
	{#each [...$rewards.locked, ...$rewards.selected] as item (item.name)}
		<span animate:flip={{ duration: 300 }} in:receive|global={{ key: item.name }} class="-mx-3">
			{item.char}
		</span>
	{/each}
</div>
