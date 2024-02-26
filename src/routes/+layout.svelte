<script lang="ts">
	import '../app.css';

	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';

	const context = setDataStore(defaultAppData);
	let debug: boolean = false;
</script>

<main class="w-[100vw] h-[100vh] flex justify-center">
	<slot />
</main>
