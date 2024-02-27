<script lang="ts">
	import { defaultNextLabel, defaultResetLabel } from '$lib/constants';
	import type { IStage } from '$lib/interfaces';

	export let stage: IStage;
	console.log('stage: ', stage);
</script>

{#if stage}
	<div class="container m-3">
		<span class="name center text-2xl font-bold {stage.name.highlight && 'highlight'}">
			{stage.name.text}
		</span>

		<span class="progress center {stage.progress.highlight && 'highlight'}">
			{stage.progress.text}
		</span>

		<span class="info text-2xl {stage.info.highlight && 'highlight'}">
			{stage.info.text}
		</span>

		<span class="main center text-2xl {stage.main.highlight && 'highlight'}">
			{#if stage.main.text}
				{stage.main.text}
			{/if}
			{#if stage.main.component}
				<svelte:component this={stage.main.component} data={stage.data} />
			{/if}
		</span>

		<!-- <button
			class="helpButton center {stage.help.highlight && 'highlight'}"
			on:click={stage.help.function}>help</button
		> -->
		<span class="navbar">
			<button
				class="reset center {stage.reset.highlight && 'highlight'}"
				on:click={stage.reset.function}>{stage.reset.text ?? defaultResetLabel}</button
			>

			<button
				class="next center {stage.next.highlight && 'highlight'}"
				on:click={stage.next.function}>{stage.next.text ?? defaultNextLabel}</button
			>
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
		display: grid;
		gap: 1rem;
		grid-template-areas: 'reset next';
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
		grid-area: next;
		background-color: rgb(220, 125, 171);
	}
</style>
