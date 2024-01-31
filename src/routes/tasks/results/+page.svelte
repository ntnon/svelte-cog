<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { get } from 'svelte/store';
	import type { ITaskPage } from '$lib/datainterfaces';

	const appState = getAppState();
	const pages = appState.pages;

	let pageArray = Object.values(pages);
	let taskPages = pageArray
		.filter((page) => get(page).type === 'task')
		.map((page) => get(page)) as ITaskPage[];
</script>

<h1>Tasks completed!</h1>
<p>Here are your answers:</p>
<p>Well done!</p>

{#each taskPages as page}
	<p>Task: {page.name}</p>
	<p>Score: {page.score}</p>
	<p>Corrections: {page.corrections}</p>
{/each}
