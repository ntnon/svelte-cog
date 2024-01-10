<script lang="ts">
	import type { IBlock, IPosition } from '$lib/interfaces';
	import type { SvelteComponent } from 'svelte';
	import Draggable from '../../../components/Draggable.svelte';
	import Clock from '../../../components/tasks/Clock.svelte';
	import { getPagePosition } from '../../../scripts/getPagePosition';

	// progress variables
	let complete = false;
	let score: number = 0;
	let corrections: number = 0; // total number of repositioning attempts
	let blocksIDsInsideClock = new Set<number>();
	let placedBlockIDs = new Set<number>(); // this is used to check if the block has been placed before

	function calculateScore() {
		//calculate score
		//if score is 12, set complete to true
		return 0;
	}

	function calculateComplete() {
		if (blocksIDsInsideClock.size === blockCount) {
			complete = true;
			score = calculateScore();
		}
	}

	// "Block" is used to describe a draggable number
	const blockCount = 12;
	const newBlocks = (num: number) => {
		return Array(num)
			.fill(null)
			.map((_, i) => ({
				id: i,
				name: i + 1,
				position: { top: 0, left: 0 }
			}));
	};
	let blocks: IBlock[] = newBlocks(blockCount);

	// clock variables
	let clock: SvelteComponent;
	let clockHTMLElement: HTMLElement;

	// event handlers
	function handleMouseUp(block: IBlock, draggableElement: HTMLElement) {
		placedBlockIDs = new Set([...placedBlockIDs, block.id]);
		if (isBlockInCircle(draggableElement)) {
			blocksIDsInsideClock = new Set([...blocksIDsInsideClock, block.id]);
		}
		calculateComplete();
	}

	function handlePositionChange(block: IBlock, newPos: IPosition) {
		blocks[block.id].position = newPos;
		calculateComplete();
		calculateScore();
	}

	function handleMouseDown(block: IBlock, draggableElement: HTMLElement) {
		if (placedBlockIDs.has(block.id)) {
			corrections++;
		}
	}

	// logic
	function isBlockInCircle(draggableElement: HTMLElement) {
		const blockPos = getPagePosition(draggableElement);
		const clockPos = getPagePosition(clockHTMLElement);
		const clockRadius = clockHTMLElement.offsetWidth / 2;
		const dx = clockPos.x - blockPos.x;
		const dy = clockPos.y - blockPos.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const overlap = distance <= clockRadius;
		console.log('overlap: ', overlap);
		return overlap;
	}
</script>

<h2>The Clock Test</h2>
<p>Drag the numbers to their right place on the clock</p>
<div class="numberBlocks">
	<div class="hour-block-list">
		{#each blocks as block (block.id)}
			<Draggable
				position={block.position}
				on:positionChange={(e) => handlePositionChange(block, e.detail.position)}
				on:mouseUp={(e) => handleMouseUp(block, e.detail.draggableElement)}
				on:mouseDown={(e) => handleMouseDown(block, e.detail.draggableElement)}
				>{block.name}</Draggable
			>
		{/each}
	</div>
	<div bind:this={clockHTMLElement}>
		<Clock bind:this={clock} />
	</div>
</div>

<style>
	.hour-block-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: beige;
	}

	.numberBlocks {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 50%;
	}
</style>
