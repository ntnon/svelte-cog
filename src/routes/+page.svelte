<script lang="ts">
	import Introduction from '../components/pages/Introduction.svelte';
	import Example from '../components/pages/Example.svelte';
	import WordRegistration from '../components/pages/WordRegistration.svelte';
	import ClockDraw from '../components/pages/ClockDraw.svelte';
	import ClockHands from '../components/pages/ClockHands.svelte';
	import Recall from '../components/pages/Recall.svelte';
	import { getAppState } from '$lib/state.svelte';

	const pages = [Introduction, Example, WordRegistration, ClockDraw, ClockHands, Recall];
	let index = 0;

	const animating = getAppState().isAnimating;

	const fallbackFn = () => {
		animating.set(true);
		index = (index + 1) % pages.length;
		page = pages[index];
	};

	let page = pages[index];
</script>

<svelte:component this={page} {fallbackFn}>
	{index} / 5
</svelte:component>
