<script lang="ts">
	import { page } from '$app/stores';
	import routes from '$lib/routes.json';
	import type { IRoute } from '$lib/interfaces';
	// Create a writable store to keep track of the current path
	const location = $page.route.id;
	// regex for for later if I need it ^((\/\w*)*)
	function isNextRoute(route: IRoute) {
		if (location === null) return false;
		const currentIndex = routes.findIndex((route) => route.path === location);
		return route.id === currentIndex + 1;
	}
</script>

<nav>
	<div class="current-page">{location}</div>
	<ul>
		{#each routes as route}
			<a href={route.path} class={isNextRoute(route) ? '' : 'hidden'}> Next</a>
		{/each}
	</ul>
</nav>

<style>
	.hidden {
		display: none;
	}
</style>
