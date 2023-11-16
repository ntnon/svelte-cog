<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { wordStore } from '../../../stores/wordStore';
	import { sessionStateManager as ssm } from '../../../stores/sessionStateManager';

	console.log('session storage: ', ssm.getItem('words')); // wth? why is this null?
	console.log('word store f f: ', $wordStore);
	const updateProgress = getContext('updateProgress');
	const getProgress = getContext('getProgress');

	function sharedGetProgress() {
		(getProgress as () => void)();
	}

	function sharedUpdateProgress() {
		(updateProgress as () => void)();
	}
	let f: string[] = [];
	onMount(() => {
		f = $wordStore;
	});
</script>

<h1>Word Registration</h1>
{#each f as w}
	<p>{w}</p>
{/each}
<button on:click={() => sharedGetProgress()}>see current progress</button>
<button on:click={() => sharedUpdateProgress()}>update progress</button>
