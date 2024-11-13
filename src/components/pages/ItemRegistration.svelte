<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { narrator, wizard, guyBalloon, doctor } from '$lib/characters';
	import { fade } from 'svelte/transition';
	import type { IPageData, IResettablePageStore } from '$lib/interfaces';

	const choices = getAppState().choices;

	const page: IResettablePageStore<IPageData<boolean>> = getAppState().pageData.itemRegistration;
	const recallItems = getAppState().recallItems;

	const offset = 800;
	const timeBetweenItems = 800;
</script>

<Stage {page} displayRewards={false}>
	<span slot="info">You will be asked to recall these items later!</span>
	<span slot="component" class="flex-col justify-between center space-y-10 text-3xl">
		{#each $recallItems as item, index}
			<div
				in:fade|global={{ duration: 1000, delay: offset + timeBetweenItems * index + 1 }}
				on:introend={() => {
					if (index === $recallItems.length - 1) {
						page.ready();
					}
				}}
			>
				{item.name}
			</div>
		{/each}
	</span>

	<NextStage slot="next" nextPage={true} {page}>I remember the items</NextStage>
</Stage>
