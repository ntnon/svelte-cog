<script lang="ts">
	import type { ISUS, ITaskData } from '$lib/dataInterfaces';
	import { getData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import Nav from '../components/navigation/Nav.svelte';
	import susQuestions from '$lib/susQuestions.json';
	const { data } = $$props; // load data from server

	const emptyTaskData: ITaskData = {
		complete: false,
		score: 0,
		corrections: 0
	};

	const clockPointData = getData<ITaskData>('clockPoint', 'session', emptyTaskData);
	const clockDrawData = getData<ITaskData>('clockDraw', 'session', emptyTaskData);
	const wordRegistrationData = getData<ITaskData>('wordRegistration', 'session', emptyTaskData);
	const wordRecallData = getData<ITaskData>('wordRecall', 'session', emptyTaskData);
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
