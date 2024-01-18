<script lang="ts">
	import RecallComponent from '../../../components/tasks/RecallComponent.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';

	const store = getDataStore<ITaskData>('wordregistration');
</script>

<h2>Word recall</h2>
<RecallComponent {store} />
