<script lang="ts">
	import '../app.css';
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);
	let debug: boolean = false;
</script>

<main class="w-[100vw] h-[100vh] flex justify-center">
	<slot />
</main>
