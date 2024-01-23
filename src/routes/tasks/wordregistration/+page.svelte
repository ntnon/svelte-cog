<script lang="ts">
	import RecallComponent from '../../../components/RecallComponent.svelte';
	import { getDataStore } from '$lib/state.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	let id = 'tasks/wordregistration';

	const wordRegistration = getDataStore<ITaskData>('wordRegistration');
	const words = getDataStore<string[]>('words');

	const handleButton = () => {
		recallMode = !recallMode;
		wordRegistration.update((v) => {
			return { ...v, corrections: v.corrections + 1 };
		});
	};

	let recallMode = false;
</script>

<h2>Word Registration</h2>
<button on:click={handleButton}> {recallMode ? 'Show words' : 'Guess'}</button>
{#if recallMode && wordRegistration}
	<RecallComponent store={wordRegistration} />
{/if}
{#if !recallMode}
	{#each $words as w}
		<p>{w}</p>
	{/each}
{/if}
