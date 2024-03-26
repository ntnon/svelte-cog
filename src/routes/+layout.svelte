<script lang="ts">
	import '../app.css';
	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';
	setDataStore(defaultAppData);
</script>

<!-- <svelte:head>
	<link rel="manifest" href="src/manifest.json" />
</svelte:head> -->

<main>
	<div class="text-lg md:text-4xl">
		<slot />
	</div>
</main>

<style>
	main {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
