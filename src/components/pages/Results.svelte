<script lang="ts">
	import Stage from '../Stage.svelte';
	import { getAppState } from '$lib/state.svelte';

	const page = getAppState().pageData.default;
	const rewards = getAppState().rewards;

	const shortRecall = getAppState().pageData.shortRecall;
	const longRecall = getAppState().pageData.longRecall;
	const clockDraw = getAppState().pageData.markers;
	const clockHands = getAppState().pageData.hands;
	const beginning = getAppState().pageData.default;
	const itemRegistration = getAppState().pageData.itemRegistration;
</script>

<Stage {page}>
	<span slot="name">Hooray!!!</span>
	<p slot="info" class="emoji">✨🎖️✨</p>
	<span slot="component">
		<p>You have completed the game!</p>
		{#each $rewards.locked as reward}
			<p>{reward.name}: {reward.char}</p>
		{/each}
	</span></Stage
>
