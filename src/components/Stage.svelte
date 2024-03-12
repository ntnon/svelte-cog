<div class="container">
	<span class="name center text-2xl font-bold">
		<slot name="name" />
	</span>

	<span class="progress center p-4">
		<slot name="progress" />
	</span>

	<span class="info center text-2xl p-4">
		<slot name="info" />
	</span>

	<span class="main text-2xl size-full p-4">
		<slot name="component" />
	</span>

	<!-- <button
			class="helpButton center {stage.help.highlight && 'highlight'}"
			on:click={stage.help.function}>help</button
		> -->
	<span class="navbar flex">
		<span class="next center navbtn mb-5 w-60 mx-auto"><slot name="next" /></span>
	</span>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 4rem 10rem 5fr 6rem;
		grid-template-areas:
			'name name progress'
			'info info info'
			'main main main'
			'navbar navbar navbar';
	}

	.navbar {
		grid-area: navbar;
		background-color: rgb(125, 220, 136);
	}

	.name {
		grid-area: name;
		background-color: rgb(220, 174, 125);
	}
	.progress {
		grid-area: progress;
		background-color: rgb(141, 125, 220);
	}

	.info {
		grid-area: info;
		background-color: rgb(220, 125, 125);
	}

	.main {
		grid-area: main;
		background-color: rgb(125, 220, 136);
	}
</style>
