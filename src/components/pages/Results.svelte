<script lang="ts">
	import Stage from '../Stage.svelte';
	import { getAppState } from '$lib/state.svelte';

	const taskState = getAppState().taskData;
	const keyValueArray = Object.entries(taskState);
</script>

<Stage>
	<span slot="name">Hooray!!!</span>
	<span slot="info" class="text-6xl">✨🎖️✨</span>

	{#each keyValueArray as t}
		<span class="text-6xl">{t}f</span>
	{/each}
</Stage>
