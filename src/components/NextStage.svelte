<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import type { IChoice, IPageData, IResettablePageStore } from '$lib/interfaces';

	const pageStore = getAppState().page;
	const inventory = getAppState().rewards;
	const choices = getAppState().choices;
	export let active: boolean = false;
	export let page: IResettablePageStore<IPageData<any>>;
	export let nextStage: string | null = null;
	export let choice: IChoice | null = null;
	export let nextPage: boolean = false;
	export const fn: () => void = () => {};
</script>

<button
	class={'ease size-full btnClass bg-green-500 border-5 border-solid rounded-full box-border border-green-500 ' +
		($page.showNav || active ? '' : 'opacity-20')}
	on:click={() => {
		inventory.lock();
		if (nextStage) {
			page.changeStage(nextStage);
		}
		if (choice) {
			choices.update((v) => (choice ? [...v, choice] : v));
		}
		page.disableNext();
		page.softReset();
		if (nextPage) {
			pageStore.update((v) => v + 1);
		}
	}}
>
	<slot />
</button>
