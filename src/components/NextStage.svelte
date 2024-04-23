<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	import type { IChoice, IEmoji, IPageData, IResettablePageStore } from '$lib/interfaces';

	const pageStore = getAppState().page;
	const inventory = getAppState().rewards;

	export let inactive: boolean = false;
	export let page: IResettablePageStore<IPageData<any>>;
	export let nextStage: string;
	export let choice: IChoice | null = null;
	export let nextPage: boolean = false;
	export const fn: () => void = () => {};
</script>

<span class="ease size-full {$page.showNav ? '' : 'opacity-0'} {inactive ? 'inactive' : ''}">
	<NavButton
		fn={() => {
			if (fn) {
				console.log('CCCCHCHCHCHH');
				fn();
			}
			inventory.lock();
			page.changeStage(nextStage);
			if (choice) {
				page.addChoice(choice);
			}
			page.disableNext();
			page.softReset();
			if (nextPage) {
				pageStore.update((v) => v + 1);
			}
		}}><slot /></NavButton
	>
</span>
