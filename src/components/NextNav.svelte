<script lang="ts">
	import { page } from '$app/stores';
	import routes from '$lib/routes.json';
	import type { IRoute } from '$lib/interfaces';
	let nextPage: IRoute;
	page.subscribe((value) => {
		const currentIndex = routes.findIndex((r: IRoute) => r.path === value.route.id);
		// if there is no next page, go to the first page
		nextPage = (routes[currentIndex + 1] as IRoute) ?? routes[0];
	});
</script>

<a class="next-button" href={nextPage.path}>Next</a>
