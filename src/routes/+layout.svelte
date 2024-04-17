<script lang="ts">
	import '../app.css';
	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';
	import { getAppState } from '$lib/state.svelte';
	setDataStore(defaultAppData);

	const appState = getAppState();
	const longRecall = appState.taskData.longRecall;
	const shortRecall = appState.taskData.shortRecall;
	console.log($longRecall.data.correct);
	console.log($shortRecall.data.correct);
</script>

<svelte:head>
	<link rel="manifest" href="src/manifest.json" />
</svelte:head>

<main>
	<slot />
</main>
