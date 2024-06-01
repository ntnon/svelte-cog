<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	const pageStore = getAppState().page;
</script>

<div class="center flex-col space-y-10 h-[100dvh] top-1/2">
	<b>Welcome to SvelteCog</b>
	<p class="px-12 text-xl">This game was written as a part of my master thesis</p>
	<i>"Let's Play a Cognitive Game"</i>
	<button
		class="center hover p-5 w-[50dvw] ease btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500"
		on:click={() => pageStore.update((v) => v + 1)}>Play game</button
	>
	<a
		class="center hover p-5 w-[50dvw] ease btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500
	 min-width-max"
		href="https://github.com/ntnon/svelte-cog">GitHub</a
	>
	<a
		class="center hover p-5 w-[50dvw] ease btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500 inactive min-width-max"
		href="https://svar.uib.no/LinkCollector?key=TJSL3WGQLN16">Read thesis</a
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
