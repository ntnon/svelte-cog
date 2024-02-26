<script lang="ts">
	import type { IButtonElement } from '$lib/interfaces';
	export let element: IButtonElement;
</script>

{#if !element.hidden}
	<button class="btn {element.inactive ? 'inactive' : ''}" on:click={() => element.function?.()}>
		{#if element.text}
			{element.text}
		{/if}
	</button>
{/if}
