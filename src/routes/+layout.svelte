<script lang="ts">
	import type { ISUS, ITaskData, IRoute, ITaskHands } from '$lib/dataInterfaces';
	import { getData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import Nav from '../components/navigation/Nav.svelte';
	import susQuestions from '$lib/susQuestions.json';
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
		minute: { name: 'minute', angle: 0, active: false, length: 125 },
		hour: { name: 'hour', angle: 0, active: false, length: 95 }
	});
	const clockDrawData = getData<ITaskData>(
		'clockDraw',
		'session',
		createTaskData('clockDraw', 'Clock Draw')
	);
	const wordRegistrationData = getData<ITaskData>(
		'wordRegistration',
		'session',
		createTaskData('wordRegistration', 'Word Registration')
	);
	const wordRecallData = getData<ITaskData>(
		'wordRecall',
		'session',
		createTaskData('wordRecall', 'Word Recall')
	);
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

	:global(button) {
		cursor: pointer;
	}
</style>
