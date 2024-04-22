<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { fade, fly } from 'svelte/transition';
	import RewardView from './RewardView.svelte';

	let points = getAppState().rewards;
	let view: HTMLElement;
	// in:fly={{ x: view.clientWidth, duration: 700, opacity: 100 }}
	// out:fly={{ x: view.clientWidth * -1, duration: 700, opacity: 100 }}
</script>

<div
	in:fly|global={{ x: view.clientWidth, duration: 700, opacity: 100 }}
	out:fly|global={{ x: view.clientWidth * -1, duration: 700, opacity: 100 }}
	bind:this={view}
	class="container absolute h-[100dvh] w-full text-xl"
>
	<span class="name center font-bold p-4">
		<slot name="name" />
	</span>

	<span class="progress center p-4">
		<RewardView />
	</span>

	<span class="info center p-4 nb">
		<slot name="info" />
	</span>

	<span class="task size-full p-4 flex flex-col">
		<slot name="component" />
	</span>

	<span class="navbar px-6 py-3"> <slot name="next" /></span>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 10% 15% 65% 10%;
		grid-template-areas:
			'name name progress'
			'info info info'
			'task task task'
			'navbar navbar navbar';
	}

	.navbar {
		grid-area: navbar;
		background-color: rgb(125, 220, 136);
	}

	.name {
		grid-area: name;
		background-color: rgb(220, 174, 125);
	}
	.progress {
		grid-area: progress;
		background-color: rgb(141, 125, 220);
	}

	.info {
		grid-area: info;
		background-color: rgb(220, 125, 125);
	}

	.task {
		grid-area: task;
		background-color: rgb(125, 220, 136);
	}
</style>
