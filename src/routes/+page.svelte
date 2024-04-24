<script lang="ts">
	import Nota from '../components/pages/Nota.svelte';
	// import Example from '../components/pages/Example.svelte';
	import ItemRegistration from '../components/pages/ItemRegistration.svelte';
	import ClockDraw from '../components/pages/ClockDraw.svelte';
	import ClockHands from '../components/pages/ClockHands.svelte';
	import LongRecall from '../components/pages/LongRecall.svelte';
	import ShortRecall from '../components/pages/ShortRecall.svelte';
	import Results from '../components/pages/Results.svelte';
	import Beginning from '../components/pages/Beginning.svelte';
	import End from '../components/pages/End.svelte';

	import { getAppState } from '$lib/state.svelte';
	import HowToPlay from '../components/pages/HowToPlay.svelte';
	let page = getAppState().page;

	const pages = [
		Nota,
		//Example
		HowToPlay,
		Beginning,
		ItemRegistration,
		ShortRecall,
		ClockDraw,
		ClockHands,
		LongRecall,
		End,
		Results
	];
</script>

<svelte:component this={pages[$page]} />
