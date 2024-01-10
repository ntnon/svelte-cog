<script lang="ts">
	import { onMount } from 'svelte';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import { guessStore } from '../../../stores/guessStore';
	import { page } from '$app/stores';
	import type { ITaskData } from '$lib/dataInterfaces';

	let taskData: ITaskData = {
		id: $page.data.id,
		complete: false,
		score: 0,
		corrections: 0
	};
	let words: string[];

	onMount(() => {
		console.log('mount');
		words = ssm.getWords();
		guessStore.clear();
	});
</script>

<h1>Word recall</h1>
<RecallComponent {taskData} />
