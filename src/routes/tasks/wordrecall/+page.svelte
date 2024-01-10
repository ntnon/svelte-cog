<script lang="ts">
	import type { ITaskData } from '$lib/dataInterfaces';
	import { onMount } from 'svelte';
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';
	import { guessStore } from '../../../stores/guessStore';

	let words: string[];

	onMount(() => {
		console.log('mount');
		words = ssm.getWords();
		guessStore.clear();
	});

	let taskData: ITaskData = {
		route: {
			name: 'Word Recall',
			path: '/tasks/wordrecall'
		},
		complete: false,
		score: 0,
		corrections: 0
	};
</script>

<h1>Word recall</h1>
<RecallComponent {taskData} />
