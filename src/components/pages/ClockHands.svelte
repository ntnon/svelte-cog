<script lang="ts">
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import type { IElement, IHands, IResettableStore, IStage } from '$lib/interfaces';
	import Stage from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel } from '$lib/constants';

	export let fallbackFn: () => void;

	const appState = getAppState();
	let hands: IResettableStore<IHands> = appState.hands;
	let timestamp: string = '';

	const nextFn = () => {
		stage.completed = true;
	};

	const stages: IStage[] = [
		{
			completed: false,
			name: {
				text: 'Clock Hands'
			},
			progress: {
				text: '2/4'
			},
			info: {
				text: 'Adjust the clock to display ' + timestamp
			},
			main: {
				component: ClockHandsTask
			} as IElement,
			reset: {
				text: 'reset',
				function: () => hands.reset()
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

	hands.subscribe((v) => {
		timestamp = v.hour.target + ':' + v.minute.target * 5;
		stages[0].info.text = 'Adjust the clock to display ' + timestamp;
		stage = stages[0];
	});
</script>

<Stage {stage} />
