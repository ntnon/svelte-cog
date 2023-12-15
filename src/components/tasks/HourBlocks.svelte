<script lang="ts">
	import { send, receive } from '../../scripts/transition';
	import Draggable from '../Draggable.svelte';
	import type { IBlock } from '$lib/interfaces.js';
	import type { Readable, Writable } from 'svelte/store';
	import { flip } from 'svelte/animate';

	export let placedCondition: boolean;
	export let blocks: Readable<IBlock[]> | Writable<IBlock[]>;

	export let handleMouseUpFn: (
		e: MouseEvent | TouchEvent,
		block: IBlock,
		clock: HTMLElement
	) => void;

	export let handleMouseDownFn: (
		e: MouseEvent | TouchEvent,
		block: IBlock,
		clock: HTMLElement
	) => void;

	export let clock: HTMLElement;
</script>

<div class="hour-block-list">
	{#each $blocks.filter((block) => block.placed === placedCondition && block.active === false) as block (block.id)}
		<div
			class="block"
			animate:flip={{ duration: 200 }}
			in:receive={{ key: block.id }}
			out:send={{ key: block.id }}
		>
			<Draggable
				onMouseDownFn={(e) => handleMouseDownFn(e, block, clock)}
				onMouseUpFn={(e) => handleMouseUpFn(e, block, clock)}
			>
				{block.id}{block.placed ? 't' : 'f'}
			</Draggable>
		</div>
	{/each}
</div>

<style>
	.block {
		margin-left: 5px;
	}
</style>
