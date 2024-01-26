<script lang="ts">
	import { getAppData } from '$lib/dataService';
	import { setDataStore } from '$lib/state.svelte';
	import Nav from '../components/navigation/Nav.svelte';

	const allData = getAppData();

	const context = setDataStore('data', 'session', allData);
</script>

<div class="centered">
	<Nav></Nav>
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
