<script lang="ts">
	import SUS from '../../components/feedback/SUS.svelte';
</script>

<h2>Feedback!</h2>

<form>
	<label for="feedback">Hva synes du om oppgaven "Clock Draw?"</label>
	<textarea id="feedback" name="feedback" rows="4" cols="50"></textarea>
	<label for="feedback">Hva synes du om oppgaven "?</label>
	<textarea id="feedback" name="feedback" rows="4" cols="50"></textarea>
	<label for="feedback">Hva synes du om oppgaven?</label>
	<textarea id="feedback" name="feedback" rows="4" cols="50"></textarea>
	<input type="submit" value="Send inn" />
</form>

<SUS></SUS>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
