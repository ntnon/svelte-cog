<script lang="ts">
	import { page } from '$app/stores';

	import { derived, get, type Writable } from 'svelte/store';
	import { getAppState } from '$lib/state.svelte';
	import type { IPageType } from '$lib/interfaces';

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

<a href={'/'} class="back">Back</a>
<a href={nextPageId ? nextPageId : '/'} class={enableNext ? '' : ' disabled'}
	>Next{debugMode ? ' ()' : ''}</a
>

<slot />

<style>
	a.disabled {
		pointer-events: none;
		color: rgb(188, 0, 0);
		background-color: lightgrey;
	}
</style>
