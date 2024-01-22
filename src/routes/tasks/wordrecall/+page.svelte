<script lang="ts">
	import RecallComponent from '../../../components/RecallComponent.svelte';
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';

	const store = getDataStore<ITaskData>('wordRecall');
</script>

<h2>Word recall</h2>
<RecallComponent {store} />
