<script lang="ts">
	import Clock from './Clock.svelte';
	import BlockList from './BlockList.svelte';
	import { createHourBlockStore } from '../../../scripts/createHourBlockStore';

	const blocks = createHourBlockStore(12);
	const offset = 130;
</script>

<h2>Klokketesten</h2>
<p>
	Trykk på prikken hvor det grønne tallet hører hjemme. For å flytte et tall du allerede har
	plassert, trykk på det igjen
</p>
<div class="numberBlocks">
	<BlockList {blocks} />
	<div class="clock">
		<div class="dial"></div>
		<div class="hand hour"></div>
		<div class="hand minute"></div>
		<Clock {blocks} {offset} />
	</div>
</div>

<style>
	.clock {
		width: 300px;
		height: 300px;
		border: 6px solid rgb(120, 117, 117);
		border-radius: 50%;
		position: absolute;
	}
	.dial {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 10px;
		height: 10px;
		background: rgb(128, 127, 127);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
