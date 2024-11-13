<script lang="ts">
	import NextStage from '../NextStage.svelte';
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import ClockHandsTask from '../tasks/ClockHandsTask.svelte';
	import { getAppState } from '$lib/state.svelte';
	import Reward from '../Reward.svelte';
	import { mayor } from '$lib/characters';
	const choices = getAppState().choices;
	const page = getAppState().pageData.hands;

	$: if ($page.data.hour.completed && $page.data.minute.completed) {
		if (!$page.completed) {
			page.ready();
		}
		page.complete(true);
	}
</script>

<Stage {page} displayRewards={false}>
	<div slot="info" class="h-[20%]">
		Adjust the clock to display <b><i>{$page.data.timestamp.name}</i></b>
	</div>

	<ClockHandsTask slot="component" bind:hands={$page.data} />

	<NextStage slot="next" {page} nextPage={true}>Continue</NextStage>
</Stage>
