<script lang="ts">
	import type { IBall } from '$lib/interfaces';

	export let balls: IBall[];

	let container: HTMLElement;
	let width: number;
	let height: number;
	let centerX: number;
	let centerY: number;

	$: if (container) {
		updateOffset();
	}

	const updateOffset = () => {
		let rect = container.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		centerX = rect.left + width / 2;
		centerY = rect.top + height / 2;
	};
</script>

<span class="container size-full" bind:this={container}>
	{#each balls as ball}
		{#if !ball.completed}
			<button
				class="clickable size-[5rem] highlight"
				style="position: absolute; left: {centerX + (width / 2) * ball.left}px; top: {centerY +
					(height / 2) * ball.top}px; transform: translate(-50%, -50%);"
				on:click={() => (ball.completed = true)}
			></button>
		{/if}
	{/each}
</span>

<svelte:window on:resize={updateOffset} />
