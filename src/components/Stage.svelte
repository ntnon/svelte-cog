<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import RewardView from './RewardView.svelte';
	import type { IResettablePageStore } from '$lib/interfaces';

	export let page: IResettablePageStore<any> = getAppState().pageData.introduction;

	let view: HTMLElement;
</script>

<div
	in:fly|global={{ x: view.clientWidth, duration: 700, opacity: 100, delay: 200 }}
	out:fly|global={{ x: view.clientWidth * -1, duration: 700, opacity: 100, delay: 200 }}
	bind:this={view}
	class="stage absolute h-[100dvh] w-full"
>
	<span class="top">
		<span class="progress center p-1">
			<RewardView />
		</span>

		<span class="task flex-grow p-5 flex flex-col">
			<slot name="component" />
			{#if $page.showReward}
				<span class="h-full {$page.showReward ? '' : 'hideChildren'}"> <slot name="reward" /></span>
			{/if}
		</span>
	</span>
	<span class="bottom">
		<span class="flex flex-grow center p-5"> <slot name="next" /></span>
	</span>
</div>

<style>
	.stage {
		background-color: rgb(255, 244, 187);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 80% 20%;
		grid-template-areas:
			'top'
			'bottom';
	}

	.top {
		grid-area: top;
		display: flex;
		flex-direction: column;
	}
	.bottom {
		grid-area: bottom;
		display: flex;
		flex-direction: column;
	}

	.progress {
		grid-area: progress;
	}

	.task {
		grid-area: task;
	}
</style>
