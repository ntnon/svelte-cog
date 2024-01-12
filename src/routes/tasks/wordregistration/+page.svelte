<script lang="ts">
	import { onMount } from 'svelte';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { page } from '$app/stores';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { wordStore } from '../../../stores/ssmSyncedStore';

	let id: string = '';

	let taskData: ITaskData = {
		id: id,
		complete: false,
		score: 0,
		corrections: 0
	};

	onMount(() => {
		id = $page.route.id || '';
	});

	const handleButton = () => {
		recallMode = !recallMode;
		taskData.corrections++;
	};

	let recallMode = false;
</script>

<h2>Word Registration</h2>
<button on:click={handleButton}> {recallMode ? 'Show words' : 'Guess'}</button>
{#if recallMode}
	<RecallComponent bind:taskData />
{/if}
{#if !recallMode}
	{#each $wordStore as w}
		<p>{w}</p>
	{/each}
{/if}
