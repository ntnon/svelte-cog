<script lang="ts">
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';
	import { getAppState } from '$lib/state.svelte';

	let points = getAppState().points;

	export let fallbackFn: () => void;
</script>

<Stage>
	<span slot="name">Welcome to the online MCI test!</span>
	<span slot="info">Complete the tasks, earn points. There are 6 unique tasks</span>
	<span slot="component" class=" flex-col size-full center">
		<p class="text-3xl center w-[40vw]">
			The first task is to press the 'next' button when you are ready to move on!
		</p>
	</span>
	<Button slot="next" fn={fallbackFn} active={true}>{defaultNextLabel}</Button>
</Stage>
