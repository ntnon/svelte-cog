<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { flip } from 'svelte/animate';
	import { send, receive } from '../scripts/transition.js';

	let rewards = getAppState().rewards;
</script>

<div class="grid grid-cols-5 gap-5 text-5xl">
	{#each [...$rewards.locked, ...$rewards.selected] as item (item.name)}
		<span
			animate:flip={{ duration: 300 }}
			in:receive|global={{ key: item.name }}
			out:send|global={{ key: item.name }}
			class="flex flex-col justify-center items-center -m-4"
		>
			{item.char}
		</span>
	{/each}
</div>
