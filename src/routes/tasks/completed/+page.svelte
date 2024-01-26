<script lang="ts">
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';

	const wordRegistration = getDataStore<ITaskData>('wordregistration');
	const wordRecall = getDataStore<ITaskData>('wordrecall');
	const clockDraw = getDataStore<ITaskData>('clockdraw');
	const clockPoint = getDataStore<ITaskData>('clockpoint');

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
