<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { send, receive } from '../scripts/transition';
	import type { IEmoji } from '$lib/interfaces';

	import { getAppState } from '$lib/state.svelte';
	import { flip } from 'svelte/animate';

	const rewards = getAppState().rewards;

	const dispatch = createEventDispatcher();

	export let options: IEmoji[] = [];

	export let maxRewards: number = 1;

	$: rewards.update((v) => ({ ...v, maxRewards, options: options }));

	interface IRewardOptions {
		options: IEmoji[];
		selected: IEmoji[];
		locked: IEmoji[];
	}
</script>

<div class="ease size-full center text-6xl flex flex-end nb">
	{#each $rewards.options as item (item.name)}
		<button
			class="reward"
			animate:flip={{ duration: 300 }}
			in:receive|global={{ key: item.name }}
			out:send|global={{ key: item.name }}
			on:click={() => {
				rewards.select(item);
				dispatch('complete', true);
			}}
			>{item.char}
		</button>
	{/each}
</div>
