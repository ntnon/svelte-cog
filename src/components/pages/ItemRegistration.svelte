<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import NextButton from '../NextButton.svelte';
	import Stage from '../Stage.svelte';
	import { fade } from 'svelte/transition';

	let recallItems = getAppState().recallItems;

	let taskState = getAppState().taskData.itemRegistration;

	let showItems = $taskState.data;

	let offset = 800;
	let timeBetweenItems = 800;
	let timer: number | undefined;

	const triggerFunction = () => {
		taskState.update((v) => ({ ...v, completed: true }));
	};

	const startCountDown = () => {
		taskState.update((v) => ({ ...v, data: true }));

		let countdown = offset + timeBetweenItems * $recallItems.length + 1;
		timer = setTimeout(triggerFunction, countdown); // 5000 milliseconds = 5 seconds
	};

	startCountDown();

	// Start the timer when the component is mounted
</script>

<Stage>
	<span slot="name">Word Registration</span>
	<span slot="info" class="nb">Remember the words below!</span>
	<input class="larger-checkbox" type="checkbox" />
	<span class="space-y-10" slot="component">
		<div class="flex-col justify-between center space-y-10 mt-20 text-3xl">
			{#each $recallItems as item, index}
				<div
					in:fade|global={{ duration: 1000, delay: offset + timeBetweenItems * index + 1 }}
					out:fade|global={{ duration: 1000, delay: 1500 }}
				>
					{item.name}
				</div>
			{/each}
		</div>
	</span>

	<NextButton slot="next" active={$taskState.completed} />
</Stage>
