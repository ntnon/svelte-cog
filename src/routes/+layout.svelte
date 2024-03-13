<script lang="ts">
	import '../app.css';

	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';

	const context = setDataStore(defaultAppData);
</script>

<main class="w-[100vw] h-[100vh] flex justify-center">
	<slot />
</main>

<style>
	main {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-size: larger;
	}
</style>
