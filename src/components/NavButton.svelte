<script lang="ts">
	export let active: boolean = true;

	export let fn: () => void;
</script>

<button
	class="btnClass size-full border-5 border-solid rounded-full box-border {active
		? ' '
		: 'bg-slate-400 opacity-30'}"
	on:click={fn}
>
	<slot />
</button>
