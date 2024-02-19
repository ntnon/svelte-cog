<script lang="ts">
	import RecallComponent from '../../components/RecallComponent.svelte';
	import RegistrationComponent from '../../components/RegistrationComponent.svelte';
	import { getAppState } from '$lib/state.svelte';
	import PageLayout from './PageLayout.svelte';
	import type { SvelteComponent } from 'svelte';
	import ClockDraw from '../../components/ClockDraw.svelte';
	import ClockPoint from '../../components/ClockPoint.svelte';
	import type { Writable } from 'svelte/store';

	interface ITaskProgression {
		completedTasks: number;
		total: number;
	}

	interface IPage {
		name: string;
		info: string;
		type: string;
		task: 'registration' | 'recall' | 'clockdraw' | 'clockpoint';
		component: typeof SvelteComponent;
		enableNext: boolean;
		score: number;
		resetCount: number;
		data?: Writable<any>;
	}
	const appState = getAppState();

	const pages: IPage[] = [
		{
			name: 'Word Registration part 1',
			info: 'Remember these words! Press next when you are ready to move on.',
			type: 'task',
			task: 'registration',
			component: RegistrationComponent,
			enableNext: true,
			score: 0,
			resetCount: 0
		} as IPage,
		{
			name: 'Word Registration part 2',
			info: 'Do you remember the words from the previous task? Write them in the fields below, in any order. Press next when you are ready to move on.',
			type: 'task',
			task: 'registration',
			component: RecallComponent,
			enableNext: false,
			resetCount: 0
		} as IPage,
		{
			name: 'Clock Draw',
			info: 'The clock is broken! Fix it by dragging the numbered circles to their correct positions on the clock. Press next when you are ready to move on.',
			type: 'task',
			task: 'clockdraw',
			component: ClockDraw,
			enableNext: false,
			score: 0,
			resetCount: 0
		} as IPage,
		{
			name: 'Clock Point',
			info: 'Please point to the numbers on the clock.',
			type: 'task',
			task: 'clockpoint',
			component: ClockPoint,
			enableNext: false,
			score: 0,
			resetCount: 0
		} as IPage,
		{
			name: 'Recall',
			info: 'Do you still remember the words from the first task? Write them in the fields below, in any order. Press next when you are ready to move on.',
			type: 'task',
			task: 'recall',
			component: RecallComponent,
			enableNext: false,
			score: 0,
			resetCount: 0
		} as IPage
	];

	const progress: ITaskProgression = {
		completedTasks: 0,
		total: pages.length
	};

	let debugMode = true;
	let taskIndex = 2;
	let currentTask: IPage;

	const handleNext = (page: IPage) => {
		if (!page.enableNext && !debugMode) {
			alert('Please complete the task');
			return;
		}
		if (taskIndex < pages.length - 1) {
			taskIndex++;
		}
	};

	const handleReset = (page: IPage) => {
		page.resetCount++;
	};

	$: {
		currentTask = pages[taskIndex];
		progress.completedTasks = pages.findIndex((p) => p === currentTask);
		console.log('new current task');
	}
</script>

<PageLayout>
	<span slot="name">{currentTask.name}</span>
	<span slot="progress">{progress.completedTasks}/{progress.total}</span>
	<span slot="info">{currentTask.info}</span>
	<span slot="main">
		<svelte:component
			this={currentTask.component}
			bind:enableNext={currentTask.enableNext}
			bind:score={currentTask.score}
		/>
	</span>
	<span slot="reset"><button on:click={() => handleReset(currentTask)}>Try again</button></span>
	<span slot="help"><button on:click={() => console.log('help')}>Help</button></span>
	<span slot="next" class="flex flex-row"
		><button
			class={currentTask.enableNext ? 'enabled' : 'disabled'}
			on:click={() => handleNext(currentTask)}>next</button
		>
	</span>
</PageLayout>
