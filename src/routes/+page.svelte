<script lang="ts">
	import Nota from '../components/pages/Nota.svelte';
	import ItemRegistration from '../components/pages/ItemRegistration.svelte';
	import ClockDraw from '../components/pages/ClockDraw.svelte';
	import ClockHands from '../components/pages/ClockHands.svelte';
	import LongRecall from '../components/pages/LongRecall.svelte';
	import ShortRecall from '../components/pages/ShortRecall.svelte';

	import Beginning from '../components/pages/Beginning.svelte';
	import End from '../components/pages/End.svelte';
	import Survey from '../components/pages/Survey.svelte';

	import { getAppState } from '$lib/state.svelte';

	let page = getAppState().page;

	const pages = [
		Survey,

		Nota,
		//Example
		Beginning,
		ItemRegistration,
		ShortRecall,
		ClockDraw,
		ClockHands,
		LongRecall,
		End
	];
</script>

<svelte:component this={pages[$page]} />
