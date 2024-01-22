<script lang="ts">
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';

	const wordRegistration = getDataStore<ITaskData>('wordRegistration');
	const wordRecall = getDataStore<ITaskData>('wordRecall');
	const clockDraw = getDataStore<ITaskData>('clockDraw');
	const clockPoint = getDataStore<ITaskData>('clockPoint');

	const allStores = [$wordRecall, $wordRegistration, $clockDraw, $clockPoint];
	console.log($wordRegistration);
</script>

<h1>Tasks completed!</h1>
<p>Here are your answers:</p>
<p>Well done!</p>

{#each allStores as store}
	<p>Task: {store.name}</p>
	<p>Score: {store.score}</p>
	<p>Corrections: {store.corrections}</p>
{/each}
