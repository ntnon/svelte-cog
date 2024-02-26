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
				text: 'Press hint to learn how to use the website!'
			},
			main: {
				hidden: true
			},
			reset: {
				hidden: true
			},
			help: {
				highlight: true,
				text: defaultHelpLabel,
				function: nextFn
			},
			next: {
				hidden: true
			}
		},
		{
			completed: false,
			name: {
				text: 'Introduction',
				highlight: true
			},
			progress: {
				text: '1/2',
				highlight: true
			},
			info: {
				text: 'Press hint to learn how to use the website!',
				highlight: true
			},
			main: {
				text: 'Above you can see the task name, a task description, as well your progress.'
			},
			reset: {
				hidden: true
			},
			help: {
				text: defaultHelpLabel,
				function: nextFn
			},
			next: {
				hidden: true
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
			reset: {
				hidden: true
			},
			help: {
				text: defaultHelpLabel
			},
			next: {
				text: defaultNextLabel,
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
