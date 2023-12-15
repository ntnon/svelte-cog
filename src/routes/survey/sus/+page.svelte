<script lang="ts">
	import RadioPanel from '../../../components/survey/RadioPanel.svelte';
	let radioContent = ['1', '2', '3', '4', '5'];

	const handleSelect = (radioId: string, value: string) => {
		console.log(radioId, value);
	};

	const handleSubmit = () => {
		console.log('f');
	};
</script>

<form>
	<span> 1: Strongly disagree 5: Strongly agree </span>
	<ol>
		<li>
			<label for="frequency">I think that I would like to use this system frequently</label>
			<RadioPanel
				on:select={(e) => handleSelect('frequency', e.detail)}
				{radioContent}
				radioId={'frequency'}
			/>
		</li>

		<li>
			<label for="complex">I found the system unnecessarily complex</label>
			<RadioPanel
				on:select={(e) => handleSelect('complex', e.detail)}
				{radioContent}
				radioId={'complex'}
			/>
		</li>

		<li>
			<label for="easy">I thought the system was easy to use</label>
			<RadioPanel
				on:select={(e) => handleSelect('easy', e.detail)}
				{radioContent}
				radioId={'easy'}
			/>
		</li>

		<li>
			<label for="support"
				>I think that I would need the support of a technical person to be able to use this system</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('support', e.detail)}
				{radioContent}
				radioId={'support'}
			/>
		</li>

		<li>
			<label for="integrated"
				>I found the various functions in this system were well integrated</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('integrated', e.detail)}
				{radioContent}
				radioId={'integrated'}
			/>
		</li>

		<li>
			<label for="inconsistency">I thought there was too much inconsistency in this system.</label>
			<RadioPanel
				on:select={(e) => handleSelect('inconsistency', e.detail)}
				{radioContent}
				radioId={'inconsistency'}
			/>
		</li>
		<li>
			<label for="learn-quickly"
				>I would imagine that most people would learn to use this system very quickly.</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('learn-quickly', e.detail)}
				{radioContent}
				radioId={'learn-quickly'}
			/>
		</li>
		<li>
			<label for="cumbersome">I found the system very cumbersome to use.</label>
			<RadioPanel
				on:select={(e) => handleSelect('cumbersome', e.detail)}
				{radioContent}
				radioId={'cumbersome'}
			/>
		</li>
		<li>
			<label for="confident">I felt very confident using the system.</label>
			<RadioPanel
				on:select={(e) => handleSelect('confident', e.detail)}
				{radioContent}
				radioId={'confident'}
			/>
		</li>
		<li>
			<label for="learn-lot"
				>I needed to learn a lot of things before I could get going with this system.</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('learn-lot', e.detail)}
				{radioContent}
				radioId={'learn-lot'}
			/>
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
	.SUSinput {
		display: flex;
		flex-direction: row;
		padding-bottom: 1rem;
		padding-top: 1rem;
		width: 100%;
		justify-radiocontent: space-evenly;
	}
</style>
