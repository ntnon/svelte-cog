<script lang="ts">
	import ConsentForm from '../components/ConsentForm.svelte';
	import Nav from '../components/Nav.svelte';
	import { localStateManager as lsm } from '../stores/localStateManager';
	import { onMount } from 'svelte';
	let storedConsent: boolean;
	onMount(() => {
		storedConsent = lsm.getItem('consent') === 'true' ? true : false;
	});
</script>

<div class="centered">
	{#if !storedConsent}
		<ConsentForm bind:storedConsent />
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
</style>
