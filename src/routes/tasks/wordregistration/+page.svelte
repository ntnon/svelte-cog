<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	import type { IRoute } from '$lib/interfaces';
	import { guessStore } from '../../../stores/guessStore';

	let words: string[];

	onMount(() => {
		words = ssm.getWords();
		guessStore.clear();
	});
	let recallMode = false;

	let route: IRoute = {
		name: 'Word Registration',
		path: '/tasks/wordregistration'
	};

	let taskData: ITaskData = {
		route: route,
		complete: false,
		score: 0,
		corrections: 0
	};
</script>

<h1>Word Registration</h1>
<button on:click={() => (recallMode ? (recallMode = false) : (recallMode = true))}
	>{recallMode ? 'Show words' : 'Guess'}</button
>
{#if recallMode}
	<RecallComponent {taskData} {words} />
{/if}

{#if words && !recallMode}
	{#each words as w}
		<p>{w}</p>
	{/each}
{/if}
