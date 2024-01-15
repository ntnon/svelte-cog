<script lang="ts">
	import ConsentForm from '../components/consent/ConsentForm.svelte';
	import Nav from '../components/navigation/Nav.svelte';
	import { consentStore } from '../stores/stores';
</script>

<div class="centered">
	{#if $consentStore !== true}
		<ConsentForm />
	{/if}
	<Nav />
	<slot />
</div>

<!-- 
 -->

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100vh;
		align-items: center;
	}

	:global(button) {
		cursor: pointer;
	}
</style>
