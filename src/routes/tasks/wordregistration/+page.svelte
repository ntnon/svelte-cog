<script>
	import { wordStore, resetWords } from '../../../stores/wordStore';
</script>

<h1>Word Registration</h1>
{#each $wordStore as word}
	<p>{word}</p>
{/each}

<button on:click={() => resetWords()}>reset</button>
