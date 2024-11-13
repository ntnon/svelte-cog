<script lang="ts">
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import { scale } from 'svelte/transition';
	import { getAppState } from '$lib/state.svelte';
	import Jurrasic from '../Jurrasic.svelte';
	import ClockDrawTask from '../tasks/ClockDrawTask.svelte';
	import Reward from '../Reward.svelte';
	import { academic, narrator } from '$lib/characters';
	import NextStage from '../NextStage.svelte';
	import { quintIn } from 'svelte/easing';
	const choices = getAppState().choices;
	const page = getAppState().pageData.markers;

	$: if ($page.data.every((marker) => marker.completed)) {
		page.complete(true);
		page.showNav();
	}
</script>

<Stage {page} displayRewards={false}>
	<p slot="info">Drag all the numbers to their correct place on the clock</p>
	<span slot="component" class="size-full flex flex-grow-1">
		<ClockDrawTask bind:markers={$page.data}></ClockDrawTask>
	</span>
	<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
</Stage>
