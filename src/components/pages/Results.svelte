<script lang="ts">
	import { getAppState } from '$lib/state.svelte';
	import { get } from 'svelte/store';

	export let fallbackFn: () => void;

	const taskData = getAppState().taskData;
	const taskArray = Object.keys(taskData).map((key) => get(taskData[key]));
</script>

<span>
	<h1>You completed the test!</h1>
	<button on:click={fallbackFn}>Next</button>
	<p>
		total score: {taskArray.reduce((acc, item) => {
			return acc + item.score - item.hints;
		}, 0)}
	</p>
	<ul>
		{#each taskArray as task}
			<li class="bg-slate-400 my-[1rem] border-gray rounded-lg p-3 flex justify-between">
				<p>{task.name}:</p>
				<p class="mx-4">{task.score - task.hints}</p>
			</li>
		{/each}
	</ul>
</span>
