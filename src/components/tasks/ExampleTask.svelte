<script lang="ts">
	import type { IStage } from '$lib/interfaces';

	let numBalls = 4;
	let balls: { id: number; left: number; top: number }[] = [];
	let ballSize = 10;

	let taskArea: Element;

	export let stage: IStage;

	$: if (taskArea) {
		balls = createBalls(taskArea);
	}

	const createBalls = (taskArea: Element) => {
		const rect = taskArea.getBoundingClientRect();
		if (!rect) return [];
		return Array.from(
			{ length: numBalls },
			(_, index) =>
				({
					id: index,
					left: Math.random() * (rect.width - ballSize),
					top: Math.random() * (rect.height - ballSize)
				}) as { id: number; left: number; top: number }
		);
	};

	const handleClick = (index: number) => {
		const ball = balls[index];
		balls = balls.filter((b) => b.id !== ball.id);
		if (balls.length === 0) {
			stage.next.function?.();
		}
	};
</script>

<div class="container size-[80%]" bind:this={taskArea}>
	{#each balls as ball, index}
		<button
			class="clickable size-[5rem] highlight"
			style="position: absolute; left: {ball.left}px; top: {ball.top}px; transform: translate(-50%, -50%);"
			on:click={() => handleClick(index)}
		></button>
	{/each}
</div>

<style>
	.container {
		position: relative;
	}
</style>
