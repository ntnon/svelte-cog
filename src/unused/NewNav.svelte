<script lang="ts">
	import { setContext } from 'svelte';
	import { navigate } from 'svelte-routing';
	import { page } from '$app/stores';
	import { getAppState, storageSelector } from '$lib/state.svelte';
	import type { ITaskData } from '$lib/interfaces';
	import { get, type Writable } from 'svelte/store';

	let index = 0;
	let currentRouteIsComplete = false;

	const routes = [
		'/',
		'/tasks/wordregistration',
		'/tasks/clockdraw',
		'/tasks/clockpoint',
		'/tasks/wordrecall',
		'/tasks/completed',
		'/survey/user',
		'/survey/tasks',
		'/survey/sus'
	];

	const allStores: { [key: string]: Writable<ITaskData> } = {
		clockpoint: getAppState<ITaskData>('clockpoint'),
		clockdraw: getAppState<ITaskData>('clockdraw'),
		wordregistration: getAppState<ITaskData>('wordregistration'),
		wordrecall: getAppState<ITaskData>('wordrecall'),
		sus: getAppState<ITaskData>('sus')
	};
	let currentPage = $page.route.id;
	let nextPage: string;

	const updateRouteIsComplete = () => {
		if (!currentPage) {
			currentRouteIsComplete = true;
			console.log('HEEERE');
			return;
		}

		let parts = currentPage.split('/');
		let newRoute = parts[parts.length - 1];

		const store = allStores[newRoute] ?? null;

		if (!store) {
			currentRouteIsComplete = true;
			console.log('NO, HEEERE!!');
			return;
		}
		currentRouteIsComplete = get(store).complete;
	};

	page.subscribe((value) => {
		updateRouteIsComplete();
		currentPage = value.route.id;
		let currentPageIndex = routes.indexOf(currentPage ?? '/');
		console.log(currentPageIndex);
		console.log(currentPage);
		nextPage = routes[currentPageIndex + 1] ?? routes[0];
	});

	setContext('routes', routes);
	// make a function that lets you pass the current store or page route and get the next one
	//navigate(`/${currentRoute}`);
</script>

{currentRouteIsComplete} |
{currentPage}|
{nextPage}
<button
	on:click={() => {
		updateRouteIsComplete();
	}}><a href={nextPage}>Next</a></button
>
