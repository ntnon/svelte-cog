<script lang="ts">
	import { getContext } from 'svelte';
	import { wordStore } from '../../../stores/wordStore';

	const updateProgress = getContext('updateProgress');
	const getProgress = getContext('getProgress');

	function sharedGetProgress() {
		(getProgress as () => void)();
	}

	function sharedUpdateProgress() {
		(updateProgress as () => void)();
	}
</script>

<h1>Word Registration</h1>
{#each $wordStore as w}
	<p>{w}</p>
{/each}
<button on:click={() => sharedGetProgress()}>see current progress</button>
<button on:click={() => sharedUpdateProgress()}>update progress</button>
