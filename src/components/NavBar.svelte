<script lang="ts">
	import { page } from '$app/stores';

	import { derived, get, type Writable } from 'svelte/store';
	import { getAppState } from '$lib/state.svelte';
	import type { IPageType } from '$lib/dataInterfaces';

	export let debugMode: boolean = false;

	let allPages = getAppState().pages;
	let allPageStores: Writable<IPageType>[] = Object.values(allPages);
	let enableNext: boolean = true;
	let nextPageId: string = '/';

	let enableNextStores = allPageStores.map((pageStore) => {
		let lastEnableNext = get(pageStore)?.enableNext;
		return derived(
			pageStore,
			(pageStore, set) => {
				if (pageStore && pageStore.enableNext !== lastEnableNext) {
					lastEnableNext = pageStore.enableNext;
					set({
						enableNext: debugMode ? true : pageStore.enableNext,
						path: pageStore.path
					});
				}
			},
			{ enableNext: debugMode ? true : lastEnableNext, path: get(pageStore)?.path }
		);
	});

	const derivedEnableNexts = derived(enableNextStores, ($enableNextStores) => $enableNextStores);

	$: if ($page && $derivedEnableNexts) {
		let pageId = $page.route.id;

		if (pageId) {
			let currentStore = $derivedEnableNexts.find((store) => store.path === pageId);
			let currentStoreIndex = $derivedEnableNexts.findIndex((store) => store.path === pageId);
			nextPageId = $derivedEnableNexts[currentStoreIndex + 1]?.path;
			if (currentStore !== undefined) {
				enableNext = currentStore.enableNext;
			}
		}
	}
</script>

<footer>
	<a href={'/'} class={'back'}>Back</a>
	<a href={nextPageId ? nextPageId : '/'} class={'next-' + enableNext ? '' : 'disabled'}
		>Next{debugMode ? ' (debug mode)' : ''}</a
	>
</footer>

<style>
	footer {
		display: flex;
		position: fixed;
		bottom: 0;
		height: 10vh;
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: antiquewhite;
	}
	a.disabled {
		pointer-events: none;
		color: grey;
		background-color: lightgrey;
	}
	a {
		font-size: 3vh;
		margin: 0.5vh;
		border-radius: 1rem;
		border: rgb(72, 71, 71) 1vh solid;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30vh;
		color: rgb(7, 8, 7);
		background-color: lightgreen;
	}
	a.back {
		width: 20%;
	}

	a.next {
		width: 80%; /* adjust as needed */
	}
</style>
