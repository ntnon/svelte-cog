<script lang="ts">
	import { send, receive } from '../../../scripts/transition.js';
	import ClockSlot from '../../../components/ClockSlot.svelte';

	export let blocks: any;
	export let offset: number;

	let arr = Array.from({ length: 12 }, (_, i) => i + 1); // list from 1 to 12
</script>

{#each arr as slotId}
	<ClockSlot {slotId} {offset}>
		{#each $blocks.filter((block) => block.slot?.id === slotId) as block (block.id)}
			<div class="SEND HERE" in:receive={{ key: block.id }} out:send={{ key: block.id }}>
				{block.id}
			</div>
		{/each}
	</ClockSlot>
{/each}

<style>
</style>
