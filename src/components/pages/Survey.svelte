<script lang="ts">
	import { getAppState } from '$lib/state.svelte';

	const pageStore = getAppState().page;
</script>

<div class="center flex-col space-y-10 h-[100dvh] top-1/2">
	<b>Welcome to Web-Cog</b>
	<p>play the game before doing the survey</p>
	<button
		class="center hover p-5 w-[50dvw] ease btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500"
		on:click={() => pageStore.update((v) => v + 1)}>1. Game</button
	>
	<a
		class="center hover p-5 w-[50dvw] ease btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500"
		href="https://svar.uib.no/LinkCollector?key=TJSL3WGQLN16">2. Survey</a
	>
</div>

<style>
	.hover {
		transition: all 0.3s ease-in-out;
	}
	.hover:hover {
		scale: 1.1;
	}
</style>
