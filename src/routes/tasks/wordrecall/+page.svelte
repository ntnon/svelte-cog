<script lang="ts">
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { ssmSyncedStore } from '../../../scripts/ssmSyncedStore';

	let id = '/tasks/wordrecall';

	let taskStore = ssmSyncedStore<ITaskData>(id, () => {
		return {
			complete: false,
			score: 0,
			corrections: 0,
			guesses: []
		};
	});
</script>

<h2>Word recall</h2>
<RecallComponent bind:taskStore />
