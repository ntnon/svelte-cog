<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';
	import { fade } from 'svelte/transition';

	const page = getAppState().pageData.default;
	page.enableNext();
</script>

<div out:fade={{ duration: 6000 }}>
	<Stage {page}>
		<span slot="name" class="text-3xl">How to play</span>
		<p slot="info">This is a text based adventure game</p>

		<ol slot="component" class=" size-full flex-col justify-center space-y-3 p-5 pr-2">
			<li>You will be presented with situations and choices</li>
			<li>Your decisions will influence the story</li>
			<li>Your decisions will influence your rewards</li>
			<li>There are no right or wrong answers</li>
		</ol>

		<NextStage {page} nextPage={true} slot="next">Continue</NextStage>
	</Stage>
</div>

<style>
	ul {
		line-height: 3;
	}
</style>
