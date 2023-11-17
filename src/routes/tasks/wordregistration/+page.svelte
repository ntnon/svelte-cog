<script lang="ts">
	import { wordStore } from '../../../stores/wordStore';
	import { updateProgress } from '../../../stores/progressTracker';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let f: string[] = [];

	onMount(() => {
		//ensures that the wordStore is populated before the component is mounted
		f = $wordStore;
	});
</script>

<h1>Word Registration</h1>
{#each f as w}
	<p>{w}</p>
{/each}
<button on:click={() => updateProgress($page.route.id, 'complete')}>update progress</button>
