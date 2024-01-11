<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { guessStore } from '../../../stores/guessStore';
	import { page } from '$app/stores';
	import type { ITaskData } from '$lib/dataInterfaces';

	let id: string = '';

	let taskData: ITaskData = {
		id: id,
		complete: false,
		score: 0,
		corrections: 0
	};
	let words: string[];

	const handleButton = () => {
		recallMode = !recallMode;
		taskData.corrections++;
	};

	onMount(() => {
		id = $page.route.id || '';
		words = ssm.getWords(); // populate words array
		guessStore.clear(); // remove any previous guesses
	});
	let recallMode = false;
</script>

<h2>Word Registration</h2>
<button on:click={handleButton}> {recallMode ? 'Show words' : 'Guess'}</button>
{#if recallMode}
	<RecallComponent bind:taskData {words} />
{/if}
{#if words && !recallMode}
	{#each words as w}
		<p>{w}</p>
	{/each}
{/if}
