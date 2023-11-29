<script lang="ts">
	import Scale from './Scale.svelte';
</script>

<form>
	<span>
		<p>strongly agree ||| strongly disagree</p>
		<p>{'<-------->'}</p>
	</span>
	<ol>
		<li>
			<label for="frequency">I think that I would like to use this system frequently</label>
			<Scale id={'frequency'} />
		</li>

		<li>
			<label for="complex">I found the system unnecessarily complex</label>
			<Scale id={'complex'} />
		</li>

		<li>
			<label for="easy">I thought the system was easy to use</label>
			<Scale id={'easy'} />
		</li>

		<li>
			<label for="support"
				>I think that I would need the support of a technical person to be able to use this system</label
			>
			<Scale id={'support'} />
		</li>

		<li>
			<label for="integrated"
				>I found the various functions in this system were well integrated</label
			>
			<Scale id={'integrated'} />
		</li>

		<li>
			<label for="inconsistency">I thought there was too much inconsistency in this system</label>
			<Scale id={'inconsistency'} />
		</li>

		<li>
			<label for="quickly"
				>I would imagine that most people would learn to use this system very quickly</label
			>
			<Scale id={'quickly'} />
		</li>

		<li>
			<label for="cumbersome">I found the system very cumbersome to use</label>
			<Scale id={'cumbersome'} />
		</li>

		<li>
			<label for="confident">I felt very confident using the system</label>
			<Scale id={'confident'} />
		</li>

		<li>
			<label for="learn"
				>I needed to learn a lot of things before I could get going with this system</label
			>
			<Scale id={'learn'} />
		</li>
	</ol>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		max-width: 80%;
	}
	span {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	label {
		padding-bottom: 1rem;
	}

	li {
		padding-bottom: 2rem;
		padding: 1rem;
	}
</style>
