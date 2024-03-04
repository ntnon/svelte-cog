<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import PageLayout from './PageLayout.svelte';

	interface IPageData {
		nameElement?: HTMLElement;
		progressElement?: SvelteComponent;
		infoElement?: SvelteComponent;
		mainElement?: SvelteComponent;
		helpElement?: SvelteComponent;
		showHelp?: boolean;
		handleReset?: () => void;
		handleHelp?: () => void;
		handleNext?: () => void;
	}

	export let pageData: IPageData;

	const loadElement = (newPageData: IPageData) => {
		if (pageData.nameElement !== undefined) {
			pageData.nameElement = newPageData.nameElement;
		}
		if (pageData.progressElement !== undefined) {
			pageData.progressElement = newPageData.progressElement;
		}
		if (pageData.infoElement !== undefined) {
			pageData.infoElement = newPageData.infoElement;
		}
		if (pageData.mainElement !== undefined) {
			pageData.mainElement = newPageData.mainElement;
		}
		if (pageData.handleReset !== undefined) {
			pageData.handleReset = newPageData.handleReset;
		}
		if (pageData.handleHelp !== undefined) {
			pageData.handleHelp = newPageData.handleHelp;
		}
		if (pageData.handleNext !== undefined) {
			pageData.handleNext = newPageData.handleNext;
		}
		if (pageData.showHelp !== undefined) {
			pageData.showHelp = newPageData.showHelp;
		}
	};
</script>

<PageLayout>
	<span slot="name">{pageData.nameElement}</span>
	<span slot="progress">{pageData.progressElement}</span>
	<span slot="info">{pageData.infoElement}</span>
	<span slot="main">{pageData.mainElement}</span>

	<span slot="helpDisplay"
		>{#if pageData.showHelp}
			{pageData.helpElement}
		{/if}</span
	>

	<span slot="reset"><button on:click={pageData.handleReset}>reset</button></span>
	<span slot="helpButton"><button on:click={pageData.handleHelp}>help</button></span>
	<span slot="next"><button on:click={pageData.handleNext}>next</button></span>
</PageLayout>
