<script lang="ts">
	export let active: boolean = true;

	export let fn: () => void;
</script>

<button class="btnClass {active ? '' : 'inactive'}" on:click={fn}>
	<slot />
</button>
