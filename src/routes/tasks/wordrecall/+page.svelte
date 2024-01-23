<script lang="ts">
	import RecallComponent from '../../../components/RecallComponent.svelte';
	import type { ITaskGuesses } from '$lib/dataInterfaces';
	import { getDataStore } from '$lib/state.svelte';

	const store = getDataStore<ITaskGuesses>('wordRecall');
</script>

<h2>Word recall</h2>
<RecallComponent {store} />
