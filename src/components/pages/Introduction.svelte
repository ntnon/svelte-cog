<script lang="ts">
	import Stage from '../Stage.svelte';
	import { defaultNextLabel } from '$lib/constants';
	import Button from '../Button.svelte';

	export let fallbackFn: () => void;
</script>

<Stage>
	<span slot="name">Task name</span>
	<span slot="info">Instructions</span>
	<span slot="progress">Progress</span>
	<span slot="component" class="size-full center">
		Press<span class="inline-block">
			<Button fn={fallbackFn} active={true}>{defaultNextLabel}</Button></span
		> to continue
	</span>
</Stage>
