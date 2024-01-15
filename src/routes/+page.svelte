<script lang="ts">
	import { consentStore } from '../stores/stores';
	const removeConsent = () => {
		console.log('removing consent');
		$consentStore = false;
	};
</script>

<h1>Welcome to Svelte-Cog!</h1>
<p>This is a web based cognitive test created with SvelteKit</p>
<p>There are 5 tasks</p>
<p>And a questionaire</p>
<button><a href="/tasks/wordregistration">Begin</a></button>
<button on:click={removeConsent}>Revoke Consent</button>
