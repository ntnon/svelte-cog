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
				text: 'Press "next" to continue'
			},
			main: {
				text: "Welcome to the web-cog! This is a simple introduction to the test. Press 'next' to continue."
			},
			reset: {
				hidden: true
			},
			help: {},
			next: {
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
				text: 'Press "next" to continue'
			},
			main: {
				text: 'Above you can see the task name, a brief description, and your progress.',
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
