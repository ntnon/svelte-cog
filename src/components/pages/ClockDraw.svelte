<script lang="ts">
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import type { IElement, IMarker, IResettableStore, IStage } from '$lib/interfaces';
	import Stage from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel } from '$lib/constants';

	export let fallbackFn: () => void;

	const appState = getAppState();
	let markers: IResettableStore<IMarker[]> = appState.markers;

	const nextFn = () => {
		stage.completed = true;
	};

	const stages: IStage[] = [
		{
			completed: false,
			name: {
				text: 'Clock Draw'
			},
			progress: {
				text: '2/4'
			},
			info: {
				text: 'This clock is completely broken! Put the numbers in their right place!'
			},
			main: {
				component: ClockDrawTask
			} as IElement,
			reset: {
				text: 'reset',
				function: () => markers.reset()
			},
			help: {
				text: defaultHelpLabel,
				function: nextFn
			},
			next: {
				text: defaultNextLabel,
				function: fallbackFn
			}
		}
	];
	let stage: IStage = stages[0];
</script>

<Stage {stage} />
