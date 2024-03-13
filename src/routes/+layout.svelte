<script lang="ts">
	import '../app.css';

	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';

	setDataStore(defaultAppData);
</script>

<svelte:head>
	<link rel="manifest" href="src/manifest.json" />
</svelte:head>

<main class="fixed w-[100vw] h-[100vh] flex justify-center text-2xl">
	<slot />
</main>

<style>
	main {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
