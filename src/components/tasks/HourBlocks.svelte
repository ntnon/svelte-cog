<script lang="ts">
	import { send, receive } from '../../scripts/transition';
	import Draggable from '../Draggable.svelte';
	import type { IBlock } from '$lib/interfaces.js';
	import type { Readable, Writable } from 'svelte/store';
	import { flip } from 'svelte/animate';

	export let placedCondition: boolean;
	export let blocks: Readable<IBlock[]> | Writable<IBlock[]>;

	export let onMouseUpFn: (e: MouseEvent | TouchEvent, block: IBlock, clock: HTMLElement) => void;

	export let onMouseDownFn: (e: MouseEvent | TouchEvent, block: IBlock, clock: HTMLElement) => void;

	export let clock: HTMLElement;
</script>

<div class="hour-block-list">
	{#each $blocks.filter((block) => block.placed === placedCondition) as block (block.id)}
		<div animate:flip={{ duration: 200 }}>
			<Draggable
				onMouseDownFn={(e) => onMouseDownFn(e, block, clock)}
				onMouseUpFn={(e) => onMouseUpFn(e, block, clock)}>f</Draggable
			>
		</div>
	{/each}
</div>

<style>
	.block {
		margin-left: 5px;
	}
</style>
