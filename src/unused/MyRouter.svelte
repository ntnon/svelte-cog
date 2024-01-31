<script lang="ts">
	import { page } from '$app/stores';
	import type { IPageType } from '$lib/dataInterfaces';
	import { getAppState } from '$lib/state.svelte';
	import { get, type Writable } from 'svelte/store';

	let currentPageString: string | null = null;
	let pages = getAppState().pages;
	let pageArray = Object.values(pages); //list of page stores
	let currentPage: Writable<IPageType> | undefined;

	let nextPage: string | null = null;
	let enableNext: boolean = true;

	const determineEnableNext = () => {
		console.log('determine enable next..');
		if (currentPage) {
			enableNext = get(currentPage).enableNext;
			console.log('found enable next!');
		}
	};

	const determineNextPage = () => {
		console.log('determine next page..');
		if (currentPage) {
			let currentPageIndex = pageArray.indexOf(currentPage);
			nextPage = get(pageArray[currentPageIndex + 1]).path;
			console.log('found next page!');
		}
	};

	page.subscribe((v) => {
		console.log('finding current store');
		currentPageString = v.route.id;
		if (currentPageString) {
			currentPage = pageArray.find((p) => get(p).path === currentPageString);
			console.log('found current store!');
			determineNextPage();
			determineEnableNext();
		}
	});

	currentPage?.subscribe((v) => {
		determineNextPage();
		determineEnableNext();
	});

	const handleClick = () => {
		//
	};
</script>

<button on:click={handleClick}>Press me!</button>

<a href={nextPage ? nextPage : '/'} class={enableNext ? '' : 'disabled'}>Next Page</a>

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
