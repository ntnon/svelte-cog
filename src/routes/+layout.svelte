<script lang="ts">
	import '../app.css';
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import NavBar from '../components/NavBar.svelte';
	import Progress from '../components/Progress.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);
</script>

<div class="h-screen flex flex-col justify-between z-50">
	<div class="text-[4vh] fixed top-0 w-full h-[10vh] bg-pink flex justify-center space-x-[6vh]">
		<Progress></Progress>
	</div>

	<div class="h-[80vh] mt-[10vh] mb-[10vh] flex flex-col">
		<slot />
	</div>
	<div
		class="text-[4vh] fixed bottom-0 h-[10vh] flex justify-center space-x-[6vh] flex-row bg-pink w-full z-50"
	>
		<NavBar debugMode={true} />
	</div>
</div>

<!-- 
 -->

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
