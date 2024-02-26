<script lang="ts">
	import type { IStage } from '$lib/interfaces';
	import TextElement from './TextElement.svelte';
	import ButtonElement from './ButtonElement.svelte';

	export let stage: IStage;
</script>

{#if stage}
	<div class="container m-10">
		<span class="name {stage.name.highlight && 'highlight'}">
			<TextElement element={stage.name} />
		</span>

		<span class="progress center {stage.progress.highlight && 'highlight'}">
			<TextElement element={stage.progress} />
		</span>

		<span class="info {stage.info.highlight && 'highlight'}">
			<TextElement element={stage.info} />
		</span>

		<span class="main center {stage.main.highlight && 'highlight'}">
			<TextElement element={stage.main} {stage} />
		</span>

		<span class="helpButton center {stage.help.highlight && 'highlight'}">
			<ButtonElement element={stage.help} />
		</span>

		<span class="reset center {stage.reset.highlight && 'highlight'}">
			<ButtonElement element={stage.reset} />
		</span>

		<span class="next center {stage.next.highlight && 'highlight'}">
			<ButtonElement element={stage.next} />
		</span>
	</div>
{/if}

<style>
	span {
		width: 100%;
		height: 100%;
	}
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
			'reset help next';
	}
	.name {
		grid-area: name;
		display: flex;
		align-items: center;
		background-color: green;
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
