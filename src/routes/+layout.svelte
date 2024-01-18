<script lang="ts">
	import type { ITaskData } from '$lib/dataInterfaces';
	import { getData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import { getRandomWords } from '../scripts/getRandomWords';
	import Nav from '../components/navigation/Nav.svelte';
	// const { data } = $$props; // load data from server

	const emptyTaskData: ITaskData = {
		complete: false,
		score: 0,
		corrections: 0
	};

	const clockPointData = getData('clockPoint', 'session', emptyTaskData);
	const clockDrawData = getData('clockDraw', 'session', emptyTaskData);
	const wordRegistrationData = getData('wordRegistration', 'session', emptyTaskData);
	const wordRecallData = getData('wordRecall', 'session', emptyTaskData);
	const consentData = getData('consent', 'session', false);
	const wordData = getData('words', 'session', getRandomWords());
	const susData = getData('sus', 'session', false);

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
