<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { fade, fly } from 'svelte/transition';

	let points = getAppState().points;
	const isAnimating = getAppState().isAnimating;
	let view: HTMLElement;
</script>

<div
	in:fly={{ x: view.clientWidth, duration: 700, opacity: 100 }}
	out:fly={{ x: view.clientWidth * -1, duration: 700, opacity: 100 }}
	on:introstart={() => isAnimating.set(true)}
	on:introend={() => isAnimating.set(false)}
	on:outrostart={() => isAnimating.set(true)}
	on:outroend={() => isAnimating.set(false)}
	bind:this={view}
	class="container absolute h-[100dvh] w-full text-lg"
>
	<span class="name center font-bold">
		<slot name="name" />
	</span>

	<span class="progress center p-4">
		{$points} points
	</span>

	<span class="info center p-4">
		<slot name="info" />
	</span>

	<span class="task size-full p-4">
		{#if !$isAnimating}
			<span in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
				<slot name="component" />
			</span>
		{/if}
	</span>

	<span class="navbar flex">
		<span class="next center navbtn mb-5 w-60 mx-auto"><slot name="next" /></span>
	</span>
</div>

<style>
	.container {
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
