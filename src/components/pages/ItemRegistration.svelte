<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import Stage from '../Stage.svelte';
	import { fade } from 'svelte/transition';
	export let fallbackFn: () => void;

	let recallItems = getAppState().recallItems;
</script>

<Stage>
	<span slot="name">Word Registration</span>
	<span slot="info"> Remember these words!!! </span>
	<input class="larger-checkbox" type="checkbox" />
	<span slot="component" class="size-full flex-col justify-between center space-y-10">
		<p in:fade={{ duration: 1000, delay: 1500 * 1 }}>{$recallItems.correct[0].name}</p>
		<p in:fade={{ duration: 1000, delay: 1500 * 2 }}>{$recallItems.correct[1].name}</p>
		<p in:fade={{ duration: 1000, delay: 1500 * 3 }}>{$recallItems.correct[2].name}</p>
	</span>
	<p slot="next" in:fade={{ duration: 1000, delay: 200 + 1500 * 4 }}>
		<button on:click={fallbackFn} class="bg-amber-500 md:p-5 p-3 rounded-full">Next</button>
	</p>
</Stage>
