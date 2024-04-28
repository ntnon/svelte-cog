<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { fade } from 'svelte/transition';

	const page = getAppState().pageData.introduction;
	let checked = false;

	const interval = setInterval(() => {
		page.ready();
		clearInterval(interval);
	}, 1000);

	interval;

	$: if (checked || !checked) {
		$page.showNav = checked;
	}
</script>

{#if $page.currentStage === 'initial'}
	<Stage>
		<span slot="component" class=" size-full flex-col space-y-8 p-10">
			<p>
				This platform is designed to facilitate your understanding of your cognitive health through
				interactive gameplay.
			</p>
		</span>

		<NextStage {page} nextStage={'disclaimer'} slot="next">Continue</NextStage>
	</Stage>
{/if}

{#if $page.currentStage === 'disclaimer'}
	<Stage>
		<span slot="component" class=" size-full flex-col space-y-8 p-10">
			<p>
				<b>Note: </b>This platform does not have the capability to diagnose or enhance cognitive
				health.
			</p>
			<div>
				<b>
					Should you have concerns regarding your health, it is recommended to seek advice from a
					healthcare professional.</b
				>
			</div>
			<div class="center gap-4">
				<input class="w-12 h-12 nb2" type="checkbox" bind:checked />
				I acknowledge and comprehend the above information
			</div>
		</span>
		<NextStage {page} nextStage={'how-to-play'} slot="next">Proceed</NextStage>
	</Stage>
{/if}
{#if $page.currentStage === 'how-to-play'}
	<Stage {page}>
		<p slot="info">This is a text based adventure game</p>

		<ol slot="component" class=" size-full flex-col space-y-3 p-16">
			<li>You will be presented with situations and choices</li>
			<li>Your decisions will influence the story</li>
			<li>Your decisions will influence your rewards</li>
			<li>There are no wrong answers</li>
		</ol>

		<NextStage active={true} {page} nextPage={true} slot="next">Begin journey</NextStage>
	</Stage>
{/if}
