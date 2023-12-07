<script lang="ts">
</script>

<div class="navbar">
	<ul class="navitems">
		<li>Home</li>
		<li>Tasks</li>
		<li>Survey</li>
		<li>About</li>
	</ul>
	<slot />
</div>

<style>
	.navbar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f1f1f1;
		border-bottom: 1px solid #ccc;
		height: 3em;
	}
	.navitems {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.navitems li {
		padding: 0.6em;
	}
</style>
