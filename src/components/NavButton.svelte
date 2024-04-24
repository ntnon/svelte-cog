<script lang="ts">
	export let active: boolean = true;

	export let fn: () => any;
</script>

<button
	class="btnClass size-full border-5 border-solid rounded-full box-border {active
		? ' '
		: 'inactive'}"
	on:click={fn}
>
	<slot />
</button>
