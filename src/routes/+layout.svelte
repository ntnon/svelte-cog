<script lang="ts">
	import '../app.css';
	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';
	import { getAppState } from '$lib/state.svelte';
	setDataStore(defaultAppData);
</script>

<svelte:head>
	<link rel="manifest" href="src/manifest.json" />
</svelte:head>

<main>
	<slot />
</main>
