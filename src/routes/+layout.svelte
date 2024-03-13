<script lang="ts">
	import '../app.css';

	import { setDataStore } from '$lib/state.svelte';
	import { defaultAppData } from '$lib/defaultAppData';

	setDataStore(defaultAppData);

	let myElement: Element;

	function makeFullscreen() {
		if (myElement) {
			if (myElement.requestFullscreen) {
				myElement.requestFullscreen();
			} else if ((myElement as any).mozRequestFullScreen) {
				/* Firefox */
				(myElement as any).mozRequestFullScreen();
			} else if ((myElement as any).webkitRequestFullscreen) {
				/* Chrome, Safari and Opera */
				(myElement as any).webkitRequestFullscreen();
			} else if ((myElement as any).msRequestFullscreen) {
				/* IE/Edge */
				(myElement as any).msRequestFullscreen();
			}
		}
	}

	$: if (myElement) {
		makeFullscreen();
	}
</script>

<main bind:this={myElement} class="w-[100vw] h-[100vh] flex justify-center text-2xl sm:text-2xl">
	<slot />
</main>

<style>
	main {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
