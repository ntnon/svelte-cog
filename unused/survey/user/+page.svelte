<script lang="ts">
	let genders = ['male', 'female', 'other'];
	let expertise = ['student', 'employed', 'unemployed', 'other'];

	const handleSelect = (radioId: string, value: string) => {
		console.log(radioId, value);
	};

	const handleSubmit = () => {
		console.log('f');
	};
</script>

<style>
</style>
