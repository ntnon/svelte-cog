<script lang="ts">
	import type {
		ISUS,
		ITaskData,
		IRoute,
		ITaskHands,
		ITaskMarkers,
		ITaskGuesses
	} from '$lib/dataInterfaces';
	import { getData } from '$lib/dataService';
	import { getDataStore, setDataStore } from '$lib/state.svelte';

	import Nav from '../components/navigation/Nav.svelte';
	import susQuestions from '$lib/susQuestions.json';
	import { getRandomTimeStamp } from '../scripts/getRandomTimeStamp';
	import NewNav from '../components/NewNav.svelte';
	import { get } from 'svelte/store';
	const { data } = $$props; // load data from server

	const createTaskData = (id: string, name: string) => {
		return {
			id: id,
			name: name,
			complete: false,
			score: 0,
			corrections: 0,
			comment: '',
			success: false
		};
	};

	const clockPointData = getData<ITaskHands>('clockpoint', 'session', {
		...createTaskData('clockpoint', 'Clock Point'),
		minute: { name: 'minute', angle: 25, active: false },
		hour: { name: 'hour', angle: 90, active: false },
		targetTimestamp: getRandomTimeStamp()
	});
	const clockDrawData = getData<ITaskMarkers>('clockdraw', 'session', {
		...createTaskData('clockdraw', 'Clock Draw'),
		markers: [
			{ id: 1, x: 0, y: 0, active: false },
			{ id: 2, x: 0, y: 0, active: false },
			{ id: 3, x: 0, y: 0, active: false },
			{ id: 4, x: 0, y: 0, active: false },
			{ id: 5, x: 0, y: 0, active: false },
			{ id: 6, x: 0, y: 0, active: false },
			{ id: 7, x: 0, y: 0, active: false },
			{ id: 8, x: 0, y: 0, active: false },
			{ id: 9, x: 0, y: 0, active: false },
			{ id: 10, x: 0, y: 0, active: false },
			{ id: 11, x: 0, y: 0, active: false },
			{ id: 12, x: 0, y: 0, active: false }
		]
	});
	const wordRegistrationData = getData<ITaskGuesses>('wordregistration', 'session', {
		...createTaskData('wordregistration', 'Word Registration'),
		guesses: [],
		showWords: false
	});
	const wordRecallData = getData<ITaskGuesses>('wordrecall', 'session', {
		...createTaskData('wordrecall', 'Word Recall'),
		guesses: [],
		showWords: false
	});

	const consentData = getData<boolean>('consent', 'session', false);
	const wordData = getData<string[]>('words', 'session', data.words); //fetched from server
	const susData = getData<ISUS[]>('sus', 'session', susQuestions);

	const routerData = getData<IRoute[]>('routes', 'session', [
		{ path: '/', name: 'Home', complete: false },
		{ path: '/tasks/wordregistration', name: 'Word Registration', complete: false },
		{ path: '/tasks/clockdraw', name: 'Clock Draw', complete: false },
		{ path: '/tasks/clockpoint', name: 'Clock Point', complete: false },
		{ path: '/tasks/wordrecall', name: 'Word Recall', complete: false },
		{ path: '/tasks/completed', name: 'Completed', complete: true },
		{ path: '/survey/user', name: 'User', complete: false },
		{ path: '/survey/tasks', name: 'Tasks', complete: false },
		{ path: '/survey/sus', name: 'SUS', complete: false }
	]);

	const clockPoint = setDataStore('clockpoint', 'session', clockPointData);
	const clockDraw = setDataStore('clockdraw', 'session', clockDrawData);
	const wordRegistration = setDataStore('wordregistration', 'session', wordRegistrationData);
	const wordRecall = setDataStore('wordrecall', 'session', wordRecallData);
	const consent = setDataStore('consent', 'session', consentData);
	const words = setDataStore('words', 'session', wordData);
	const sus = setDataStore('sus', 'session', susData);
	const router = setDataStore('router', 'session', routerData);

	import CustomRouter from '../components/CustomRouter.svelte';
</script>

<CustomRouter></CustomRouter>

<div class="centered">
	<Nav></Nav>
	<slot />
</div>

<!-- 
 -->

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100vh;
		align-items: center;
	}
</style>
