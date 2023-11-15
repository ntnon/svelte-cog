<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import { updateProgress, getProgress } from '../../stores/progressTracker';

	import type { IRoute, IStatus } from '$lib/interfaces';
	import { setContext } from 'svelte';

	const sharedUpdateProgress = (route: IRoute, status: IStatus['status']) => {
		updateProgress(route, status);
	};
	const sharedGetProgress = (route: IRoute) => {
		return getProgress(route);
	};
	setContext('getProgress', sharedUpdateProgress);
	setContext('updateProgress', sharedGetProgress);
</script>

<Navbar />

<slot />
