<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import { getAppState } from '$lib/state.svelte';
	import NextStage from '../NextStage.svelte';

	const page = getAppState().pageData.default;
	let checked = false;

	$: if (checked) {
		page.enableNext();
	} else {
		page.disableNext();
	}
</script>

<Stage>
	<span slot="name" class="text-3xl">Disclaimer</span>
	<div slot="info" class="center gap-4">
		<input class="w-12 h-12" type="checkbox" bind:checked />I acknowledge and comprehend the
		following information:
	</div>
	<span slot="component" class=" size-full flex-col center space-y-8 text-xl p-3">
		<p>
			This platform is designed to facilitate your understanding of your cognitive health through
			interactive gameplay.
		</p>
		<p>
			<b>Note: </b>This platform does not have the capability to diagnose or enhance cognitive
			health.
		</p>
		<b>
			Should you have concerns regarding your health, it is recommended to seek advice from a
			healthcare professional.
		</b>
	</span>
	<NextStage {page} nextPage={true} slot="next">Proceed</NextStage>
</Stage>
