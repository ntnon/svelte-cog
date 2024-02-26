<script lang="ts">
	let container: HTMLElement;
	let size: number = 0;
	const handleResize = () => {
		let rect = container.getBoundingClientRect();
		size = Math.min(rect.width, rect.height);
	};
	$: if (container) {
		handleResize();
	}
</script>

<span class="size-full flex justify-center" bind:this={container}>
	<span
		class="absolute clock flex justify-center items-center"
		style="width: {size}px; height: {size}px"><slot /></span
	>
</span>

<svelte:window on:resize={handleResize} />
