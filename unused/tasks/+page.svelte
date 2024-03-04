<script lang="ts">
	import RecallComponent from '../../components/RecallComponent.svelte';
	import RegistrationComponent from '../../components/RegistrationComponent.svelte';
	import { getAppState } from '$lib/state.svelte';
	import PageLayout from './PageLayout.svelte';
	import type { SvelteComponent } from 'svelte';
	import ClockDraw from '../../components/ClockDraw.svelte';
	import ClockPoint from '../../components/ClockPoint.svelte';
	import { createResettableStore } from '../../scripts/ResettableStore';
	import type { IHands, IMarker, IResettable } from '$lib/interfaces';
	import { generateClockMarkers } from '../../scripts/generateClockMarkers';
	import { generateClockHands } from '../../scripts/generateClockHands';
	import { get } from 'svelte/store';

	interface ITaskProgression {
		completedTasks: number;
		total: number;
	}

	interface IPage {
		name: string;
		info: string;
		type: string;
		task: 'registration' | 'recall' | 'clockdraw' | 'clockpoint' | 'tutorial';
		component: typeof SvelteComponent;
		enableNext: boolean;
		score: number;
		resetCount: number;
		data: IResettable<any>;
	}
	const appState = getAppState();

	let applicationState = {
		completedTasks: 0,
		totalTasks: 4,
		showHelp: false,
		registrationGuesses: createResettableStore<string[]>(() => []),
		recallGuesses: createResettableStore<string[]>(() => []),
		clockHands: createResettableStore<IMarker[]>(() => generateClockMarkers()),
		clockMarkers: createResettableStore<IHands[]>(() => generateClockHands())
	};

	const pages: IPage[] = [
		{
			name: 'Word Registration part 1',
			info: 'Remember these words! Press next when you are ready to move on.',
			type: 'task',
			task: 'registration',
			component: RegistrationComponent,
			enableNext: false,
			score: 0,
			resetCount: 0,
			data: applicationState.registrationGuesses
		} as IPage,
		{
			name: 'Clock Draw',
			info: 'The clock is broken! Fix it by dragging the numbered circles to their correct positions on the clock. Press next when you are ready to move on.',
			type: 'task',
			task: 'clockdraw',
			component: ClockDraw,
			enableNext: false,
			score: 0,
			resetCount: 0,
			data: applicationState.clockMarkers
		} as IPage,
		{
			name: 'Clock Point',
			info: 'Please point to the numbers on the clock.',
			type: 'task',
			task: 'clockpoint',
			component: ClockPoint,
			enableNext: false,
			score: 0,
			resetCount: 0,
			data: applicationState.clockHands
		} as IPage,
		{
			name: 'Recall',
			info: 'Do you still remember the words from the first task? Write them in the fields below, in any order. Press next when you are ready to move on.',
			type: 'task',
			task: 'recall',
			component: RecallComponent,
			enableNext: false,
			score: 0,
			resetCount: 0,
			data: applicationState.recallGuesses
		} as IPage
	];

	const progress: ITaskProgression = {
		completedTasks: 0,
		total: pages.length
	};

	let debugMode = true;
	let taskIndex = 0;
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
		console.log('hi');
		page.resetCount++;
		page.data.reset();
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
			data={currentTask.data}
		/>
	</span>
	<span slot="reset"><button on:click={() => handleReset(currentTask)}>Try again</button></span>
	<span slot="helpButton"><button on:click={() => console.log('help')}>Help</button></span>
	<span slot="next" class="flex flex-row"
		><button
			class={currentTask.enableNext ? 'enabled' : 'disabled'}
			on:click={() => handleNext(currentTask)}>next</button
		>
	</span>
</PageLayout>
