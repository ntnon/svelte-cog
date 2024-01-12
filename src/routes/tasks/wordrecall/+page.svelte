<script lang="ts">
	import { onMount } from 'svelte';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import { guessStore } from '../../../stores/guessStore';
	import { page } from '$app/stores';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { taskDataStore } from '../../../stores/taskDataStore';

	let taskData: ITaskData = {
		id: $page.route.id || '',
		complete: false,
		score: 0,
		corrections: 0
	};

	let words: string[];
	onMount(() => {
		words = ssm.getWords();
		guessStore.clear();
	});
</script>

<h2>Word recall</h2>
<RecallComponent bind:taskData />
