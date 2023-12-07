<script lang="ts">
	import ConsentForm from '../components/consent/ConsentForm.svelte';
	import Nav from '../components/navigation/Nav.svelte';
	import { localStateManager as lsm } from '../stores/localStateManager';
	import { onMount } from 'svelte';
	import NextNav from '../components/navigation/NextNav.svelte';

	let storedConsent: boolean;
	onMount(() => {
		storedConsent = lsm.getItem('consent') === 'true' ? true : false;
	});
</script>

<NextNav />

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
