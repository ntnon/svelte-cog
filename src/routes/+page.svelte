<script lang="ts">
	import Introduction from '../components/pages/Introduction.svelte';
	import Example from '../components/pages/Example.svelte';
	import ItemRegistration from '../components/pages/ItemRegistration.svelte';
	import ClockDraw from '../components/pages/ClockDraw.svelte';
	import ClockHands from '../components/pages/ClockHands.svelte';
	import LongRecall from '../components/pages/LongRecall.svelte';
	import ShortRecall from '../components/pages/ShortRecall.svelte';
	import Results from '../components/pages/Results.svelte';
	import Beginning from '../components/pages/Beginning.svelte';

	import { getAppState } from '$lib/state.svelte';
	let page = getAppState().page;

	const pages = [
		Introduction,
		//Example
		Beginning,
		ItemRegistration,
		ShortRecall,
		ClockDraw,
		ClockHands,
		LongRecall,
		Results
	];

	let f = false;
</script>

<svelte:component this={pages[$page]} />
