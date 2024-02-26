<script lang="ts">
	import type { IElement, IStage } from '$lib/interfaces';

	export let element: IElement;
	export let stage: IStage | undefined = undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if !element.hidden}
	{#if element.text}
		{element.text}
	{/if}
	{#if element.component}
		<svelte:component this={element.component} {stage} data={stage?.data} />
	{/if}
{/if}
