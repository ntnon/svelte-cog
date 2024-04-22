<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { flip } from 'svelte/animate';
	import { send, receive } from '../scripts/transition.js';

	let rewards = getAppState().rewards;
</script>

<div class="flex">
	{#each $rewards.locked as item}
		<div class="flex flex-col">
			<span>{item.char}</span>
		</div>
	{/each}
	{#each $rewards.selected as item (item.name)}
		<button
			animate:flip={{ duration: 300 }}
			in:receive|global={{ key: item.name }}
			out:send|global={{ key: item.name }}
			class="flex flex-col"
			on:click={() => rewards.deselect(item)}
		>
			{item.char}
		</button>
	{/each}
</div>
