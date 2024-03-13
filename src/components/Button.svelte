<script lang="ts">
	export let active: boolean = true;

	export let fn: (() => void) | null = null;

	const handleClick = (e: Event) => {
		if (fn) fn();
		e.preventDefault();
	};
</script>

<button
	class="bg-green-500 size-full p-2 rounded-full {active ? '' : 'inactive'} {fn
		? ''
		: 'cursor-default'}"
	on:click={handleClick}><span class="mx-3"><slot /></span></button
>
