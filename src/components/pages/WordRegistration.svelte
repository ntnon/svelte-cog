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
	let guesses: IResettableStore<string[]> = appState.registrationGuesses;

	const nextFn = () => {
		stage.completed = true;
	};

	const stages: IStage[] = [
		{
			completed: false,
			name: {
				text: 'Word Registration'
			},
			progress: {
				text: '1/2'
			},
			info: {
				text: 'Remember these words!'
			},
			main: {
				component: WordRegistrationTask
			} as IElement,
			reset: {
				hidden: true
			},
			help: {
				text: defaultHelpLabel,
				function: nextFn
			},
			next: {
				text: defaultNextLabel,
				function: nextFn
			}
		},
		{
			completed: false,
			name: {
				text: 'Word Registration'
			},
			progress: {
				text: '2/2'
			},
			info: {
				text: 'Do you remember the words? Write them in the boxes below!'
			},
			main: {
				component: WordRecallTask
			} as IElement,
			reset: {
				text: 'reveal words',
				function: () => (stages[0].completed = false)
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
		}
	];
	let stage: IStage = stages[0];

	$: if (stage) {
		let newStage = stages.find((stage) => !stage.completed);
		if (newStage) stage = newStage;
		else fallbackFn();
	}
</script>

<Stage {stage} />
