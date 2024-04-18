<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	const pageStore = getAppState().pageIndex;
</script>

<NavButton fn={() => pageStore.update((v) => v - 1)}><slot /></NavButton>
