<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { fly } from 'svelte/transition';
	import RewardView from './RewardView.svelte';
	import type { IResettablePageStore } from '$lib/interfaces';

	export let page: IResettablePageStore<any> = getAppState().pageData.default;

	let view: HTMLElement;
</script>

<div
	in:fly|global={{ x: view.clientWidth, duration: 700, opacity: 100, delay: 200 }}
	out:fly|global={{ x: view.clientWidth * -1, duration: 700, opacity: 100, delay: 200 }}
	bind:this={view}
	class="stage absolute h-[100dvh] w-full text-xl"
>
	<span class="name center font-bold p-4">
		<slot name="name" />
	</span>
	<span class="progress center p-1">
		<RewardView />
	</span>
	<span class="info center p-4 nb {$page.showInfo ? '' : 'hideChildren'}">
		<slot name="info" />
	</span>
	<span class="task size-full p-2 flex flex-col">
		<slot name="component" />
		{#if $page.showReward}
			<span class="h-full {$page.showReward ? '' : 'hideChildren'}"> <slot name="reward" /></span>
		{/if}
	</span>
	<span class="navbar px-6 py-3"> <slot name="next" /></span>
</div>

<style>
	.stage {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 10% 10% 70% 10%;
		grid-template-areas:
			'name name progress'
			'info info info'
			'task task task'
			'navbar navbar navbar';
	}

	.navbar {
		grid-area: navbar;
		background-color: rgb(255, 244, 187);
	}

	.name {
		grid-area: name;
		background-color: rgb(251, 177, 160);
	}

	.progress {
		grid-area: progress;
		background-color: rgb(227, 160, 251);
	}

	.info {
		grid-area: info;
		background-color: rgb(160, 192, 251);
	}

	.task {
		grid-area: task;
		background-color: rgb(255, 244, 187);
	}
</style>
