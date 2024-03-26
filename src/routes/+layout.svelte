<script lang="ts">
	import '../app.css';
	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';
	setDataStore(defaultAppData);
	import { browser } from '$app/environment';

	let browserName: string = '';

	if (browser) {
		let userAgent = navigator.userAgent;

		if (userAgent.indexOf('Chrome') > -1) {
			browserName = 'Chrome';
		} else if (userAgent.indexOf('Firefox') > -1) {
			browserName = 'Firefox';
		} else if (userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1) {
			browserName = 'Internet Explorer';
		} else if (userAgent.indexOf('Edge') > -1) {
			browserName = 'Edge';
		} else if (userAgent.indexOf('Safari') > -1) {
			browserName = 'Safari';
		} else {
			browserName = 'Other';
		}
	}
</script>

<meta content="viewport-fit=cover" />

<svelte:head>
	<link rel="manifest" href="src/manifest.json" />
</svelte:head>

{#if browserName}
	<main
		class=" w-[100vw] absolute text-lg md:text-4xl {browserName === 'Safari'
			? 'h-[90vh]'
			: 'h-[100vh]'}"
	>
		<slot />
		<div class="h-5">ff</div>
	</main>
{/if}

<style>
	main {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
