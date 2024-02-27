<script lang="ts">
	import Introduction from '../components/pages/Introduction.svelte';
	import Example from '../components/pages/Example.svelte';
	import WordRegistration from '../components/pages/WordRegistration.svelte';
	import ClockDraw from '../components/pages/ClockDraw.svelte';
	import ClockHands from '../components/pages/ClockHands.svelte';
	import Recall from '../components/pages/Recall.svelte';

	const pages = [Introduction, Example, WordRegistration, ClockDraw, ClockHands, Recall];
	let index = 0;

	const fallbackFn = () => {
		index = (index + 1) % pages.length;
		page = pages[index];
	};

	let page = pages[index];
</script>

{#if page}
	<svelte:component this={page} {fallbackFn} />
{:else}
	<p>Page not found</p>
{/if}
