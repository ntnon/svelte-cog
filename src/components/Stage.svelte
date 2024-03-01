<script lang="ts">
	import { defaultNextLabel, defaultResetLabel } from '$lib/constants';
	import type { IStage } from '$lib/interfaces';

	export let stage: IStage;
</script>

{#if stage}
	<div class="container m-3">
		<span class="name center text-2xl font-bold {stage.name.highlight && 'highlight'}">
			<span class="mx-3">{stage.name.text}</span>
		</span>

		<span class="progress center {stage.progress.highlight && 'highlight'}">
			<span class="mx-7">{stage.progress.text}</span>
		</span>

		<span class="info text-2xl {stage.info.highlight && 'highlight'}">
			<span class="mx-7">{stage.info.text}</span>
		</span>

		<span class="main center text-2xl {stage.main.highlight && 'highlight'}">
			{#if stage.main.text}
				<span class="mx-7">{stage.main.text}</span>
			{/if}
			{#if stage.main.component}
				<svelte:component this={stage.main.component} data={stage.data} {stage} />
			{/if}
		</span>

		<!-- <button
			class="helpButton center {stage.help.highlight && 'highlight'}"
			on:click={stage.help.function}>help</button
		> -->
		<span class="navbar">
			{#if !stage.reset.hidden}
				<button
					class="reset w-full text-3xl center {stage.reset.highlight && 'highlight'}"
					on:click={stage.reset.function}>{stage.reset.text ?? defaultResetLabel}</button
				>
			{/if}
			{#if !stage.next.hidden}
				<button
					class="next w-fill text-3xl center {stage.next.highlight && 'highlight'}"
					on:click={stage.next.function}>{stage.next.text ?? defaultNextLabel}</button
				>{/if}
		</span>
	</div>
{/if}

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 5fr 1fr;
		gap: 1rem;
		grid-template-areas:
			'name name progress'
			'info info info'
			'main main main'
			'navbar navbar navbar';
	}

	.navbar {
		grid-area: navbar;
		display: flex;
		justify-content: space-around;
		gap: 1rem;
	}

	.name {
		grid-area: name;
		display: flex;
		align-items: center;
		background-color: rgb(220, 174, 125);
	}
	.progress {
		grid-area: progress;
		background-color: rgb(141, 125, 220);
	}

	.info {
		grid-area: info;
		display: flex;
		align-items: center;
		background-color: rgb(220, 125, 125);
	}
	.main {
		grid-area: main;
		background-color: rgb(125, 220, 136);
	}

	.reset {
		grid-area: reset;
		background-color: rgb(199, 220, 125);
	}
	.helpButton {
		grid-area: help;
		background-color: rgb(220, 136, 125);
	}
	.next {
		width: 100%;
		grid-area: next;
		background-color: rgb(220, 125, 171);
	}
</style>
