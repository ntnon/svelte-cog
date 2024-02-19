<div class="container">
	<span class="name"><slot name="name">name could not be loaded</slot></span>
	<span class="progress center"><slot name="progress">progress could not be loaded</slot></span>
	<span class="info"><slot name="info">info could not be loaded</slot></span>
	<span class="main center"><slot name="main">task could not be loaded</slot></span>
	<span class="reset center"><slot name="reset">reset could not be loaded</slot></span>
	<span class="help center"><slot name="help">help could not be loaded</slot></span>
	<span class="next center"><slot name="next">next could not be loaded</slot></span>
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
		grid-template-areas:
			'name name progress'
			'info info info'
			'main main main'
			'reset help next';
	}
	.name {
		grid-area: name;
		display: flex;
		align-items: center;
		background-color: green;
	}
	.progress {
		grid-area: progress;
		background-color: rgb(141, 125, 220);
	}

	.info {
		grid-area: info;
		display: flex;
		align-items: center;
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
	.help {
		grid-area: help;
		background-color: rgb(220, 136, 125);
	}
	.next {
		grid-area: next;
		background-color: rgb(220, 125, 171);
	}
</style>
