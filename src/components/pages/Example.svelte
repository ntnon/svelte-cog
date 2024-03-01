<script lang="ts">
	import type { IElement, IStage } from '$lib/interfaces';
	import Stage from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel, defaultResetLabel } from '$lib/constants';
	import ExampleTask from '../tasks/ExampleTask.svelte';

	export let fallbackFn: () => void;

	const nextFn = () => {
		console.log('step completed');
		stage.completed = true;
	};

	const redoFn = (ids: number | number[]) => {
		if (Array.isArray(ids)) {
			ids.forEach((id) => {
				stages[id].completed = false;
				stages[id].reset.hidden = false;
				stages[id].reset.text = defaultResetLabel;
				stages[id].reset.highlight = false;
				stages[id].next.inactive = false;
				stages[id].help.inactive = false;
			});
		} else {
			stages[ids].completed = false;
		}
	};

	const stages: IStage[] = [
		{
			completed: false,
			name: {
				text: 'Example task'
			},
			progress: {
				text: '0/3'
			},
			info: {
				text: 'Tap all the circles!'
			},
			main: {
				component: ExampleTask
			} as IElement,
			reset: {},
			help: {},
			next: {
				function: nextFn
			}
		},
		{
			completed: false,
			name: {
				text: 'Example task'
			},
			progress: {
				text: '0/5'
			},
			info: {
				text: 'Tap all the circles!'
			},
			main: {
				text: 'Start over, or continue?'
			} as IElement,
			reset: {
				highlight: true,
				function: () => redoFn([0])
			},
			help: {},
			next: {
				highlight: true,
				function: nextFn
			}
		}
	];

	let stage: IStage = stages[0];

	$: if (stage) {
		let newStage = stages.find((stage) => !stage.completed);

		if (newStage) {
			stage = newStage;
			console.log('new stage found');
		} else fallbackFn();
	}
</script>

<Stage {stage} />
