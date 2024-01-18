<script lang="ts">
	let startDag = 30;
	let dagerTilFrist = 30;
	let dagNummer = 0;
	let motivasjon = 1;
	let antallSider = 1;

	const leggTilDag = () => {
		dagNummer += 1;
	};

	// $: dagerTilFrist = startDag - dagNummer;

	// $: motivasjon += dagNummer / dagerTilFrist + 2;

	// $: antallSider += motivasjon / 20;

	$: dagerTilFrist = startDag - dagNummer;

	$: motivasjon = dagerTilFrist ^ 2;

	$: antallSider += motivasjon / 20;
</script>

<h2>Demo</h2>

<button on:click={leggTilDag}>+ 24 timer</button>
<p>Dager til innlevering: {dagerTilFrist}</p>
<p>Antall sider: {Math.round(antallSider)}</p>
<p>Motivasjon: {Math.round(motivasjon)}%</p>
