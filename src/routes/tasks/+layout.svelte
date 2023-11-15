<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';

	import { updateProgress, getProgress } from '../../stores/progressTracker';
	import Routes from '$lib/routes.json';
	import type { IRoute, IStatus } from '$lib/interfaces';
	import { setContext } from 'svelte';

	import { page } from '$app/stores';

	const currentPage: IRoute | undefined = Routes.find((r: IRoute) => r.path === $page.route.id);
	if (!currentPage) throw new Error('current page not found');

	const sharedUpdateProgress = () => {
		updateProgress(currentPage, 'complete');
	};
	const sharedGetProgress = () => {
		getProgress(currentPage);
	};
	setContext('updateProgress', sharedUpdateProgress);
	setContext('getProgress', sharedGetProgress);
</script>

<Navbar />

<slot />
