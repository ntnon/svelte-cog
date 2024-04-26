<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import RewardView from './RewardView.svelte';
	import type { IResettablePageStore } from '$lib/interfaces';
	export let displayRewards = true;
	export let page: IResettablePageStore<any> = getAppState().pageData.introduction;

	let view: HTMLElement;
</script>

<div
	in:fly|global={{ x: view.clientWidth, duration: 700, opacity: 100, delay: 200 }}
	out:fly|global={{ x: view.clientWidth * -1, duration: 700, opacity: 100, delay: 200 }}
	bind:this={view}
	class="stage absolute h-[100dvh] w-full"
>
	<span class="top h-[80%]">
		<span class="progress px-4 py-2"
			>{#if displayRewards}
				<RewardView />
			{:else}
				<span class="center p-3">
					<slot name="info" />
				</span>
			{/if}
		</span>

		<span class="flex-grow p-5 flex flex-col">
			<slot name="component" />
			{#if $page.showReward}
				<span class="h-full {$page.showReward ? '' : 'hideChildren'}"> <slot name="reward" /></span>
			{/if}
		</span>
	</span>

	<span class="bottom flex flex-grow center p-5"> <slot name="next" /></span>
</div>

<style>
	.stage {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 375px;
	}

	.top {
		display: sticky;
		grid-area: top;
		display: flex;
		flex-direction: column;
	}
	.bottom {
		grid-area: bottom;
		display: flex;
		flex-direction: column;
		position: absolute; /* Position the footer absolutely */
		bottom: 0; /* Align the footer to the bottom */
		width: 100%;
		height: 20dvh;
		max-height: 8rem;
	}

	.progress {
		grid-area: progress;
	}
</style>
