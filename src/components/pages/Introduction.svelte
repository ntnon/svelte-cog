<script lang="ts">
	import type { IStage } from '$lib/interfaces';
	import StageRender from '../Stage.svelte';
	import { defaultHelpLabel, defaultNextLabel } from '$lib/constants';
	export let fallbackFn: () => void;
	const nextFn = () => {
		stage.completed = true;
	};

	const stages: IStage[] = [
		{
			completed: false,
			name: {
				text: 'Introduction'
			},
			progress: {
				text: '0/2'
			},
			info: {
				text: 'Press "start" to learn how to use the website!'
			},
			main: {
				hidden: true
			},
			reset: {
				hidden: true
			},
			help: {
				hidden: true
			},
			next: {
				text: 'Start',
				highlight: true,
				function: nextFn
			}
		},
		{
			completed: false,
			name: {
				text: 'Introduction'
			},
			progress: {
				text: '1/2'
			},
			info: {
				text: 'Press "next" to continue the tutorial!"'
			},
			main: {
				text: 'Above you can see the task name, a task description, as well your progress.',
				highlight: true
			},
			reset: {
				hidden: true
			},
			help: {
				hidden: true
			},
			next: {
				function: nextFn
			}
		},
		{
			completed: false,
			name: {
				text: 'Introduction'
			},
			progress: {
				text: '2/2'
			},
			info: {
				text: 'Press hint to learn how to use the website!'
			},
			main: {
				text: 'The "next" button will start the example task. Press it to continue the tutorial.'
			},
			reset: {},
			help: {
				text: defaultHelpLabel
			},
			next: {
				highlight: true,
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

<StageRender {stage} />
