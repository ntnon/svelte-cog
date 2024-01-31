<script lang="ts">
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import NavBar from '../components/NavBar.svelte';
	import Progress from '../components/Progress.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);
</script>

<div class="centered">
	<div class="slot">
		<slot />
	</div>

	<Progress></Progress>
	<NavBar debugMode={true} />
</div>

<!-- 
 -->

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100vh;
		align-items: center;
	}

	.slot {
		justify-content: center;
		padding-top: 10rem;
		display: flex;
		flex-direction: column;
		height: 100vh;
		align-items: center;
		padding-bottom: 10rem;
	}
</style>
