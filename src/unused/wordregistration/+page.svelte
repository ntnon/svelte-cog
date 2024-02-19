<script lang="ts">
	import PageComponent from '../PageComponent.svelte';
	import type { IPage } from '$lib/interfaces';
	import { getAppState } from '$lib/state.svelte';
	import RegistrationComponent from '../../../components/RegistrationComponent.svelte';
	import RecallComponent from '../../../components/RecallComponent.svelte';

	const appState = getAppState();
	const store = appState.pages.wordregistration;
	const words = appState.data.words;

	export let nextPage: () => void = () => console.log('next page function triggered!');

	const page: IPage = {
		name: 'Word Registration',
		info: 'Please register the words you see in the image.',
		type: 'task',
		path: 'task lol',
		enableNext: false,
		timesVisited: 0
	};

	const progress = {
		completed: 1,
		total: 5
	};

	const states = [RegistrationComponent, RecallComponent];
	let stageIndex = 0;

	const handleReset = () => {
		stageIndex = 0;
	};
</script>

<PageComponent {page} {progress} bind:stageIndex stageCount={states.length}>
	<button slot="reset" on:click={handleReset}>Back</button>
	<button slot="help" on:click={() => console.log('help')}>Help</button>
	<svelte:component this={states[stageIndex]} />
</PageComponent>
