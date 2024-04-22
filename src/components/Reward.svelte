<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { send, receive } from '../scripts/transition';
	import type { IEmoji } from '$lib/interfaces';

	import { getAppState } from '$lib/state.svelte';
	import { flip } from 'svelte/animate';

	const rewards = getAppState().rewards;

	const dispatch = createEventDispatcher();

	export let rewardOptions: IEmoji[] = [];

	export let maxRewards: number = 1;

	$: rewards.update((v) => ({ ...v, maxRewards, options: rewardOptions }));

	interface IRewardOptions {
		options: IEmoji[];
		selected: IEmoji[];
		locked: IEmoji[];
	}
</script>

<div class="ease size-full center space-y-5 text-6xl">
	<div class="flex flex-end nb">
		{#each $rewards.options as item (item.name)}
			<button
				class:reward={true}
				animate:flip={{ duration: 300 }}
				in:receive|global={{ key: item.name }}
				out:send|global={{ key: item.name }}
				on:click={() => {
					rewards.select(item);
					dispatch('selected', true);
				}}
				>{item.char}
			</button>
		{/each}
	</div>
</div>
