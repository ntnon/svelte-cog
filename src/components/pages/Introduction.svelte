<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
	import { getAppState } from '$lib/state.svelte';
</script>

<Stage>
	<span slot="name">Welcome to the online MCI test!</span>
	<span slot="info">Complete the tasks, earn points. There are 6 unique tasks</span>
	<span slot="component" class=" flex-col size-full center">
		<p class="text-3xl center px-10">
			The first task is to press the 'next' button when you are ready to move on!
		</p>
	</span>
	<NextButton slot="next" />
</Stage>
