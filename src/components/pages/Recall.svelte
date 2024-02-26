<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import type { IElement, IResettableStore, IStage } from '$lib/interfaces';
	import Stage from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel } from '$lib/constants';
	import WordRegistrationTask from '../tasks/WordRegistrationTask.svelte';
	import WordRecallTask from '../tasks/WordRecallTask.svelte';
	export let fallbackFn: () => void;

	const appState = getAppState();
	let words: IResettableStore<string[]> = appState.words;
	let guesses: IResettableStore<string[]> = appState.recallGuesses;

	const nextFn = () => {
		stage.completed = true;
		fallbackFn();
	};

	const stage = {
		completed: false,
		name: {
			text: 'Word Recall'
		},
		progress: {
			text: '0/1'
		},
		info: {
			text: 'Do you recall the words? Write them in the boxes below!'
		},
		main: {
			component: WordRecallTask
		} as IElement,
		reset: {
			text: 'reset',
			function: () => {
				guesses.reset();
			}
		},
		help: {
			text: defaultHelpLabel,
			function: nextFn
		},
		next: {
			text: defaultNextLabel,
			function: nextFn
		},
		data: guesses
	};
</script>

<Stage {stage} />
