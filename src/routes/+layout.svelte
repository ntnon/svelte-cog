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
	import { setDataStore } from '$lib/state.svelte';
	import Nav from '../components/navigation/Nav.svelte';
	import susQuestions from '$lib/susQuestions.json';
	import { getRandomTimeStamp } from '../scripts/getRandomTimeStamp';
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

	const clockPointData = getData<ITaskHands>('clockPoint', 'session', {
		...createTaskData('clockPoint', 'Clock Point'),
		minute: { name: 'minute', angle: 25, active: false },
		hour: { name: 'hour', angle: 90, active: false },
		targetTimestamp: getRandomTimeStamp()
	});
	const clockDrawData = getData<ITaskMarkers>('clockDraw', 'session', {
		...createTaskData('clockDraw', 'Clock Draw'),
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
	const wordRegistrationData = getData<ITaskGuesses>('wordRegistration', 'session', {
		...createTaskData('wordRegistration', 'Word Registration'),
		guesses: [],
		showWords: false
	});
	const wordRecallData = getData<ITaskGuesses>('wordRecall', 'session', {
		...createTaskData('wordRecall', 'Word Recall'),
		guesses: [],
		showWords: false
	});
	const routerData = getData<IRoute[]>('routes', 'session', data.routes);
	const consentData = getData<boolean>('consent', 'session', false);
	const wordData = getData<string[]>('words', 'session', data.words); //fetched from server
	const susData = getData<ISUS[]>('sus', 'session', susQuestions);

	const clockPoint = setDataStore('clockPoint', 'session', clockPointData);
	const clockDraw = setDataStore('clockDraw', 'session', clockDrawData);
	const wordRegistration = setDataStore('wordRegistration', 'session', wordRegistrationData);
	const wordRecall = setDataStore('wordRecall', 'session', wordRecallData);
	const consent = setDataStore('consent', 'session', consentData);
	const words = setDataStore('words', 'session', wordData);
	const sus = setDataStore('sus', 'session', susData);
	const router = setDataStore('routes', 'session', routerData);
</script>

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
