<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import PageComponent from './PageComponent.svelte';
	import PageLayout from './PageLayout.svelte';
	import RegistrationComponent from '../../components/RegistrationComponent.svelte';
	import { writable } from 'svelte/store';
	import RecallComponent from '../../components/RecallComponent.svelte';
	import { createResettableStore } from '../../scripts/ResettableStore';
	import { generateClockHands } from '../../scripts/generateClockHands';
	import { generateClockMarkers } from '../../scripts/generateClockMarkers';
	import { generateRandomWords } from '../../scripts/generateRandomWords';

	let currentTask: number | null = null;

	let applicationState = {
		completedTasks: 0,
		totalTasks: 4,
		showHelp: false,
		words: createResettableStore(() => generateRandomWords()),
		registrationGuesses: createResettableStore(() => []),
		recallGuesses: createResettableStore(() => []),
		clockHands: createResettableStore(() => generateClockHands()),
		clockMarkers: createResettableStore(() => generateClockMarkers())
	};

	let registration: SvelteComponent;
	let recall: SvelteComponent;
	let clockDraw: SvelteComponent;
	let clockPoint: SvelteComponent;

	$: tasks = [registration, recall, clockDraw, clockPoint];

	const toggleHelp = () => {
		console.log('help');
		applicationState.showHelp = !applicationState.showHelp;
	};
</script>

{#if currentTask === 0}
	<PageLayout bind:this={registration}>
		<span slot="name">Word Registration</span>
		<span slot="progress">progress component</span>
		<span slot="info"></span>
		<span slot="main"><RegistrationComponent /></span>
		<span slot="helpDisplay"
			>{#if applicationState.showHelp}
				<span>help me</span>{/if}</span
		>
		<span slot="reset"
			><button on:click={() => applicationState.registrationGuesses.reset()}>reset</button></span
		>
		<span slot="helpButton"><button on:click={() => toggleHelp}>help</button></span>
		<button slot="next" on:click={() => (currentTask = 1)}>next</button>
	</PageLayout>
{:else if currentTask === 1}
	<PageLayout bind:this={recall}>
		<span slot="name">Word Recall</span>
		<span slot="progress">progress component</span>
		<span slot="info"></span>
		<span slot="main"><RecallComponent data={applicationState.recallGuesses} /></span>
		<span slot="helpDisplay"
			>{#if applicationState.showHelp}
				<span>help me</span>{/if}</span
		>
		<span slot="reset"
			><button on:click={() => applicationState.recallGuesses.reset()}>reset</button></span
		>
		<span slot="helpButton"><button on:click={() => toggleHelp}>help</button></span>
		<button slot="next" on:click={() => (currentTask = 2)}>next</button>
	</PageLayout>
{:else if currentTask === 2}
	<PageLayout bind:this={clockDraw}>
		<span slot="name">clockDraw</span>
		<span slot="progress">progress component</span>
		<span slot="info"></span>
		<span slot="main"><RecallComponent data={applicationState.recallGuesses} /></span>
		<span slot="helpDisplay"
			>{#if applicationState.showHelp}
				<span>help me</span>{/if}</span
		>
		<span slot="reset"
			><button on:click={() => applicationState.clockMarkers.reset()}>reset</button></span
		>
		<span slot="helpButton"><button on:click={() => toggleHelp}>help</button></span>
		<button slot="next" on:click={() => (currentTask = 3)}>next</button>
	</PageLayout>
{:else if currentTask === 3}
	<PageLayout bind:this={clockPoint}>
		<span slot="name">clockPoint</span>
		<span slot="progress">progress component</span>
		<span slot="info"></span>
		<span slot="main"><RecallComponent data={applicationState.recallGuesses} /></span>
		<span slot="helpDisplay"
			>{#if applicationState.showHelp}
				<span>help me</span>{/if}</span
		>
		<span slot="reset"
			><button on:click={() => applicationState.clockHands.reset()}>reset</button></span
		>
		<span slot="helpButton"><button on:click={() => toggleHelp}>help</button></span>
		<button slot="next" on:click={() => (currentTask = 4)}>next</button>
	</PageLayout>
{:else}
	<p>Task not found</p>
	<button on:click={() => (currentTask = 0)}>start</button>
{/if}
