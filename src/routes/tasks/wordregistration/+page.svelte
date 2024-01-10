<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { guessStore } from '../../../stores/guessStore';
	import { page } from '$app/stores';
	import type { ITaskData } from '$lib/dataInterfaces';

	let taskData: ITaskData = {
		id: $page.route.id || '',
		complete: false,
		score: 0,
		corrections: 0
	};
	let words: string[];

	function handleTaskDataChange(td: ITaskData) {
		console.log(td);
	}

	onMount(() => {
		words = ssm.getWords();
		guessStore.clear();
	});
	let recallMode = false;
</script>

<h1>Word Registration</h1>
<button on:click={() => (recallMode ? (recallMode = false) : (recallMode = true))}
	>{recallMode ? 'Show words' : 'Guess'}</button
>
{#if recallMode}
	<RecallComponent
		on:taskDataChange={(e) => handleTaskDataChange(e.detail.taskData)}
		{taskData}
		{words}
	/>
{/if}

{#if words && !recallMode}
	{#each words as w}
		<p>{w}</p>
	{/each}
{/if}
