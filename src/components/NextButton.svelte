<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	const pageStore = getAppState().pageIndex;
	export let active = true;
</script>

<NavButton {active} fn={() => pageStore.update((v) => v + 1)}>Next</NavButton>
