<script lang="ts">
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { wordStore } from '../../../stores/stores';
	import { ssmSyncedStore } from '../../../scripts/ssmSyncedStore';
	import { resolveRoute } from '$app/paths';

	let id = '/tasks/wordregistration';

	let taskStore = ssmSyncedStore<ITaskData>(id, () => {
		return {
			route: resolveRoute,
			complete: false,
			score: 0,
			corrections: 0,
			guesses: []
		};
	});

	const handleButton = () => {
		recallMode = !recallMode;
		$taskStore.corrections++;
	};

	let recallMode = false;
</script>

<h2>Word Registration</h2>
<button on:click={handleButton}> {recallMode ? 'Show words' : 'Guess'}</button>
{#if recallMode}
	<RecallComponent bind:taskStore />
{/if}
{#if !recallMode}
	{#each $wordStore as w}
		<p>{w}</p>
	{/each}
{/if}
