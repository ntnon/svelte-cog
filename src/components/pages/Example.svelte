<script lang="ts">
	import type { IElement, IStage } from '$lib/interfaces';
	import Stage from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel, defaultResetLabel } from '$lib/constants';
	import ExampleTask from '../tasks/ExampleTask.svelte';
	export let fallbackFn: () => void;

	const nextFn = () => {
		stage.completed = true;
		console.log('stage completed');
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
				hidden: false,
				component: ExampleTask
			} as IElement,
			reset: {
				inactive: true,
				text: defaultResetLabel
			},
			help: {
				hidden: false,
				inactive: true,
				text: defaultHelpLabel
			},
			next: {
				hidden: false,

				text: defaultNextLabel,
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
				text: 'Want to start the task over?'
			} as IElement,
			reset: {
				text: defaultResetLabel,
				highlight: true,
				function: () => redoFn([0, 1])
			},
			help: {
				text: defaultHelpLabel,
				inactive: true
			},
			next: {
				text: defaultNextLabel,
				function: nextFn
			}
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
