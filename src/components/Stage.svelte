<div class="container m-3">
	<span class="name center text-2xl font-bold">
		<span class="mx-3"><slot name="name" /></span>
	</span>

	<span class="progress center">
		<span class="mx-7"><slot name="progress" /></span>
	</span>

	<span class="info center text-2xl">
		<span class="mx-7"><slot name="info" /></span>
	</span>

	<span class="main center text-2xl size-full">
		<slot name="component" />
	</span>

	<!-- <button
			class="helpButton center {stage.help.highlight && 'highlight'}"
			on:click={stage.help.function}>help</button
		> -->
	<span class="navbar flex gap-[1rem]">
		<span class="reset flex-grow center navbtn"><slot name="reset" /></span>
		<span class="next flex-grow center navbtn"><slot name="next" /></span>
	</span>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 5fr 1fr;
		gap: 1rem;
		grid-template-areas:
			'name name progress'
			'info info info'
			'main main main'
			'navbar navbar navbar';
	}

	.navbar {
		grid-area: navbar;
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

	.reset {
		grid-area: reset;
		background-color: rgb(199, 220, 125);
	}

	.helpButton {
		grid-area: help;
		background-color: rgb(220, 136, 125);
	}
	.next {
		grid-area: next;
		background-color: rgb(220, 125, 171);
	}
</style>
