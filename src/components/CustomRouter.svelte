<script lang="ts">
	import { getDataStore } from '$lib/state.svelte';
	import type { IRoute, ITaskData } from '$lib/dataInterfaces';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';

	const allRoutes = getDataStore<IRoute[]>('router');
	const wordregistration = getDataStore<ITaskData>('wordregistration');
	const wordrecall = getDataStore<ITaskData>('wordrecall');
	const clockpoint = getDataStore<ITaskData>('clockpoint');
	const clockDraw = getDataStore<ITaskData>('clockdraw');

	const allRoutesz = {
		wordrecall: $wordrecall.complete
	};

	let currentPage: string;
	let currentPageRoute: IRoute | undefined;
	let allowNextPage = false;
	let nextPage: string;

	page.subscribe((v) => {
		currentPage = v.route.id ?? '';

		currentPageRoute = $allRoutes.find((p) => p.path === v.route.id);
		if (currentPageRoute === undefined) {
			console.log('current route not found');
			return;
		}

		let currentPageIndex = $allRoutes.indexOf(currentPageRoute);

		nextPage = $allRoutes[currentPageIndex + 1]?.path ?? $allRoutes[0].path;

		allowNextPage = currentPageRoute.complete;

		// Navigate to the next page
	});

	setContext('allowNextPage', allowNextPage);
</script>

{$wordregistration.complete}
<a href={nextPage} class={allowNextPage ? '' : 'disabled'}>Next Page</a>

<style>
	a.disabled {
		pointer-events: none;
		color: grey;
		background-color: lightgrey;
	}
	a {
		color: green;
		background-color: lightgreen;
	}
</style>
