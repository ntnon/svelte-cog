<script lang="ts">
	import ConsentForm from '../components/consent/ConsentForm.svelte';
	import Nav from '../components/navigation/Nav.svelte';
</script>

<div class="centered">
	<ConsentForm />
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
