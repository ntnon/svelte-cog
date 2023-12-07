<script lang="ts">
	import RadioPanel from '../../../components/survey/RadioPanel.svelte';

	let genders = ['male', 'female', 'other'];
	let expertise = ['student', 'employed', 'unemployed', 'other'];

	const handleSelect = (radioId: string, value: string) => {
		console.log(radioId, value);
	};

	const handleSubmit = () => {
		console.log('f');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<ul>
		<li>
			gender
			<RadioPanel
				on:select={(e) => handleSelect('gender', e.detail)}
				content={genders}
				radioId={'gender'}
				showInside={false}
			/>
		</li>

		<li>
			occupation
			<RadioPanel
				on:select={(e) => handleSelect('expertise', e.detail)}
				content={expertise}
				radioId={'expertise'}
				showInside={false}
			/>
		</li>
	</ul>
	<button type="submit">Submit</button>
</form>

<style>
</style>
