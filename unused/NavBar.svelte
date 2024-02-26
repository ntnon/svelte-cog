<script lang="ts">
	import { page } from '$app/stores';

	import { derived, get, type Writable } from 'svelte/store';
	import { getAppState } from '$lib/state.svelte';
	import type { IPageType } from '$lib/interfaces';

	export let debug: boolean = false;

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
						enableNext: debug ? true : pageStore.enableNext,
						path: pageStore.path
					});
				}
			},
			{ enableNext: debug ? true : lastEnableNext, path: get(pageStore)?.path }
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
	>Next{debug ? '()' : ''}</a
>

<slot />

<style>
	a.disabled {
		pointer-events: none;
		background-color: rgb(190, 88, 88);
		background-color: lightgrey;
	}
	a {
		text-decoration: none;
		color: black;
		background-color: rgb(70, 167, 70);
	}
</style>
