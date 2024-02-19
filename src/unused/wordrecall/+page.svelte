<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import RecallComponent from '../../../components/RecallComponent.svelte';

	const appState = getAppState();
	const store = appState.pages.wordrecall;
	const words = appState.data.words;
</script>

<h2>Word recall</h2>
<RecallComponent />
