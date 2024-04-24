<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	const pageStore = getAppState().page;

	export let active = true;
	export let label: string = 'Next';
</script>

<NavButton {active} fn={() => pageStore.update((v) => v + 1)}>{label}</NavButton>
