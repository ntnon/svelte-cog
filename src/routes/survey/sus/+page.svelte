<script lang="ts">
	import RadioPanel from '../../../components/survey/RadioPanel.svelte';
	let content = ['1', '2', '3', '4', '5'];

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
				{content}
				radioId={'frequency'}
			/>
		</li>

		<li>
			<label for="complex">I found the system unnecessarily complex</label>
			<RadioPanel
				on:select={(e) => handleSelect('complex', e.detail)}
				{content}
				radioId={'complex'}
			/>
		</li>

		<li>
			<label for="easy">I thought the system was easy to use</label>
			<RadioPanel on:select={(e) => handleSelect('easy', e.detail)} {content} radioId={'easy'} />
		</li>

		<li>
			<label for="support"
				>I think that I would need the support of a technical person to be able to use this system</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('support', e.detail)}
				{content}
				radioId={'support'}
			/>
		</li>

		<li>
			<label for="integrated"
				>I found the various functions in this system were well integrated</label
			>
			<RadioPanel
				on:select={(e) => handleSelect('integrated', e.detail)}
				{content}
				radioId={'integrated'}
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
		justify-content: space-evenly;
	}
</style>
