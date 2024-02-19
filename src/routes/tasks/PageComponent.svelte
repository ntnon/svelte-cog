<script lang="ts">
	import PageLayout from './PageLayout.svelte';
	import type { IPage } from '$lib/interfaces';

	interface IProgress {
		completed: number;
		total: number;
	}
	const nextPage: () => void = () => console.log('next page function triggered!');

	export let page: IPage;
	export let progress: IProgress;
	export let stageIndex: number;
	export let stageCount: number;

	export const reset = () => console.log('could not find help function');
	export const help = () => console.log('could not find help function');
	export const next = () => console.log('could not find next function');

	const handleNext = () => {
		stageIndex++;
		if (stageIndex === stageCount) {
			stageIndex = 0;
			nextPage();
			return;
		}
	};
</script>

{#if page}
	<PageLayout>
		<span slot="name">{page.name}</span>
		<span slot="progress">{progress.completed}/{progress.total}</span>
		<span slot="info">{page.info}</span>
		<span slot="main"><slot /></span>
		<span slot="reset"><slot name="reset" /></span>
		<span slot="help"><slot name="help" /></span>
		<span slot="next"><button on:click={handleNext}>next</button></span>
	</PageLayout>
{/if}
