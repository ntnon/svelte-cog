<script lang="ts">
	import '../app.css';
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import Progress from '../components/Progress.svelte';
	import Clockdraw from '../components/tasks/Clockdraw.svelte';
	import Clockpoint from '../components/tasks/Clockpoint.svelte';
	import Wordrecall from '../components/tasks/Wordrecall.svelte';
	import Wordregistration from '../components/tasks/Wordregistration.svelte';
	import Results from '../components/tasks/Results.svelte';
	import Home from '../components/Home.svelte';

	const allData = getAppData();
	const context = setDataStore(allData);

	let currentTaskIndex: number = 0;

	const tasks = [Home, Wordregistration, Clockdraw, Clockpoint, Wordrecall, Results];
</script>

<div class="h-screen flex flex-col justify-between">
	<div class="text-[4vh] fixed top-0 w-full h-[10vh] bg-pink flex justify-center space-x-[6vh]">
		<Progress></Progress>
	</div>
	<div class="h-[80vh] mt-[10vh] flex flex-col justify-between">
		<svelte:component this={tasks[currentTaskIndex]} />
	</div>
	<div
		class="text-[4vh] fixed bottom-0 h-[10vh] flex justify-center space-x-[6vh] flex-row bg-pink w-full"
	>
		<button on:click={() => (currentTaskIndex = (currentTaskIndex + 1) % tasks.length)}
			>next {currentTaskIndex}</button
		>
		<button on:click={() => (currentTaskIndex = (currentTaskIndex - 1) % tasks.length)}
			>back {currentTaskIndex}</button
		>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
