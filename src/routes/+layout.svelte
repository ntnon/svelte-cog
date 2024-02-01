<script lang="ts">
	import '../app.css';
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import NavBar from '../components/NavBar.svelte';
	import Progress from '../components/Progress.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);
</script>

<div class="place-content-center">
	<div class="slot">
		<slot />
	</div>

	<Progress></Progress>
	<NavBar debugMode={true}>HELLO</NavBar>
</div>

<!-- 
 -->

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
