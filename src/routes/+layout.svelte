<script lang="ts">
	import '../app.css';
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import NavBar from '../components/NavBar.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);
	let debug: boolean = false;
</script>

<button on:click={() => (debug = !debug)}>toggle debug mode</button>
<div class="">
	<div class="">
		<NavBar {debug} />
	</div>
	<div class="">
		<slot />
	</div>
</div>

<!-- 
 -->

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
